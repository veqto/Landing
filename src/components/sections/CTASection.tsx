'use client';

/**
 * CTA final — diseño aprobado (doc 114B §3.10)
 * --------------------------------------------------------------------------
 * Cierre oscuro con piso de malla verde: línea decorativa, declaración de
 * posicionamiento, párrafo de apoyo y un único botón naranja. Sustituye el
 * cierre en degradado verde con dos botones del v2.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';
import { useModal } from '@/components/ModalContext';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MeshFloor from '@/components/ui/MeshFloor';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

const CTASection: React.FC = () => {
  const { t } = useTranslation();
  const { openCreditModal } = useModal();

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-negro py-20 md:py-28"
      aria-label="Llamada a la acción"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-aurora/15 blur-3xl" />
      </div>

      <MeshFloor className="absolute inset-x-0 bottom-0 z-0 h-24 w-full opacity-60 sm:h-32 lg:h-44" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-8 block h-1 w-20 rounded-full bg-aurora"
            aria-hidden="true"
          />

          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {t.cta.title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10 w-full sm:w-auto">
            <Button
              variant="naranja"
              size="lg"
              className="w-full px-10 text-base sm:w-auto"
              onClick={openCreditModal}
            >
              {t.cta.button}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
