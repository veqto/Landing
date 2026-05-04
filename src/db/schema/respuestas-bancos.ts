import { pgTable, uuid, text, numeric, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { respuestaBancoEnum } from './enums';
import { solicitudes } from './solicitudes';

export const respuestasBancos = pgTable('respuestas_bancos', {
  id: uuid('id').defaultRandom().primaryKey(),
  solicitudId: uuid('solicitud_id').references(() => solicitudes.id).notNull(),
  bancoNombre: text('banco_nombre').notNull(),
  bancoCodigo: text('banco_codigo'),
  respuesta: respuestaBancoEnum('respuesta').default('pendiente').notNull(),
  tasaAprobada: numeric('tasa_aprobada', { precision: 5, scale: 4 }),
  plazoAprobado: integer('plazo_aprobado'),
  montoAprobado: numeric('monto_aprobado', { precision: 15, scale: 2 }),
  cuotaMensualEstimada: numeric('cuota_mensual_estimada', { precision: 15, scale: 2 }),
  porcentajeFinanciacion: numeric('porcentaje_financiacion', { precision: 5, scale: 2 }),
  tipoProducto: text('tipo_producto'),
  documentosRequeridos: jsonb('documentos_requeridos').$type<string[]>(),
  motivoRechazo: text('motivo_rechazo'),
  seguroVidaCosto: numeric('seguro_vida_costo', { precision: 10, scale: 2 }),
  seguroDesempleoCosto: numeric('seguro_desempleo_costo', { precision: 10, scale: 2 }),
  enviadoEn: timestamp('enviado_en').defaultNow().notNull(),
  respondidoEn: timestamp('respondido_en'),
  venceEn: timestamp('vence_en'),
});
