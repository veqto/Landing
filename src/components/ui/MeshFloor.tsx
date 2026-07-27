'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface MeshFloorProps {
  className?: string;
}

const VIEW_W = 1200;
const VIEW_H = 260;
const ROWS = 8;
const COLS = 20;
const SAMPLES = 24;

/**
 * Perfil de la superficie: las filas se comprimen hacia el horizonte (arriba)
 * y ondulan con una senoidal cuya amplitud crece en primer plano.
 */
const rowY = (row: number) => VIEW_H * Math.pow(row / ROWS, 2.1);

const waveOffset = (row: number, x: number) => {
  const amplitude = 2 + (row / ROWS) * 14;
  return amplitude * Math.sin((x / VIEW_W) * Math.PI * 3 + row * 0.55);
};

const surfaceY = (row: number, x: number) => rowY(row) + waveOffset(row, x);

const horizontalPath = (row: number) =>
  Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const x = (VIEW_W / SAMPLES) * i;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${surfaceY(row, x).toFixed(1)}`;
  }).join(' ');

/**
 * Las verticales salen de un punto de fuga por encima del horizonte y se abren
 * hacia el borde inferior, siguiendo la misma superficie ondulada.
 */
const verticalPath = (col: number) => {
  const vanishX = VIEW_W / 2;
  const targetX = -VIEW_W * 0.35 + (VIEW_W * 1.7 * col) / COLS;

  return Array.from({ length: ROWS + 1 }, (_, row) => {
    const t = row / ROWS;
    const x = vanishX + (targetX - vanishX) * Math.pow(t, 1.35);
    return `${row === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${surfaceY(row, x).toFixed(1)}`;
  }).join(' ');
};

/**
 * Malla ondulada verde tipo wireframe que hace de "piso" en las secciones
 * oscuras (hero y CTA final) del diseño aprobado. Puramente decorativa.
 */
const MeshFloor: React.FC<MeshFloorProps> = ({ className }) => {
  // El componente se monta dos veces (hero y CTA final): el id del gradiente
  // debe ser único o el segundo SVG referenciaría el <defs> del primero.
  const gradientId = useId();

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className={cn('pointer-events-none select-none', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00c4a0" stopOpacity="0" />
          <stop offset="45%" stopColor="#00c4a0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6cdac7" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <g
        stroke={`url(#${gradientId})`}
        fill="none"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {Array.from({ length: COLS + 1 }, (_, col) => (
          <path key={`v-${col}`} d={verticalPath(col)} />
        ))}
        {Array.from({ length: ROWS + 1 }, (_, row) => (
          <path key={`h-${row}`} d={horizontalPath(row)} />
        ))}
      </g>
    </svg>
  );
};

export default MeshFloor;
