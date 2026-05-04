'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children, className }) => {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <div className="mb-2">
          <h3 className="text-base font-bold text-negro">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default FormSection;
