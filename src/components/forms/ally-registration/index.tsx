'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import StepIndicator from '@/components/forms/StepIndicator';
import AllyStep1Business from './AllyStep1Business';
import AllyStep2Contact from './AllyStep2Contact';
import AllyStep3Consent from './AllyStep3Consent';
import AllySuccess from './AllySuccess';
import { validateStep1, validateStep2, validateStep3 } from './validation';
import type { FormErrors, Step1Data, Step2Data, Step3Data } from './types';

const TOTAL_STEPS = 3;

const stepLabels = {
  es: ['Negocio', 'Contacto', 'Autorizaciones'],
  en: ['Business', 'Contact', 'Authorizations'],
};

const initialStep1: Step1Data = {
  nombreEstablecimiento: '', nit: '', tipoNegocio: '', departamento: '', ciudad: '',
  direccion: '', anosFuncionamiento: '', marcasVehiculos: '',
};

const initialStep2: Step2Data = {
  nombreContacto: '', cargo: '', celular: '', correo: '', confirmarCorreo: '',
  telefonoFijo: '', referidoPor: '', comoNosConocio: '',
};

const initialStep3: Step3Data = {
  autorizaDatos: false, aceptaTerminos: false, autorizaContacto: false, autorizaComercial: false,
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const AllyRegistrationForm: React.FC = () => {
  const { locale } = useTranslation();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [step1, setStep1] = useState<Step1Data>(initialStep1);
  const [step2, setStep2] = useState<Step2Data>(initialStep2);
  const [step3, setStep3] = useState<Step3Data>(initialStep3);

  const validateCurrentStep = useCallback((): boolean => {
    let errs: FormErrors = {};
    switch (step) {
      case 1: errs = validateStep1(step1); break;
      case 2: errs = validateStep2(step2); break;
      case 3: errs = validateStep3(step3); break;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [step, step1, step2, step3]);

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

  const handleSubmit = () => {
    if (!validateCurrentStep()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const labels = stepLabels[locale] ?? stepLabels.es;

  if (isSubmitted) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <AllySuccess />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-aurora/10 text-aurora px-2 py-0.5 rounded-full">B2B</span>
            <h1 className="text-2xl md:text-3xl font-bold text-negro">
              {locale === 'es' ? 'Registro de Aliado Comercial' : 'Partner Registration'}
            </h1>
          </div>
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
                {step === 1 && <AllyStep1Business data={step1} errors={errors} onChange={(u) => setStep1((p) => ({ ...p, ...u }))} />}
                {step === 2 && <AllyStep2Contact data={step2} errors={errors} onChange={(u) => setStep2((p) => ({ ...p, ...u }))} />}
                {step === 3 && <AllyStep3Consent data={step3} errors={errors} onChange={(u) => setStep3((p) => ({ ...p, ...u }))} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 md:px-8 py-4 flex gap-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl border-2 border-gray-200 text-negro font-semibold text-sm hover:bg-gray-50 transition-colors"
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
                className="flex-1 flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-aurora text-white font-semibold text-sm hover:bg-aurora-dark transition-colors"
              >
                {locale === 'es' ? 'Registrar mi negocio' : 'Register my business'}
                <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AllyRegistrationForm;
