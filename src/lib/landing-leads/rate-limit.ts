/**
 * Límite de tasa por IP para /api/landing-leads.
 *
 * ⚠️ LIMITACIÓN CONOCIDA: el contador vive en memoria del proceso. En serverless
 * cada instancia tiene el suyo y se reinicia en frío, así que el límite real es
 * "N por ventana por instancia", no global. Frena el abuso torpe y los
 * doble-clics, no un atacante distribuido.
 *
 * Para un límite de verdad hace falta un almacén compartido (Upstash Redis o una
 * tabla en Neon). Se dejó fuera de este PR porque añade infraestructura y una
 * decisión de coste que no me corresponde tomar. El 429 del contrato ya está
 * definido, así que cambiar la implementación no toca a la landing.
 */

const VENTANA_MS = 10 * 60 * 1000; // 10 minutos
const MAX_POR_VENTANA = 5;
/** Cota de memoria: si se supera, se purga lo vencido antes de seguir. */
const MAX_ENTRADAS = 10_000;

const intentos = new Map<string, number[]>();

export interface LimiteResultado {
  permitido: boolean;
  reintentarEnSegundos: number;
}

function purgar(ahora: number) {
  for (const [clave, marcas] of intentos) {
    const vigentes = marcas.filter((m) => ahora - m < VENTANA_MS);
    if (vigentes.length === 0) intentos.delete(clave);
    else intentos.set(clave, vigentes);
  }
}

export function consumirIntento(clave: string, ahora = Date.now()): LimiteResultado {
  if (intentos.size > MAX_ENTRADAS) purgar(ahora);

  const previos = (intentos.get(clave) ?? []).filter((m) => ahora - m < VENTANA_MS);

  if (previos.length >= MAX_POR_VENTANA) {
    const masAntiguo = previos[0];
    const esperaMs = VENTANA_MS - (ahora - masAntiguo);
    intentos.set(clave, previos);
    return {
      permitido: false,
      reintentarEnSegundos: Math.max(1, Math.ceil(esperaMs / 1000)),
    };
  }

  previos.push(ahora);
  intentos.set(clave, previos);
  return { permitido: true, reintentarEnSegundos: 0 };
}

/** Solo para pruebas: deja el contador limpio. */
export function reiniciarLimite() {
  intentos.clear();
}
