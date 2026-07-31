'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import {
  submitCreditoLead,
  newIdempotencyKey,
  type LeadFailure,
} from '@/lib/landing-leads/client';
import { leadErrorMessage, aplanarFieldErrors } from '@/lib/landing-leads/messages';
import Container from '@/components/ui/Container';
import StepIndicator from '@/components/forms/StepIndicator';
import CreditStep1Vehicle from './CreditStep1Vehicle';
import CreditStep2Personal from './CreditStep2Personal';
import CreditStep3Residence from './CreditStep3Residence';
import CreditStep4Financial from './CreditStep4Financial';
import CreditStep5Assets from './CreditStep5Assets';
import CreditStep6Consent from './CreditStep6Consent';
import CreditSuccess from './CreditSuccess';
import { validateStep1, validateStep2, validateStep3, validateStep4, validateStep5, validateStep6 } from './validation';
import type { FormErrors, Step1Data, Step2Data, Step3Data, Step4Data, Step5Data, Step6Data } from './types';

const TOTAL_STEPS = 6;

const stepLabels = {
  es: ['Vehículo', 'Personal', 'Residencia', 'Financiera', 'Activos', 'Firmas'],
  en: ['Vehicle', 'Personal', 'Residence', 'Financial', 'Assets', 'Signatures'],
};

const initialStep1: Step1Data = {
  tipoSolicitud: '', estadoVehiculo: '', tipoVehiculo: '', claseVehiculo: '',
  marca: '', linea: '', modelo: '', valorVehiculo: 50000000, cuotaInicial: 20,
  plazoDeseado: 60, codigoAliado: '',
};

const initialStep2: Step2Data = {
  primerNombre: '', segundoNombre: '', primerApellido: '', segundoApellido: '',
  tipoDocumento: '', numeroDocumento: '', fechaExpedicion: '', lugarExpedicion: '',
  fechaNacimiento: '', paisNacimiento: 'Colombia', departamentoNacimiento: '', ciudadNacimiento: '',
  genero: '', estadoCivil: '', numeroHijos: 0, personasCargo: 0, nivelEstudios: '', profesion: '',
};

const initialStep3: Step3Data = {
  direccionResidencia: '', departamentoResidencia: '', ciudadResidencia: '', barrio: '',
  estrato: 0, tiempoResidencia: '', celular: '', telefonoResidencia: '',
  correoElectronico: '', confirmarCorreo: '', tipoVivienda: '',
  nombreArrendador: '', telefonoArrendador: '',
};

const initialStep4: Step4Data = {
  actividadEconomica: '', inicioActividad: '', cargo: '', tipoContrato: '',
  nombreEmpresa: '', telefonoEmpresa: '', direccionEmpresa: '', ciudadEmpresa: '',
  salarioFijo: 0, ingresosVariable: 0, pension: 0, honorarios: 0, arrendamientos: 0, otrosIngresos: 0,
  gastoArriendo: 0, gastosFamiliares: 0, cuotasTarjetas: 0, otrosCreditos: 0, otrosEgresos: 0,
};

const initialStep5: Step5Data = {
  inmuebles: [],
  vehiculos: [],
  referencias: [
    { nombre: '', parentesco: '', telefono: '', ciudad: '' },
    { nombre: '', parentesco: '', telefono: '', ciudad: '' },
    { nombre: '', parentesco: '', telefono: '', ciudad: '' },
  ],
  declaraRenta: false, esPEP: false, manejaRecursosPublicos: false, tienePoderPublico: false,
  origenFondos: [], origenCliente: '',
};

