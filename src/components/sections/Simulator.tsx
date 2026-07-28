'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';
import { useReveal, REVEAL_VIEWPORT } from '@/hooks/useReveal';
import { useModal } from '@/components/ModalContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

type VehicleCondition = 'nuevo' | 'usado';

const RATE_RANGES: Record<VehicleCondition, { min: number; max: number; default: number }> = {
  nuevo: { min: 1.13, max: 1.88, default: 1.50 },
  usado: { min: 1.22, max: 1.88, default: 1.50 },
};

const Simulator: React.FC = () => {
  const { t, locale } = useTranslation();
  const { openCreditModal } = useModal();

  // Form state
  const [vehicleCondition, setVehicleCondition] = useState<VehicleCondition>('nuevo');
  const [vehicleValue, setVehicleValue] = useState(50000000); // 50M COP
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [term, setTerm] = useState(60);
  const [monthlyRate, setMonthlyRate] = useState(RATE_RANGES.nuevo.default);
  const [showResult, setShowResult] = useState(false);

  const handleConditionChange = (condition: VehicleCondition) => {
    setVehicleCondition(condition);
    const range = RATE_RANGES[condition];
    // Clamp current rate to new range
    setMonthlyRate(Math.min(Math.max(monthlyRate, range.min), range.max));
  };

  // Calculate estimated monthly payment using amortization formula
  const estimatedPayment = useMemo(() => {
    const downPayment = vehicleValue * (downPaymentPercent / 100);
    const principal = vehicleValue - downPayment;
    const r = monthlyRate / 100;

    if (r === 0) {
      return principal / term;
    }

    // P * [r(1+r)^n] / [(1+r)^n - 1]
    const numerator = principal * (r * Math.pow(1 + r, term));
    const denominator = Math.pow(1 + r, term) - 1;
    return numerator / denominator;
  }, [vehicleValue, downPaymentPercent, term, monthlyRate]);

  const annualRate = ((Math.pow(1 + monthlyRate / 100, 12) - 1) * 100);

  const downPaymentAmount = vehicleValue * (downPaymentPercent / 100);
  const loanAmount = vehicleValue - downPaymentAmount;

  const formatCOP = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  // Count-up de la cuota mensual. El MotionValue se formatea en cada frame y
  // se pinta como hijo de un motion.p, así que React no re-renderiza durante
  // la animación. El <p> es de ancho completo: el número al crecer no empuja
  // a ningún hermano.
  const { reduced, item } = useReveal();
  const revealItem = item('up');
  const paymentValue = useMotionValue(0);
  const paymentLabel = useTransform(paymentValue, (value) => formatCOP(value));

  useEffect(() => {
    if (!showResult) return;

    const controls = animate(paymentValue, estimatedPayment, {
      duration: reduced ? 0 : 0.8,
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [showResult, estimatedPayment, paymentValue, reduced]);

  const termOptions = [12, 24, 36, 48, 60, 72];

  return (
    <AnimatedSection id="simulador" className="py-16 md:py-24 bg-cream">
      <Container>
        <SectionHeading
          title={t.simulator.titleSegments}
          centered
          accent={false}
          className="mb-12 md:mb-16"
        />

        {/* Simulator Card */}
        <motion.div
          variants={revealItem}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
            {/* Vehicle Condition Toggle */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                {locale === 'es' ? 'Condición del vehículo' : 'Vehicle condition'}
              </label>
              <div className="flex gap-3">
                {(['nuevo', 'usado'] as VehicleCondition[]).map((condition) => (
                  <motion.button
                    key={condition}
                    onClick={() => handleConditionChange(condition)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      'flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 text-sm',
                      vehicleCondition === condition
                        ? 'bg-aurora text-white shadow-lg shadow-aurora/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {condition === 'nuevo'
                      ? (locale === 'es' ? 'Nuevo' : 'New')
                      : (locale === 'es' ? 'Usado' : 'Used')}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {locale === 'es'
                  ? `Tasa desde ${RATE_RANGES[vehicleCondition].min.toFixed(2)}% n.m.v.`
                  : `Rate from ${RATE_RANGES[vehicleCondition].min.toFixed(2)}% monthly`}
              </p>
            </div>

            {/* Vehicle Value Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="vehicle-price" className="text-lg font-semibold text-gray-900">
                  {t.simulator.vehiclePrice}
                </label>
                <span className="text-2xl font-bold text-aurora">
                  {formatCOP(vehicleValue)}
                </span>
              </div>
              <input
                id="vehicle-price"
                type="range"
                min="10000000"
                max="200000000"
                step="1000000"
                value={vehicleValue}
                onChange={(e) => setVehicleValue(parseInt(e.target.value))}
                className="w-full h-3 rounded-lg cursor-pointer"
                aria-label={`${t.simulator.vehiclePrice}: ${formatCOP(vehicleValue)}`}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$10M</span>
                <span>$200M</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="down-payment" className="text-lg font-semibold text-gray-900">
                  {t.simulator.downPayment}
                </label>
                <span className="text-2xl font-bold text-aurora">
                  {downPaymentPercent}% ({formatCOP(downPaymentAmount)})
                </span>
              </div>
              <input
                id="down-payment"
                type="range"
                min="10"
                max="50"
                step="1"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                className="w-full h-3 rounded-lg cursor-pointer"
                aria-label={`${t.simulator.downPayment}: ${downPaymentPercent}%`}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Monthly Interest Rate Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="monthly-rate" className="text-lg font-semibold text-gray-900">
                  {locale === 'es' ? 'Tasa de interés mensual' : 'Monthly interest rate'}
                </label>
                <span className="text-2xl font-bold text-aurora">
                  {monthlyRate.toFixed(2)}% n.m.v.
                </span>
              </div>
              <input
                id="monthly-rate"
                type="range"
                min={RATE_RANGES[vehicleCondition].min}
                max={RATE_RANGES[vehicleCondition].max}
                step="0.01"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(parseFloat(e.target.value))}
                className="w-full h-3 rounded-lg cursor-pointer"
                aria-label={`${locale === 'es' ? 'Tasa mensual' : 'Monthly rate'}: ${monthlyRate.toFixed(2)}%`}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{RATE_RANGES[vehicleCondition].min.toFixed(2)}%</span>
                <span>{RATE_RANGES[vehicleCondition].max.toFixed(2)}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                ≈ {annualRate.toFixed(2)}% E.A.
              </p>
            </div>

            {/* Term Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                {t.simulator.months}
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2" role="radiogroup" aria-label={t.simulator.months}>
                {termOptions.map((months) => (
                  <motion.button
                    key={months}
                    onClick={() => setTerm(months)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    role="radio"
                    aria-checked={term === months}
                    className={cn(
                      'py-2 px-3 rounded-full font-semibold transition-all duration-200 text-sm',
                      term === months
                        ? 'bg-aurora text-white shadow-lg shadow-aurora/50'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {months}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              onClick={handleCalculate}
              variant="primary"
              size="lg"
              className="w-full mb-8"
            >
              {t.simulator.calculate}
            </Button>

            {/* Result Display */}
            {showResult && (
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : { type: 'spring', stiffness: 260, damping: 22, mass: 0.7 }
                }
                className="bg-gradient-to-br from-aurora/10 to-aurora/5 rounded-2xl p-6 border border-aurora/30"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {t.simulator.vehiclePrice}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCOP(vehicleValue)}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-1">
                      {t.simulator.downPayment}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCOP(downPaymentAmount)} ({downPaymentPercent}%)
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-1">
                      {t.simulator.loanAmount}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCOP(loanAmount)}
                    </p>
                  </div>

                  <div className="border-t border-aurora/30 pt-4">
                    <p className="text-sm text-gray-600 mb-1">
                      {t.simulator.monthlyPayment}
                    </p>
                    <motion.p
                      className="text-3xl font-bold text-aurora tabular-nums"
                      aria-label={`${t.simulator.monthlyPayment}: ${formatCOP(estimatedPayment)}`}
                    >
                      {paymentLabel}
                    </motion.p>
                    <p className="text-xs text-gray-500 mt-1">
                      {term} {t.simulator.monthsLabel} &middot; {monthlyRate.toFixed(2)}% n.m.v. ({annualRate.toFixed(2)}% E.A.)
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Disclaimer + Ally Note */}
            <p className="text-xs text-gray-500 text-center mt-6">
              {t.simulator.disclaimer}
            </p>
            <p className="text-xs text-aurora/70 text-center mt-2 font-medium">
              {locale === 'es'
                ? 'Tasas competitivas del mercado, sujetas a cambios según evaluación crediticia'
                : 'Competitive market rates, subject to change based on credit evaluation'}
            </p>
          </div>
        </motion.div>

        {/* CTA Below */}
        <motion.div
          variants={revealItem}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          className="text-center mt-12"
        >
          <Button
            variant="primary"
            size="lg"
            className="inline-block"
            onClick={openCreditModal}
          >
            {t.simulator.ctaButton}
          </Button>
        </motion.div>
      </Container>
    </AnimatedSection>
  );
};

export default Simulator;
