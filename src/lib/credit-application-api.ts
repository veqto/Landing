/**
 * Único punto de contacto entre la landing y la plataforma (app.veqto.ai).
 *
 * ────────────────────────────────────────────────────────────────────────────
 * CONTRATO PENDIENTE
 * ────────────────────────────────────────────────────────────────────────────
 * Todo lo marcado con [CONTRATO] es un supuesto y se ajusta cuando llegue la
 * especificación de la plataforma: ruta, nombres de campos, forma de la
 * respuesta, semántica de 422/429/403 y token de Turnstile.
 *
 * Ninguna otra parte de la landing habla con el backend. Si el contrato cambia,
 * se toca este archivo y nada más — los componentes solo consumen
 * `submitCreditApplication` y el tipo `CreditApplicationResult`.
 *
 * Mientras `NEXT_PUBLIC_VEQTO_API_BASE_URL` no esté configurada, la función no
 * emite ninguna petición y devuelve `kind: 'not_configured'`. Esto es
 * deliberado: es preferible un error visible a un falso "solicitud recibida".
 */

/** Datos que la landing recoge hoy en el modal del simulador. */
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
  /** Ley 1581 de 2012. El backend debe rechazar la solicitud si no viene en `true`. */
  aceptaTratamientoDatos: true;
  /** Idioma en que el titular leyó y aceptó la autorización. */
  locale: 'es' | 'en';
  /** Token de Cloudflare Turnstile. [CONTRATO] nombre del campo y si es obligatorio. */
  captchaToken?: string;
}

export type CreditApplicationErrorKind =
  /** Falta configurar la URL de la plataforma: no se intentó ninguna petición. */
  | 'not_configured'
  /** 422 — la plataforma rechazó campos concretos. */
  | 'validation'
  /** 429 — demasiadas solicitudes desde este origen. */
  | 'rate_limited'
  /** 403 — captcha inválido o vencido. */
  | 'forbidden'
  /** 5xx — la plataforma falló. */
  | 'server'
  /** El fetch no llegó a completarse: sin red, CORS, timeout. */
  | 'network'
  /** 2xx/4xx fuera de lo previsto por el contrato. */
  | 'unexpected';

export interface CreditApplicationSuccess {
  ok: true;
  /**
   * Referencia emitida por la plataforma. `null` si el POST devolvió 2xx pero
   * la respuesta no traía referencia legible: la solicitud SÍ quedó registrada,
   * así que se confirma al usuario sin mostrar un número inventado.
   */
  referencia: string | null;
}

export interface CreditApplicationFailure {
  ok: false;
  kind: CreditApplicationErrorKind;
  /** Código HTTP, si hubo respuesta. */
  status?: number;
  /** Errores por campo devueltos en un 422. [CONTRATO] formato exacto. */
  fieldErrors?: Record<string, string>;
  /** Si reintentar el mismo envío tiene sentido. */
  retryable: boolean;
}

export type CreditApplicationResult =
  | CreditApplicationSuccess
  | CreditApplicationFailure;

/**
 * Base de la API de la plataforma, p. ej. `https://app.veqto.ai`.
 * Sin valor por defecto a propósito: un default silencioso apuntando a un host
 * equivocado es peor que un error explícito.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_VEQTO_API_BASE_URL;

/** [CONTRATO] Ruta provisional — reemplazar por la que indique la plataforma. */
const ENDPOINT_PATH = '/api/v1/solicitudes-credito';

/** La plataforma tiene que evaluar y responder dentro de este margen. */
const TIMEOUT_MS = 20_000;

/**
 * Identificador de intento. Va en cada envío para que un reintento tras un
 * timeout no cree una segunda solicitud del mismo titular.
 * [CONTRATO] confirmar si la plataforma lo respeta y bajo qué cabecera.
 */
export function newIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * [CONTRATO] Traducción de los campos de la landing a los que espera la
 * plataforma. Hoy es 1:1 con `CreditApplicationInput`.
 */
function buildPayload(input: CreditApplicationInput): Record<string, unknown> {
  return { ...input, origen: 'landing-simulador' };
}

/** [CONTRATO] Campo donde viene la referencia en la respuesta 2xx. */
function readReferencia(body: unknown): string | null {
  if (!body || typeof body !== 'object') return null;
  const value = (body as Record<string, unknown>).referencia;
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

/** [CONTRATO] Forma del cuerpo de un 422. */
function readFieldErrors(body: unknown): Record<string, string> | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const errors = (body as Record<string, unknown>).errores;
  if (!errors || typeof errors !== 'object') return undefined;

  const parsed: Record<string, string> = {};
  for (const [field, message] of Object.entries(errors as Record<string, unknown>)) {
    if (typeof message === 'string') parsed[field] = message;
  }
  return Object.keys(parsed).length > 0 ? parsed : undefined;
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Envía la solicitud de crédito a la plataforma.
 *
 * Nunca lanza: todo camino de fallo vuelve como `{ ok: false }` para que la UI
 * decida qué mostrar. El modal de éxito solo debe abrirse con `ok: true`.
 */
export async function submitCreditApplication(
  input: CreditApplicationInput,
  options?: { signal?: AbortSignal; idempotencyKey?: string }
): Promise<CreditApplicationResult> {
  if (!API_BASE_URL) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[veqto] NEXT_PUBLIC_VEQTO_API_BASE_URL sin configurar: no se envió la solicitud.'
      );
    }
    return { ok: false, kind: 'not_configured', retryable: false };
  }

  const url = `${API_BASE_URL.replace(/\/+$/, '')}${ENDPOINT_PATH}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // [CONTRATO] confirmar nombre de la cabecera de idempotencia.
        'Idempotency-Key': options?.idempotencyKey ?? newIdempotencyKey(),
      },
      body: JSON.stringify(buildPayload(input)),
      signal: options?.signal ?? AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    // Sin red, CORS mal configurado o timeout. No sabemos si la plataforma
    // llegó a registrar la solicitud, de ahí la clave de idempotencia.
    return { ok: false, kind: 'network', retryable: true };
  }

  if (response.ok) {
    return { ok: true, referencia: readReferencia(await readJson(response)) };
  }

  const body = await readJson(response);

  switch (response.status) {
    case 422:
      return {
        ok: false,
        kind: 'validation',
        status: 422,
        fieldErrors: readFieldErrors(body),
        retryable: false,
      };
    case 429:
      return { ok: false, kind: 'rate_limited', status: 429, retryable: true };
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
