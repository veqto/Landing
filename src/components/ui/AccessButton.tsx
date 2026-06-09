'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AccessButtonProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const sizeClasses: Record<NonNullable<AccessButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

/**
 * Prominent primary call-to-action that navigates to the platform role
 * selector (/acceder). Mirrors the turquoise "primary" Button style but
 * renders an anchor (next/link) since Button only supports onClick.
 */
const AccessButton: React.FC<AccessButtonProps> = ({
  label,
  size = 'md',
  className,
  onClick,
}) => {
  return (
    <Link
      href="/acceder"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-full',
        'bg-[#00C4A0] text-white transition-all duration-300',
        'hover:shadow-lg hover:shadow-[#00C4A0]/50 hover:scale-105 active:scale-[0.98]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C4A0]',
        sizeClasses[size],
        className
      )}
    >
      {/* Lock icon */}
      <svg
        className="w-[1.1em] h-[1.1em] flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
      {label}
    </Link>
  );
};

export default AccessButton;
