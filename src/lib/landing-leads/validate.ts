/**
 * Validación de los payloads de /api/landing-leads.
 *
 * Escrita a mano a propósito: el proyecto no tiene una librería de esquemas y
 * añadir una por tres formularios no se justifica. Lo que importa del contrato
 * es que un 422 devuelva `campos` con el motivo por campo, y eso lo da el
 * acumulador de abajo.
 */

import type {
  LandingLeadPayload,
  LeadLocale,
  SimuladorLead,
  CreditoLead,
  AliadoLead,
} from './contract';

export type CamposInvalidos = Record<string, string>;

export interface ValidacionOk<T> {
  valido: true;
  datos: T;
}

export interface ValidacionError {
  valido: false;
  campos: CamposInvalidos;
}

export type Validacion<T> = ValidacionOk<T> | ValidacionError;

/** Acumula errores por campo en vez de cortar en el primero. */
class Errores {
  readonly campos: CamposInvalidos = {};

  add(campo: string, motivo: string) {
    if (!this.campos[campo]) this.campos[campo] = motivo;
  }

  get vacio() {
    return Object.keys(this.campos).length === 0;
  }
}

const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function obj(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function texto(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function numero(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function requerido(e: Errores, campo: string, value: unknown, min = 1): string {
  const v = texto(value);
  if (v.length < min) {
    e.add(campo, min > 1 ? `Requerido, mínimo ${min} caracteres` : 'Requerido');
  }
  return v;
}

function correo(e: Errores, campo: string, value: unknown): string {
  const v = texto(value).toLowerCase();
  if (!CORREO_RE.test(v)) e.add(campo, 'Correo electrónico inválido');
  return v;
}

/** Celular colombiano: 10 dígitos empezando en 3. */
function celular(e: Errores, campo: string, value: unknown): string {
  const v = texto(value).replace(/\D/g, '');
  if (!/^3\d{9}$/.test(v)) e.add(campo, 'Celular inválido: 10 dígitos empezando en 3');
  return v;
}

function documento(e: Errores, campo: string, value: unknown): string {
  const v = texto(value).replace(/\D/g, '');
  if (v.length < 6 || v.length > 12) e.add(campo, 'Documento inválido: entre 6 y 12 dígitos');
  return v;
}

function enRango(e: Errores, campo: string, value: unknown, min: number, max: number): number {
  const n = numero(value);
  if (n === null) {
    e.add(campo, 'Debe ser un número');
    return 0;
  }
  if (n < min || n > max) e.add(campo, `Debe estar entre ${min} y ${max}`);
  return n;
}

function unaDe<T extends string>(
  e: Errores,
  campo: string,
  value: unknown,
  opciones: readonly T[]
): T {
  const v = texto(value);
  if (!opciones.includes(v as T)) {
    e.add(campo, `Valor no permitido. Esperado: ${opciones.join(' | ')}`);
  }
  return v as T;
}

/**
 * El consentimiento de la Ley 1581 no se acepta como "truthy": tiene que venir
 * exactamente `true`. Un string "true" o un 1 se rechazan.
 */
function consentimientoObligatorio(e: Errores, campo: string, value: unknown): true {
  if (value !== true) {
    e.add(campo, 'Debe ser exactamente true: sin esta autorización no se puede tratar el dato');
  }
  return true;
}

function locale(value: unknown): LeadLocale {
  return value === 'en' ? 'en' : 'es';
}

/* ──────────────────────────────── simulador ─────────────────────────────── */

function validarSimulador(raw: Record<string, unknown>): Validacion<SimuladorLead> {
  const e = new Errores();

  const datos: SimuladorLead = {
    tipo: 'simulador',
    nombreCompleto: requerido(e, 'nombreCompleto', raw.nombreCompleto, 3),
    cedula: documento(e, 'cedula', raw.cedula),
    celular: celular(e, 'celular', raw.celular),
    correo: correo(e, 'correo', raw.correo),
    tipoVehiculo: requerido(e, 'tipoVehiculo', raw.tipoVehiculo),
    valorVehiculo: enRango(e, 'valorVehiculo', raw.valorVehiculo, 1_000_000, 2_000_000_000),
    cuotaInicialPorcentaje: enRango(e, 'cuotaInicialPorcentaje', raw.cuotaInicialPorcentaje, 0, 90),
    plazoMeses: enRango(e, 'plazoMeses', raw.plazoMeses, 6, 120),
    rangoIngresos: requerido(e, 'rangoIngresos', raw.rangoIngresos),
    tipoEmpleo: unaDe(e, 'tipoEmpleo', raw.tipoEmpleo, ['empleado', 'independiente'] as const),
    historialCrediticio: unaDe(e, 'historialCrediticio', raw.historialCrediticio, ['si', 'no', 'no_se'] as const),
    aceptaTratamientoDatos: consentimientoObligatorio(e, 'aceptaTratamientoDatos', raw.aceptaTratamientoDatos),
    locale: locale(raw.locale),
  };

  return e.vacio ? { valido: true, datos } : { valido: false, campos: e.campos };
}

/* ───────────────────────────────── crédito ──────────────────────────────── */

function validarCredito(raw: Record<string, unknown>): Validacion<CreditoLead> {
  const e = new Errores();
  const vehiculo = obj(raw.vehiculo);
  const personal = obj(raw.personal);
  const residencia = obj(raw.residencia);
  const financiera = obj(raw.financiera);
  const activos = obj(raw.activos);
  const consent = obj(raw.consentimientos);

  const datos: CreditoLead = {
    tipo: 'credito',
    vehiculo: {
      tipoSolicitud: requerido(e, 'vehiculo.tipoSolicitud', vehiculo.tipoSolicitud),
      estadoVehiculo: requerido(e, 'vehiculo.estadoVehiculo', vehiculo.estadoVehiculo),
      tipoVehiculo: texto(vehiculo.tipoVehiculo),
      claseVehiculo: texto(vehiculo.claseVehiculo),
      marca: requerido(e, 'vehiculo.marca', vehiculo.marca),
      linea: texto(vehiculo.linea),
      modelo: texto(vehiculo.modelo),
      valorVehiculo: enRango(e, 'vehiculo.valorVehiculo', vehiculo.valorVehiculo, 1_000_000, 2_000_000_000),
      cuotaInicial: enRango(e, 'vehiculo.cuotaInicial', vehiculo.cuotaInicial, 0, 90),
      plazoDeseado: enRango(e, 'vehiculo.plazoDeseado', vehiculo.plazoDeseado, 6, 120),
      codigoAliado: texto(vehiculo.codigoAliado) || undefined,
    },
    personal: {
      primerNombre: requerido(e, 'personal.primerNombre', personal.primerNombre, 2),
      segundoNombre: texto(personal.segundoNombre) || undefined,
      primerApellido: requerido(e, 'personal.primerApellido', personal.primerApellido, 2),
      segundoApellido: texto(personal.segundoApellido) || undefined,
      tipoDocumento: requerido(e, 'personal.tipoDocumento', personal.tipoDocumento),
      numeroDocumento: documento(e, 'personal.numeroDocumento', personal.numeroDocumento),
      fechaExpedicion: texto(personal.fechaExpedicion) || undefined,
      lugarExpedicion: texto(personal.lugarExpedicion) || undefined,
      fechaNacimiento: texto(personal.fechaNacimiento) || undefined,
      paisNacimiento: texto(personal.paisNacimiento) || undefined,
      departamentoNacimiento: texto(personal.departamentoNacimiento) || undefined,
      ciudadNacimiento: texto(personal.ciudadNacimiento) || undefined,
      genero: texto(personal.genero) || undefined,
      estadoCivil: texto(personal.estadoCivil) || undefined,
      numeroHijos: numero(personal.numeroHijos) ?? undefined,
      personasCargo: numero(personal.personasCargo) ?? undefined,
      nivelEstudios: texto(personal.nivelEstudios) || undefined,
      profesion: texto(personal.profesion) || undefined,
    },
    residencia: {
      direccionResidencia: requerido(e, 'residencia.direccionResidencia', residencia.direccionResidencia, 5),
      departamentoResidencia: requerido(e, 'residencia.departamentoResidencia', residencia.departamentoResidencia),
      ciudadResidencia: requerido(e, 'residencia.ciudadResidencia', residencia.ciudadResidencia),
      barrio: texto(residencia.barrio) || undefined,
      estrato: numero(residencia.estrato) ?? undefined,
      tiempoResidencia: texto(residencia.tiempoResidencia) || undefined,
      celular: celular(e, 'residencia.celular', residencia.celular),
      telefonoResidencia: texto(residencia.telefonoResidencia) || undefined,
      correoElectronico: correo(e, 'residencia.correoElectronico', residencia.correoElectronico),
      tipoVivienda: texto(residencia.tipoVivienda) || undefined,
    },
    financiera: {
      actividadEconomica: requerido(e, 'financiera.actividadEconomica', financiera.actividadEconomica),
      inicioActividad: texto(financiera.inicioActividad) || undefined,
      cargo: texto(financiera.cargo) || undefined,
      tipoContrato: texto(financiera.tipoContrato) || undefined,
      nombreEmpresa: texto(financiera.nombreEmpresa) || undefined,
      telefonoEmpresa: texto(financiera.telefonoEmpresa) || undefined,
      direccionEmpresa: texto(financiera.direccionEmpresa) || undefined,
      ciudadEmpresa: texto(financiera.ciudadEmpresa) || undefined,
      salarioFijo: numero(financiera.salarioFijo) ?? undefined,
      ingresosVariable: numero(financiera.ingresosVariable) ?? undefined,
      pension: numero(financiera.pension) ?? undefined,
      honorarios: numero(financiera.honorarios) ?? undefined,
      arrendamientos: numero(financiera.arrendamientos) ?? undefined,
      otrosIngresos: numero(financiera.otrosIngresos) ?? undefined,
      gastoArriendo: numero(financiera.gastoArriendo) ?? undefined,
      gastosFamiliares: numero(financiera.gastosFamiliares) ?? undefined,
      cuotasTarjetas: numero(financiera.cuotasTarjetas) ?? undefined,
      otrosCreditos: numero(financiera.otrosCreditos) ?? undefined,
      otrosEgresos: numero(financiera.otrosEgresos) ?? undefined,
    },
    activos: {
      inmuebles: Array.isArray(activos.inmuebles) ? (activos.inmuebles as CreditoLead['activos']['inmuebles']) : undefined,
      vehiculos: Array.isArray(activos.vehiculos) ? (activos.vehiculos as CreditoLead['activos']['vehiculos']) : undefined,
      referencias: Array.isArray(activos.referencias) ? (activos.referencias as CreditoLead['activos']['referencias']) : undefined,
      declaraRenta: activos.declaraRenta === true,
      esPEP: activos.esPEP === true,
      manejaRecursosPublicos: activos.manejaRecursosPublicos === true,
      tienePoderPublico: activos.tienePoderPublico === true,
      origenFondos: Array.isArray(activos.origenFondos) ? (activos.origenFondos as string[]) : undefined,
      origenCliente: texto(activos.origenCliente) || undefined,
    },
    consentimientos: {
      aceptaTratamientoDatos: consentimientoObligatorio(e, 'consentimientos.aceptaTratamientoDatos', consent.aceptaTratamientoDatos),
      autorizaCentrales: consent.autorizaCentrales === true,
      autorizaContacto: consent.autorizaContacto === true,
      autorizaComercial: consent.autorizaComercial === true,
      aceptaTerminos: consent.aceptaTerminos === true,
      declaraVeracidad: consent.declaraVeracidad === true,
      autorizaFirmaElectronica: consent.autorizaFirmaElectronica === true,
      firmaDigital: texto(consent.firmaDigital) || undefined,
      ciudadSolicitud: texto(consent.ciudadSolicitud) || undefined,
    },
    locale: locale(raw.locale),
  };

  // Obligatorios legales del formulario largo, más allá del de Ley 1581.
  if (!datos.consentimientos.autorizaCentrales) {
    e.add('consentimientos.autorizaCentrales', 'Requerido para consultar centrales de riesgo (Ley 1266 de 2008)');
  }
  if (!datos.consentimientos.aceptaTerminos) {
    e.add('consentimientos.aceptaTerminos', 'Requerido');
  }
  if (!datos.consentimientos.declaraVeracidad) {
    e.add('consentimientos.declaraVeracidad', 'Requerido');
  }
  if (!datos.consentimientos.autorizaFirmaElectronica) {
    e.add('consentimientos.autorizaFirmaElectronica', 'Requerido (Ley 527 de 1999)');
  }

  return e.vacio ? { valido: true, datos } : { valido: false, campos: e.campos };
}

/* ────────────────────────────────── aliado ──────────────────────────────── */

function validarAliado(raw: Record<string, unknown>): Validacion<AliadoLead> {
  const e = new Errores();
  const negocio = obj(raw.negocio);
  const contacto = obj(raw.contacto);
  const consent = obj(raw.consentimientos);

  const datos: AliadoLead = {
    tipo: 'aliado',
    negocio: {
      nombreEstablecimiento: requerido(e, 'negocio.nombreEstablecimiento', negocio.nombreEstablecimiento, 3),
      nit: requerido(e, 'negocio.nit', negocio.nit, 5),
      tipoNegocio: requerido(e, 'negocio.tipoNegocio', negocio.tipoNegocio),
      departamento: requerido(e, 'negocio.departamento', negocio.departamento),
      ciudad: requerido(e, 'negocio.ciudad', negocio.ciudad),
      direccion: requerido(e, 'negocio.direccion', negocio.direccion, 5),
      anosFuncionamiento: texto(negocio.anosFuncionamiento) || undefined,
      marcasVehiculos: texto(negocio.marcasVehiculos) || undefined,
    },
    contacto: {
      nombreContacto: requerido(e, 'contacto.nombreContacto', contacto.nombreContacto, 3),
      cargo: texto(contacto.cargo) || undefined,
      celular: celular(e, 'contacto.celular', contacto.celular),
      correo: correo(e, 'contacto.correo', contacto.correo),
      telefonoFijo: texto(contacto.telefonoFijo) || undefined,
      referidoPor: texto(contacto.referidoPor) || undefined,
      comoNosConocio: texto(contacto.comoNosConocio) || undefined,
    },
    consentimientos: {
      aceptaTratamientoDatos: consentimientoObligatorio(e, 'consentimientos.aceptaTratamientoDatos', consent.aceptaTratamientoDatos),
      aceptaTerminos: consent.aceptaTerminos === true,
      autorizaContacto: consent.autorizaContacto === true,
      autorizaComercial: consent.autorizaComercial === true,
    },
    locale: locale(raw.locale),
  };

  if (!datos.consentimientos.aceptaTerminos) {
    e.add('consentimientos.aceptaTerminos', 'Requerido');
  }

  return e.vacio ? { valido: true, datos } : { valido: false, campos: e.campos };
}

/* ─────────────────────────────── entrada única ──────────────────────────── */

export function validarLead(body: unknown): Validacion<LandingLeadPayload> {
  const raw = obj(body);

  switch (raw.tipo) {
    case 'simulador':
      return validarSimulador(raw);
    case 'credito':
      return validarCredito(raw);
    case 'aliado':
      return validarAliado(raw);
    default:
      return {
        valido: false,
        campos: { tipo: 'Requerido. Esperado: simulador | credito | aliado' },
      };
  }
}

/** El token de captcha se lee aparte: no forma parte de los datos que se guardan. */
export function leerCaptchaToken(body: unknown): string {
  return texto(obj(body).captchaToken);
}
