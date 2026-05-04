import type { FormErrors, Step1Data, Step2Data, Step3Data } from './types';

export function validateStep1(data: Step1Data): FormErrors {
  const e: FormErrors = {};
  if (!data.nombreEstablecimiento.trim()) e.nombreEstablecimiento = 'Nombre del establecimiento obligatorio';
  if (!data.nit.trim()) e.nit = 'NIT o cédula obligatorio';
  if (!data.tipoNegocio) e.tipoNegocio = 'Selecciona el tipo de negocio';
  if (!data.departamento) e.departamento = 'Selecciona el departamento';
  if (!data.ciudad) e.ciudad = 'Selecciona la ciudad';
  return e;
}

export function validateStep2(data: Step2Data): FormErrors {
  const e: FormErrors = {};
  if (!data.nombreContacto.trim()) e.nombreContacto = 'Nombre de contacto obligatorio';
  if (!/^3\d{9}$/.test(data.celular)) e.celular = 'Celular: 10 dígitos comenzando con 3';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) e.correo = 'Correo inválido';
  if (data.correo !== data.confirmarCorreo) e.confirmarCorreo = 'Los correos no coinciden';
  return e;
}

export function validateStep3(data: Step3Data): FormErrors {
  const e: FormErrors = {};
  if (!data.autorizaDatos) e.autorizaDatos = 'Debes autorizar el tratamiento de datos';
  if (!data.aceptaTerminos) e.aceptaTerminos = 'Debes aceptar los términos y condiciones';
  return e;
}
