'use client';

/**
 * Problema — diseño aprobado (doc 114B §3.4)
 * --------------------------------------------------------------------------
 * Bloque claro que nombra las fricciones actuales antes de presentar la
 * solución. 4 items con ícono de línea, 2x2 en desktop y apilados en mobile.
 *
 * Lleva el ancla #que-es: junto con la sección "Un solo proceso" responde el
 * ítem "¿Qué es?" del navbar y el enlace "Nosotros" del footer.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, HelpCircle, MapPin } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

const ICONS = [FileText, Clock, HelpCircle, MapPin];

const Problem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="que-es" className="bg-cream py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold leading-tight tracking-tight text-aurora sm:text-4xl lg:text-5xl"
          >
            {t.problem.title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg font-semibold text-negro sm:text-xl"
          >
            {t.problem.intro}
          </motion.p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8"
        >
          {t.problem.items.map((item, index) => {
            const Icon = ICONS[index] ?? FileText;

            return (
              <motion.li
                key={item}
                variants={fadeInUp}
                className="flex items-center gap-4 rounded-2xl border border-negro/10 bg-white p-5 shadow-sm md:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-aurora/40 text-aurora">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="text-base leading-relaxed text-negro/80 md:text-lg">
                  {item}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
};

export default Problem;
