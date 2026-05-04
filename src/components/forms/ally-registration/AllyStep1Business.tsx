'use client';

import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormField, { TextInput, SelectInput } from '@/components/forms/FormField';
import FormSection from '@/components/forms/FormSection';
import { departments, getCitiesForDepartment, allyBusinessTypes } from '@/data/colombianData';
import { cn } from '@/lib/utils';
import type { Step1Data, FormErrors } from './types';

interface Props {
  data: Step1Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step1Data>) => void;
}

const yearsOptions = [
  { value: 'menos_1', label: 'Menos de 1 año' },
  { value: '1_3', label: '1 a 3 años' },
  { value: '3_5', label: '3 a 5 años' },
  { value: '5_10', label: '5 a 10 años' },
  { value: 'mas_10', label: 'Más de 10 años' },
];

const AllyStep1Business: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();
  const cities = getCitiesForDepartment(data.departamento);

  return (
    <div className="space-y-6">
      <FormSection title={locale === 'es' ? 'Datos del establecimiento' : 'Business details'}>
        <FormField label={locale === 'es' ? 'Nombre del establecimiento' : 'Business name'} name="nombreEstablecimiento" error={errors.nombreEstablecimiento} required>
          <TextInput name="nombreEstablecimiento" value={data.nombreEstablecimiento} onChange={(v) => onChange({ nombreEstablecimiento: v })} placeholder="Compraventa AutoPlus" error={!!errors.nombreEstablecimiento} />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'NIT o cédula del representante' : 'Tax ID'} name="nit" error={errors.nit} required>
            <TextInput name="nit" value={data.nit} onChange={(v) => onChange({ nit: v })} placeholder="900.123.456-7" error={!!errors.nit} />
          </FormField>
          <FormField label={locale === 'es' ? 'Tipo de negocio' : 'Business type'} name="tipoNegocio" error={errors.tipoNegocio} required>
            <SelectInput name="tipoNegocio" value={data.tipoNegocio} onChange={(v) => onChange({ tipoNegocio: v })} options={allyBusinessTypes} error={!!errors.tipoNegocio} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Departamento' : 'Department'} name="departamento" error={errors.departamento} required>
            <SelectInput name="departamento" value={data.departamento} onChange={(v) => onChange({ departamento: v, ciudad: '' })} options={departments.map((d) => ({ value: d.name, label: d.name }))} error={!!errors.departamento} />
          </FormField>
          <FormField label={locale === 'es' ? 'Ciudad' : 'City'} name="ciudad" error={errors.ciudad} required>
            <SelectInput name="ciudad" value={data.ciudad} onChange={(v) => onChange({ ciudad: v })} options={cities.map((c) => ({ value: c, label: c }))} disabled={!data.departamento} error={!!errors.ciudad} />
          </FormField>
        </div>

        <FormField label={locale === 'es' ? 'Dirección' : 'Address'} name="direccion">
          <TextInput name="direccion" value={data.direccion} onChange={(v) => onChange({ direccion: v })} placeholder="Cra 7 #45-12, Local 3" />
        </FormField>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Información del negocio' : 'Business information'}>
        <FormField label={locale === 'es' ? 'Años de funcionamiento' : 'Years in operation'} name="anosFuncionamiento">
          <SelectInput name="anosFuncionamiento" value={data.anosFuncionamiento} onChange={(v) => onChange({ anosFuncionamiento: v })} options={yearsOptions} />
        </FormField>

        <FormField label={locale === 'es' ? 'Marcas principales que manejas' : 'Main vehicle brands'} name="marcasVehiculos">
          <TextInput name="marcasVehiculos" value={data.marcasVehiculos} onChange={(v) => onChange({ marcasVehiculos: v })} placeholder="Ej: Chevrolet, Renault, Mazda" />
        </FormField>
      </FormSection>
    </div>
  );
};

export default AllyStep1Business;
