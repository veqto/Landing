'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'flex flex-col',
        centered && 'items-center',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
    >
      {/* Accent line */}
      <motion.div
        className={cn(
          'h-1 w-16 rounded-full bg-[#00C4A0] mb-4',
          centered && 'mx-auto'
        )}
        variants={itemVariants}
      />

      {/* Title */}
      <motion.h2
        className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
          light ? 'text-white' : 'text-[#0A0F1E]',
          centered && 'text-center'
        )}
        variants={itemVariants}
      >
        {title}
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
