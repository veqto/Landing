/**
 * Verificación de Cloudflare Turnstile del lado servidor.
 *
 * El captcha se activa solo si `TURNSTILE_SECRET_KEY` está configurada. Así la
 * landing puede salir a producción antes de tener el captcha montado, y se
 * enciende después sin tocar código: en cuanto la variable existe, el token pasa
 * a ser obligatorio y un token ausente o inválido devuelve 403.
 *
 * El secreto NUNCA sale del servidor. La site key pública va aparte, en
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY, y es la que usa el widget en el navegador.
 */

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TIMEOUT_MS = 5_000;

export type TurnstileResultado =
  | { valido: true }
  | { valido: false; motivo: string };

/** `true` si el captcha está activo en este despliegue. */
export function captchaActivo(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verificarTurnstile(
  token: string,
  ip: string | null
): Promise<TurnstileResultado> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Captcha apagado: no hay nada que verificar.
  if (!secret) return { valido: true };

  if (!token) return { valido: false, motivo: 'Token de captcha ausente' };

  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);

  let respuesta: Response;
  try {
    respuesta = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    // Si Cloudflare no responde, rechazamos: es la opción segura. Un fallo del
    // verificador no debe convertirse en una puerta abierta.
    return { valido: false, motivo: 'No se pudo verificar el captcha' };
  }

  if (!respuesta.ok) {
    return { valido: false, motivo: 'No se pudo verificar el captcha' };
  }

  const datos = (await respuesta.json().catch(() => null)) as
    | { success?: boolean; 'error-codes'?: string[] }
    | null;

  if (datos?.success === true) return { valido: true };

  const codigos = datos?.['error-codes'] ?? [];
  return {
    valido: false,
    motivo: codigos.length > 0 ? `Captcha rechazado (${codigos.join(', ')})` : 'Captcha rechazado',
  };
}
