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

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';
import { useReveal, REVEAL_VIEWPORT } from '@/hooks/useReveal';
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
  const { reduced, isDesktop, container, item, hoverLift } = useReveal();

  // Parallax de la foto: solo en desktop y solo si el usuario acepta
  // movimiento. El rango colapsa a [0, 0] en el resto de casos, así que el
  // MotionValue existe siempre y no hay ramas de hooks.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxRange: [number, number] =
    isDesktop && !reduced ? [20, -20] : [0, 0];
  const photoY = useTransform(scrollYProgress, [0, 1], parallaxRange);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-aurora">
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[38fr_62fr] lg:gap-4 lg:px-8 lg:py-0">
        {/* Foto: sangra por el borde izquierdo e inferior en lg+ */}
        {/* Dos capas a propósito: la de fuera hace el reveal (opacity + x) y la
            de dentro el parallax (y). Si compartieran nodo, el `y: 0` del
            estado visible pisaría el MotionValue del scroll. */}
        <motion.div
          variants={item('left')}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          className="flex justify-center lg:justify-start"
        >
          <motion.div
            style={{ y: photoY }}
            className="w-full will-change-transform"
          >
            <Image
              src="/images/landing/solucion-hombre-celular.png"
              alt={t.solution.imageAlt}
              width={1024}
              height={1533}
              sizes="(max-width: 1024px) 16rem, 38vw"
              className="mx-auto h-auto w-56 max-w-full sm:w-64 lg:mx-0 lg:-ml-6 lg:w-full lg:max-w-md xl:-ml-12"
            />
          </motion.div>
        </motion.div>

        {/* Texto + tarjetas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={container()}
          className="lg:py-20"
        >
          <motion.h2
            variants={item()}
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            <span className="block text-white">{t.solution.titleTop}</span>
            <span className="block text-negro">{t.solution.titleBottom}</span>
          </motion.h2>

          <motion.p
            variants={item()}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {t.solution.description}
          </motion.p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
            {t.solution.cards.map((card, index) => (
              <motion.article
                key={card.title}
                variants={item()}
                whileHover={hoverLift(6)}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg shadow-negro/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-negro/25"
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
