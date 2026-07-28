'use client';

/**
 * Cómo funciona — 4 pasos (doc 114B §3.7)
 * --------------------------------------------------------------------------
 * Reemplaza la línea de tiempo de 3 pasos por el bloque oscuro del diseño:
 * foto + arco decorativo verde a la izquierda, 4 pasos numerados en 2x2 a la
 * derecha. Es el destino del CTA "Conocer cómo funciona" del hero (#proceso).
 */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { useReveal, REVEAL_VIEWPORT } from '@/hooks/useReveal';

/** Arco verde/blanco que enmarca la foto en desktop. Decorativo. */
const DecorativeArc: React.FC = () => (
  <svg
    viewBox="0 0 200 600"
    preserveAspectRatio="none"
    className="pointer-events-none absolute -left-6 top-0 hidden h-full w-24 lg:block"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M170 20 C 30 170, 30 430, 170 580"
      stroke="#00c4a0"
      strokeWidth="14"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M180 80 C 80 190, 80 410, 180 520"
      stroke="#ffffff"
      strokeOpacity="0.45"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const CreditFlow: React.FC = () => {
  const { t } = useTranslation();
  const { container, item, pop, hoverLift } = useReveal();

  // 150ms entre pasos: los círculos se "encienden" en orden 1-2-3-4.
  const stepsContainer = container(0.15);
  const stepItem = item('up');
  const circlePop = pop();

  const steps = Object.keys(t.creditFlow.steps).map((key) => ({
    number: key,
    ...t.creditFlow.steps[key],
  }));

  return (
    <section id="proceso" className="relative overflow-hidden bg-negro py-20 md:py-28">
      <Container className="relative">
        <SectionHeading
          title={t.creditFlow.titleSegments}
          centered
          light
          accent={false}
          highlightClassName="text-aurora block"
          className="mb-14 md:mb-20"
        />

        <div className="grid items-center gap-12 lg:grid-cols-[35fr_65fr] lg:gap-10">
          {/* Foto + arco decorativo */}
          <motion.div
            variants={item('left')}
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            className="relative flex justify-center lg:justify-start"
          >
            <DecorativeArc />
            <Image
              src="/images/landing/pasos-mujer-llaves.png"
              alt={t.creditFlow.imageAlt}
              width={1672}
              height={941}
              sizes="(max-width: 1024px) 90vw, 35vw"
              className="relative h-auto w-full max-w-md lg:max-w-none"
            />
          </motion.div>

          {/* 4 pasos numerados */}
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={stepsContainer}
            className="grid gap-6 sm:grid-cols-2 sm:gap-8"
          >
            {steps.map((step) => (
              <motion.li
                key={step.number}
                variants={stepItem}
                whileHover={hoverLift(4)}
                className="group flex gap-4"
              >
                <motion.span
                  variants={circlePop}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-aurora shadow-lg shadow-aurora/20 will-change-transform"
                >
                  {step.number}
                </motion.span>
                <div>
                  <h3 className="text-base font-bold text-white md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-400 md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
};

export default CreditFlow;
