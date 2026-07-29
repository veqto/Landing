/**
 * Mapeo de los payloads del contrato a las tablas existentes.
 *
 * Reglas que se siguen en todo el archivo:
 * - Los enums de Postgres se validan contra `enumValues` de Drizzle. Un valor
 *   que no pertenece al enum entra como NULL y el original se conserva en
 *   `metadatosLanding`, para no perder lo que el usuario escribió ni romper el
 *   insert por un label nuevo del front.
 * - Las columnas `numeric` de Drizzle reciben string, no number.
 */

import {
  solicitudes,
  aliados,
  tipoDocumentoEnum,
  tipoSolicitudEnum,
  estadoVehiculoEnum,
  claseVehiculoEnum,
  generoEnum,
  estadoCivilEnum,
  nivelEstudiosEnum,
  actividadEconomicaEnum,
  tipoContratoEnum,
  tipoViviendaEnum,
  estratoEnum,
  origenClienteEnum,
  tipoNegocioEnum,
} from '@/db/schema';
import type { SimuladorLead, CreditoLead, AliadoLead } from './contract';

type SolicitudInsert = typeof solicitudes.$inferInsert;
type AliadoInsert = typeof aliados.$inferInsert;

export interface ContextoPeticion {
  ip: string | null;
  userAgent: string | null;
}

/** Devuelve el valor solo si pertenece al enum; si no, NULL. */
function enumOrNull<T extends string>(
  pgEnum: { enumValues: readonly T[] },
  valor: string | number | undefined | null
): T | null {
  if (valor === undefined || valor === null) return null;
  const v = String(valor).trim();
  return (pgEnum.enumValues as readonly string[]).includes(v) ? (v as T) : null;
}

/** Las columnas numeric de Drizzle esperan string. */
function num(valor: number | undefined | null): string | null {
  return valor === undefined || valor === null || !Number.isFinite(valor)
    ? null
    : String(valor);
}

function suma(...valores: Array<number | undefined>): number {
  return valores.reduce<number>((total, v) => total + (v ?? 0), 0);
}

/**
 * El simulador manda una etiqueta visible ("Carro usado", "Motorcycle").
 * Se traduce a los enums; lo que no encaje queda como NULL + raw en metadatos.
 */
function normalizarVehiculoSimulador(etiqueta: string): {
  estadoVehiculo: 'nuevo' | 'usado' | null;
  claseVehiculo: 'automovil' | 'moto' | 'otro' | null;
  esMoto: boolean;
} {
  const e = etiqueta.toLowerCase();
  const esMoto = e.includes('moto') || e.includes('motorcycle');
  const esNuevo = e.includes('nuevo') || e.includes('new');
  const esUsado = e.includes('usado') || e.includes('used');
  const esComercial = e.includes('comercial');

  return {
    estadoVehiculo: esNuevo ? 'nuevo' : esUsado ? 'usado' : null,
    claseVehiculo: esMoto ? 'moto' : esComercial ? 'otro' : /carro|car/.test(e) ? 'automovil' : null,
    esMoto,
  };
}

/**
 * Parte el nombre completo del lead corto. El simulador pide un solo campo, y
 * la tabla guarda nombre y apellido por separado: primer token como nombre, el
 * resto como apellido. El original se conserva íntegro en `metadatosLanding`
 * porque esta división es una heurística, no un dato verificado.
 */
function partirNombre(completo: string): { primerNombre: string; primerApellido: string } {
  const partes = completo.trim().split(/\s+/);
  if (partes.length === 1) return { primerNombre: partes[0], primerApellido: '' };
  return {
    primerNombre: partes[0],
    primerApellido: partes.slice(1).join(' '),
  };
}

export function filaSimulador(
  lead: SimuladorLead,
  referencia: string,
  ctx: ContextoPeticion
): SolicitudInsert {
  const { estadoVehiculo, claseVehiculo, esMoto } = normalizarVehiculoSimulador(lead.tipoVehiculo);
  const { primerNombre, primerApellido } = partirNombre(lead.nombreCompleto);
  const cuotaInicial = (lead.valorVehiculo * lead.cuotaInicialPorcentaje) / 100;

  return {
    numeroReferencia: referencia,
    tipoSolicitud: esMoto ? 'credito_moto' : 'credito_vehiculo',
    estado: 'enviada',
    pasoActual: 1,
    estadoVehiculo,
    claseVehiculo,
    valorVehiculo: num(lead.valorVehiculo),
    cuotaInicial: num(cuotaInicial),
    porcentajeCuotaInicial: num(lead.cuotaInicialPorcentaje),
    valorFinanciar: num(lead.valorVehiculo - cuotaInicial),
    plazoMeses: lead.plazoMeses,
    primerNombre,
    primerApellido,
    // El simulador no pregunta el tipo de documento: pide "cédula".
    tipoDocumento: 'CC',
    numeroDocumento: lead.cedula,
    celular: lead.celular,
    correoElectronico: lead.correo,
    actividadEconomica: enumOrNull(actividadEconomicaEnum, lead.tipoEmpleo),
    autorizaTratamientoDatos: true,
    origenCliente: 'pagina_web',
    metadatosLanding: {
      origen: 'landing-simulador',
      nombreCompleto: lead.nombreCompleto,
      rangoIngresos: lead.rangoIngresos,
      historialCrediticio: lead.historialCrediticio,
      tipoVehiculoEtiqueta: lead.tipoVehiculo,
      localeConsentimiento: lead.locale,
    },
    ipSolicitud: ctx.ip,
    userAgent: ctx.userAgent,
    enviadoEn: new Date(),
  };
}

