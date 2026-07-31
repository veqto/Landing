import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

/**
 * Cliente Drizzle sobre Neon, inicializado de forma perezosa.
 *
 * Antes se construía al importar el módulo, y eso hacía que DATABASE_URL fuera
 * obligatoria en tiempo de build: `next build` importa los route handlers para
 * recolectar datos de página, así que una variable ausente rompía TODO el sitio
 * y no solo el endpoint que la necesita.
 *
 * Con la inicialización diferida, la conexión se resuelve en la primera consulta
 * real. Si falta la variable, falla la petición que intentó escribir — no el
 * despliegue completo.
 */

type ClienteDb = ReturnType<typeof drizzle>;

let instancia: ClienteDb | null = null;

function cliente(): ClienteDb {
  if (!instancia) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL no está configurada: no hay base a la que escribir.');
    }
    instancia = drizzle(neon(url));
  }
  return instancia;
}

export const db = new Proxy({} as ClienteDb, {
  get(_destino, propiedad) {
    const activo = cliente();
    const valor = activo[propiedad as keyof ClienteDb];
    return typeof valor === 'function' ? valor.bind(activo) : valor;
  },
});
