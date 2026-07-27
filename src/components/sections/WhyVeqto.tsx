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
import { Check, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

const WhyVeqto: React.FC = () => {
  const { t } = useTranslation();

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
          <ChevronsRight
            className="pointer-events-none absolute -left-10 top-1/2 hidden h-10 w-10 -translate-y-1/2 text-aurora/50 xl:block"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <ChevronsLeft
            className="pointer-events-none absolute -right-10 top-1/2 hidden h-10 w-10 -translate-y-1/2 text-aurora/50 xl:block"
            strokeWidth={2.5}
            aria-hidden="true"
          />

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 rounded-3xl bg-white px-6 py-8 shadow-lg shadow-negro/5 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-negro/10"
          >
            {t.whyVeqto.items.map((item) => (
              <motion.li
                key={item}
                variants={fadeInUp}
                className="flex items-center gap-3 lg:flex-col lg:gap-3 lg:px-6 lg:text-center"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aurora/10 text-aurora">
                  <Check className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold leading-snug text-negro md:text-base">
                  {item}
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