export function filaCredito(
  lead: CreditoLead,
  referencia: string,
  ctx: ContextoPeticion
): SolicitudInsert {
  const { vehiculo, personal, residencia, financiera, activos, consentimientos } = lead;
  const cuotaInicial = (vehiculo.valorVehiculo * vehiculo.cuotaInicial) / 100;

  const totalIngresos = suma(
    financiera.salarioFijo,
    financiera.ingresosVariable,
    financiera.pension,
    financiera.honorarios,
    financiera.arrendamientos,
    financiera.otrosIngresos
  );
  const totalEgresos = suma(
    financiera.gastoArriendo,
    financiera.gastosFamiliares,
    financiera.cuotasTarjetas,
    financiera.otrosCreditos,
    financiera.otrosEgresos
  );

  return {
    numeroReferencia: referencia,
    tipoSolicitud: enumOrNull(tipoSolicitudEnum, vehiculo.tipoSolicitud) ?? 'credito_vehiculo',
    estado: 'enviada',
    pasoActual: 6,
    codigoAliado: vehiculo.codigoAliado ?? null,
    estadoVehiculo: enumOrNull(estadoVehiculoEnum, vehiculo.estadoVehiculo),
    claseVehiculo: enumOrNull(claseVehiculoEnum, vehiculo.claseVehiculo),
    marca: vehiculo.marca,
    linea: vehiculo.linea,
    modelo: Number.isFinite(Number(vehiculo.modelo)) ? Number(vehiculo.modelo) : null,
    valorVehiculo: num(vehiculo.valorVehiculo),
    cuotaInicial: num(cuotaInicial),
    porcentajeCuotaInicial: num(vehiculo.cuotaInicial),
    valorFinanciar: num(vehiculo.valorVehiculo - cuotaInicial),
    plazoMeses: vehiculo.plazoDeseado,

    primerNombre: personal.primerNombre,
    segundoNombre: personal.segundoNombre ?? null,
    primerApellido: personal.primerApellido,
    segundoApellido: personal.segundoApellido ?? null,
    tipoDocumento: enumOrNull(tipoDocumentoEnum, personal.tipoDocumento),
    numeroDocumento: personal.numeroDocumento,
    fechaExpedicion: personal.fechaExpedicion ?? null,
    lugarExpedicion: personal.lugarExpedicion ?? null,
    fechaNacimiento: personal.fechaNacimiento ?? null,
    paisNacimiento: personal.paisNacimiento ?? 'Colombia',
    departamentoNacimiento: personal.departamentoNacimiento ?? null,
    ciudadNacimiento: personal.ciudadNacimiento ?? null,
    genero: enumOrNull(generoEnum, personal.genero),
    estadoCivil: enumOrNull(estadoCivilEnum, personal.estadoCivil),
    numeroHijos: personal.numeroHijos ?? null,
    personasCargo: personal.personasCargo ?? null,
    nivelEstudios: enumOrNull(nivelEstudiosEnum, personal.nivelEstudios),
    profesion: personal.profesion ?? null,

    direccionResidencia: residencia.direccionResidencia,
    departamento: residencia.departamentoResidencia,
    ciudad: residencia.ciudadResidencia,
    barrio: residencia.barrio ?? null,
    estrato: enumOrNull(estratoEnum, residencia.estrato),
    tiempoResidencia: residencia.tiempoResidencia ?? null,
    celular: residencia.celular,
    telefonoResidencia: residencia.telefonoResidencia ?? null,
    correoElectronico: residencia.correoElectronico,
    tipoVivienda: enumOrNull(tipoViviendaEnum, residencia.tipoVivienda),

    actividadEconomica: enumOrNull(actividadEconomicaEnum, financiera.actividadEconomica),
    inicioActividad: financiera.inicioActividad ?? null,
    cargo: financiera.cargo ?? null,
    tipoContrato: enumOrNull(tipoContratoEnum, financiera.tipoContrato),
    nombreEmpresa: financiera.nombreEmpresa ?? null,
    telefonoOficina: financiera.telefonoEmpresa ?? null,
    direccionOficina: financiera.direccionEmpresa ?? null,
    ciudadOficina: financiera.ciudadEmpresa ?? null,
    salarioFijo: num(financiera.salarioFijo),
    salarioVariable: num(financiera.ingresosVariable),
    pension: num(financiera.pension),
    honorarios: num(financiera.honorarios),
    arrendamientos: num(financiera.arrendamientos),
    otrosIngresos: num(financiera.otrosIngresos),
    totalIngresos: num(totalIngresos),
    pagoArriendo: num(financiera.gastoArriendo),
    gastosFamiliares: num(financiera.gastosFamiliares),
    tarjetasCredito: num(financiera.cuotasTarjetas),
    pagoPrestamos: num(financiera.otrosCreditos),
    otrosEgresos: num(financiera.otrosEgresos),
    totalEgresos: num(totalEgresos),

    inmuebles: activos.inmuebles?.map((i) => ({
      tipo: i.tipo,
      direccion: i.ciudad,
      valorComercial: i.valor,
    })) ?? null,
    vehiculosActuales: activos.vehiculos?.map((v) => ({
      marca: v.marca,
      linea: '',
      modelo: Number(v.modelo) || 0,
      placa: '',
    })) ?? null,
    referencias: activos.referencias?.map((r) => ({
      tipo: 'personal' as const,
      nombre: r.nombre,
      parentesco: r.parentesco,
      ciudad: r.ciudad,
      telefono: r.telefono,
    })) ?? null,
    declaraRenta: activos.declaraRenta ?? false,
    manejaRecursosPublicos: activos.manejaRecursosPublicos ?? false,
    esPEP: activos.esPEP ?? false,
    origenFondos: activos.origenFondos ?? null,
    origenCliente: enumOrNull(origenClienteEnum, activos.origenCliente) ?? 'pagina_web',

    autorizaTratamientoDatos: true,
    autorizaCentralesRiesgo: consentimientos.autorizaCentrales,
    autorizaContactoComercial: consentimientos.autorizaComercial ?? false,
    aceptaTerminos: consentimientos.aceptaTerminos,
    declaraOrigenLicito: consentimientos.declaraVeracidad,
    firmaDigital: consentimientos.firmaDigital ?? null,

    metadatosLanding: {
      origen: 'landing-solicitud-credito',
      localeConsentimiento: lead.locale,
      ciudadSolicitud: consentimientos.ciudadSolicitud ?? null,
      autorizaFirmaElectronica: consentimientos.autorizaFirmaElectronica,
      autorizaContacto: consentimientos.autorizaContacto ?? false,
      tienePoderPublico: activos.tienePoderPublico ?? false,
      tipoVehiculoEtiqueta: vehiculo.tipoVehiculo,
    },
    ipSolicitud: ctx.ip,
    userAgent: ctx.userAgent,
    enviadoEn: new Date(),
  };
}

