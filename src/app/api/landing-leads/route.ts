/**
 * LANDING-LEADS — punto de entrada de los tres formularios de la landing.
 *
 *   POST /api/landing-leads
 *
 * Un solo endpoint con discriminador `tipo` en vez de tres rutas: la
 * idempotencia, el límite de tasa, el captcha y la auditoría son idénticos para
 * los tres formularios, y así se implementan una vez. Internamente despacha a
 * `solicitudes` (simulador y crédito) o a `aliados`.
 *
 * El contrato vive en `src/lib/landing-leads/contract.ts` y lo comparten este
 * archivo y el cliente de la landing, así que no pueden desalinearse.
 *
 * Orden de las comprobaciones (importa): origen → cuerpo → límite de tasa →
 * validación → captcha → idempotencia → escritura. El captcha se verifica
 * después de validar para no gastar una llamada a Cloudflare en un payload que
 * ya venía roto.
 */

import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { solicitudes, aliados, landingLeadsIdempotencia } from '@/db/schema';
import {
  IDEMPOTENCY_HEADER,
  type LandingLeadError,
  type LandingLeadErrorCodigo,
  type LandingLeadOk,
  type LeadTipo,
} from '@/lib/landing-leads/contract';
import { validarLead, leerCaptchaToken } from '@/lib/landing-leads/validate';
import { verificarTurnstile } from '@/lib/landing-leads/turnstile';
import { consumirIntento } from '@/lib/landing-leads/rate-limit';
import { referenciaCredito, codigoAliado } from '@/lib/landing-leads/reference';
import {
  filaSimulador,
  filaCredito,
  filaAliado,
  type ContextoPeticion,
} from '@/lib/landing-leads/persist';

/** Recibe PII: nunca se cachea ni se prerenderiza. */
export const dynamic = 'force-dynamic';

const MAX_CUERPO_BYTES = 256 * 1024;
const INTENTOS_REFERENCIA = 3;

function error(
  status: number,
  codigo: LandingLeadErrorCodigo,
  mensaje: string,
  extra?: Partial<LandingLeadError['error']>
): Response {
  const cuerpo: LandingLeadError = { ok: false, error: { codigo, mensaje, ...extra } };
  return Response.json(cuerpo, { status });
}

function ipDe(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip');
}

/**
 * Orígenes permitidos. La landing y el endpoint comparten dominio, así que en
 * producción no hay CORS de por medio; esto solo cierra la puerta a que otro
 * sitio publique el formulario contra nuestra API desde el navegador.
 *
 * Una petición sin cabecera `Origin` (curl, QA, server-to-server) se acepta: el
 * endpoint es público y sin sesión, así que no hay nada que robar por CSRF. La
 * defensa contra abuso es el captcha y el límite de tasa, no el origen.
 */
function origenPermitido(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const configurados = (process.env.LANDING_LEADS_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  const permitidos = new Set(
    configurados.length > 0
      ? configurados
      : [
          process.env.NEXT_PUBLIC_APP_URL ?? 'https://veqto.ai',
          'https://veqto.ai',
          'https://www.veqto.ai',
          'http://localhost:3000',
        ]
  );

  return permitidos.has(origin);
}

export async function POST(request: Request): Promise<Response> {
  if (!origenPermitido(request)) {
    return error(403, 'ORIGEN_NO_PERMITIDO', 'Origen no autorizado para este endpoint.');
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_CUERPO_BYTES) {
    return error(413, 'CUERPO_INVALIDO', 'El cuerpo de la petición es demasiado grande.');
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error(400, 'CUERPO_INVALIDO', 'El cuerpo debe ser JSON válido.');
  }

  const ip = ipDe(request);
  const limite = consumirIntento(ip ?? 'sin-ip');
  if (!limite.permitido) {
    return error(429, 'LIMITE_TASA', 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.', {
      reintentarEnSegundos: limite.reintentarEnSegundos,
    });
  }

  const validacion = validarLead(body);
  if (!validacion.valido) {
    return error(422, 'VALIDACION', 'Algunos campos no pasaron la validación.', {
      campos: validacion.campos,
    });
  }
  const lead = validacion.datos;

  const captcha = await verificarTurnstile(leerCaptchaToken(body), ip);
  if (!captcha.valido) {
    return error(403, 'CAPTCHA_INVALIDO', captcha.motivo);
  }

  const claveIdempotencia = request.headers.get(IDEMPOTENCY_HEADER)?.trim() || null;
  const ctx: ContextoPeticion = { ip, userAgent: request.headers.get('user-agent') };

  try {
    // Envío ya procesado con esta clave: se repite la respuesta original.
    if (claveIdempotencia) {
      const previo = await db
        .select()
        .from(landingLeadsIdempotencia)
        .where(eq(landingLeadsIdempotencia.clave, claveIdempotencia))
        .limit(1);

      if (previo.length > 0) {
        return respuestaOk(previo[0].tipo as LeadTipo, previo[0].referencia, true);
      }
    }

    return await crearLead(lead, claveIdempotencia, ctx);
  } catch (e) {
    // El detalle va al log del servidor, nunca al cliente: el payload lleva PII.
    console.error('[landing-leads] fallo al registrar la solicitud', e);
    return error(500, 'ERROR_INTERNO', 'No pudimos registrar tu solicitud. Intenta de nuevo.');
  }
}

