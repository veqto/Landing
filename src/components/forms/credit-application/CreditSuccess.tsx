'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/LanguageContext';

interface Props {
  /** Referencia devuelta por la plataforma. `null` si el 2xx no la trajo. */
  refNumber: string | null;
}

const CreditSuccess: React.FC<Props> = ({ refNumber }) => {
  const router = useRouter();
  const { locale } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-12 px-4"
    >
      {/* Checkmark */}
      <motion.div
        className="w-24 h-24 rounded-full bg-aurora/10 flex items-center justify-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Check size={48} className="text-aurora" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <h2 className="text-3xl font-bold text-negro mb-3">
        {locale === 'es' ? '¡Tu solicitud fue recibida!' : 'Your application was received!'}
      </h2>
      <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md">
        {locale === 'es'
          ? 'Nuestro equipo analizará tu perfil con IA y te contactaremos en menos de 24 horas con las mejores opciones de crédito de múltiples bancos.'
          : 'Our team will analyze your profile with AI and contact you within 24 hours with the best credit options from multiple banks.'}
      </p>

      {/* La plataforma puede confirmar sin referencia: no se inventa una. */}
      {refNumber && (
        <div className="bg-gray-50 rounded-xl px-6 py-3 mb-8">
          <span className="text-xs text-gray-500">
            {locale === 'es' ? 'Número de referencia' : 'Reference number'}
          </span>
          <p className="text-xl font-bold text-aurora">{refNumber}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          onClick={() => router.push('/')}
          className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-200 text-negro font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
        </button>
        <button
          onClick={() => router.push('/#simulador')}
          className="flex-1 px-5 py-3 rounded-xl bg-aurora text-white font-semibold text-sm hover:bg-aurora-dark transition-colors"
        >
          {locale === 'es' ? 'Ir al simulador' : 'Go to simulator'}
        </button>
      </div>
    </motion.div>
  );
};

export default CreditSuccess;
