'use client';

import React from 'react';
import type { TitleSegment } from '@/i18n/translations';

interface HighlightedTextProps {
  /** Segmentos del titular. Se concatenan literalmente: los espacios van dentro del texto. */
  segments: TitleSegment[];
  /** Clases aplicadas SOLO a los segmentos con `highlight: true`. */
  highlightClassName?: string;
}

/**
 * Renderiza un titular con resaltado parcial a partir de segmentos explícitos.
 *
 * Reemplaza el mecanismo anterior (`highlightWords` + `word.includes(hw)`), que
 * comparaba palabra por palabra y producía falsos positivos en EN — p.ej. la
 * palabra clave "Credit" resaltaba también dentro de "Credits" o "Accredited".
 * Con segmentos, cada traducción decide exactamente qué se resalta y el
 * problema desaparece por construcción en vez de caso por caso.
 */
const HighlightedText: React.FC<HighlightedTextProps> = ({
  segments,
  highlightClassName = 'text-aurora',
}) => (
  <>
    {segments.map((segment, i) =>
      segment.highlight ? (
        <span key={i} className={highlightClassName}>
          {segment.text}
        </span>
      ) : (
        <React.Fragment key={i}>{segment.text}</React.Fragment>
      )
    )}
  </>
);

/** Texto plano del titular, para `aria-label`, `title` y metadatos. */
export const segmentsToText = (segments: TitleSegment[]): string =>
  segments.map((segment) => segment.text).join('');

export default HighlightedText;
