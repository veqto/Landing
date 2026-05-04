'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useTranslation();

  const toggleLanguage = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        'bg-white/10 backdrop-blur-sm',
        'border border-white/20',
        'hover:border-aurora hover:bg-white/20',
        'transition-all duration-300',
        'text-sm font-semibold text-white'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Cambiar idioma a ${locale === 'es' ? 'English' : 'Español'}`}
    >
      <motion.span
        key={locale}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {locale === 'es' ? 'ES' : 'EN'}
      </motion.span>

      {/* Visual indicator */}
      <div className="flex items-center gap-1 ml-1">
        <div
          className={cn(
            'w-1.5 h-1.5 rounded-full transition-colors duration-300',
            locale === 'es' ? 'bg-aurora' : 'bg-white/30'
          )}
        />
        <div
          className={cn(
            'w-1.5 h-1.5 rounded-full transition-colors duration-300',
            locale === 'en' ? 'bg-aurora' : 'bg-white/30'
          )}
        />
      </div>
    </motion.button>
  );
};

export default LanguageSwitcher;
