'use client';

import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormField, { TextInput, SelectInput } from '@/components/forms/FormField';
import FormSection from '@/components/forms/FormSection';
import { documentTypes, departments, getCitiesForDepartment, genders, maritalStatuses, educationLevels } from '@/data/colombianData';
import { inputClass } from '@/components/forms/FormField';
import type { Step2Data, FormErrors } from './types';

interface Props {
  data: Step2Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step2Data>) => void;
}

const CreditStep2Personal: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();

  const cities = getCitiesForDepartment(data.departamentoNacimiento);

  return (
    <div className="space-y-6">
      <FormSection title={locale === 'es' ? 'Nombres y apellidos' : 'Full name'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Primer nombre' : 'First name'} name="primerNombre" error={errors.primerNombre} required>
            <TextInput name="primerNombre" value={data.primerNombre} onChange={(v) => onChange({ primerNombre: v })} placeholder="Juan" error={!!errors.primerNombre} />
          </FormField>
          <FormField label={locale === 'es' ? 'Segundo nombre' : 'Middle name'} name="segundoNombre">
            <TextInput name="segundoNombre" value={data.segundoNombre} onChange={(v) => onChange({ segundoNombre: v })} placeholder="Carlos" />
          </FormField>
          <FormField label={locale === 'es' ? 'Primer apellido' : 'Last name'} name="primerApellido" error={errors.primerApellido} required>
            <TextInput name="primerApellido" value={data.primerApellido} onChange={(v) => onChange({ primerApellido: v })} placeholder="García" error={!!errors.primerApellido} />
          </FormField>
          <FormField label={locale === 'es' ? 'Segundo apellido' : 'Second last name'} name="segundoApellido">
            <TextInput name="segundoApellido" value={data.segundoApellido} onChange={(v) => onChange({ segundoApellido: v })} placeholder="López" />
          </FormField>
        </div>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Documento de identidad' : 'Identity document'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Tipo de documento' : 'Document type'} name="tipoDocumento" error={errors.tipoDocumento} required>
            <SelectInput name="tipoDocumento" value={data.tipoDocumento} onChange={(v) => onChange({ tipoDocumento: v })} options={documentTypes} error={!!errors.tipoDocumento} />
          </FormField>
          <FormField label={locale === 'es' ? 'Número de documento' : 'Document number'} name="numeroDocumento" error={errors.numeroDocumento} required>
            <TextInput name="numeroDocumento" value={data.numeroDocumento} onChange={(v) => onChange({ numeroDocumento: v.replace(/\D/g, '') })} placeholder="1012345678" inputMode="numeric" maxLength={12} error={!!errors.numeroDocumento} />
          </FormField>
          <FormField label={locale === 'es' ? 'Fecha de expedición' : 'Issue date'} name="fechaExpedicion" error={errors.fechaExpedicion} required>
            <input
              id="fechaExpedicion"
              type="date"
              value={data.fechaExpedicion}
              onChange={(e) => onChange({ fechaExpedicion: e.target.value })}
              className={inputClass(!!errors.fechaExpedicion)}
              max={new Date().toISOString().split('T')[0]}
            />
          </FormField>
          <FormField label={locale === 'es' ? 'Lugar de expedición' : 'Place of issue'} name="lugarExpedicion">
            <TextInput name="lugarExpedicion" value={data.lugarExpedicion} onChange={(v) => onChange({ lugarExpedicion: v })} placeholder="Bogotá" />
          </FormField>
        </div>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Datos personales' : 'Personal data'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Fecha de nacimiento' : 'Date of birth'} name="fechaNacimiento" error={errors.fechaNacimiento} required>
            <input
              id="fechaNacimiento"
              type="date"
              value={data.fechaNacimiento}
              onChange={(e) => onChange({ fechaNacimiento: e.target.value })}
              className={inputClass(!!errors.fechaNacimiento)}
              max={new Date().toISOString().split('T')[0]}
            />
          </FormField>
          <FormField label={locale === 'es' ? 'País de nacimiento' : 'Country of birth'} name="paisNacimiento">
            <TextInput name="paisNacimiento" value={data.paisNacimiento} onChange={(v) => onChange({ paisNacimiento: v })} placeholder="Colombia" />
          </FormField>
          <FormField label={locale === 'es' ? 'Departamento de nacimiento' : 'Department of birth'} name="departamentoNacimiento">
            <SelectInput name="departamentoNacimiento" value={data.departamentoNacimiento} onChange={(v) => onChange({ departamentoNacimiento: v, ciudadNacimiento: '' })} options={departments.map((d) => ({ value: d.name, label: d.name }))} />
          </FormField>
          <FormField label={locale === 'es' ? 'Ciudad de nacimiento' : 'City of birth'} name="ciudadNacimiento">
            <SelectInput name="ciudadNacimiento" value={data.ciudadNacimiento} onChange={(v) => onChange({ ciudadNacimiento: v })} options={cities.map((c) => ({ value: c, label: c }))} disabled={!data.departamentoNacimiento} />
          </FormField>
          <FormField label={locale === 'es' ? 'Género' : 'Gender'} name="genero" error={errors.genero} required>
            <SelectInput name="genero" value={data.genero} onChange={(v) => onChange({ genero: v })} options={genders} error={!!errors.genero} />
          </FormField>
          <FormField label={locale === 'es' ? 'Estado civil' : 'Marital status'} name="estadoCivil" error={errors.estadoCivil} required>
            <SelectInput name="estadoCivil" value={data.estadoCivil} onChange={(v) => onChange({ estadoCivil: v })} options={maritalStatuses} error={!!errors.estadoCivil} />
          </FormField>
          <FormField label={locale === 'es' ? 'Número de hijos' : 'Number of children'} name="numeroHijos">
            <TextInput name="numeroHijos" value={String(data.numeroHijos)} onChange={(v) => onChange({ numeroHijos: parseInt(v) || 0 })} inputMode="numeric" type="number" />
          </FormField>
          <FormField label={locale === 'es' ? 'Personas a cargo' : 'Dependents'} name="personasCargo">
            <TextInput name="personasCargo" value={String(data.personasCargo)} onChange={(v) => onChange({ personasCargo: parseInt(v) || 0 })} inputMode="numeric" type="number" />
          </FormField>
          <FormField label={locale === 'es' ? 'Nivel de estudios' : 'Education level'} name="nivelEstudios" error={errors.nivelEstudios} required>
            <SelectInput name="nivelEstudios" value={data.nivelEstudios} onChange={(v) => onChange({ nivelEstudios: v })} options={educationLevels} error={!!errors.nivelEstudios} />
          </FormField>
          <FormField label={locale === 'es' ? 'Profesión u oficio' : 'Profession'} name="profesion">
            <TextInput name="profesion" value={data.profesion} onChange={(v) => onChange({ profesion: v })} placeholder="Ej: Ingeniero, Comerciante" />
          </FormField>
        </div>
      </FormSection>
    </div>
  );
};

export default CreditStep2Personal;
