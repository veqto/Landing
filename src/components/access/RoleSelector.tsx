'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wrench, Handshake, Landmark, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

const PLATFORM_LINKS = {
  admin: 'https://app.veqto.ai/admin/login',
  ally: 'https://app.veqto.ai/aliado/login',
  bank: 'https://app.veqto.ai/banco/login',
} as const;

const CONTACT_EMAIL = 'info@veqto.ai';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.5 },
  }),
};

const RoleSelector: React.FC = () => {
  const { t } = useTranslation();
  const { admin, ally, bank } = t.access.roles;

  return (
    <section
      className="relative w-full min-h-[calc(100vh-5rem)] flex items-center py-16 sm:py-20"
      aria-label={t.access.pageTitle}
    >
      {/* Soft aurora background accents */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-0 w-72 h-72 bg-aurora/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 bg-aurora/5 rounded-full filter blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-negro mb-3">
            {t.access.pageTitle}
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {t.access.pageSubtitle}
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1 — Administrador */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <RoleCard
              Icon={Wrench}
              title={admin.title}
              description={admin.description}
              actionLabel={admin.button}
              href={PLATFORM_LINKS.admin}
            />
          </motion.div>

          {/* Card 2 — Aliado comercial */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <RoleCard
              Icon={Handshake}
              title={ally.title}
              description={ally.description}
              actionLabel={ally.button}
              href={PLATFORM_LINKS.ally}
            />
          </motion.div>

          {/* Card 3 — Banco (asesor) */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <RoleCard
              Icon={Landmark}
              title={bank.title}
              description={bank.description}
              actionLabel={bank.button}
              href={PLATFORM_LINKS.bank}
            />
          </motion.div>
        </div>

        {/* Help note + contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12 max-w-xl mx-auto"
        >
          <p className="text-sm text-gray-600">{t.access.helpNote}</p>
          <p className="text-sm text-gray-600 mt-1">
            {t.access.contactLabel}{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-aurora font-semibold hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-sm text-gray-400 hover:text-aurora transition-colors"
          >
            ← {t.access.backHome}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

interface RoleCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  Icon,
  title,
  description,
  actionLabel,
  href,
}) => {
  return (
    <div
      className={cn(
        'group h-full flex flex-col items-center text-center',
        'bg-white rounded-2xl border border-gray-100 shadow-lg p-8',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-xl hover:border-aurora/40'
      )}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center w-20 h-20 rounded-2xl mb-5 bg-aurora/10 text-aurora"
        aria-hidden="true"
      >
        <Icon className="w-10 h-10" strokeWidth={1.5} />
      </div>

      <h2 className="text-xl font-bold text-negro mb-2">{title}</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">
        {description}
      </p>

      <a
        href={href}
        className={cn(
          'group/btn w-full inline-flex items-center justify-center px-6 py-3 rounded-full',
          'font-semibold text-sm bg-[#00C4A0] text-white',
          'transition-all duration-300 hover:shadow-lg hover:shadow-[#00C4A0]/50'
        )}
      >
        {actionLabel}
        <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
      </a>
    </div>
  );
};

export default RoleSelector;
