-- LANDING-LEADS — cambios de base para POST /api/landing-leads
--
-- El proyecto nunca ha versionado migraciones: el schema se aplicaba con
-- `npm run db:push`. `drizzle-kit generate` sobre un repo sin historial produce
-- un baseline que recrea las 6 tablas, y eso falla contra una base que ya
-- existe. Así que este es el delta explícito, escrito a mano.
--
-- Es idempotente: se puede correr dos veces sin romper nada.
--
-- Aplicar con:  psql "$DATABASE_URL" -f db/migrations/001_landing_leads.sql
-- Alternativa:  npm run db:push   (compara schema y aplica el mismo delta)

BEGIN;

-- 1. Datos del lead que no tienen columna propia: rango de ingresos e historial
--    crediticio del simulador, y las etiquetas crudas antes de normalizarlas.
ALTER TABLE "solicitudes"
  ADD COLUMN IF NOT EXISTS "metadatos_landing" jsonb;

-- 2. Claves de idempotencia. La landing manda Idempotency-Key y la reusa al
--    reintentar tras un timeout; guardamos la referencia devuelta la primera vez
--    para repetir esa respuesta en lugar de crear una segunda solicitud.
--    La PRIMARY KEY es lo que resuelve la carrera entre envíos simultáneos.
CREATE TABLE IF NOT EXISTS "landing_leads_idempotencia" (
  "clave"      text PRIMARY KEY NOT NULL,
  "tipo"       text NOT NULL,
  "referencia" text NOT NULL,
  "creado_en"  timestamp DEFAULT now() NOT NULL
);

-- 3. Las referencias se consultan por valor cuando un titular llama a soporte.
CREATE INDEX IF NOT EXISTS "landing_leads_idempotencia_referencia_idx"
  ON "landing_leads_idempotencia" ("referencia");

COMMIT;
