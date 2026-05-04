import type { FormErrors, Step1Data, Step2Data, Step3Data, Step4Data, Step5Data, Step6Data } from './types';

export function validateStep1(data: Step1Data): FormErrors {
  const e: FormErrors = {};
  if (!data.tipoSolicitud) e.tipoSolicitud = 'Selecciona el tipo de solicitud';
  if (!data.estadoVehiculo) e.estadoVehiculo = 'Selecciona el estado del vehículo';
  if (!data.tipoVehiculo) e.tipoVehiculo = 'Selecciona la clase de vehículo';
  if (!data.marca) e.marca = 'Selecciona la marca';
  if (!data.linea.trim()) e.linea = 'Ingresa la línea del vehículo';
  if (!data.modelo) e.modelo = 'Selecciona el modelo (año)';
  if (data.valorVehiculo < 10000000) e.valorVehiculo = 'El valor mínimo es $10.000.000';
  return e;
}

export function validateStep2(data: Step2Data): FormErrors {
  const e: FormErrors = {};
  if (!data.primerNombre.trim()) e.primerNombre = 'Primer nombre obligatorio';
  if (!data.primerApellido.trim()) e.primerApellido = 'Primer apellido obligatorio';
  if (!data.tipoDocumento) e.tipoDocumento = 'Selecciona tipo de documento';
  if (!/^\d{6,12}$/.test(data.numeroDocumento)) e.numeroDocumento = 'Documento: 6-12 dígitos numéricos';
  if (!data.fechaExpedicion) e.fechaExpedicion = 'Fecha de expedición obligatoria';
  if (!data.fechaNacimiento) e.fechaNacimiento = 'Fecha de nacimiento obligatoria';
  if (data.fechaNacimiento) {
    const birth = new Date(data.fechaNacimiento);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const adjustedAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()) ? age - 1 : age;
    if (adjustedAge < 18) e.fechaNacimiento = 'Debes ser mayor de 18 años';
    if (adjustedAge > 79) e.fechaNacimiento = 'Edad máxima permitida: 79 años';
  }
  if (!data.genero) e.genero = 'Selecciona el género';
  if (!data.estadoCivil) e.estadoCivil = 'Selecciona el estado civil';
  if (!data.nivelEstudios) e.nivelEstudios = 'Selecciona el nivel de estudios';
  return e;
}

export function validateStep3(data: Step3Data): FormErrors {
  const e: FormErrors = {};
  if (!data.direccionResidencia.trim()) e.direccionResidencia = 'Dirección obligatoria';
  if (!data.departamentoResidencia) e.departamentoResidencia = 'Selecciona el departamento';
  if (!data.ciudadResidencia) e.ciudadResidencia = 'Selecciona la ciudad';
  if (!/^3\d{9}$/.test(data.celular)) e.celular = 'Celular: 10 dígitos comenzando con 3';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correoElectronico)) e.correoElectronico = 'Correo inválido';
  if (data.correoElectronico !== data.confirmarCorreo) e.confirmarCorreo = 'Los correos no coinciden';
  if (!data.tipoVivienda) e.tipoVivienda = 'Selecciona tipo de vivienda';
  if (!data.estrato) e.estrato = 'Selecciona el estrato';
  if (data.tipoVivienda === 'arrendada') {
    if (!data.nombreArrendador.trim()) e.nombreArrendador = 'Nombre del arrendador obligatorio';
    if (!data.telefonoArrendador.trim()) e.telefonoArrendador = 'Teléfono del arrendador obligatorio';
  }
  return e;
}

export function validateStep4(data: Step4Data): FormErrors {
  const e: FormErrors = {};
  if (!data.actividadEconomica) e.actividadEconomica = 'Selecciona la actividad económica';
  if (!data.inicioActividad) e.inicioActividad = 'Fecha de inicio obligatoria';
  if (!data.nombreEmpresa.trim()) e.nombreEmpresa = 'Nombre de empresa obligatorio';
  const totalIngresos = data.salarioFijo + data.ingresosVariable + data.pension + data.honorarios + data.arrendamientos + data.otrosIngresos;
  const totalEgresos = data.gastoArriendo + data.gastosFamiliares + data.cuotasTarjetas + data.otrosCreditos + data.otrosEgresos;
  if (totalIngresos <= 0) e.salarioFijo = 'Debes reportar al menos un ingreso';
  if (totalEgresos >= totalIngresos) e.gastosFamiliares = 'Los egresos no pueden superar los ingresos';
  return e;
}

export function validateStep5(data: Step5Data): FormErrors {
  const e: FormErrors = {};
  // At least 3 references required
  const validRefs = data.referencias.filter((r) => r.nombre.trim() && r.telefono.trim());
  if (validRefs.length < 3) e.referencias = 'Se requieren mínimo 3 referencias';
  if (data.origenFondos.length === 0) e.origenFondos = 'Selecciona al menos un origen de fondos';
  return e;
}

export function validateStep6(data: Step6Data): FormErrors {
  const e: FormErrors = {};
  if (!data.autorizaDatos) e.autorizaDatos = 'Autorización de datos obligatoria';
  if (!data.autorizaCentrales) e.autorizaCentrales = 'Autorización de centrales de riesgo obligatoria';
  if (!data.aceptaTerminos) e.aceptaTerminos = 'Debes aceptar los términos y condiciones';
  if (!data.declaraVeracidad) e.declaraVeracidad = 'Debes declarar veracidad de la información';
  if (!data.aceptaPoliticaPrivacidad) e.aceptaPoliticaPrivacidad = 'Debes aceptar la política de privacidad';
  if (!data.autorizaFirmaElectronica) e.autorizaFirmaElectronica = 'Debes autorizar el uso de firma electrónica';
  if (!data.firmaDigital) e.firmaDigital = 'La firma digital es obligatoria';
  if (!data.ciudadSolicitud.trim()) e.ciudadSolicitud = 'Ciudad de solicitud obligatoria';
  return e;
}
