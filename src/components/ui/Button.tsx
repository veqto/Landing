'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-[#00C4A0] text-white hover:shadow-lg hover:shadow-[#00C4A0]/50',
        secondary:
          'border-2 border-[#00C4A0] text-[#00C4A0] hover:bg-[#00C4A0] hover:text-white',
        /* CTA primario de conversión del diseño aprobado: naranja con texto oscuro. */
        naranja:
          'bg-naranja text-negro hover:bg-naranja-dark hover:shadow-lg hover:shadow-naranja/40',
        /* CTA secundario sobre fondos oscuros. */
        outlineLight:
          'border-2 border-white text-white hover:bg-white hover:text-negro',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  /** Destello diagonal periódico. Reservado a los CTA de conversión. */
  shine?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, shine = false, ...props }, ref) => {
    const reduced = useReducedMotion() ?? false;
    const withShine = shine && !reduced;

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          withShine && 'relative overflow-hidden',
          className
        )}
        whileHover={reduced ? undefined : { scale: 1.05 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
        {...props}
      >
        {withShine && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent will-change-transform"
            initial={{ x: '-150%' }}
            animate={{ x: '520%' }}
            transition={{
              duration: 1.1,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        )}
        {withShine ? <span className="relative">{children}</span> : children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
