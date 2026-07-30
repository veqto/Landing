-- REFERENCIA — NO APLICAR DESDE ESTE REPO
--
-- DDL que se escribió cuando el endpoint LANDING-LEADS iba a vivir en la
-- landing. La arquitectura cambió: el endpoint lo implementa la PLATAFORMA
-- (app.veqto.ai) y los leads caen en la vista de Leads de operación.
--
-- Este archivo NO se aplica a ninguna base:
--   · La landing no configura DATABASE_URL.
--   · npm run db:push / db:generate / db:seed / db:studio estan BLOQUEADOS.
--
-- Se conserva solo como referencia para quien implemente el endpoint en la
-- plataforma: muestra el modelo de idempotencia (clave -> referencia, con la
-- clave como PRIMARY KEY para resolver envios simultaneos) y el campo jsonb
-- donde caben los datos del lead que no tienen columna propia.
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
