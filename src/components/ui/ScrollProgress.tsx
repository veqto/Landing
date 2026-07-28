'use client';

import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Barra de progreso de scroll fija en el borde superior.
 *
 * Anima solo `scaleX` sobre un elemento de altura fija, así que no fuerza
 * layout en ningún frame. Con reduced-motion se salta el spring y sigue el
 * scroll de forma directa (la barra informa, no decora).
 */
const ScrollProgress: React.FC = () => {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: reduced ? scrollYProgress : smoothed }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-aurora will-change-transform"
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
