'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import {
  submitCreditApplication,
  newIdempotencyKey,
  type CreditApplicationFailure,
} from '@/lib/credit-application-api';

const STEPS = 3;

const plazoOptions = [12, 24, 36, 48, 60];
const incomeRanges = ['< $1.5M', '$1.5M - $3M', '$3M - $5M', '$5M - $10M', '> $10M'];
const vehicleTypes = ['Carro nuevo', 'Carro usado', 'Moto', 'Vehículo comercial'];
const vehicleTypesEn = ['New car', 'Used car', 'Motorcycle', 'Commercial vehicle'];

/**
 * Texto de la autorización de tratamiento de datos (Ley 1581 de 2012).
 *
 * El texto en español es literal y está aprobado legalmente: no editar sin el
 * visto bueno correspondiente. Se parte en dos porque "Política de Tratamiento
 * de Datos" es un enlace a /autorizacion-datos.
 */
const CONSENT_TEXT = {
  es: {
    before:
      'Autorizo a Veqto S.A.S., como responsable del tratamiento, a recolectar y tratar los datos personales que suministro en este formulario con la finalidad de estudiar mi solicitud de crédito vehicular, contactarme por teléfono, WhatsApp o correo electrónico, y compartirlos con las entidades financieras aliadas para la evaluación del crédito, conforme a la Ley 1581 de 2012 y a la ',
    link: 'Política de Tratamiento de Datos',
    after: '.',
  },
  en: {
    before:
      'I authorize Veqto S.A.S., as data controller, to collect and process the personal data I provide in this form for the purpose of assessing my vehicle credit application, contacting me by phone, WhatsApp or email, and sharing it with allied financial institutions for the credit evaluation, in accordance with Law 1581 of 2012 and the ',
    link: 'Personal Data Processing Policy',
    after: '.',
  },
} as const;

/** Mensaje al titular según por qué falló el envío. */
function errorMessage(failure: CreditApplicationFailure, es: boolean): string {
  switch (failure.kind) {
    case 'validation':
      return es
        ? 'Algunos datos no pasaron la validación. Revisa la información e inténtalo de nuevo.'
        : 'Some of your details did not pass validation. Please review them and try again.';
    case 'rate_limited': {
      const min = failure.retryAfterSeconds
        ? Math.max(1, Math.ceil(failure.retryAfterSeconds / 60))
        : null;
      if (min) {
        return es
          ? `Recibimos demasiadas solicitudes desde aquí. Vuelve a intentarlo en ${min} ${min === 1 ? 'minuto' : 'minutos'}.`
          : `Too many requests from here. Try again in ${min} ${min === 1 ? 'minute' : 'minutes'}.`;
      }
      return es
        ? 'Recibimos demasiadas solicitudes desde aquí. Espera un momento y vuelve a intentarlo.'
        : 'Too many requests from here. Please wait a moment and try again.';
    }
    case 'forbidden':
      return es
        ? 'No pudimos verificar que eres una persona. Vuelve a intentarlo.'
        : 'We could not verify you are human. Please try again.';
    case 'network':
      return es
        ? 'No pudimos conectar con la plataforma. Revisa tu conexión e inténtalo de nuevo.'
        : 'We could not reach the platform. Check your connection and try again.';
    default:
      return es
        ? 'Algo falló al enviar tu solicitud. Inténtalo de nuevo en unos minutos.'
        : 'Something went wrong sending your application. Please try again in a few minutes.';
  }
}

