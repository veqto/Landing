'use client';

import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const sections = [
  { id: 'responsable', title: 'Responsable del tratamiento' },
  { id: 'marco-normativo', title: 'Marco normativo' },
  { id: 'definiciones', title: 'Definiciones' },
  { id: 'principios', title: 'Principios' },
  { id: 'bases-datos', title: 'Bases de datos' },
  { id: 'finalidades', title: 'Finalidades del tratamiento' },
  { id: 'datos-sensibles', title: 'Tratamiento de datos sensibles' },
  { id: 'derechos', title: 'Derechos de los titulares' },
  { id: 'consultas', title: 'Consultas' },
  { id: 'reclamos', title: 'Reclamos' },
  { id: 'seguridad', title: 'Medidas de seguridad' },
  { id: 'datos-financieros', title: 'Datos financieros y crediticios' },
  { id: 'contactabilidad', title: 'Datos de contactabilidad' },
  { id: 'transferencia', title: 'Transferencia y transmisión' },
  { id: 'vigencia', title: 'Vigencia' },
  { id: 'sic', title: 'Superintendencia de Industria y Comercio' },
];

export { sections as privacyPolicySections };

const PrivacyPolicyView: React.FC = () => {
  return (
    <LegalPageLayout
      title="Política de Privacidad y Protección de Datos Personales"
      documentCode="VEQ-PP-001"
      version="2.0"
      lastUpdated="Abril 2026"
    >
      <section id="responsable" className="mb-8">
        <h2 className="text-lg font-bold mb-3">1. Responsable del Tratamiento</h2>
        <p><strong>Razón social:</strong> VEQTO S.A.S.</p>
        <p><strong>NIT:</strong> 901.XXX.XXX-X</p>
        <p><strong>Domicilio:</strong> Bogotá D.C., Colombia</p>
        <p><strong>Correo electrónico:</strong> datos@veqto.com</p>
        <p><strong>Teléfono:</strong> +57 (601) 601-2345</p>
        <p className="mt-2">VEQTO S.A.S. (en adelante &quot;Veqto&quot;), sociedad constituida conforme a las leyes colombianas, actúa como responsable del tratamiento de datos personales recolectados a través de su plataforma digital de crédito vehicular.</p>
      </section>

      <section id="marco-normativo" className="mb-8">
        <h2 className="text-lg font-bold mb-3">2. Marco Normativo</h2>
        <p>La presente política se desarrolla en cumplimiento de:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Ley Estatutaria 1581 de 2012 — Protección de Datos Personales</li>
          <li>Decreto 1377 de 2013 — Reglamentario de la Ley 1581</li>
          <li>Ley 1266 de 2008 — Habeas Data Financiero</li>
          <li>Decreto 1074 de 2015 — Decreto Único Reglamentario del Sector Comercio, Industria y Turismo</li>
          <li>Circular Externa 002 de 2015 de la Superintendencia de Industria y Comercio</li>
        </ul>
      </section>

      <section id="definiciones" className="mb-8">
        <h2 className="text-lg font-bold mb-3">3. Definiciones</h2>
        <ul className="space-y-2">
          <li><strong>Dato personal:</strong> Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</li>
          <li><strong>Titular:</strong> Persona natural cuyos datos personales sean objeto de tratamiento.</li>
          <li><strong>Tratamiento:</strong> Cualquier operación sobre datos personales, tales como la recolección, almacenamiento, uso, circulación o supresión.</li>
          <li><strong>Responsable del tratamiento:</strong> Persona natural o jurídica que decide sobre la base de datos y/o el tratamiento de los datos.</li>
          <li><strong>Encargado del tratamiento:</strong> Persona natural o jurídica que realiza el tratamiento de datos por cuenta del responsable.</li>
          <li><strong>Autorización:</strong> Consentimiento previo, expreso e informado del titular para llevar a cabo el tratamiento de datos personales.</li>
          <li><strong>Base de datos:</strong> Conjunto organizado de datos personales que sea objeto de tratamiento.</li>
          <li><strong>Dato sensible:</strong> Dato que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación.</li>
        </ul>
      </section>

      <section id="principios" className="mb-8">
        <h2 className="text-lg font-bold mb-3">4. Principios Rectores</h2>
        <p>Veqto se compromete a cumplir los siguientes principios en el tratamiento de datos personales:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Legalidad:</strong> El tratamiento se sujeta a lo establecido en la ley.</li>
          <li><strong>Finalidad:</strong> El tratamiento obedece a una finalidad legítima.</li>
          <li><strong>Libertad:</strong> Solo puede ejercerse con el consentimiento previo del titular.</li>
          <li><strong>Veracidad:</strong> La información debe ser veraz, completa y actualizada.</li>
          <li><strong>Transparencia:</strong> Se garantiza el derecho a obtener información sobre sus datos.</li>
          <li><strong>Acceso y circulación restringida:</strong> Los datos no estarán disponibles en internet.</li>
          <li><strong>Seguridad:</strong> La información se maneja con las medidas técnicas necesarias.</li>
          <li><strong>Confidencialidad:</strong> Se garantiza la reserva de la información.</li>
        </ul>
      </section>

      <section id="bases-datos" className="mb-8">
        <h2 className="text-lg font-bold mb-3">5. Bases de Datos</h2>
        <p>Veqto administra las siguientes bases de datos:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Clientes:</strong> Datos de personas naturales que solicitan crédito vehicular.</li>
          <li><strong>Aliados comerciales:</strong> Datos de representantes de concesionarios y compraventas.</li>
          <li><strong>Entidades financieras:</strong> Datos de contacto de funcionarios bancarios.</li>
          <li><strong>Prospectos:</strong> Datos de personas interesadas en los servicios de Veqto.</li>
        </ul>
      </section>

      <section id="finalidades" className="mb-8">
        <h2 className="text-lg font-bold mb-3">6. Finalidades del Tratamiento</h2>
        <p>Los datos personales son tratados para las siguientes finalidades:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-2">
          <li>Gestionar solicitudes de crédito vehicular</li>
          <li>Evaluar el perfil crediticio del solicitante</li>
          <li>Enviar solicitudes a entidades financieras aliadas</li>
          <li>Realizar consultas en centrales de riesgo</li>
          <li>Comunicar el estado de la solicitud al titular</li>
          <li>Enviar ofertas de crédito aprobadas</li>
          <li>Gestionar la relación con aliados comerciales</li>
          <li>Enviar comunicaciones comerciales y promocionales</li>
          <li>Realizar análisis estadísticos y de mercado</li>
          <li>Cumplir obligaciones legales y regulatorias</li>
          <li>Prevenir actividades fraudulentas y de lavado de activos</li>
          <li>Mejorar los productos y servicios de la plataforma</li>
          <li>Gestionar el proceso de desembolso y seguimiento del crédito</li>
          <li>Atender peticiones, quejas, reclamos y sugerencias</li>
          <li>Dar cumplimiento a obligaciones contractuales</li>
        </ol>
      </section>

      <section id="datos-sensibles" className="mb-8">
        <h2 className="text-lg font-bold mb-3">7. Tratamiento de Datos Sensibles</h2>
        <p>Veqto podrá recolectar datos sensibles únicamente cuando sea estrictamente necesario para la finalidad del tratamiento y cuente con autorización expresa del titular. Se consideran datos sensibles los que revelan:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Origen racial o étnico</li>
          <li>Orientación política</li>
          <li>Convicciones religiosas o filosóficas</li>
          <li>Pertenencia a sindicatos u organizaciones sociales</li>
          <li>Datos biométricos (como la firma digital)</li>
          <li>Datos de salud</li>
        </ul>
        <p className="mt-2">El titular no está obligado a autorizar el tratamiento de datos sensibles. No se condicionará la prestación del servicio a la entrega de datos sensibles no indispensables.</p>
      </section>

      <section id="derechos" className="mb-8">
        <h2 className="text-lg font-bold mb-3">8. Derechos de los Titulares (ARCO)</h2>
        <p>De conformidad con la Ley 1581 de 2012, los titulares tienen derecho a:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Acceso:</strong> Conocer, actualizar y rectificar sus datos personales.</li>
          <li><strong>Rectificación:</strong> Solicitar la corrección de información parcial, inexacta, incompleta o fraccionada.</li>
          <li><strong>Cancelación:</strong> Solicitar la supresión de los datos cuando no se respeten los principios o derechos.</li>
          <li><strong>Oposición:</strong> Revocar la autorización y/o solicitar la supresión del dato.</li>
          <li>Ser informado sobre el uso que se ha dado a sus datos personales.</li>
          <li>Presentar ante la SIC quejas por infracciones.</li>
          <li>Acceder de forma gratuita a sus datos personales.</li>
        </ul>
        <p className="mt-2">Para ejercer estos derechos, el titular podrá comunicarse a: <strong>datos@veqto.com</strong></p>
      </section>

      <section id="consultas" className="mb-8">
        <h2 className="text-lg font-bold mb-3">9. Procedimiento de Consultas</h2>
        <p>Las consultas serán atendidas en un término máximo de diez (10) días hábiles contados a partir de la fecha de recibo. Cuando no fuere posible atender la consulta dentro de dicho término, se informará al interesado, expresando los motivos de la demora, la cual no podrá superar los cinco (5) días hábiles adicionales.</p>
      </section>

      <section id="reclamos" className="mb-8">
        <h2 className="text-lg font-bold mb-3">10. Procedimiento de Reclamos</h2>
        <p>Los reclamos se tramitarán bajo las siguientes reglas:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-2">
          <li>El reclamo deberá presentarse por escrito a datos@veqto.com con identificación del titular, descripción de los hechos y documentos de soporte.</li>
          <li>Si el reclamo está incompleto, se requerirá al interesado dentro de los cinco (5) días hábiles siguientes.</li>
          <li>El término máximo para atender el reclamo será de quince (15) días hábiles.</li>
          <li>Cuando no fuere posible atenderlo dentro de dicho término, se informará al interesado antes del vencimiento, indicando los motivos de la demora y señalando la fecha (máximo ocho (8) días hábiles adicionales).</li>
        </ol>
      </section>

      <section id="seguridad" className="mb-8">
        <h2 className="text-lg font-bold mb-3">11. Medidas de Seguridad</h2>
        <p>Veqto implementa medidas técnicas, humanas y administrativas para proteger los datos personales, incluyendo:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Cifrado de datos en tránsito y en reposo (TLS 1.3, AES-256)</li>
          <li>Control de acceso basado en roles</li>
          <li>Monitoreo y auditoría de accesos a bases de datos</li>
          <li>Política de respaldo y recuperación de información</li>
          <li>Capacitación periódica al personal en protección de datos</li>
          <li>Evaluaciones periódicas de vulnerabilidades</li>
        </ul>
      </section>

      <section id="datos-financieros" className="mb-8">
        <h2 className="text-lg font-bold mb-3">12. Datos Financieros y Crediticios</h2>
        <p>En cumplimiento de la Ley 1266 de 2008, Veqto realiza consultas y reportes ante operadores de información financiera y crediticia (centrales de riesgo) únicamente con la autorización previa y expresa del titular, para las siguientes finalidades:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Verificar la identidad del solicitante</li>
          <li>Evaluar el riesgo crediticio</li>
          <li>Consultar el comportamiento de pago histórico</li>
          <li>Reportar el cumplimiento o incumplimiento de obligaciones</li>
        </ul>
        <p className="mt-2">La permanencia de la información negativa será la establecida en el artículo 13 de la Ley 1266 de 2008 (máximo 4 años contados a partir de la fecha de pago).</p>
      </section>

      <section id="contactabilidad" className="mb-8">
        <h2 className="text-lg font-bold mb-3">13. Datos de Contactabilidad</h2>
        <p>Los datos de contacto (correo electrónico, número de celular, teléfono) podrán ser utilizados para:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Enviar notificaciones sobre el estado de solicitudes de crédito</li>
          <li>Enviar comunicaciones comerciales (previa autorización)</li>
          <li>Contactar al titular para completar información de su solicitud</li>
          <li>Enviar encuestas de satisfacción</li>
        </ul>
        <p className="mt-2">El titular podrá solicitar en cualquier momento la exclusión de comunicaciones comerciales enviando un correo a datos@veqto.com con el asunto &quot;Desuscribir&quot;.</p>
      </section>

      <section id="transferencia" className="mb-8">
        <h2 className="text-lg font-bold mb-3">14. Transferencia y Transmisión de Datos</h2>
        <p>Veqto podrá transferir o transmitir datos personales a:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Entidades financieras aliadas:</strong> Para la evaluación y aprobación de solicitudes de crédito.</li>
          <li><strong>Centrales de riesgo:</strong> Para la consulta y reporte de información crediticia.</li>
          <li><strong>Aliados comerciales:</strong> Para la gestión del proceso de venta del vehículo.</li>
          <li><strong>Proveedores de tecnología:</strong> Para el procesamiento y almacenamiento seguro de datos.</li>
          <li><strong>Autoridades competentes:</strong> Cuando sea requerido por ley.</li>
        </ul>
        <p className="mt-2">En todos los casos, Veqto garantizará que los receptores cuenten con niveles adecuados de protección de datos.</p>
      </section>

      <section id="vigencia" className="mb-8">
        <h2 className="text-lg font-bold mb-3">15. Vigencia</h2>
        <p>Las bases de datos de Veqto tendrán una vigencia igual al tiempo en que se mantenga la finalidad del tratamiento. Los datos personales se conservarán mientras no se solicite su supresión por el titular y siempre que no exista un deber legal o contractual de conservarlos.</p>
        <p className="mt-2">La presente política de privacidad fue actualizada en abril de 2026 y rige desde su publicación.</p>
      </section>

      <section id="sic" className="mb-8">
        <h2 className="text-lg font-bold mb-3">16. Superintendencia de Industria y Comercio</h2>
        <p>El titular que considere que sus derechos han sido vulnerados podrá presentar una queja ante la Superintendencia de Industria y Comercio (SIC):</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Dirección:</strong> Carrera 13 No. 27-00, Bogotá D.C.</li>
          <li><strong>Teléfono:</strong> (601) 587 0000</li>
          <li><strong>Línea gratuita:</strong> 018000 910 165</li>
          <li><strong>Página web:</strong> www.sic.gov.co</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyView;
