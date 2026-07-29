/**
 * Único punto de contacto entre la landing y LANDING-LEADS.
 *
 * El contrato (ruta, payloads, respuestas, errores) vive en
 * `src/lib/landing-leads/contract.ts` y lo comparte con el endpoint, así que un
 * cambio de forma rompe la compilación en vez de fallar en producción.
 *
 * Ninguna otra parte de la landing habla con el backend: los componentes solo
 * consumen `submitCreditApplication` y el tipo `CreditApplicationResult`.
 *
 * El endpoint vive en el mismo origen que la landing, así que por defecto se
 * llama con ruta relativa: sin CORS y sin variable de entorno obligatoria.
 * `NEXT_PUBLIC_LANDING_LEADS_BASE_URL` solo hace falta para apuntar a otro host
 * (p. ej. un preview pegándole a staging).
 */

import {
  LANDING_LEADS_PATH,
  IDEMPOTENCY_HEADER,
  type LandingLeadPayload,
  type LandingLeadResponse,
  type LeadLocale,
} from '@/lib/landing-leads/contract';

/** Datos que recoge el modal del simulador. */
export interface CreditApplicationInput {
  nombreCompleto: string;
  cedula: string;
  celular: string;
  correo: string;
  tipoVehiculo: string;
  valorVehiculo: number;
  cuotaInicialPorcentaje: number;
  plazoMeses: number;
  rangoIngresos: string;
  tipoEmpleo: 'empleado' | 'independiente';
  historialCrediticio: 'si' | 'no' | 'no_se';
  /** Ley 1581 de 2012. El endpoint rechaza con 422 si no viene en `true`. */
  aceptaTratamientoDatos: true;
  locale: LeadLocale;
  /** Token de Turnstile. Obligatorio solo si el captcha está activo. */
  captchaToken?: string;
}

export type CreditApplicationErrorKind =
  /** 422 — el endpoint rechazó campos concretos. */
  | 'validation'
  /** 429 — demasiadas solicitudes desde este origen. */
  | 'rate_limited'
  /** 403 — captcha inválido o vencido. */
  | 'forbidden'
  /** 5xx — fallo del servidor. */
  | 'server'
  /** El fetch no llegó a completarse: sin red o timeout. */
  | 'network'
  /** Respuesta fuera de lo previsto por el contrato. */
  | 'unexpected';

export interface CreditApplicationSuccess {
  ok: true;
  /**
   * Referencia emitida por el backend. `null` si la respuesta fue 2xx pero no
   * traía referencia legible: la solicitud SÍ quedó registrada, así que se
   * confirma al usuario sin mostrar un número inventado.
   */
  referencia: string | null;
}

export interface CreditApplicationFailure {
  ok: false;
  kind: CreditApplicationErrorKind;
  status?: number;
  /** Errores por campo devueltos en un 422. */
  fieldErrors?: Record<string, string>;
  /** Segundos sugeridos antes de reintentar, en un 429. */
  retryAfterSeconds?: number;
  /** Si reintentar el mismo envío tiene sentido. */
  retryable: boolean;
}

export type CreditApplicationResult =
  | CreditApplicationSuccess
  | CreditApplicationFailure;

/** Vacío = mismo origen. Solo se configura para apuntar a otro host. */
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

function endpointUrl(): string {
  return BASE_URL
    ? `${BASE_URL.replace(/\/+$/, '')}${LANDING_LEADS_PATH}`
    : LANDING_LEADS_PATH;
}

async function readBody(response: Response): Promise<LandingLeadResponse | null> {
  try {
    return (await response.json()) as LandingLeadResponse;
  } catch {
    return null;
  }
}

/**
 * Envía la solicitud del simulador a LANDING-LEADS.
 *
 * Nunca lanza: todo camino de fallo vuelve como `{ ok: false }` para que la UI
 * decida qué mostrar. El modal de éxito solo debe abrirse con `ok: true`.
 */
export async function submitCreditApplication(
  input: CreditApplicationInput,
  options?: { signal?: AbortSignal; idempotencyKey?: string }
): Promise<CreditApplicationResult> {
  const payload: LandingLeadPayload = { tipo: 'simulador', ...input };

  let response: Response;
  try {
    response = await fetch(endpointUrl(), {
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
    // Sin red o timeout. No sabemos si el backend llegó a registrar la
    // solicitud: de ahí la clave de idempotencia al reintentar.
    return { ok: false, kind: 'network', retryable: true };
  }

  const body = await readBody(response);

  if (response.ok) {
    const referencia = body && body.ok === true ? body.referencia : null;
    return { ok: true, referencia: referencia ?? null };
  }

  const detalle = body && body.ok === false ? body.error : null;

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
      // Captcha vencido o inválido: hay que resolverlo de nuevo antes de reintentar.
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
