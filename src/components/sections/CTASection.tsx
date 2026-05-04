'use client';

import React, { useMemo, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';
import { useModal } from '@/components/ModalContext';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const emptySubscribe = () => () => {};

const CTASection: React.FC = () => {
  const { t } = useTranslation();
  const { openCreditModal, openAllyModal } = useModal();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Stable particle positions (deterministic)
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 4.7 + 3) % 100,
      y: (i * 5.3 + 7) % 100,
      delay: i * 0.1,
    }));
  }, []);

  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
  };

  return (
    <section
      id="contacto"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Llamada a la acción"
    >
      {/* ── All decorative backgrounds: z-0, pointer-events-none ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-aurora via-[#009B7F] to-[#006B59]" />

        {/* Aurora Glow */}
        <div className="absolute top-0 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-aurora rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#00F5D4] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" />

        {/* Floating Shapes — small, pushed to corners */}
        <motion.div
          className="absolute rounded-full bg-white w-20 h-20 sm:w-32 sm:h-32 will-change-transform"
          style={{ top: '8%', left: '3%', opacity: 0.04 }}
          animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full bg-white w-16 h-16 sm:w-24 sm:h-24 will-change-transform"
          style={{ top: '65%', right: '5%', opacity: 0.03 }}
          animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full bg-white w-12 h-12 sm:w-16 sm:h-16 will-change-transform"
          style={{ bottom: '15%', left: '12%', opacity: 0.04 }}
          animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
          transition={{ duration: 7, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Particles (client-only) */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 bg-white rounded-full will-change-transform"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Content layer: z-10, relative ── */}
      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center text-center py-20 lg:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={headlineVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
          >
            {t.cta.title}
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            className="text-lg sm:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed"
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div
            variants={buttonContainerVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center items-center"
          >
            <Button
              variant="primary"
              size="lg"
              className={cn(
                'w-full sm:w-auto min-w-48',
                'bg-white text-aurora hover:bg-gray-100 hover:shadow-xl hover:shadow-white/30'
              )}
              onClick={openCreditModal}
            >
              {t.cta.button1}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className={cn(
                'w-full sm:w-auto min-w-48',
                'border-2 border-white text-white hover:bg-white hover:text-aurora'
              )}
              onClick={openAllyModal}
            >
              {t.cta.button2}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-white/70 text-sm"
          >
            {t.cta.trustBadge}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
