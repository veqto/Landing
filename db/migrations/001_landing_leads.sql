-- ############################################################
-- ##  NO APLICAR  ############################################
-- ############################################################
--
-- El endpoint definitivo de landing-leads vive en la PLATAFORMA
-- (app.veqto.ai). Los leads caen en la vista de Leads real que usa operacion.
-- Esta landing NO almacena leads y NO tiene base de datos propia.
--
-- Este archivo se conserva SOLO como referencia historica. NO se aplica a
-- ninguna base, ni de desarrollo, ni de staging, ni de produccion:
--
--   * DATABASE_URL no se configura en el Vercel de la landing.
--   * npm run db:push / db:generate / db:seed / db:studio estan BLOQUEADOS
--     a proposito en package.json.
--
-- Se deja porque documenta dos decisiones utiles para quien implemente el
-- endpoint en la plataforma:
--
--   1. El modelo de idempotencia: clave -> referencia, con la clave como
--      PRIMARY KEY. Es la PK la que resuelve dos envios simultaneos con la
--      misma Idempotency-Key; un "comprobar y luego insertar" crearia dos
--      solicitudes del mismo titular.
--   2. El campo jsonb donde caben los datos del lead que no tienen columna
--      propia (rango de ingresos, historial crediticio, etiquetas crudas).
--
-- Contrato completo: docs/CONTRATO-LANDING-LEADS.md

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
