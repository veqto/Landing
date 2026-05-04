'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const labelClass = 'block text-sm font-semibold text-negro mb-1.5';

export const inputClass = (hasError: boolean) =>
  cn(
    'w-full px-4 py-3 rounded-xl border-2 bg-white text-negro text-sm transition-colors duration-200 outline-none',
    hasError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-aurora'
  );

const FormField: React.FC<FormFieldProps> = ({ label, name, error, required, children, className }) => {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="text-coral ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

/* ── Reusable sub-components ── */

interface TextInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  inputMode?: 'text' | 'numeric' | 'email' | 'tel';
  maxLength?: number;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  name, value, onChange, placeholder, type = 'text', inputMode, maxLength, error, disabled, className,
}) => (
  <input
    id={name}
    name={name}
    type={type}
    inputMode={inputMode}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    maxLength={maxLength}
    disabled={disabled}
    className={cn(inputClass(!!error), className)}
  />
);

interface SelectInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name, value, onChange, options, placeholder = 'Selecciona...', error, disabled,
}) => (
  <select
    id={name}
    name={name}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className={inputClass(!!error)}
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

interface PhoneInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  placeholder?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  name, value, onChange, error, placeholder = '3101234567',
}) => (
  <div className="flex">
    <span className="inline-flex items-center px-3 rounded-l-xl border-2 border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 font-medium">
      +57
    </span>
    <input
      id={name}
      name={name}
      type="tel"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      className={cn(inputClass(!!error), 'rounded-l-none')}
      placeholder={placeholder}
      maxLength={10}
    />
  </div>
);

export default FormField;
