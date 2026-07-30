'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Building2, Wallet, BarChart3, HeadphonesIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/LanguageContext';

const benefitCards = [
  { icon: Building2, label: { es: 'Acceso multi-banco', en: 'Multi-bank access' } },
  { icon: Wallet, label: { es: 'Comisiones por venta', en: 'Sales commissions' } },
  { icon: BarChart3, label: { es: 'Dashboard de seguimiento', en: 'Tracking dashboard' } },
  { icon: HeadphonesIcon, label: { es: 'Soporte dedicado', en: 'Dedicated support' } },
];

interface Props {
  /** Código emitido por la plataforma. `null` si el 2xx no lo trajo. */
  codigoAliado: string | null;
}

const AllySuccess: React.FC<Props> = ({ codigoAliado }) => {
  const router = useRouter();
  const { locale } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-12 px-4"
    >
      <motion.div
        className="w-24 h-24 rounded-full bg-aurora/10 flex items-center justify-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
          <Check size={48} className="text-aurora" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <h2 className="text-3xl font-bold text-negro mb-3">
        {locale === 'es' ? '¡Bienvenido a la red Veqto!' : 'Welcome to the Veqto network!'}
      </h2>
      <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">
        {locale === 'es'
          ? 'Un ejecutivo comercial te contactará en las próximas 24 horas para activar tu cuenta y darte acceso a la plataforma.'
          : 'A sales executive will contact you within 24 hours to activate your account and give you platform access.'}
      </p>

      {/* La plataforma puede confirmar sin código: no se inventa uno. */}
      {codigoAliado && (
        <div className="bg-gray-50 rounded-xl px-6 py-3 mb-8">
          <span className="text-xs text-gray-500">
            {locale === 'es' ? 'Código de aliado' : 'Partner code'}
          </span>
          <p className="text-xl font-bold text-aurora">{codigoAliado}</p>
        </div>
      )}

      {/* Benefit cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
        {benefitCards.map((b) => (
          <motion.div
            key={b.label.es}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 border border-gray-100"
          >
            <b.icon size={24} className="text-aurora" />
            <span className="text-xs font-semibold text-negro text-center">{b.label[locale]}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          onClick={() => router.push('/')}
          className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-200 text-negro font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
        </button>
        <button
          onClick={() => router.push('/#beneficios')}
          className="flex-1 px-5 py-3 rounded-xl bg-aurora text-white font-semibold text-sm hover:bg-aurora-dark transition-colors"
        >
          {locale === 'es' ? 'Conocer más beneficios' : 'See more benefits'}
        </button>
      </div>
    </motion.div>
  );
};

export default AllySuccess;
