'use client';

import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormField, { TextInput, SelectInput } from '@/components/forms/FormField';
import FormSection from '@/components/forms/FormSection';
import { vehicleBrands, vehicleClasses, formatCOP } from '@/data/colombianData';
import { cn } from '@/lib/utils';
import type { Step1Data, FormErrors } from './types';

interface Props {
  data: Step1Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step1Data>) => void;
}

const currentYear = new Date().getFullYear();
const modelYears = Array.from({ length: 30 }, (_, i) => ({
  value: String(currentYear + 1 - i),
  label: String(currentYear + 1 - i),
}));

const termOptions = [12, 24, 36, 48, 60, 72, 84];

const CreditStep1Vehicle: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();

  return (
    <div className="space-y-6">
      <FormSection title={locale === 'es' ? 'Tipo de solicitud' : 'Application type'}>
        {/* Tipo solicitud */}
        <FormField label={locale === 'es' ? '¿Qué deseas financiar?' : 'What do you want to finance?'} name="tipoSolicitud" error={errors.tipoSolicitud} required>
          <div className="flex gap-2">
            {[
              { value: 'vehiculo', label: locale === 'es' ? 'Vehículo' : 'Vehicle' },
              { value: 'moto', label: locale === 'es' ? 'Motocicleta' : 'Motorcycle' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ tipoSolicitud: opt.value })}
                className={cn(
                  'flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all border-2',
                  data.tipoSolicitud === opt.value
                    ? 'border-aurora bg-aurora/5 text-aurora'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>

        {/* Estado vehículo */}
        <FormField label={locale === 'es' ? 'Estado del vehículo' : 'Vehicle condition'} name="estadoVehiculo" error={errors.estadoVehiculo} required>
          <div className="flex gap-2">
            {[
              { value: 'nuevo', label: locale === 'es' ? 'Nuevo' : 'New' },
              { value: 'usado', label: locale === 'es' ? 'Usado' : 'Used' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ estadoVehiculo: opt.value })}
                className={cn(
                  'flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all border-2',
                  data.estadoVehiculo === opt.value
                    ? 'border-aurora bg-aurora/5 text-aurora'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Datos del vehículo' : 'Vehicle details'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Clase de vehículo' : 'Vehicle class'} name="tipoVehiculo" error={errors.tipoVehiculo} required>
            <SelectInput name="tipoVehiculo" value={data.tipoVehiculo} onChange={(v) => onChange({ tipoVehiculo: v })} options={vehicleClasses} error={!!errors.tipoVehiculo} />
          </FormField>

          <FormField label={locale === 'es' ? 'Marca' : 'Brand'} name="marca" error={errors.marca} required>
            <SelectInput name="marca" value={data.marca} onChange={(v) => onChange({ marca: v })} options={vehicleBrands.map((b) => ({ value: b, label: b }))} error={!!errors.marca} />
          </FormField>

          <FormField label={locale === 'es' ? 'Línea' : 'Model line'} name="linea" error={errors.linea} required>
            <TextInput name="linea" value={data.linea} onChange={(v) => onChange({ linea: v })} placeholder="Ej: Tracker, Logan, CX-5" error={!!errors.linea} />
          </FormField>

          <FormField label={locale === 'es' ? 'Modelo (año)' : 'Year'} name="modelo" error={errors.modelo} required>
            <SelectInput name="modelo" value={data.modelo} onChange={(v) => onChange({ modelo: v })} options={modelYears} error={!!errors.modelo} />
          </FormField>
        </div>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Condiciones del crédito' : 'Credit conditions'}>
        {/* Valor vehículo slider */}
        <FormField label={locale === 'es' ? 'Valor del vehículo' : 'Vehicle value'} name="valorVehiculo" error={errors.valorVehiculo} required>
          <div className="space-y-2">
            <div className="text-right text-lg font-bold text-aurora">{formatCOP(data.valorVehiculo)}</div>
            <input
              type="range"
              min={10000000}
              max={500000000}
              step={1000000}
              value={data.valorVehiculo}
              onChange={(e) => onChange({ valorVehiculo: parseInt(e.target.value) })}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>$10M</span>
              <span>$500M</span>
            </div>
          </div>
        </FormField>

        {/* Cuota inicial slider */}
        <FormField label={locale === 'es' ? 'Cuota inicial' : 'Down payment'} name="cuotaInicial">
          <div className="space-y-2">
            <div className="text-right text-lg font-bold text-aurora">
              {data.cuotaInicial}% ({formatCOP(data.valorVehiculo * data.cuotaInicial / 100)})
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={data.cuotaInicial}
              onChange={(e) => onChange({ cuotaInicial: parseInt(e.target.value) })}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>
        </FormField>

        {/* Plazo pills */}
        <FormField label={locale === 'es' ? 'Plazo deseado (meses)' : 'Desired term (months)'} name="plazoDeseado">
          <div className="flex gap-2 flex-wrap">
            {termOptions.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ plazoDeseado: m })}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                  data.plazoDeseado === m
                    ? 'bg-aurora text-white shadow-md shadow-aurora/40'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </FormField>

        {/* Código aliado */}
        <FormField label={locale === 'es' ? 'Código de aliado (opcional)' : 'Partner code (optional)'} name="codigoAliado">
          <TextInput name="codigoAliado" value={data.codigoAliado} onChange={(v) => onChange({ codigoAliado: v })} placeholder="Ej: VEQ-ALI-001" />
        </FormField>
      </FormSection>
    </div>
  );
};

export default CreditStep1Vehicle;
