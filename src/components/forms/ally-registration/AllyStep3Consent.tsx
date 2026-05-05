'use client';

import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormSection from '@/components/forms/FormSection';
import ConsentCheckbox from '@/components/forms/ConsentCheckbox';
import type { Step3Data, FormErrors } from './types';

interface Props {
  data: Step3Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step3Data>) => void;
}

const AllyStep3Consent: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();

  return (
    <div className="space-y-6">
      <FormSection
        title={locale === 'es' ? 'Autorizaciones' : 'Authorizations'}
        description={locale === 'es' ? 'Lee y acepta las autorizaciones para completar tu registro.' : 'Read and accept the authorizations to complete your registration.'}
      >
        <div className="space-y-4">
          <ConsentCheckbox
            checked={data.autorizaDatos}
            onChange={(v) => onChange({ autorizaDatos: v })}
            label="Autorizo a VEQTO S.A.S. el tratamiento de los datos personales y comerciales de mi establecimiento conforme a la Ley 1581 de 2012 y su Política de Tratamiento de Datos."
            linkText="Ver Política de Tratamiento de Datos"
            linkHref="/politica-tratamiento-datos"
            error={errors.autorizaDatos}
            required
          />

          <ConsentCheckbox
            checked={data.aceptaTerminos}
            onChange={(v) => onChange({ aceptaTerminos: v })}
            label="Acepto los Términos y Condiciones del programa de aliados comerciales de Veqto."
            linkText="Ver Términos y Condiciones"
            linkHref="/terminos-condiciones"
            error={errors.aceptaTerminos}
            required
          />

          <ConsentCheckbox
            checked={data.autorizaContacto}
            onChange={(v) => onChange({ autorizaContacto: v })}
            label="Autorizo ser contactado por Veqto a través de llamadas, SMS, correo electrónico y WhatsApp para temas relacionados con el programa de aliados."
          />

          <ConsentCheckbox
            checked={data.autorizaComercial}
            onChange={(v) => onChange({ autorizaComercial: v })}
            label="Autorizo recibir comunicaciones comerciales, capacitaciones y novedades del programa de aliados de Veqto."
          />
        </div>
      </FormSection>
    </div>
  );
};

export default AllyStep3Consent;
