'use client';

/**
 * Sistema único de scroll-reveal de la landing.
 * --------------------------------------------------------------------------
 * Todas las secciones usan estas variantes para que el ritmo de entrada sea
 * el mismo en toda la página: fade + subida de 24px, stagger de ~90ms.
 *
 * Reglas que aplica el hook por su cuenta:
 * - Solo anima `opacity` y `transform` (y/x/scale). Nunca width/height/top.
 * - Con `prefers-reduced-motion` degrada a fade simple, sin desplazamiento
 *   ni stagger.
 * - En viewports pequeños acorta duraciones y stagger (menos tiempo con
 *   trabajo de composición en pantallas que suelen tener menos CPU).
 */

import type { Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/** Reveals de una sola pasada: nunca se repiten al volver a entrar en viewport. */
export const REVEAL_VIEWPORT = { once: true, amount: 0.25 } as const;

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export type RevealDirection = 'up' | 'left' | 'right';

export function useReveal() {
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const duration = reduced ? 0.35 : isDesktop ? 0.6 : 0.45;
  const stagger = reduced ? 0 : isDesktop ? 0.1 : 0.07;

  /** Orquestador. Mantiene opacity 1 para no encadenar dos fades sobre el mismo píxel. */
  const container = (staggerSeconds: number = stagger): Variants => ({
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : staggerSeconds,
        delayChildren: 0.05,
      },
    },
  });

  const item = (direction: RevealDirection = 'up'): Variants => {
    if (reduced) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration } },
      };
    }

    const offset =
      direction === 'up'
        ? { y: 24 }
        : { x: direction === 'left' ? -32 : 32 };

    return {
      hidden: { opacity: 0, ...offset },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration, ease: EASE_OUT },
      },
    };
  };

  /** Pop con spring para los elementos que "se encienden" (círculos de pasos). */
  const pop = (): Variants =>
    reduced
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration } } }
      : {
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 420, damping: 18, mass: 0.6 },
          },
        };

  /** Elevación al hover. Vacío con reduced-motion o sin puntero fino. */
  const hoverLift = (distance: number = 6) =>
    reduced || !isDesktop ? undefined : { y: -distance };

  return { reduced, isDesktop, duration, stagger, container, item, pop, hoverLift };
}
