import type { LeadFailure } from './client';

/**
 * Mensaje al titular según por qué falló el envío. Compartido por los tres
 * formularios para que un 429 se explique igual en todos.
 */
export function leadErrorMessage(failure: LeadFailure, es: boolean): string {
  switch (failure.kind) {
    case 'not_configured':
      return es
        ? 'El envío no está disponible en este momento. Escríbenos y te ayudamos a completar tu solicitud.'
        : 'Submission is unavailable right now. Contact us and we will help you complete your application.';
    case 'validation':
      return es
        ? 'Algunos datos no pasaron la validación. Revisa la información e inténtalo de nuevo.'
        : 'Some of your details did not pass validation. Please review them and try again.';
    case 'rate_limited': {
      const min = failure.retryAfterSeconds
        ? Math.max(1, Math.ceil(failure.retryAfterSeconds / 60))
        : null;
      if (min) {
        return es
          ? `Recibimos demasiadas solicitudes desde aquí. Vuelve a intentarlo en ${min} ${min === 1 ? 'minuto' : 'minutos'}.`
          : `Too many requests from here. Try again in ${min} ${min === 1 ? 'minute' : 'minutes'}.`;
      }
      return es
        ? 'Recibimos demasiadas solicitudes desde aquí. Espera un momento y vuelve a intentarlo.'
        : 'Too many requests from here. Please wait a moment and try again.';
    }
    case 'forbidden':
      return es
        ? 'No pudimos verificar que eres una persona. Vuelve a intentarlo.'
        : 'We could not verify you are human. Please try again.';
    case 'network':
      return es
        ? 'No pudimos conectar con la plataforma. Revisa tu conexión e inténtalo de nuevo.'
        : 'We could not reach the platform. Check your connection and try again.';
    default:
      return es
        ? 'Algo falló al enviar tu solicitud. Inténtalo de nuevo en unos minutos.'
        : 'Something went wrong sending your application. Please try again in a few minutes.';
  }
}

/**
 * Traduce los `campos` de un 422 a las claves planas que usan los formularios
 * de varios pasos (`consentimientos.aceptaTerminos` → `aceptaTerminos`), para
 * poder pintar el error junto al campo que lo causó.
 */
export function aplanarFieldErrors(
  fieldErrors: Record<string, string> | undefined
): Record<string, string> {
  if (!fieldErrors) return {};
  const plano: Record<string, string> = {};
  for (const [ruta, mensaje] of Object.entries(fieldErrors)) {
    const hoja = ruta.includes('.') ? ruta.slice(ruta.lastIndexOf('.') + 1) : ruta;
    if (!plano[hoja]) plano[hoja] = mensaje;
  }
  return plano;
}