export function filaAliado(
  lead: AliadoLead,
  codigo: string,
  ctx: ContextoPeticion
): AliadoInsert {
  const { negocio, contacto, consentimientos } = lead;

  return {
    codigoAliado: codigo,
    nombreEstablecimiento: negocio.nombreEstablecimiento,
    // notNull en la tabla: si el label no está en el enum entra como 'otro'.
    tipoNegocio: enumOrNull(tipoNegocioEnum, negocio.tipoNegocio) ?? 'otro',
    nitRepLegal: negocio.nit,
    departamento: negocio.departamento,
    ciudad: negocio.ciudad,
    direccion: negocio.direccion,
    telefonoEstablecimiento: contacto.telefonoFijo ?? null,
    tipoVehiculosPrincipales: negocio.marcasVehiculos ?? null,
    tiempoOperacion: negocio.anosFuncionamiento ?? null,
    nombreContacto: contacto.nombreContacto,
    cargoContacto: contacto.cargo ?? null,
    celularContacto: contacto.celular,
    correoContacto: contacto.correo,
    estado: 'pendiente',
    autorizaTratamientoDatos: true,
    aceptaTerminos: consentimientos.aceptaTerminos,
    origenRegistro: enumOrNull(origenClienteEnum, contacto.comoNosConocio) ?? 'pagina_web',
    nombreReferido: contacto.referidoPor ?? null,
    ipRegistro: ctx.ip,
  };
}
