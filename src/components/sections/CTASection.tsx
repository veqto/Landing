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
import { useReveal, REVEAL_VIEWPORT } from '@/hooks/useReveal';

const CTASection: React.FC = () => {
  const { t } = useTranslation();
  const { openCreditModal } = useModal();
  const { reduced, container, item } = useReveal();

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
          viewport={REVEAL_VIEWPORT}
          variants={container()}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.span
            variants={item()}
            className="mb-8 block h-1 w-20 rounded-full bg-aurora"
            aria-hidden="true"
          />

          <motion.h2
            variants={item()}
            className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {t.cta.title}
          </motion.h2>

          <motion.p
            variants={item()}
            className="mt-6 text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div variants={item()} className="relative mt-10 w-full sm:w-auto">
            {/* El "pulso de sombra" es un halo naranja desenfocado detrás del
                botón: anima opacity y scale en vez de box-shadow, así no
                repinta la sombra en cada frame. */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-naranja/50 blur-xl will-change-transform"
              animate={
                reduced
                  ? undefined
                  : { opacity: [0.3, 0.7, 0.3], scale: [0.96, 1.08, 0.96] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Button
              variant="naranja"
              size="lg"
              shine
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
