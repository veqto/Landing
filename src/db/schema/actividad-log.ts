import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const actividadLog = pgTable('actividad_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  entidadTipo: text('entidad_tipo').notNull(),
  entidadId: uuid('entidad_id').notNull(),
  accion: text('accion').notNull(),
  estadoAnterior: text('estado_anterior'),
  estadoNuevo: text('estado_nuevo'),
  detalles: jsonb('detalles'),
  realizadoPor: text('realizado_por'),
  ipOrigen: text('ip_origen'),
  creadoEn: timestamp('creado_en').defaultNow().notNull(),
});
