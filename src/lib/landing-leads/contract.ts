/**
 * CONTRATO LANDING-LEADS — fuente única de verdad.
 *
 * El endpoint definitivo lo implementa la PLATAFORMA (app.veqto.ai): los leads
 * deben caer en la vista de Leads que usa operación. Este archivo es la
 * especificación ejecutable de ese contrato.
 *
 * Lo consumen los dos lados de este repo: el cliente
 * (`src/lib/landing-leads/client.ts`) y el mock de desarrollo
 * (`src/app/api/landing-leads/route.ts`). Si un campo cambia aquí, TypeScript
 * rompe el lado que quede desalineado — por eso no hay un documento aparte que
 * se pueda quedar viejo.
 *
 * Endpoint: POST {NEXT_PUBLIC_LANDING_LEADS_BASE_URL}/api/landing-leads
 * Versión legible del contrato: docs/CONTRATO-LANDING-LEADS.md
 */

export const LANDING_LEADS_PATH = '/api/landing-leads';

/** Discriminador: los tres formularios de la landing entran por la misma ruta. */
export type LeadTipo = 'simulador' | 'credito' | 'aliado';

/** Idioma en que el titular leyó y aceptó las autorizaciones. */
export type LeadLocale = 'es' | 'en';

/* ─────────────────────────── tipo: 'simulador' ─────────────────────────── */

/** Lead corto del modal del simulador. */
export interface SimuladorLead {
  tipo: 'simulador';
  nombreCompleto: string;
  cedula: string;
  celular: string;
  correo: string;
  /** Etiqueta tal como la ve el usuario; el servidor la normaliza. */
  tipoVehiculo: string;
  valorVehiculo: number;
  cuotaInicialPorcentaje: number;
  plazoMeses: number;
  rangoIngresos: string;
  tipoEmpleo: 'empleado' | 'independiente';
  historialCrediticio: 'si' | 'no' | 'no_se';
  /** Ley 1581 de 2012. Obligatorio y debe ser exactamente `true`. */
  aceptaTratamientoDatos: true;
  locale: LeadLocale;
  /** Token de Cloudflare Turnstile. Obligatorio solo si el captcha está activo. */
  captchaToken?: string;
}

/* ──────────────────────────── tipo: 'credito' ──────────────────────────── */

/**
 * Solicitud completa de /solicitud-credito. Acepta los seis pasos tal como los
 * produce el formulario, para que el cliente no tenga que remapear nada.
 */
export interface CreditoLead {
  tipo: 'credito';
  vehiculo: {
    tipoSolicitud: string;
    estadoVehiculo: string;
    tipoVehiculo: string;
    claseVehiculo: string;
    marca: string;
    linea: string;
    modelo: string;
    valorVehiculo: number;
    cuotaInicial: number;
    plazoDeseado: number;
    codigoAliado?: string;
  };
  personal: {
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    tipoDocumento: string;
    numeroDocumento: string;
    fechaExpedicion?: string;
    lugarExpedicion?: string;
    fechaNacimiento?: string;
    paisNacimiento?: string;
    departamentoNacimiento?: string;
    ciudadNacimiento?: string;
    genero?: string;
    estadoCivil?: string;
    numeroHijos?: number;
    personasCargo?: number;
    nivelEstudios?: string;
    profesion?: string;
  };
  residencia: {
    direccionResidencia: string;
    departamentoResidencia: string;
    ciudadResidencia: string;
    barrio?: string;
    estrato?: number;
    tiempoResidencia?: string;
    celular: string;
    telefonoResidencia?: string;
    correoElectronico: string;
    tipoVivienda?: string;
  };
  financiera: {
    actividadEconomica: string;
    inicioActividad?: string;
    cargo?: string;
    tipoContrato?: string;
    nombreEmpresa?: string;
    telefonoEmpresa?: string;
    direccionEmpresa?: string;
    ciudadEmpresa?: string;
    salarioFijo?: number;
    ingresosVariable?: number;
    pension?: number;
    honorarios?: number;
    arrendamientos?: number;
    otrosIngresos?: number;
    gastoArriendo?: number;
    gastosFamiliares?: number;
    cuotasTarjetas?: number;
    otrosCreditos?: number;
    otrosEgresos?: number;
  };
  activos: {
    inmuebles?: Array<{ tipo: string; valor: number; ciudad: string }>;
    vehiculos?: Array<{ marca: string; modelo: string; valorComercial: number }>;
    referencias?: Array<{ nombre: string; parentesco: string; telefono: string; ciudad: string }>;
    declaraRenta?: boolean;
    esPEP?: boolean;
    manejaRecursosPublicos?: boolean;
    tienePoderPublico?: boolean;
    origenFondos?: string[];
    origenCliente?: string;
  };
  consentimientos: {
    /** Ley 1581 de 2012. Obligatorio y debe ser exactamente `true`. */
    aceptaTratamientoDatos: true;
    autorizaCentrales: boolean;
    autorizaContacto?: boolean;
    autorizaComercial?: boolean;
    aceptaTerminos: boolean;
    declaraVeracidad: boolean;
    autorizaFirmaElectronica: boolean;
    firmaDigital?: string;
    ciudadSolicitud?: string;
  };
  locale: LeadLocale;
  captchaToken?: string;
}

/* ───────────────────────────── tipo: 'aliado' ──────────────────────────── */

/** Registro de aliado comercial de /solicitud-aliado. */
export interface AliadoLead {
  tipo: 'aliado';
  negocio: {
    nombreEstablecimiento: string;
    nit: string;
    tipoNegocio: string;
    departamento: string;
    ciudad: string;
    direccion: string;
    anosFuncionamiento?: string;
    marcasVehiculos?: string;
  };
  contacto: {
    nombreContacto: string;
    cargo?: string;
    celular: string;
    correo: string;
    telefonoFijo?: string;
    referidoPor?: string;
    comoNosConocio?: string;
  };
  consentimientos: {
    /** Ley 1581 de 2012. Obligatorio y debe ser exactamente `true`. */
    aceptaTratamientoDatos: true;
    aceptaTerminos: boolean;
    autorizaContacto?: boolean;
    autorizaComercial?: boolean;
  };
  locale: LeadLocale;
  captchaToken?: string;
}

export type LandingLeadPayload = SimuladorLead | CreditoLead | AliadoLead;

/* ────────────────────────────── respuestas ─────────────────────────────── */

/** 201 Created. La referencia SIEMPRE viene en `referencia`. */
export interface LandingLeadOk {
  ok: true;
  tipo: LeadTipo;
  /** `VEQ-2026-XXXXXX` para créditos, `ALD-2026-XXXXXX` para aliados. */
  referencia: string;
  recibidoEn: string;
  /** `true` si esta respuesta es el replay de un envío previo con la misma clave. */
  duplicado: boolean;
}

export type LandingLeadErrorCodigo =
  | 'CUERPO_INVALIDO'
  | 'VALIDACION'
  | 'CAPTCHA_INVALIDO'
  | 'ORIGEN_NO_PERMITIDO'
  | 'LIMITE_TASA'
  | 'ERROR_INTERNO';

export interface LandingLeadError {
  ok: false;
  error: {
    codigo: LandingLeadErrorCodigo;
    mensaje: string;
    /** Solo en 422: `{ nombreCampo: motivo }`. */
    campos?: Record<string, string>;
    /** Solo en 429. */
    reintentarEnSegundos?: number;
  };
}

export type LandingLeadResponse = LandingLeadOk | LandingLeadError;

/** Cabecera de idempotencia que respeta el endpoint. */
export const IDEMPOTENCY_HEADER = 'Idempotency-Key';
