'use client';

import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormField, { TextInput, SelectInput, PhoneInput } from '@/components/forms/FormField';
import FormSection from '@/components/forms/FormSection';
import { inputClass } from '@/components/forms/FormField';
import type { Step2Data, FormErrors } from './types';

interface Props {
  data: Step2Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step2Data>) => void;
}

const AllyStep2Contact: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();

  return (
    <div className="space-y-6">
      <FormSection title={locale === 'es' ? 'Datos de contacto' : 'Contact information'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Nombre del contacto principal' : 'Main contact name'} name="nombreContacto" error={errors.nombreContacto} required>
            <TextInput name="nombreContacto" value={data.nombreContacto} onChange={(v) => onChange({ nombreContacto: v })} placeholder="María García" error={!!errors.nombreContacto} />
          </FormField>
          <FormField label={locale === 'es' ? 'Cargo' : 'Position'} name="cargo">
            <TextInput name="cargo" value={data.cargo} onChange={(v) => onChange({ cargo: v })} placeholder="Gerente de ventas" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Celular' : 'Mobile'} name="celular" error={errors.celular} required>
            <PhoneInput name="celular" value={data.celular} onChange={(v) => onChange({ celular: v })} error={!!errors.celular} />
          </FormField>
          <FormField label={locale === 'es' ? 'Teléfono fijo (opcional)' : 'Office phone (optional)'} name="telefonoFijo">
            <TextInput name="telefonoFijo" value={data.telefonoFijo} onChange={(v) => onChange({ telefonoFijo: v.replace(/\D/g, '') })} placeholder="6012345678" inputMode="numeric" />
          </FormField>
        </div>

        <FormField label={locale === 'es' ? 'Correo electrónico' : 'Email'} name="correo" error={errors.correo} required>
          <input
            id="correo"
            type="email"
            value={data.correo}
            onChange={(e) => onChange({ correo: e.target.value })}
            className={inputClass(!!errors.correo)}
            placeholder="contacto@concesionario.com"
          />
        </FormField>

        <FormField label={locale === 'es' ? 'Confirmar correo' : 'Confirm email'} name="confirmarCorreo" error={errors.confirmarCorreo} required>
          <input
            id="confirmarCorreo"
            type="email"
            value={data.confirmarCorreo}
            onChange={(e) => onChange({ confirmarCorreo: e.target.value })}
            className={inputClass(!!errors.confirmarCorreo)}
            placeholder="contacto@concesionario.com"
          />
        </FormField>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Referencia' : 'Referral'}>
        <FormField label={locale === 'es' ? 'Referido por (nombre o código)' : 'Referred by (name or code)'} name="referidoPor">
          <TextInput name="referidoPor" value={data.referidoPor} onChange={(v) => onChange({ referidoPor: v })} placeholder="Opcional" />
        </FormField>
        <FormField label={locale === 'es' ? '¿Cómo te enteraste de Veqto?' : 'How did you hear about us?'} name="comoNosConocio">
          <SelectInput name="comoNosConocio" value={data.comoNosConocio} onChange={(v) => onChange({ comoNosConocio: v })} options={[
            { value: 'redes_sociales', label: locale === 'es' ? 'Redes sociales' : 'Social media' },
            { value: 'referido', label: locale === 'es' ? 'Referido' : 'Referral' },
            { value: 'google', label: 'Google' },
            { value: 'evento', label: locale === 'es' ? 'Evento' : 'Event' },
            { value: 'otro', label: locale === 'es' ? 'Otro' : 'Other' },
          ]} />
        </FormField>
      </FormSection>
    </div>
  );
};

export default AllyStep2Contact;
