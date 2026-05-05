'use client';

import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const sections = [
  { id: 'objeto', title: 'Objeto' },
  { id: 'capacidad', title: 'Capacidad legal' },
  { id: 'registro', title: 'Registro y cuenta' },
  { id: 'proceso-credito', title: 'Proceso de crédito' },
  { id: 'rol-intermediario', title: 'Rol de intermediario' },
  { id: 'responsabilidades', title: 'Responsabilidades del usuario' },
  { id: 'propiedad-intelectual', title: 'Propiedad intelectual' },
  { id: 'limitacion', title: 'Limitación de responsabilidad' },
  { id: 'ley-aplicable', title: 'Ley aplicable' },
  { id: 'conflictos', title: 'Resolución de conflictos' },
  { id: 'modificaciones', title: 'Modificaciones' },
];

export { sections as termsSections };

const TermsView: React.FC = () => {
  return (
    <LegalPageLayout
      title="Términos y Condiciones de Uso"
      documentCode="VEQ-TC-001"
      version="2.0"
      lastUpdated="Abril 2026"
    >
      <section id="objeto" className="mb-8">
        <h2 className="text-lg font-bold mb-3">1. Objeto</h2>
        <p>Los presentes Términos y Condiciones regulan el acceso y uso de la plataforma digital Veqto (www.veqto.ai), operada por VEQTO S.A.S., sociedad comercial constituida conforme a las leyes de la República de Colombia, con domicilio en Bogotá D.C.</p>
        <p className="mt-2">Veqto es una plataforma tecnológica que actúa como orquestador de productos financieros (crédito vehículo, leasing vehículo, prenda sobre garantía propia, compra de cartera vehicular, libranza y libre inversión), conectando a personas naturales y jurídicas con entidades financieras autorizadas y vigiladas por la Superintendencia Financiera de Colombia, a través de una red de aliados comerciales y concesionarios.</p>
      </section>

      <section id="capacidad" className="mb-8">
        <h2 className="text-lg font-bold mb-3">2. Capacidad Legal</h2>
        <p>Para utilizar los servicios de Veqto, el usuario debe:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Ser persona natural mayor de dieciocho (18) años</li>
          <li>Tener plena capacidad legal para contratar</li>
          <li>Contar con documento de identificación vigente en Colombia (cédula de ciudadanía, cédula de extranjería o pasaporte)</li>
          <li>Proporcionar información verídica, completa y actualizada</li>
        </ul>
      </section>

      <section id="registro" className="mb-8">
        <h2 className="text-lg font-bold mb-3">3. Registro y Uso de la Plataforma</h2>
        <p>El acceso a ciertos servicios de la plataforma requiere que el usuario complete un formulario de solicitud con sus datos personales. Al completar dicho formulario, el usuario:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Declara que la información proporcionada es veraz y completa</li>
          <li>Autoriza a Veqto para verificar la información suministrada</li>
          <li>Se compromete a mantener actualizada su información</li>
          <li>Acepta los presentes Términos y Condiciones y la Política de Privacidad</li>
        </ul>
      </section>

      <section id="proceso-credito" className="mb-8">
        <h2 className="text-lg font-bold mb-3">4. Proceso de Crédito Vehicular</h2>
        <p>El proceso de solicitud de cualquiera de los productos financieros que comercializa Veqto comprende las siguientes etapas:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-2">
          <li><strong>Solicitud:</strong> El usuario completa el formulario de solicitud con sus datos personales, financieros y del vehículo de interés.</li>
          <li><strong>Evaluación preliminar:</strong> Veqto realiza un análisis preliminar del perfil crediticio del solicitante.</li>
          <li><strong>Enrutamiento:</strong> La solicitud es enviada a las entidades financieras aliadas que puedan ofrecer las mejores condiciones.</li>
          <li><strong>Aprobación:</strong> Las entidades financieras evalúan la solicitud y comunican su decisión.</li>
          <li><strong>Aceptación:</strong> El usuario selecciona la oferta que mejor se ajuste a sus necesidades.</li>
          <li><strong>Desembolso:</strong> La entidad financiera realiza el desembolso conforme a sus políticas internas.</li>
        </ol>
        <p className="mt-2">Veqto no garantiza la aprobación de ninguna solicitud de crédito. La decisión de otorgamiento corresponde exclusivamente a las entidades financieras aliadas.</p>
      </section>

      <section id="rol-intermediario" className="mb-8">
        <h2 className="text-lg font-bold mb-3">5. Rol de Veqto como Intermediario Tecnológico</h2>
        <p>Veqto actúa exclusivamente como intermediario tecnológico entre los solicitantes de crédito y las entidades financieras. En consecuencia:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Veqto <strong>NO</strong> es una entidad financiera, banco ni establecimiento de crédito</li>
          <li>Veqto <strong>NO</strong> otorga créditos ni presta dinero directamente</li>
          <li>Veqto <strong>NO</strong> fija tasas de interés ni condiciones de financiamiento</li>
          <li>Veqto <strong>NO</strong> es responsable por las decisiones de las entidades financieras</li>
          <li>Veqto <strong>NO</strong> asume responsabilidad por el estado o calidad de los vehículos</li>
        </ul>
      </section>

      <section id="responsabilidades" className="mb-8">
        <h2 className="text-lg font-bold mb-3">6. Responsabilidades del Usuario</h2>
        <p>El usuario se compromete a:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Proporcionar información veraz, completa y actualizada</li>
          <li>No suplantar la identidad de terceros</li>
          <li>No utilizar la plataforma para fines ilícitos o fraudulentos</li>
          <li>Mantener la confidencialidad de sus credenciales de acceso</li>
          <li>Notificar a Veqto cualquier uso no autorizado de su cuenta</li>
          <li>Cumplir con las obligaciones derivadas de los créditos aprobados</li>
        </ul>
      </section>

      <section id="propiedad-intelectual" className="mb-8">
        <h2 className="text-lg font-bold mb-3">7. Propiedad Intelectual</h2>
        <p>Todos los contenidos de la plataforma Veqto, incluyendo pero no limitado a textos, gráficos, logotipos, íconos, imágenes, clips de audio, descargas digitales, compilaciones de datos y software, son propiedad de VEQTO S.A.S. o de sus proveedores de contenido y están protegidos por las leyes colombianas e internacionales de propiedad intelectual.</p>
        <p className="mt-2">La marca &quot;Veqto&quot;, su logotipo y elementos gráficos asociados son marcas registradas de VEQTO S.A.S.</p>
      </section>

      <section id="limitacion" className="mb-8">
        <h2 className="text-lg font-bold mb-3">8. Limitación de Responsabilidad</h2>
        <p>En la máxima medida permitida por la ley colombiana, Veqto no será responsable por:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>La no aprobación de solicitudes de crédito por las entidades financieras</li>
          <li>Las condiciones de los créditos otorgados por las entidades financieras</li>
          <li>El estado, calidad o características de los vehículos adquiridos</li>
          <li>Daños derivados de la interrupción o falla del servicio por causas ajenas a Veqto</li>
          <li>Daños derivados de la información proporcionada por el usuario que resulte falsa o inexacta</li>
          <li>Daños indirectos, incidentales, especiales o consecuenciales</li>
        </ul>
      </section>

      <section id="ley-aplicable" className="mb-8">
        <h2 className="text-lg font-bold mb-3">9. Ley Aplicable</h2>
        <p>Los presentes Términos y Condiciones se rigen por las leyes de la República de Colombia. Para todos los efectos legales, se considerará que Bogotá D.C. es el lugar de celebración del presente acuerdo.</p>
      </section>

      <section id="conflictos" className="mb-8">
        <h2 className="text-lg font-bold mb-3">10. Resolución de Conflictos</h2>
        <p>Cualquier controversia derivada de los presentes Términos será resuelta en primera instancia mediante negociación directa entre las partes. En caso de no llegar a un acuerdo, las partes se someterán a la jurisdicción de los jueces y tribunales de Bogotá D.C., Colombia.</p>
        <p className="mt-2">Para quejas o reclamaciones, el usuario puede contactar a Veqto a través del correo electrónico <strong>protecciondatos@veqto.ai</strong>.</p>
      </section>

      <section id="modificaciones" className="mb-8">
        <h2 className="text-lg font-bold mb-3">11. Modificaciones</h2>
        <p>Veqto se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento. Las modificaciones serán comunicadas a los usuarios a través de la plataforma y/o por correo electrónico con al menos quince (15) días de anticipación. El uso continuado de la plataforma después de la fecha de entrada en vigor de las modificaciones constituirá aceptación de las mismas.</p>
        <p className="mt-2">Última actualización: Abril 2026.</p>
      </section>
    </LegalPageLayout>
  );
};

export default TermsView;
