'use client';

/**
 * Solución "Un solo proceso" — diseño aprobado (doc 114B §3.5)
 * --------------------------------------------------------------------------
 * Única sección con el verde de marca a fondo pleno. La foto sangra desde el
 * borde izquierdo en lg+; en mobile va centrada y contenida (la imagen es
 * vertical 1024x1533, a ancho completo resultaría desproporcionada).
 *
 * Las 4 tarjetas blancas llevan la esquina verde doblada del diseño, resuelta
 * con la utilidad `.corner-fold` (clip-path) rotada según la esquina.
 */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';

/** Esquina doblada por posición en el grid 2x2: TL, TR, BL, BR. */
const FOLD_CORNERS = [
  'left-0 top-0 -rotate-90',
  'right-0 top-0',
  'left-0 bottom-0 rotate-180',
  'right-0 bottom-0 rotate-90',
];

const Solution: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-aurora">
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[38fr_62fr] lg:gap-4 lg:px-8 lg:py-0">
        {/* Foto: sangra por el borde izquierdo e inferior en lg+ */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <Image
            src="/images/landing/solucion-hombre-celular.png"
            alt={t.solution.imageAlt}
            width={1024}
            height={1533}
            sizes="(max-width: 1024px) 16rem, 38vw"
            className="h-auto w-56 max-w-full sm:w-64 lg:-ml-6 lg:w-full lg:max-w-md xl:-ml-12"
          />
        </motion.div>

        {/* Texto + tarjetas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="lg:py-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            <span className="block text-white">{t.solution.titleTop}</span>
            <span className="block text-negro">{t.solution.titleBottom}</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {t.solution.description}
          </motion.p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
            {t.solution.cards.map((card, index) => (
              <motion.article
                key={card.title}
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg shadow-negro/10"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'corner-fold absolute h-10 w-10 bg-aurora',
                    FOLD_CORNERS[index % FOLD_CORNERS.length]
                  )}
                />
                <h3 className="text-lg font-bold text-negro">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-negro/70 sm:text-base">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
