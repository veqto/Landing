'use client';

import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormField, { TextInput } from '@/components/forms/FormField';
import FormSection from '@/components/forms/FormSection';
import ConsentCheckbox from '@/components/forms/ConsentCheckbox';
import SignatureCanvas from '@/components/forms/SignatureCanvas';
import type { Step6Data, FormErrors } from './types';

interface Props {
  data: Step6Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step6Data>) => void;
}

const CreditStep6Consent: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();

  return (
    <div className="space-y-6">
      <FormSection
        title={locale === 'es' ? 'Autorizaciones legales' : 'Legal authorizations'}
        description={locale === 'es' ? 'Lee y acepta cada autorización para continuar con la solicitud.' : 'Read and accept each authorization to continue.'}
      >
        <div className="space-y-4">
          <ConsentCheckbox
            checked={data.autorizaDatos}
            onChange={(v) => onChange({ autorizaDatos: v })}
            label="Autorizo a VEQTO S.A.S. el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y su política de privacidad, para las finalidades relacionadas con la solicitud de crédito vehicular."
            linkText="Ver Política de Privacidad"
            linkHref="/politica-privacidad"
            error={errors.autorizaDatos}
            required
          />

          <ConsentCheckbox
            checked={data.autorizaCentrales}
            onChange={(v) => onChange({ autorizaCentrales: v })}
            label="Autorizo a VEQTO S.A.S. y a las entidades financieras aliadas a consultar, reportar y actualizar mi información en centrales de riesgo (DataCrédito, TransUnion CIFIN) conforme a la Ley 1266 de 2008."
            expandableText="Esta autorización incluye: (1) Consultar mi historial crediticio y comportamiento de pago; (2) Reportar el estado de mis obligaciones; (3) Compartir información con las entidades financieras que evalúen mi solicitud de crédito. La información negativa permanecerá por un máximo de 4 años desde la fecha de pago de la obligación en mora."
            linkText="Ver Autorización Completa"
            linkHref="/autorizacion-centrales"
            error={errors.autorizaCentrales}
            required
          />

          <ConsentCheckbox
            checked={data.autorizaContacto}
            onChange={(v) => onChange({ autorizaContacto: v })}
            label="Autorizo ser contactado por Veqto y sus aliados a través de llamadas, SMS, correo electrónico y WhatsApp para información relacionada con mi solicitud de crédito."
          />

          <ConsentCheckbox
            checked={data.autorizaComercial}
            onChange={(v) => onChange({ autorizaComercial: v })}
            label="Autorizo recibir comunicaciones comerciales, promociones y ofertas de Veqto y sus aliados financieros y comerciales."
          />

          <ConsentCheckbox
            checked={data.aceptaTerminos}
            onChange={(v) => onChange({ aceptaTerminos: v })}
            label="Acepto los Términos y Condiciones de uso de la plataforma Veqto."
            linkText="Ver Términos y Condiciones"
            linkHref="/terminos-condiciones"
            error={errors.aceptaTerminos}
            required
          />

          <ConsentCheckbox
            checked={data.declaraVeracidad}
            onChange={(v) => onChange({ declaraVeracidad: v })}
            label="Declaro bajo la gravedad de juramento que toda la información suministrada en esta solicitud es verídica y corresponde a mi situación actual. Entiendo que cualquier falsedad puede acarrear consecuencias legales."
            error={errors.declaraVeracidad}
            required
          />

          <ConsentCheckbox
            checked={data.aceptaPoliticaPrivacidad}
            onChange={(v) => onChange({ aceptaPoliticaPrivacidad: v })}
            label="He leído y acepto la Política de Privacidad y Protección de Datos Personales de Veqto conforme a la Ley 1581 de 2012."
            linkText="Ver Política de Privacidad"
            linkHref="/politica-privacidad"
            error={errors.aceptaPoliticaPrivacidad}
            required
          />

          <ConsentCheckbox
            checked={data.autorizaFirmaElectronica}
            onChange={(v) => onChange({ autorizaFirmaElectronica: v })}
            label="Autorizo el uso de mi firma electrónica como mecanismo válido para la suscripción de esta solicitud, conforme a la Ley 527 de 1999 sobre comercio electrónico."
            error={errors.autorizaFirmaElectronica}
            required
          />
        </div>
      </FormSection>

      <FormSection title={locale === 'es' ? 'Firma digital' : 'Digital signature'}>
        <SignatureCanvas
          onSignatureChange={(v) => onChange({ firmaDigital: v })}
          error={errors.firmaDigital}
        />
      </FormSection>

      <FormSection title={locale === 'es' ? 'Datos de la solicitud' : 'Application details'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={locale === 'es' ? 'Fecha de solicitud' : 'Application date'} name="fechaSolicitud">
            <TextInput name="fechaSolicitud" value={data.fechaSolicitud} onChange={() => {}} disabled />
          </FormField>
          <FormField label={locale === 'es' ? 'Ciudad de solicitud' : 'Application city'} name="ciudadSolicitud" error={errors.ciudadSolicitud} required>
            <TextInput name="ciudadSolicitud" value={data.ciudadSolicitud} onChange={(v) => onChange({ ciudadSolicitud: v })} placeholder="Bogotá" error={!!errors.ciudadSolicitud} />
          </FormField>
        </div>
      </FormSection>
    </div>
  );
};

export default CreditStep6Consent;
