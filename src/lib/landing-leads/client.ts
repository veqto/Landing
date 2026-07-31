/**
 * Único punto de contacto entre la landing y LANDING-LEADS.
 *
 * El endpoint definitivo vive en la PLATAFORMA (app.veqto.ai): los leads tienen
 * que caer en la vista de Leads que usa operación, no en una base paralela de la
 * landing. En producción se apunta allá con
 * `NEXT_PUBLIC_LANDING_LEADS_BASE_URL=https://app.veqto.ai`.
 *
 * Sin esa variable las peticiones van a la ruta relativa `/api/landing-leads`,
 * que en desarrollo la sirve el mock local (`src/app/api/landing-leads/route.ts`).
 * El mock se apaga solo en producción, así que un despliegue sin la variable
 * falla de forma visible en vez de aceptar leads en silencio.
 *
 * Los tres formularios pasan por `postLead`. Si el contrato cambia, se toca este
 * archivo y `contract.ts`, nada más.
 */

import {
  LANDING_LEADS_PATH,
  IDEMPOTENCY_HEADER,
  type AliadoLead,
  type CreditoLead,
  type LandingLeadPayload,
  type LandingLeadResponse,
  type SimuladorLead,
} from './contract';

export type LeadErrorKind =
  /** El endpoint no está configurado: no se intentó ninguna petición. */
  | 'not_configured'
  /** 422 — el endpoint rechazó campos concretos. */
  | 'validation'
  /** 429 — demasiadas solicitudes desde este origen. */
  | 'rate_limited'
  /** 403 — captcha inválido, vencido u origen no permitido. */
  | 'forbidden'
  /** 5xx — fallo del servidor. */
  | 'server'
  /** El fetch no llegó a completarse: sin red, CORS o timeout. */
  | 'network'
  /** Respuesta fuera de lo previsto por el contrato. */
  | 'unexpected';

export interface LeadSuccess {
  ok: true;
  /**
   * Referencia emitida por la plataforma. `null` si la respuesta fue 2xx pero no
   * traía referencia legible: la solicitud SÍ quedó registrada, así que se
   * confirma al titular sin mostrar un número inventado.
   */
  referencia: string | null;
}

export interface LeadFailure {
  ok: false;
  kind: LeadErrorKind;
  status?: number;
  /** Errores por campo devueltos en un 422, con notación de punto. */
  fieldErrors?: Record<string, string>;
  /** Segundos sugeridos antes de reintentar, en un 429. */
  retryAfterSeconds?: number;
  /** Si reintentar el mismo envío tiene sentido. */
  retryable: boolean;
}

export type LeadResult = LeadSuccess | LeadFailure;

const BASE_URL = process.env.NEXT_PUBLIC_LANDING_LEADS_BASE_URL ?? '';
const TIMEOUT_MS = 20_000;

/**
 * Identificador de intento. Va en cada envío para que un reintento tras un
 * timeout no cree una segunda solicitud: el endpoint repite la respuesta
 * original en vez de registrar otra.
 */
export function newIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * En producción exigimos base absoluta: la ruta relativa solo existe en
 * desarrollo, servida por el mock. Preferimos un error visible a que un lead
 * real se pierda contra un 404.
 */
function resolverUrl(): string | null {
  if (BASE_URL) return `${BASE_URL.replace(/\/+$/, '')}${LANDING_LEADS_PATH}`;
  if (process.env.NODE_ENV === 'production') return null;
  return LANDING_LEADS_PATH;
}

async function leerCuerpo(response: Response): Promise<LandingLeadResponse | null> {
  try {
    return (await response.json()) as LandingLeadResponse;
  } catch {
    return null;
  }
}

export interface PostLeadOptions {
  signal?: AbortSignal;
  idempotencyKey?: string;
}

/**
 * Envía un lead a LANDING-LEADS.
 *
 * Nunca lanza: todo camino de fallo vuelve como `{ ok: false }` para que la UI
 * decida qué mostrar. La pantalla de éxito solo debe abrirse con `ok: true`.
 */
export async function postLead(
  payload: LandingLeadPayload,
  options?: PostLeadOptions
): Promise<LeadResult> {
  const url = resolverUrl();

  if (!url) {
    if (typeof console !== 'undefined') {
      console.error(
        '[veqto] NEXT_PUBLIC_LANDING_LEADS_BASE_URL sin configurar en producción: no se envió el lead.'
      );
    }
    return { ok: false, kind: 'not_configured', retryable: false };
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        [IDEMPOTENCY_HEADER]: options?.idempotencyKey ?? newIdempotencyKey(),
      },
      body: JSON.stringify(payload),
      signal: options?.signal ?? AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    // Sin red, CORS mal configurado en la plataforma, o timeout. No sabemos si
    // el lead llegó a registrarse: de ahí la clave de idempotencia al reintentar.
    return { ok: false, kind: 'network', retryable: true };
  }

  const cuerpo = await leerCuerpo(response);

  if (response.ok) {
    const referencia = cuerpo && cuerpo.ok === true ? cuerpo.referencia : null;
    return { ok: true, referencia: referencia ?? null };
  }

  const detalle = cuerpo && cuerpo.ok === false ? cuerpo.error : null;

  switch (response.status) {
    case 422:
      return {
        ok: false,
        kind: 'validation',
        status: 422,
        fieldErrors: detalle?.campos,
        retryable: false,
      };
    case 429:
      return {
        ok: false,
        kind: 'rate_limited',
        status: 429,
        retryAfterSeconds: detalle?.reintentarEnSegundos,
        retryable: true,
      };
    case 403:
      return { ok: false, kind: 'forbidden', status: 403, retryable: true };
    default:
      return {
        ok: false,
        kind: response.status >= 500 ? 'server' : 'unexpected',
        status: response.status,
        retryable: response.status >= 500,
      };
  }
}

/* Envoltorios por formulario: el `tipo` no se escribe en los componentes. */

export function submitSimuladorLead(
  datos: Omit<SimuladorLead, 'tipo'>,
  options?: PostLeadOptions
): Promise<LeadResult> {
  return postLead({ tipo: 'simulador', ...datos }, options);
}

export function submitCreditoLead(
  datos: Omit<CreditoLead, 'tipo'>,
  options?: PostLeadOptions
): Promise<LeadResult> {
  return postLead({ tipo: 'credito', ...datos }, options);
}

export function submitAliadoLead(
  datos: Omit<AliadoLead, 'tipo'>,
  options?: PostLeadOptions
): Promise<LeadResult> {
  return postLead({ tipo: 'aliado', ...datos }, options);
}