function respuestaOk(tipo: LeadTipo, referencia: string, duplicado: boolean): Response {
  const cuerpo: LandingLeadOk = {
    ok: true,
    tipo,
    referencia,
    recibidoEn: new Date().toISOString(),
    duplicado,
  };
  return Response.json(cuerpo, { status: duplicado ? 200 : 201 });
}

/**
 * Reserva la clave de idempotencia y escribe la fila.
 *
 * El insert en `landing_leads_idempotencia` es lo que resuelve la carrera entre
 * dos peticiones simultáneas con la misma clave: la PK deja pasar solo a una.
 * Si perdemos la carrera, devolvemos la referencia de quien ganó en vez de crear
 * una segunda solicitud.
 */
async function crearLead(
  lead: Exclude<ReturnType<typeof validarLead>, { valido: false }>['datos'],
  clave: string | null,
  ctx: ContextoPeticion
): Promise<Response> {
  let ultimoError: unknown = null;

  for (let intento = 0; intento < INTENTOS_REFERENCIA; intento++) {
    const referencia = lead.tipo === 'aliado' ? codigoAliado() : referenciaCredito();

    if (clave) {
      const reservada = await db
        .insert(landingLeadsIdempotencia)
        .values({ clave, tipo: lead.tipo, referencia })
        .onConflictDoNothing()
        .returning();

      if (reservada.length === 0) {
        // Otra petición con la misma clave se nos adelantó.
        const ganador = await db
          .select()
          .from(landingLeadsIdempotencia)
          .where(eq(landingLeadsIdempotencia.clave, clave))
          .limit(1);

        if (ganador.length > 0) {
          return respuestaOk(ganador[0].tipo as LeadTipo, ganador[0].referencia, true);
        }
      }
    }

    try {
      if (lead.tipo === 'aliado') {
        await db.insert(aliados).values(filaAliado(lead, referencia, ctx));
      } else if (lead.tipo === 'credito') {
        await db.insert(solicitudes).values(filaCredito(lead, referencia, ctx));
      } else {
        await db.insert(solicitudes).values(filaSimulador(lead, referencia, ctx));
      }

      return respuestaOk(lead.tipo, referencia, false);
    } catch (e) {
      ultimoError = e;

      // La reserva quedó huérfana: se libera para que un reintento del titular
      // no choque con su propia clave y quede bloqueado para siempre.
      if (clave) {
        await db
          .delete(landingLeadsIdempotencia)
          .where(eq(landingLeadsIdempotencia.clave, clave))
          .catch(() => {});
      }

      // Colisión de referencia: se reintenta con otra. Cualquier otro fallo se
      // propaga al catch del handler.
      const mensaje = e instanceof Error ? e.message : String(e);
      if (!/unique|duplicate/i.test(mensaje)) throw e;
    }
  }

  throw ultimoError ?? new Error('No se pudo generar una referencia única');
}
