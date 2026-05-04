'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  expandableText?: string;
  linkText?: string;
  linkHref?: string;
  error?: string;
  required?: boolean;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
  checked, onChange, label, expandableText, linkText, linkHref, error, required,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-1">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-aurora accent-aurora flex-shrink-0"
        />
        <span className="text-xs text-gray-600 leading-relaxed">
          {label}
          {required && <span className="text-coral ml-0.5">*</span>}
          {linkText && linkHref && (
            <>
              {' '}
              <a
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-aurora underline hover:text-aurora-dark"
                onClick={(e) => e.stopPropagation()}
              >
                {linkText}
              </a>
            </>
          )}
          {expandableText && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setExpanded(!expanded); }}
              className="inline-flex items-center gap-0.5 text-aurora hover:text-aurora-dark ml-1"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              <span className="text-[10px] underline">{expanded ? 'Ver menos' : 'Ver más'}</span>
            </button>
          )}
        </span>
      </label>

      {expandableText && expanded && (
        <div className={cn(
          'ml-7 p-3 rounded-lg bg-gray-50 border border-gray-100',
          'text-[11px] text-gray-500 leading-relaxed max-h-40 overflow-y-auto'
        )}>
          {expandableText}
        </div>
      )}

      {error && <p className="text-red-500 text-xs ml-7">{error}</p>}
    </div>
  );
};

export default ConsentCheckbox;
