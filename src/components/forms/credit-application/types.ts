/* ───── Credit Application Form Types ───── */

export interface FormErrors {
  [key: string]: string;
}

/* Step 1: Tipo solicitud + vehículo */
export interface Step1Data {
  tipoSolicitud: string;      // 'nuevo' | 'usado'
  estadoVehiculo: string;     // 'nuevo' | 'usado'
  tipoVehiculo: string;       // vehicleClasses value
  claseVehiculo: string;
  marca: string;
  linea: string;
  modelo: string;             // year
  valorVehiculo: number;
  cuotaInicial: number;       // percentage 0-50
  plazoDeseado: number;       // months
  codigoAliado: string;
}

/* Step 2: Datos personales */
export interface Step2Data {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaExpedicion: string;
  lugarExpedicion: string;
  fechaNacimiento: string;
  paisNacimiento: string;
  departamentoNacimiento: string;
  ciudadNacimiento: string;
  genero: string;
  estadoCivil: string;
  numeroHijos: number;
  personasCargo: number;
  nivelEstudios: string;
  profesion: string;
}

/* Step 3: Residencia y contacto */
export interface Step3Data {
  direccionResidencia: string;
  departamentoResidencia: string;
  ciudadResidencia: string;
  barrio: string;
  estrato: number;            // 1-6
  tiempoResidencia: string;
  celular: string;
  telefonoResidencia: string;
  correoElectronico: string;
  confirmarCorreo: string;
  tipoVivienda: string;
  nombreArrendador: string;
  telefonoArrendador: string;
}

/* Step 4: Info laboral y financiera */
export interface Step4Data {
  actividadEconomica: string;
  inicioActividad: string;
  cargo: string;
  tipoContrato: string;
  nombreEmpresa: string;
  telefonoEmpresa: string;
  direccionEmpresa: string;
  ciudadEmpresa: string;
  salarioFijo: number;
  ingresosVariable: number;
  pension: number;
  honorarios: number;
  arrendamientos: number;
  otrosIngresos: number;
  gastoArriendo: number;
  gastosFamiliares: number;
  cuotasTarjetas: number;
  otrosCreditos: number;
  otrosEgresos: number;
}

/* Step 5: Activos, referencias, declaraciones */
export interface PropertyItem {
  tipo: string;
  valor: number;
  ciudad: string;
}

export interface VehicleItem {
  marca: string;
  modelo: string;
  valorComercial: number;
}

export interface ReferenceItem {
  nombre: string;
  parentesco: string;
  telefono: string;
  ciudad: string;
}

export interface Step5Data {
  inmuebles: PropertyItem[];
  vehiculos: VehicleItem[];
  referencias: ReferenceItem[];
  declaraRenta: boolean;
  esPEP: boolean;
  manejaRecursosPublicos: boolean;
  tienePoderPublico: boolean;
  origenFondos: string[];
  origenCliente: string;
}

/* Step 6: Autorizaciones y firma */
export interface Step6Data {
  autorizaDatos: boolean;
  autorizaCentrales: boolean;
  autorizaContacto: boolean;
  autorizaComercial: boolean;
  aceptaTerminos: boolean;
  declaraVeracidad: boolean;
  aceptaPoliticaPrivacidad: boolean;
  autorizaFirmaElectronica: boolean;
  firmaDigital: string;         // base64
  fechaSolicitud: string;       // auto
  ciudadSolicitud: string;
}

/* Full form data */
export interface CreditApplicationData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
  step6: Step6Data;
}
