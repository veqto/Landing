'use client';

/**
 * ¿Por qué elegir Veqto? — diseño aprobado (doc 114B §3.6)
 * --------------------------------------------------------------------------
 * Franja blanca con 4 argumentos y check verde, flanqueada por chevrons
 * decorativos. En desktop van en 4 columnas separadas por divisores; en
 * mobile caen a 2x2 sin divisores y sin chevrons.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronsRight, ChevronsLeft } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { useReveal, REVEAL_VIEWPORT } from '@/hooks/useReveal';

/**
 * Check dibujado con `pathLength`. Se usa un path propio en vez del ícono de
 * lucide porque solo un `motion.path` permite animar el trazado desde framer.
 */
const DrawnCheck: React.FC<{ reduced: boolean }> = ({ reduced }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <motion.path
      d="M5 13l4 4L19 7"
      variants={{
        hidden: reduced ? { opacity: 0 } : { pathLength: 0, opacity: 0 },
        visible: reduced
          ? { opacity: 1, transition: { duration: 0.3 } }
          : {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.45, ease: 'easeOut' },
            },
      }}
    />
  </motion.svg>
);

const WhyVeqto: React.FC = () => {
  const { t } = useTranslation();
  const { reduced, container, item } = useReveal();

  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t.whyVeqto.titleSegments}
          centered
          accent={false}
          className="mb-10 md:mb-14"
        />

        <div className="relative">
          {/* Chevrons: deriva horizontal en loop, apuntando hacia la franja. */}
          <motion.span
            className="pointer-events-none absolute -left-10 top-1/2 hidden -translate-y-1/2 text-aurora/50 will-change-transform xl:block"
            animate={reduced ? undefined : { x: [0, 6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronsRight className="h-10 w-10" strokeWidth={2.5} aria-hidden="true" />
          </motion.span>
          <motion.span
            className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 text-aurora/50 will-change-transform xl:block"
            animate={reduced ? undefined : { x: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronsLeft className="h-10 w-10" strokeWidth={2.5} aria-hidden="true" />
          </motion.span>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={container(0.14)}
            className="grid grid-cols-1 gap-6 rounded-3xl bg-white px-6 py-8 shadow-lg shadow-negro/5 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-negro/10"
          >
            {t.whyVeqto.items.map((label) => (
              <motion.li
                key={label}
                variants={item()}
                className="flex items-center gap-3 lg:flex-col lg:gap-3 lg:px-6 lg:text-center"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aurora/10 text-aurora">
                  <DrawnCheck reduced={reduced} />
                </span>
                <span className="text-sm font-semibold leading-snug text-negro md:text-base">
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
};

export default WhyVeqto;
