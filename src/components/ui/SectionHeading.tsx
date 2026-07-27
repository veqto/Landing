'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TitleSegment } from '@/i18n/translations';
import HighlightedText from '@/components/ui/HighlightedText';
import { useReveal, REVEAL_VIEWPORT } from '@/hooks/useReveal';

interface SectionHeadingProps {
  /** Texto plano, o segmentos cuando el titular lleva resaltado parcial. */
  title: string | TitleSegment[];
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  /** Línea de acento verde sobre el titular. El diseño nuevo la omite en varias secciones. */
  accent?: boolean;
  highlightClassName?: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = false,
  light = false,
  accent = true,
  highlightClassName = 'text-aurora',
  className,
}) => {
  const segments: TitleSegment[] =
    typeof title === 'string' ? [{ text: title }] : title;

  const { container, item } = useReveal();
  const itemVariants = item('up');

  return (
    <motion.div
      className={cn(
        'flex flex-col',
        centered && 'items-center',
        className
      )}
      variants={container(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
    >
      {/* Accent line */}
      {accent && (
        <motion.div
          className={cn(
            'h-1 w-16 rounded-full bg-[#00C4A0] mb-4',
            centered && 'mx-auto'
          )}
          variants={itemVariants}
        />
      )}

      {/* Title */}
      <motion.h2
        className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
          light ? 'text-white' : 'text-[#0A0F1E]',
          centered && 'text-center'
        )}
        variants={itemVariants}
      >
        <HighlightedText segments={segments} highlightClassName={highlightClassName} />
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className={cn(
            'mt-4 text-lg md:text-xl',
            light ? 'text-gray-300' : 'text-gray-600',
            centered && 'text-center',
            centered && 'max-w-2xl'
          )}
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
