import { pgEnum } from 'drizzle-orm/pg-core';

export const tipoDocumentoEnum = pgEnum('tipo_documento', ['CC', 'CE', 'PPT', 'PEP', 'TI', 'RC', 'CD']);
export const tipoSolicitudEnum = pgEnum('tipo_solicitud', ['credito_vehiculo', 'prenda_garantia', 'compra_cartera', 'credito_moto', 'leasing_vehiculo']);
export const estadoVehiculoEnum = pgEnum('estado_vehiculo', ['nuevo', 'usado']);
export const tipoServicioEnum = pgEnum('tipo_servicio', ['particular', 'publico']);
export const claseVehiculoEnum = pgEnum('clase_vehiculo', ['automovil', 'camioneta', 'campero', 'pickup', 'van', 'bus', 'buseta', 'microbus', 'camion', 'tractocamion', 'moto', 'cuatrimoto', 'otro']);
export const estadoCivilEnum = pgEnum('estado_civil', ['soltero', 'casado', 'union_libre', 'separado', 'divorciado', 'viudo']);
export const actividadEconomicaEnum = pgEnum('actividad_economica', ['empleado', 'independiente', 'pensionado', 'rentista_capital', 'socio_empresa', 'transportador', 'ganadero', 'estudiante', 'hogar', 'otro']);
export const tipoContratoEnum = pgEnum('tipo_contrato', ['fijo', 'indefinido', 'prestacion_servicios', 'labor_contratada', 'otro']);
export const tipoViviendaEnum = pgEnum('tipo_vivienda', ['propia', 'familiar', 'arrendada', 'propia_hipoteca']);
export const nivelEstudiosEnum = pgEnum('nivel_estudios', ['primaria', 'secundaria', 'tecnico', 'profesional', 'especializacion', 'maestria', 'doctorado']);
export const estadoSolicitudEnum = pgEnum('estado_solicitud', ['borrador', 'enviada', 'en_scoring', 'enrutada', 'en_evaluacion', 'preaprobada', 'aprobada', 'documentacion', 'notificada', 'en_desembolso', 'desembolsada', 'seguro_activo', 'comision_pagada', 'rechazada', 'desistida', 'expirada']);
export const estadoAliadoEnum = pgEnum('estado_aliado', ['pendiente', 'en_revision', 'aprobado', 'activo', 'suspendido', 'inactivo', 'rechazado']);
export const tipoNegocioEnum = pgEnum('tipo_negocio', ['compraventa', 'concesionario', 'vitrina', 'lote_carros', 'asesor_independiente', 'taller', 'aseguradora', 'otro']);
export const origenClienteEnum = pgEnum('origen_cliente', ['pagina_web', 'referido', 'aliado_comercial', 'redes_sociales', 'google', 'publicidad', 'evento', 'ejecutivo_veqto', 'otro']);
export const generoEnum = pgEnum('genero', ['M', 'F', 'otro']);
export const estratoEnum = pgEnum('estrato', ['1', '2', '3', '4', '5', '6']);
export const respuestaBancoEnum = pgEnum('respuesta_banco', ['pendiente', 'preaprobado', 'aprobado', 'rechazado', 'requiere_documentos', 'expirado']);
