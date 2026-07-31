/**
 * MOCK DE DESARROLLO de LANDING-LEADS. No es el endpoint de producción.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ El endpoint definitivo vive en la PLATAFORMA (app.veqto.ai): los leads   │
 * │ deben caer en la vista de Leads que usa operación, no en una base        │
 * │ paralela de la landing. Este archivo solo existe para poder desarrollar  │
 * │ y probar los formularios sin depender de la plataforma.                  │
 * │                                                                          │
 * │ NUNCA responde salvo en desarrollo local y a propósito: el guard exige   │
 * │ NODE_ENV !== 'production' Y LANDING_LEADS_MOCK=1. Es decir:              │
 * │     LANDING_LEADS_MOCK=1 npm run dev                                     │
 * │ En producción el cliente apunta a NEXT_PUBLIC_LANDING_LEADS_BASE_URL y   │
 * │ esta ruta devuelve 404.                                                  │
 * │                                                                          │
 * │ NO TOCA LA BASE DE DATOS. Guarda en memoria del proceso y se vacía en    │
 * │ cada reinicio. La landing no configura DATABASE_URL ni aplica            │
 * │ migraciones: el almacenamiento real es responsabilidad de la plataforma. │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Implementa el contrato completo (`docs/CONTRATO-LANDING-LEADS.md`) para que lo
 * que se pruebe aquí sea lo que la plataforma tiene que replicar: validación por
 * campo, 422/429/403, idempotencia con replay y referencias con el formato real.
 */

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

export const dynamic = 'force-dynamic';

const MAX_CUERPO_BYTES = 256 * 1024;

/**
 * Leads aceptados en esta sesión de desarrollo. En memoria y con tope, para que
 * un bucle accidental durante las pruebas no haga crecer el proceso sin límite.
 */
const idempotencia = new Map<string, { tipo: LeadTipo; referencia: string }>();
const MAX_CLAVES = 1_000;

function error(
  status: number,
  codigo: LandingLeadErrorCodigo,
  mensaje: string,
  extra?: Partial<LandingLeadError['error']>
): Response {
  const cuerpo: LandingLeadError = { ok: false, error: { codigo, mensaje, ...extra } };
  return Response.json(cuerpo, { status });
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

function ipDe(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip');
}

/**
 * Doble condición para que el mock responda: fuera de producción Y habilitado a
 * mano. Las dos son necesarias.
 *
 * El `NODE_ENV` solo no basta: un preview de Vercel o un `next start` local
 * corren en modo producción, pero un runner de CI o un contenedor mal
 * configurado pueden no hacerlo. El opt-in explícito es lo que garantiza que el
 * mock nunca responda por accidente en un entorno que no sea el de alguien
 * desarrollando a propósito.
 */
function mockHabilitado(): boolean {
  return process.env.NODE_ENV !== 'production' && process.env.LANDING_LEADS_MOCK === '1';
}

export async function POST(request: Request): Promise<Response> {
  // ─── GUARD: este mock no existe fuera del desarrollo local ──────────────
  // Se comprueba antes que nada. Si alguien despliega la landing sin apuntar el
  // cliente a la plataforma, el formulario falla de forma visible en vez de
  // aceptar leads que nadie va a ver.
  if (!mockHabilitado()) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[landing-leads:mock] 404 — el mock está apagado. Para desarrollo local: LANDING_LEADS_MOCK=1 npm run dev'
      );
    }
    return new Response(null, { status: 404 });
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

  const clave = request.headers.get(IDEMPOTENCY_HEADER)?.trim() || null;

  if (clave) {
    const previo = idempotencia.get(clave);
    if (previo) return respuestaOk(previo.tipo, previo.referencia, true);
  }

  const referencia = lead.tipo === 'aliado' ? codigoAliado() : referenciaCredito();

  if (clave) {
    if (idempotencia.size >= MAX_CLAVES) idempotencia.clear();
    idempotencia.set(clave, { tipo: lead.tipo, referencia });
  }

  console.info(
    `[landing-leads:mock] ${lead.tipo} aceptado → ${referencia} (no persistido: el almacenamiento real es de la plataforma)`
  );

  return respuestaOk(lead.tipo, referencia, false);
}
