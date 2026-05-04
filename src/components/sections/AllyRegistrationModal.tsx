'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Building2, Wallet, BarChart3, Headphones } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

const STEPS = 2;

const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales', 'Otra'];
const businessTypes = ['Compraventa', 'Concesionario', 'Vitrina/showroom', 'Lote de carros', 'Otro'];
const businessTypesEn = ['Buy-sell', 'Dealership', 'Showroom', 'Car lot', 'Other'];
const vehicleRanges = ['1-5', '5-10', '10-20', '20-50', '50+'];
const referralSources = ['Redes sociales', 'Referido', 'Google', 'Evento', 'Otro'];
const referralSourcesEn = ['Social media', 'Referral', 'Google', 'Event', 'Other'];

const AllyRegistrationModal: React.FC = () => {
  const { activeModal, closeModal } = useModal();
  const { locale } = useTranslation();
  const isOpen = activeModal === 'ally';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const es = locale === 'es';

  // Step 1
  const [businessName, setBusinessName] = useState('');
  const [nit, setNit] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [vehiclesPerMonth, setVehiclesPerMonth] = useState('');

  // Step 2
  const [contactName, setContactName] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    setBusinessName('');
    setNit('');
    setCity('');
    setAddress('');
    setBusinessType('');
    setVehiclesPerMonth('');
    setContactName('');
    setPosition('');
    setPhone('');
    setEmail('');
    setReferralSource('');
    setAcceptTerms(false);
  };

  const handleClose = () => {
    closeModal();
    setTimeout(resetForm, 300);
  };

  const canAdvance = () => {
    if (step === 1) return businessName && nit && city && address && businessType;
    if (step === 2) return contactName && phone.length >= 10 && email.includes('@') && acceptTerms;
    return false;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const pageVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  const benefitCards = [
    { icon: Building2, label: es ? 'Acceso multi-banco' : 'Multi-bank access' },
    { icon: Wallet, label: es ? 'Comisiones por venta' : 'Sales commissions' },
    { icon: BarChart3, label: es ? 'Dashboard' : 'Dashboard' },
    { icon: Headphones, label: es ? 'Soporte dedicado' : 'Dedicated support' },
  ];

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
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    {es ? 'Registro de Aliado' : 'Partner Registration'}
                  </h2>
                  <span className="px-2 py-0.5 bg-aurora/10 text-aurora text-xs font-bold rounded-full">
                    B2B
                  </span>
                </div>
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
                  className="flex flex-col items-center text-center py-6"
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
                    {es ? '!Bienvenido a la red Veqto!' : 'Welcome to the Veqto network!'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-sm">
                    {es
                      ? 'Un ejecutivo comercial te contactará en las próximas 24 horas para activar tu cuenta y empezar a trabajar juntos.'
                      : 'A sales executive will contact you within 24 hours to activate your account and start working together.'}
                  </p>

                  {/* Benefit mini-cards */}
                  <div className="grid grid-cols-2 gap-3 w-full mb-8">
                    {benefitCards.map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 p-3 rounded-xl bg-aurora/5 border border-aurora/20"
                      >
                        <Icon size={18} className="text-aurora flex-shrink-0" />
                        <span className="text-xs font-medium text-gray-700">{label}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 px-6 rounded-xl bg-aurora text-white font-semibold hover:bg-aurora/90 transition-colors"
                  >
                    {es ? 'Volver a la página' : 'Back to page'}
                  </button>
                </motion.div>
              ) : (
                /* Steps */
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {step === 1 && (
                      <div className="space-y-5">
                        <p className="text-sm text-gray-500 font-medium mb-2">
                          {es ? 'Paso 1 — Datos del negocio' : 'Step 1 — Business info'}
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Nombre del establecimiento' : 'Business name'} *
                          </label>
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'NIT o cédula del representante legal' : 'Tax ID or legal rep ID'} *
                          </label>
                          <input
                            type="text"
                            value={nit}
                            onChange={(e) => setNit(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Ciudad' : 'City'} *
                          </label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900 bg-white"
                          >
                            <option value="">{es ? 'Seleccionar...' : 'Select...'}</option>
                            {cities.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Dirección' : 'Address'} *
                          </label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Tipo de negocio' : 'Business type'} *
                          </label>
                          <select
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900 bg-white"
                          >
                            <option value="">{es ? 'Seleccionar...' : 'Select...'}</option>
                            {(es ? businessTypes : businessTypesEn).map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {es ? 'Vehículos/mes promedio' : 'Avg vehicles/month'}
                          </label>
                          <div className="flex gap-2 flex-wrap">
                            {vehicleRanges.map((r) => (
                              <button
                                key={r}
                                onClick={() => setVehiclesPerMonth(r)}
                                className={cn(
                                  'py-2 px-4 rounded-full text-sm font-semibold transition-all',
                                  vehiclesPerMonth === r
                                    ? 'bg-aurora text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <p className="text-sm text-gray-500 font-medium mb-2">
                          {es ? 'Paso 2 — Datos de contacto' : 'Step 2 — Contact info'}
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Nombre contacto principal' : 'Primary contact name'} *
                          </label>
                          <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? 'Cargo' : 'Position'}
                          </label>
                          <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900"
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
                            placeholder="correo@empresa.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {es ? '¿Cómo te enteraste?' : 'How did you hear about us?'}
                          </label>
                          <select
                            value={referralSource}
                            onChange={(e) => setReferralSource(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-aurora focus:ring-2 focus:ring-aurora/20 outline-none transition-all text-gray-900 bg-white"
                          >
                            <option value="">{es ? 'Seleccionar...' : 'Select...'}</option>
                            {(es ? referralSources : referralSourcesEn).map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
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
                    {es ? 'Enviar Registro' : 'Submit Registration'}
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

export default AllyRegistrationModal;
