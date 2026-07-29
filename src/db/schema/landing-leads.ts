import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Claves de idempotencia de /api/landing-leads.
 *
 * La landing manda `Idempotency-Key` en cada envío y la reusa al reintentar
 * tras un timeout. Guardamos la referencia que devolvimos la primera vez para
 * poder repetir esa misma respuesta en lugar de crear una segunda solicitud.
 *
 * La clave es PRIMARY KEY: el insert con `onConflictDoNothing` es lo que decide
 * quién gana la carrera entre dos peticiones idénticas simultáneas.
 */
export const landingLeadsIdempotencia = pgTable('landing_leads_idempotencia', {
  clave: text('clave').primaryKey(),
  tipo: text('tipo').notNull(),
  referencia: text('referencia').notNull(),
  creadoEn: timestamp('creado_en').defaultNow().notNull(),
});
