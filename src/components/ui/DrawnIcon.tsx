'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrawnIconProps {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

/**
 * Ícono de lucide que se "dibuja" al entrar en viewport.
 *
 * Los iconos de lucide renderizan sus paths como elementos SVG planos, no como
 * componentes de motion, así que no se les puede animar `pathLength` desde
 * framer. El trazado se resuelve con una animación CSS de stroke-dashoffset
 * que se activa una sola vez, cuando framer detecta la entrada en viewport.
 *
 * Sin JS o con reduced-motion la clase nunca entra y el ícono se ve completo.
 */
const DrawnIcon: React.FC<DrawnIconProps> = ({
  icon: Icon,
  className,
  iconClassName,
}) => {
  const reduced = useReducedMotion() ?? false;
  const [drawn, setDrawn] = useState(false);

  return (
    <motion.span
      viewport={{ once: true, amount: 0.6 }}
      onViewportEnter={() => setDrawn(true)}
      className={cn(!reduced && drawn && 'draw-icon-run', className)}
    >
      <Icon className={iconClassName} strokeWidth={1.5} aria-hidden="true" />
    </motion.span>
  );
};

export default DrawnIcon;
