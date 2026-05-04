'use client';

import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormField, { TextInput, SelectInput, PhoneInput } from '@/components/forms/FormField';
import FormSection from '@/components/forms/FormSection';
import { departments, getCitiesForDepartment, housingTypes } from '@/data/colombianData';
import { inputClass } from '@/components/forms/FormField';
import { cn } from '@/lib/utils';
import type { Step3Data, FormErrors } from './types';

interface Props {
  data: Step3Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step3Data>) => void;
}

const estratoOptions = [1, 2, 3, 4, 5, 6];
const residenceTimeOptions = [
  { value: 'menos_1', label: 'Menos de 1 año' },
  { value: '1_3', label: '1 a 3 años' },
  { value: '3_5', label: '3 a 5 años' },
  { value: 'mas_5', label: 'Más de 5 años' },
];

const CreditStep3Residence: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();
  const cities = getCitiesForDepartment(data.departamentoResidencia);

  return (
    <div className="space-y-6">
      <FormSection title={locale === 'es' ? 'Dirección de residencia' : 'Residential address'}>
        <FormField label={locale === 'es' ? 'Dirección' : 'Address'} name="direccionResidencia" error={errors.direccionResidencia} required>
          <TextInput name="direccionResidencia" value={data.direccionResidencia} onChange={(v) => onChange({ direccionResidencia: v })} placeholder="Cra 7 #45-12, Apto 301" error={!!errors.direccionResidencia} />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Departamento' : 'Department'} name="departamentoResidencia" error={errors.departamentoResidencia} required>
            <SelectInput name="departamentoResidencia" value={data.departamentoResidencia} onChange={(v) => onChange({ departamentoResidencia: v, ciudadResidencia: '' })} options={departments.map((d) => ({ value: d.name, label: d.name }))} error={!!errors.departamentoResidencia} />
          </FormField>
          <FormField label={locale === 'es' ? 'Ciudad' : 'City'} name="ciudadResidencia" error={errors.ciudadResidencia} required>
            <SelectInput name="ciudadResidencia" value={data.ciudadResidencia} onChange={(v) => onChange({ ciudadResidencia: v })} options={cities.map((c) => ({ value: c, label: c }))} disabled={!data.departamentoResidencia} error={!!errors.ciudadResidencia} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Barrio' : 'Neighborhood'} name="barrio">
            <TextInput name="barrio" value={data.barrio} onChange={(v) => onChange({ barrio: v })} placeholder="Chapinero" />
          </FormField>
          <FormField label={locale === 'es' ? 'Estrato' : 'Socioeconomic level'} name="estrato" error={errors.estrato} required>
            <div className="flex gap-2">
              {estratoOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange({ estrato: s })}
                  className={cn(
                    'w-10 h-10 rounded-xl text-sm font-semibold transition-all border-2',
                    data.estrato === s
                      ? 'border-aurora bg-aurora/5 text-aurora'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Tiempo en la residencia' : 'Time at residence'} name="tiempoResidencia">
            <SelectInput name="tiempoResidencia" value={data.tiempoResidencia} onChange={(v) => onChange({ tiempoResidencia: v })} options={residenceTimeOptions} />
          </FormField>
          <FormField label={locale === 'es' ? 'Tipo de vivienda' : 'Housing type'} name="tipoVivienda" error={errors.tipoVivienda} required>
            <SelectInput name="tipoVivienda" value={data.tipoVivienda} onChange={(v) => onChange({ tipoVivienda: v })} options={housingTypes} error={!!errors.tipoVivienda} />
          </FormField>
        </div>

        {data.tipoVivienda === 'arrendada' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <FormField label={locale === 'es' ? 'Nombre del arrendador' : 'Landlord name'} name="nombreArrendador" error={errors.nombreArrendador} required>
              <TextInput name="nombreArrendador" value={data.nombreArrendador} onChange={(v) => onChange({ nombreArrendador: v })} placeholder="Nombre completo" error={!!errors.nombreArrendador} />
            </FormField>
            <FormField label={locale === 'es' ? 'Teléfono del arrendador' : 'Landlord phone'} name="telefonoArrendador" error={errors.telefonoArrendador} required>
              <TextInput name="telefonoArrendador" value={data.telefonoArrendador} onChange={(v) => onChange({ telefonoArrendador: v.replace(/\D/g, '') })} placeholder="6012345678" inputMode="numeric" error={!!errors.telefonoArrendador} />
            </FormField>
          </div>
        )}
      </FormSection>

      <FormSection title={locale === 'es' ? 'Información de contacto' : 'Contact information'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Celular' : 'Mobile'} name="celular" error={errors.celular} required>
            <PhoneInput name="celular" value={data.celular} onChange={(v) => onChange({ celular: v })} error={!!errors.celular} />
          </FormField>
          <FormField label={locale === 'es' ? 'Teléfono fijo (opcional)' : 'Home phone (optional)'} name="telefonoResidencia">
            <TextInput name="telefonoResidencia" value={data.telefonoResidencia} onChange={(v) => onChange({ telefonoResidencia: v.replace(/\D/g, '') })} placeholder="6012345678" inputMode="numeric" />
          </FormField>
        </div>

        <FormField label={locale === 'es' ? 'Correo electrónico' : 'Email'} name="correoElectronico" error={errors.correoElectronico} required>
          <input
            id="correoElectronico"
            type="email"
            value={data.correoElectronico}
            onChange={(e) => onChange({ correoElectronico: e.target.value })}
            className={inputClass(!!errors.correoElectronico)}
            placeholder="correo@ejemplo.com"
          />
        </FormField>

        <FormField label={locale === 'es' ? 'Confirmar correo' : 'Confirm email'} name="confirmarCorreo" error={errors.confirmarCorreo} required>
          <input
            id="confirmarCorreo"
            type="email"
            value={data.confirmarCorreo}
            onChange={(e) => onChange({ confirmarCorreo: e.target.value })}
            className={inputClass(!!errors.confirmarCorreo)}
            placeholder="correo@ejemplo.com"
          />
        </FormField>
      </FormSection>
    </div>
  );
};

export default CreditStep3Residence;