const today = new Date().toISOString().split('T')[0];
const initialStep6: Step6Data = {
  autorizaDatos: false, autorizaCentrales: false, autorizaContacto: false,
  autorizaComercial: false, aceptaTerminos: false, declaraVeracidad: false,
  aceptaPoliticaPrivacidad: false, autorizaFirmaElectronica: false,
  firmaDigital: '', fechaSolicitud: today, ciudadSolicitud: '',
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const CreditApplicationForm: React.FC = () => {
  const { locale } = useTranslation();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [failure, setFailure] = useState<LeadFailure | null>(null);
  /** Referencia emitida por la plataforma. Nunca se genera localmente. */
  const [refNumber, setRefNumber] = useState<string | null>(null);
  /**
   * Se conserva entre reintentos del mismo envío para que un timeout seguido de
   * "Reintentar" no cree dos solicitudes.
   */
  const [idempotencyKey, setIdempotencyKey] = useState<string | null>(null);

  const [step1, setStep1] = useState<Step1Data>(initialStep1);
  const [step2, setStep2] = useState<Step2Data>(initialStep2);
  const [step3, setStep3] = useState<Step3Data>(initialStep3);
  const [step4, setStep4] = useState<Step4Data>(initialStep4);
  const [step5, setStep5] = useState<Step5Data>(initialStep5);
  const [step6, setStep6] = useState<Step6Data>(initialStep6);

  const validateCurrentStep = useCallback((): boolean => {
    let errs: FormErrors = {};
    switch (step) {
      case 1: errs = validateStep1(step1); break;
      case 2: errs = validateStep2(step2); break;
      case 3: errs = validateStep3(step3); break;
      case 4: errs = validateStep4(step4); break;
      case 5: errs = validateStep5(step5); break;
      case 6: errs = validateStep6(step6); break;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [step, step1, step2, step3, step4, step5, step6]);

  const handleNext = () => {
    if (!validateCurrentStep()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setDirection(1);
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setDirection(-1);
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (status === 'submitting') return;
    if (!validateCurrentStep()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const key = idempotencyKey ?? newIdempotencyKey();
    if (key !== idempotencyKey) setIdempotencyKey(key);

    setStatus('submitting');
    setFailure(null);

    const result = await submitCreditoLead(
      {
        vehiculo: {
          tipoSolicitud: step1.tipoSolicitud,
          estadoVehiculo: step1.estadoVehiculo,
          tipoVehiculo: step1.tipoVehiculo,
          claseVehiculo: step1.claseVehiculo,
          marca: step1.marca,
          linea: step1.linea,
          modelo: step1.modelo,
          valorVehiculo: step1.valorVehiculo,
          cuotaInicial: step1.cuotaInicial,
          plazoDeseado: step1.plazoDeseado,
          codigoAliado: step1.codigoAliado || undefined,
        },
        personal: { ...step2 },
        residencia: {
          direccionResidencia: step3.direccionResidencia,
          departamentoResidencia: step3.departamentoResidencia,
          ciudadResidencia: step3.ciudadResidencia,
          barrio: step3.barrio,
          estrato: step3.estrato,
          tiempoResidencia: step3.tiempoResidencia,
          celular: step3.celular,
          telefonoResidencia: step3.telefonoResidencia,
          correoElectronico: step3.correoElectronico,
          tipoVivienda: step3.tipoVivienda,
        },
        financiera: { ...step4 },
        activos: {
          inmuebles: step5.inmuebles,
          vehiculos: step5.vehiculos,
          referencias: step5.referencias,
          declaraRenta: step5.declaraRenta,
          esPEP: step5.esPEP,
          manejaRecursosPublicos: step5.manejaRecursosPublicos,
          tienePoderPublico: step5.tienePoderPublico,
          origenFondos: step5.origenFondos,
          origenCliente: step5.origenCliente,
        },
        consentimientos: {
          // validateStep6 ya exige autorizaDatos, así que aquí es siempre true.
          aceptaTratamientoDatos: true,
          autorizaCentrales: step6.autorizaCentrales,
          autorizaContacto: step6.autorizaContacto,
          autorizaComercial: step6.autorizaComercial,
          aceptaTerminos: step6.aceptaTerminos,
          declaraVeracidad: step6.declaraVeracidad,
          autorizaFirmaElectronica: step6.autorizaFirmaElectronica,
          firmaDigital: step6.firmaDigital,
          ciudadSolicitud: step6.ciudadSolicitud,
        },
        locale,
      },
      { idempotencyKey: key }
    );

    if (result.ok) {
      // Único camino a la pantalla de éxito: 2xx de la plataforma.
      setRefNumber(result.referencia);
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Un 422 no creó nada: el siguiente envío va como solicitud nueva. Solo se
    // conserva la clave cuando no sabemos si llegó a registrarse.
    if (!result.retryable) setIdempotencyKey(null);

    // El backend puede rechazar campos que la validación local dejó pasar.
    if (result.kind === 'validation') {
      setErrors(aplanarFieldErrors(result.fieldErrors));
    }

    setFailure(result);
    setStatus('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const labels = stepLabels[locale] ?? stepLabels.es;

  if (status === 'success') {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <CreditSuccess refNumber={refNumber} />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-negro mb-2">
            {locale === 'es' ? 'Solicitud de Crédito Vehicular' : 'Vehicle Credit Application'}
          </h1>
          <p className="text-sm text-gray-500">
            {locale === 'es' ? `Paso ${step} de ${TOTAL_STEPS} — ${labels[step - 1]}` : `Step ${step} of ${TOTAL_STEPS} — ${labels[step - 1]}`}
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-8">
          <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} labels={labels} />
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`step-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {step === 1 && <CreditStep1Vehicle data={step1} errors={errors} onChange={(u) => setStep1((p) => ({ ...p, ...u }))} />}
                {step === 2 && <CreditStep2Personal data={step2} errors={errors} onChange={(u) => setStep2((p) => ({ ...p, ...u }))} />}
                {step === 3 && <CreditStep3Residence data={step3} errors={errors} onChange={(u) => setStep3((p) => ({ ...p, ...u }))} />}
                {step === 4 && <CreditStep4Financial data={step4} errors={errors} onChange={(u) => setStep4((p) => ({ ...p, ...u }))} />}
                {step === 5 && <CreditStep5Assets data={step5} errors={errors} onChange={(u) => setStep5((p) => ({ ...p, ...u }))} />}
                {step === 6 && <CreditStep6Consent data={step6} errors={errors} onChange={(u) => setStep6((p) => ({ ...p, ...u }))} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 md:px-8 py-4">
            {failure && (
              <div
                role="alert"
                className="flex items-start gap-2 mb-3 p-3 rounded-xl bg-red-50 border border-red-100"
              >
                <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-700 leading-relaxed">
                  {leadErrorMessage(failure, locale === 'es')}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  disabled={status === 'submitting'}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-xl border-2 border-gray-200 text-negro font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={16} />
                  {locale === 'es' ? 'Atrás' : 'Back'}
                </button>
              )}

              {step < TOTAL_STEPS ? (
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-aurora text-white font-semibold text-sm hover:bg-aurora-dark transition-colors"
                >
                  {locale === 'es' ? 'Siguiente' : 'Next'}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={status === 'submitting'}
                  className="flex-1 flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-aurora text-white font-semibold text-sm hover:bg-aurora-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {locale === 'es' ? 'Enviando…' : 'Sending…'}
                    </>
                  ) : (
                    <>
                      {failure?.retryable
                        ? (locale === 'es' ? 'Reintentar' : 'Retry')
                        : (locale === 'es' ? 'Enviar Solicitud' : 'Submit Application')}
                      <Check size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreditApplicationForm;
