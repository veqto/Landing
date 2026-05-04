'use client';

import React, { useMemo } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormField, { TextInput, SelectInput } from '@/components/forms/FormField';
import FormSection from '@/components/forms/FormSection';
import { employmentTypes, contractTypes, formatCOP } from '@/data/colombianData';
import { inputClass } from '@/components/forms/FormField';
import { cn } from '@/lib/utils';
import type { Step4Data, FormErrors } from './types';

interface Props {
  data: Step4Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step4Data>) => void;
}

const CurrencyField: React.FC<{
  name: string;
  value: number;
  onChange: (value: number) => void;
  label: string;
  error?: string;
}> = ({ name, value, onChange, label, error }) => (
  <FormField label={label} name={name} error={error}>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
      <input
        id={name}
        type="text"
        inputMode="numeric"
        value={value ? value.toLocaleString('es-CO') : ''}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, '');
          onChange(parseInt(raw) || 0);
        }}
        className={cn(inputClass(!!error), 'pl-7')}
        placeholder="0"
      />
    </div>
  </FormField>
);

const CreditStep4Financial: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();

  const totalIngresos = useMemo(() =>
    data.salarioFijo + data.ingresosVariable + data.pension + data.honorarios + data.arrendamientos + data.otrosIngresos,
    [data.salarioFijo, data.ingresosVariable, data.pension, data.honorarios, data.arrendamientos, data.otrosIngresos]
  );

  const totalEgresos = useMemo(() =>
    data.gastoArriendo + data.gastosFamiliares + data.cuotasTarjetas + data.otrosCreditos + data.otrosEgresos,
    [data.gastoArriendo, data.gastosFamiliares, data.cuotasTarjetas, data.otrosCreditos, data.otrosEgresos]
  );

  const capacidadPago = totalIngresos - totalEgresos;

  return (
    <div className="space-y-6">
      <FormSection title={locale === 'es' ? 'Información laboral' : 'Employment information'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Actividad económica' : 'Economic activity'} name="actividadEconomica" error={errors.actividadEconomica} required>
            <SelectInput name="actividadEconomica" value={data.actividadEconomica} onChange={(v) => onChange({ actividadEconomica: v })} options={employmentTypes} error={!!errors.actividadEconomica} />
          </FormField>
          <FormField label={locale === 'es' ? 'Fecha de inicio actividad' : 'Activity start date'} name="inicioActividad" error={errors.inicioActividad} required>
            <input
              id="inicioActividad"
              type="date"
              value={data.inicioActividad}
              onChange={(e) => onChange({ inicioActividad: e.target.value })}
              className={inputClass(!!errors.inicioActividad)}
              max={new Date().toISOString().split('T')[0]}
            />
          </FormField>
          <FormField label={locale === 'es' ? 'Cargo actual' : 'Current position'} name="cargo">
            <TextInput name="cargo" value={data.cargo} onChange={(v) => onChange({ cargo: v })} placeholder="Ej: Gerente, Analista" />
          </FormField>
          <FormField label={locale === 'es' ? 'Tipo de contrato' : 'Contract type'} name="tipoContrato">
            <SelectInput name="tipoContrato" value={data.tipoContrato} onChange={(v) => onChange({ tipoContrato: v })} options={contractTypes} />
          </FormField>
        </div>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Datos de la empresa' : 'Company details'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Nombre de la empresa' : 'Company name'} name="nombreEmpresa" error={errors.nombreEmpresa} required>
            <TextInput name="nombreEmpresa" value={data.nombreEmpresa} onChange={(v) => onChange({ nombreEmpresa: v })} placeholder="Empresa S.A.S." error={!!errors.nombreEmpresa} />
          </FormField>
          <FormField label={locale === 'es' ? 'Teléfono empresa' : 'Company phone'} name="telefonoEmpresa">
            <TextInput name="telefonoEmpresa" value={data.telefonoEmpresa} onChange={(v) => onChange({ telefonoEmpresa: v.replace(/\D/g, '') })} placeholder="6012345678" inputMode="numeric" />
          </FormField>
          <FormField label={locale === 'es' ? 'Dirección empresa' : 'Company address'} name="direccionEmpresa">
            <TextInput name="direccionEmpresa" value={data.direccionEmpresa} onChange={(v) => onChange({ direccionEmpresa: v })} placeholder="Calle 100 #19-54" />
          </FormField>
          <FormField label={locale === 'es' ? 'Ciudad empresa' : 'Company city'} name="ciudadEmpresa">
            <TextInput name="ciudadEmpresa" value={data.ciudadEmpresa} onChange={(v) => onChange({ ciudadEmpresa: v })} placeholder="Bogotá" />
          </FormField>
        </div>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Ingresos mensuales' : 'Monthly income'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CurrencyField name="salarioFijo" label={locale === 'es' ? 'Salario fijo' : 'Fixed salary'} value={data.salarioFijo} onChange={(v) => onChange({ salarioFijo: v })} error={errors.salarioFijo} />
          <CurrencyField name="ingresosVariable" label={locale === 'es' ? 'Ingresos variables' : 'Variable income'} value={data.ingresosVariable} onChange={(v) => onChange({ ingresosVariable: v })} />
          <CurrencyField name="pension" label={locale === 'es' ? 'Pensión' : 'Pension'} value={data.pension} onChange={(v) => onChange({ pension: v })} />
          <CurrencyField name="honorarios" label={locale === 'es' ? 'Honorarios' : 'Fees'} value={data.honorarios} onChange={(v) => onChange({ honorarios: v })} />
          <CurrencyField name="arrendamientos" label={locale === 'es' ? 'Arrendamientos' : 'Rental income'} value={data.arrendamientos} onChange={(v) => onChange({ arrendamientos: v })} />
          <CurrencyField name="otrosIngresos" label={locale === 'es' ? 'Otros ingresos' : 'Other income'} value={data.otrosIngresos} onChange={(v) => onChange({ otrosIngresos: v })} />
        </div>
        <div className="text-right bg-aurora/5 rounded-xl px-4 py-2">
          <span className="text-sm text-gray-600">{locale === 'es' ? 'Total ingresos:' : 'Total income:'}</span>
          <span className="text-lg font-bold text-aurora ml-2">{formatCOP(totalIngresos)}</span>
        </div>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Egresos mensuales' : 'Monthly expenses'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CurrencyField name="gastoArriendo" label={locale === 'es' ? 'Arriendo / Cuota vivienda' : 'Rent / Mortgage'} value={data.gastoArriendo} onChange={(v) => onChange({ gastoArriendo: v })} />
          <CurrencyField name="gastosFamiliares" label={locale === 'es' ? 'Gastos familiares' : 'Family expenses'} value={data.gastosFamiliares} onChange={(v) => onChange({ gastosFamiliares: v })} error={errors.gastosFamiliares} />
          <CurrencyField name="cuotasTarjetas" label={locale === 'es' ? 'Cuotas tarjetas de crédito' : 'Credit card payments'} value={data.cuotasTarjetas} onChange={(v) => onChange({ cuotasTarjetas: v })} />
          <CurrencyField name="otrosCreditos" label={locale === 'es' ? 'Otros créditos' : 'Other loans'} value={data.otrosCreditos} onChange={(v) => onChange({ otrosCreditos: v })} />
          <CurrencyField name="otrosEgresos" label={locale === 'es' ? 'Otros egresos' : 'Other expenses'} value={data.otrosEgresos} onChange={(v) => onChange({ otrosEgresos: v })} />
        </div>
        <div className="text-right bg-gray-50 rounded-xl px-4 py-2">
          <span className="text-sm text-gray-600">{locale === 'es' ? 'Total egresos:' : 'Total expenses:'}</span>
          <span className="text-lg font-bold text-gray-700 ml-2">{formatCOP(totalEgresos)}</span>
        </div>
      </FormSection>

      {/* Capacity summary */}
      <div className={cn(
        'rounded-xl px-4 py-3 border-2',
        capacidadPago > 0 ? 'bg-aurora/5 border-aurora/30' : 'bg-red-50 border-red-200'
      )}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-negro">{locale === 'es' ? 'Capacidad de pago mensual:' : 'Monthly payment capacity:'}</span>
          <span className={cn('text-xl font-bold', capacidadPago > 0 ? 'text-aurora' : 'text-red-500')}>
            {formatCOP(capacidadPago)}
          </span>
        </div>
        {capacidadPago <= 0 && (
          <p className="text-xs text-red-500 mt-1">
            {locale === 'es' ? 'Los egresos superan los ingresos. Revisa la información.' : 'Expenses exceed income. Please review.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreditStep4Financial;
