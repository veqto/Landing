export interface FormErrors {
  [key: string]: string;
}

export interface Step1Data {
  nombreEstablecimiento: string;
  nit: string;
  tipoNegocio: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  anosFuncionamiento: string;
  marcasVehiculos: string;
}

export interface Step2Data {
  nombreContacto: string;
  cargo: string;
  celular: string;
  correo: string;
  confirmarCorreo: string;
  telefonoFijo: string;
  referidoPor: string;
  comoNosConocio: string;
}

export interface Step3Data {
  autorizaDatos: boolean;
  aceptaTerminos: boolean;
  autorizaContacto: boolean;
  autorizaComercial: boolean;
}
