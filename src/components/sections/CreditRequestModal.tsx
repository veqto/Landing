'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

const STEPS = 3;

const plazoOptions = [12, 24, 36, 48, 60];
const incomeRanges = ['< $1.5M', '$1.5M - $3M', '$3M - $5M', '$5M - $10M', '> $10M'];
const vehicleTypes = ['Carro nuevo', 'Carro usado', 'Moto', 'Vehículo comercial'];
const vehicleTypesEn = ['New car', 'Used car', 'Motorcycle', 'Commercial vehicle'];

function generateRef() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `REF-2026-${num}`;
}

const CreditRequestModal: React.FC = () => {
  const { activeModal, closeModal } = useModal();
  const { locale } = useTranslation();
  const isOpen = activeModal === 'credit';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  // Step 1
  const [fullName, setFullName] = useState('');
  const [cedula, setCedula] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Step 2
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleValue, setVehicleValue] = useState(50000000);
  const [downPayment, setDownPayment] = useState(20);
  const [plazo, setPlazo] = useState(36);

  // Step 3
  const [income, setIncome] = useState('');
  const [employment, setEmployment] = useState<'empleado' | 'independiente' | ''>('');
  const [creditHistory, setCreditHistory] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const es = locale === 'es';

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    setFullName('');
    setCedula('');
    setPhone('');
    setEmail('');
    setVehicleType('');
    setVehicleValue(50000000);
    setDownPayment(20);
    setPlazo(36);
    setIncome('');
    setEmployment('');
    setCreditHistory('');
    setAcceptTerms(false);
  };

  const handleClose = () => {
    closeModal();
    setTimeout(resetForm, 300);
  };

  const canAdvance = () => {
    if (step === 1) return fullName && cedula.length >= 6 && phone.length >= 10 && email.includes('@');
    if (step === 2) return vehicleType !== '';
    if (step === 3) return income && employment && creditHistory && acceptTerms;
    return false;
  };

  const handleSubmit = () => {
    setRefCode(generateRef());
    setSubmitted(true);
  };

  const formatCOP = (v: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

  const slideDirection = { enter: 1, exit: -1 };

  const pageVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0 }),
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <motion.div
            className="relative w-full sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {es ? 'Solicitar Crédito' : 'Apply for Credit'}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Progress bar */}
              {!submitted && (
                <div className="flex gap-2">
                  {Array.from({ length: STEPS }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-all duration-300',
                        i < step ? 'bg-aurora' : 'bg-gray-200'
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {submitted ? (
                /* Success State */
                <motion.div
                  className="flex flex-col items-center text-center py-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-aurora flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                  >
                    <Check size={40} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {es ? '!Tu solicitud fue recibida!' : 'Your application was received!'}
                  </h3>
                  <p className="text-gray-600 mb-4 max-w-sm">
                    {es
                      ? 'Nuestro equipo analizará tu perfil con IA y te contactaremos en menos de 24 horas con las mejores opciones de crédito de múltiples bancos.'
                      : 'Our team will analyze your profile with AI and contact you within 24 hours with the best credit options from multiple banks.'}
                  </p>
                  <p className="text-sm text-gray-400 mb-8">
                    {es ? 'Referencia' : 'Reference'}: <span className="font-mono font-bold text-aurora">{refCode}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={handleClose}
                      className="flex-1 py-3 px-6 rounded-xl bg-aurora text-white font-semibold hover:bg-aurora/90 transition-colors"
                    >
                      {es ? 'Volver a la página' : 'Back to page'}
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        document.querySelector('#simulador')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 py-3 px-6 rounded-xl border-2 border-aurora text-aurora font-semibold hover:bg-aurora/5 transition-colors"
                    >
                      {es ? 'Simular otro crédito' : 'Simulate another credit'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Steps */
                <AnimatePresence mode="wait" custom={slideDirection.enter}>
                  <motion.div
                    key={step}
                    custom={slideDirection.enter}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {step === 1 && (
                      <div className="space-y-5">
                        <p className="text-sm text-gray-500 font-medium mb-2">
                          {es ? 'Paso 1 — Datos básicos' : 'Step 1 — Basic info'}
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Nombre completo' : 'Full name'} *
                          </label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
                            placeholder={es ? 'Juan Pérez López' : 'John Doe'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Número de cédula' : 'ID number'} *
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value.replace(/\D/g, '').slice(0, 12))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
                            placeholder="1234567890"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Celular' : 'Phone'} *
                          </label>
                          <div className="flex">
                            <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-500">
                              +57
                            </span>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                              className="flex-1 px-4 py-3 rounded-r-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
                              placeholder="3001234567"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Correo electrónico' : 'Email'} *
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
                            placeholder="correo@ejemplo.com"
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <p className="text-sm text-gray-500 font-medium mb-2">
                          {es ? 'Paso 2 — Sobre tu vehículo' : 'Step 2 — About your vehicle'}
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Tipo de vehículo' : 'Vehicle type'} *
                          </label>
                          <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900 bg-white"
                          >
                            <option value="">{es ? 'Seleccionar...' : 'Select...'}</option>
                            {(es ? vehicleTypes : vehicleTypesEn).map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-700">
                              {es ? 'Valor aproximado' : 'Approximate value'}
                            </label>
                            <span className="text-sm font-bold text-aurora">{formatCOP(vehicleValue)}</span>
                          </div>
                          <input
                            type="range"
                            min="10000000"
                            max="300000000"
                            step="1000000"
                            value={vehicleValue}
                            onChange={(e) => setVehicleValue(parseInt(e.target.value))}
                            className="w-full h-2 rounded-lg cursor-pointer accent-aurora"
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>$10M</span>
                            <span>$300M</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-700">
                              {es ? 'Cuota inicial' : 'Down payment'} ({downPayment}%)
                            </label>
                            <span className="text-sm font-bold text-aurora">{formatCOP(vehicleValue * downPayment / 100)}</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="50"
                            step="1"
                            value={downPayment}
                            onChange={(e) => setDownPayment(parseInt(e.target.value))}
                            className="w-full h-2 rounded-lg cursor-pointer accent-aurora"
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>10%</span>
                            <span>50%</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {es ? 'Plazo deseado' : 'Desired term'}
                          </label>
                          <div className="flex gap-2 flex-wrap">
                            {plazoOptions.map((m) => (
                              <button
                                key={m}
                                onClick={() => setPlazo(m)}
                                className={cn(
                                  'py-2 px-4 rounded-full text-sm font-semibold transition-all',
                                  plazo === m
                                    ? 'bg-aurora text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                              >
                                {m} {es ? 'meses' : 'months'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-5">
                        <p className="text-sm text-gray-500 font-medium mb-2">
                          {es ? 'Paso 3 — Información financiera' : 'Step 3 — Financial info'}
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Ingreso mensual' : 'Monthly income'} *
                          </label>
                          <select
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900 bg-white"
                          >
                            <option value="">{es ? 'Seleccionar...' : 'Select...'}</option>
                            {incomeRanges.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {es ? 'Tipo de empleo' : 'Employment type'} *
                          </label>
                          <div className="flex gap-3">
                            {(['empleado', 'independiente'] as const).map((type) => (
                              <button
                                key={type}
                                onClick={() => setEmployment(type)}
                                className={cn(
                                  'flex-1 py-3 rounded-xl text-sm font-semibold transition-all',
                                  employment === type
                                    ? 'bg-aurora text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                              >
                                {type === 'empleado'
                                  ? (es ? 'Empleado' : 'Employed')
                                  : (es ? 'Independiente' : 'Self-employed')}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {es ? '¿Tienes historial crediticio?' : 'Do you have credit history?'} *
                          </label>
                          <div className="flex gap-2">
                            {[
                              { value: 'si', label: es ? 'Sí' : 'Yes' },
                              { value: 'no', label: 'No' },
                              { value: 'no_se', label: es ? 'No estoy seguro' : 'Not sure' },
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => setCreditHistory(opt.value)}
                                className={cn(
                                  'flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all',
                                  creditHistory === opt.value
                                    ? 'bg-aurora text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer mt-4">
                          <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="mt-1 w-4 h-4 text-aurora rounded border-gray-300 focus:ring-aurora"
                          />
                          <span className="text-xs text-gray-600">
                            {es
                              ? 'Autorizo el tratamiento de mis datos personales según la política de privacidad'
                              : 'I authorize the processing of my personal data according to the privacy policy'}
                            *
                          </span>
                        </label>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer buttons */}
            {!submitted && (
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between gap-3">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1 py-3 px-5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft size={16} />
                    {es ? 'Atrás' : 'Back'}
                  </button>
                ) : (
                  <div />
                )}
                {step < STEPS ? (
                  <button
                    onClick={() => canAdvance() && setStep(step + 1)}
                    disabled={!canAdvance()}
                    className={cn(
                      'flex items-center gap-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all',
                      canAdvance()
                        ? 'bg-aurora text-white hover:bg-aurora/90 shadow-lg shadow-aurora/30'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    )}
                  >
                    {es ? 'Siguiente' : 'Next'}
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => canAdvance() && handleSubmit()}
                    disabled={!canAdvance()}
                    className={cn(
                      'py-3 px-6 rounded-xl text-sm font-semibold transition-all',
                      canAdvance()
                        ? 'bg-aurora text-white hover:bg-aurora/90 shadow-lg shadow-aurora/30'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    )}
                  >
                    {es ? 'Enviar Solicitud' : 'Submit Application'}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreditRequestModal;