const CreditRequestModal: React.FC = () => {
  const { activeModal, closeModal } = useModal();
  const { locale } = useTranslation();
  const isOpen = activeModal === 'credit';

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [failure, setFailure] = useState<CreditApplicationFailure | null>(null);
  /** Referencia emitida por la plataforma. Nunca se genera localmente. */
  const [refCode, setRefCode] = useState<string | null>(null);
  /**
   * Se mantiene entre reintentos del mismo envío para que un timeout seguido de
   * "Reintentar" no cree dos solicitudes.
   */
  const [idempotencyKey, setIdempotencyKey] = useState<string | null>(null);

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
  const [aceptaTratamientoDatos, setAceptaTratamientoDatos] = useState(false);

  const es = locale === 'es';

  const resetForm = () => {
    setStep(1);
    setStatus('idle');
    setFailure(null);
    setRefCode(null);
    setIdempotencyKey(null);
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
    setAceptaTratamientoDatos(false);
  };

  const handleClose = () => {
    // Cerrar a mitad de un envío dejaría la solicitud en el aire: se ignora.
    if (status === 'submitting') return;
    closeModal();
    setTimeout(resetForm, 300);
  };

  const canAdvance = () => {
    if (step === 1) return fullName && cedula.length >= 6 && phone.length >= 10 && email.includes('@');
    if (step === 2) return vehicleType !== '';
    if (step === 3) return Boolean(income && employment && creditHistory && aceptaTratamientoDatos);
    return false;
  };

  const handleSubmit = async () => {
    if (!canAdvance() || status === 'submitting') return;

    // Un reintento conserva la clave del primer intento; un envío nuevo la crea.
    const key = idempotencyKey ?? newIdempotencyKey();
    if (key !== idempotencyKey) setIdempotencyKey(key);

    setStatus('submitting');
    setFailure(null);

    const result = await submitCreditApplication(
      {
        nombreCompleto: fullName.trim(),
        cedula,
        celular: phone,
        correo: email.trim(),
        tipoVehiculo: vehicleType,
        valorVehiculo: vehicleValue,
        cuotaInicialPorcentaje: downPayment,
        plazoMeses: plazo,
        rangoIngresos: income,
        tipoEmpleo: employment as 'empleado' | 'independiente',
        historialCrediticio: creditHistory as 'si' | 'no' | 'no_se',
        aceptaTratamientoDatos: true,
        locale,
      },
      { idempotencyKey: key }
    );

    if (result.ok) {
      // Único camino al modal de éxito: 2xx de la plataforma.
      setRefCode(result.referencia);
      setStatus('success');
      return;
    }

    // La clave solo se conserva cuando no sabemos si la solicitud llegó a
    // registrarse (red/timeout, 5xx). Un 422 no creó nada: el siguiente envío,
    // ya con los datos corregidos, va como solicitud nueva.
    if (!result.retryable) setIdempotencyKey(null);

    setFailure(result);
    setStatus('idle');
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
                  disabled={status === 'submitting'}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label={es ? 'Cerrar' : 'Close'}
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Progress bar */}
              {status !== 'success' && (
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
              {status === 'success' ? (
                /* Success State — solo se llega aquí con un 2xx de la plataforma */
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
                  {/* La plataforma puede confirmar sin referencia: no se inventa una. */}
                  {refCode && (
                    <p className="text-sm text-gray-400 mb-8">
                      {es ? 'Referencia' : 'Reference'}: <span className="font-mono font-bold text-aurora">{refCode}</span>
                    </p>
                  )}
                  <div className={cn('flex flex-col sm:flex-row gap-3 w-full', !refCode && 'mt-4')}>
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
                            checked={aceptaTratamientoDatos}
                            onChange={(e) => setAceptaTratamientoDatos(e.target.checked)}
                            disabled={status === 'submitting'}
                            className="mt-1 w-4 h-4 shrink-0 text-aurora rounded border-gray-300 accent-aurora focus:ring-aurora"
                          />
                          <span className="text-xs text-gray-600 leading-relaxed">
                            {CONSENT_TEXT[es ? 'es' : 'en'].before}
                            <a
                              href="/autorizacion-datos"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-aurora underline hover:text-aurora/80"
                            >
                              {CONSENT_TEXT[es ? 'es' : 'en'].link}
                            </a>
                            {CONSENT_TEXT[es ? 'es' : 'en'].after}
                            <span className="text-coral ml-0.5">*</span>
                          </span>
                        </label>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer buttons */}
            {status !== 'success' && (
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
                {/* Error del último intento de envío */}
                {failure && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 mb-3 p-3 rounded-xl bg-red-50 border border-red-100"
                  >
                    <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-red-700 leading-relaxed">
                      {errorMessage(failure, es)}
                    </p>
                  </div>
                )}

                <div className="flex justify-between gap-3">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      disabled={status === 'submitting'}
                      className="flex items-center gap-1 py-3 px-5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      onClick={handleSubmit}
                      disabled={!canAdvance() || status === 'submitting'}
                      className={cn(
                        'flex items-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition-all',
                        canAdvance() && status !== 'submitting'
                          ? 'bg-aurora text-white hover:bg-aurora/90 shadow-lg shadow-aurora/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      )}
                    >
                      {status === 'submitting' && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      {status === 'submitting'
                        ? (es ? 'Enviando…' : 'Sending…')
                        : failure?.retryable
                          ? (es ? 'Reintentar' : 'Retry')
                          : (es ? 'Enviar Solicitud' : 'Submit Application')}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreditRequestModal;
