/**
 * Generación de referencias visibles para el titular.
 *
 * `VEQ-2026-XXXXXX` para solicitudes de crédito, `ALD-2026-XXXXXX` para aliados.
 * El alfabeto excluye 0/O/1/I/L para que la referencia se pueda dictar por
 * teléfono sin ambigüedad — es lo que el usuario va a leerle a un asesor.
 *
 * Las columnas `numero_referencia` y `codigo_aliado` son UNIQUE en la base: la
 * unicidad real la garantiza Postgres, y el endpoint reintenta si choca.
 */

const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const LARGO = 6;

function sufijo(): string {
  const bytes = new Uint8Array(LARGO);
  crypto.getRandomValues(bytes);
  let salida = '';
  for (const byte of bytes) {
    salida += ALFABETO[byte % ALFABETO.length];
  }
  return salida;
}

export function referenciaCredito(anio = new Date().getFullYear()): string {
  return `VEQ-${anio}-${sufijo()}`;
}

export function codigoAliado(anio = new Date().getFullYear()): string {
  return `ALD-${anio}-${sufijo()}`;
}
