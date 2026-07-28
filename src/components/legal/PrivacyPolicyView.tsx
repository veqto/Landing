'use client';

import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const sections = [
  { id: 'responsable', title: '1. Responsable del tratamiento' },
  { id: 'objetivo', title: '2. Objetivo' },
  { id: 'alcance', title: '3. Alcance' },
  { id: 'definiciones', title: '4. Definiciones' },
  { id: 'principios', title: '5. Principios' },
  { id: 'bases-datos', title: '6. Bases de datos y tratamiento' },
  { id: 'finalidades', title: '7. Finalidades del tratamiento' },
  { id: 'datos-sensibles', title: '8. Tratamiento de datos sensibles' },
  { id: 'derechos', title: '9. Derechos de los titulares' },
  { id: 'procedimiento', title: '10. Procedimiento para el ejercicio de derechos' },
  { id: 'seguridad', title: '11. Seguridad de la información' },
  { id: 'datos-financieros', title: '12. Datos financieros — Ley 1266 de 2008' },
  { id: 'contactabilidad', title: '13. Contactabilidad — Ley 2300 de 2023' },
  { id: 'transferencia', title: '14. Transferencia y transmisión internacional' },
  { id: 'vigencia', title: '15. Vigencia y modificaciones' },
  { id: 'sic', title: '16. Autoridad nacional de protección de datos' },
];

export { sections as privacyPolicySections };

const Th: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th className="px-3 py-2 text-left bg-gray-50 border border-gray-200 font-semibold text-sm">{children}</th>
);
const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td className="px-3 py-2 border border-gray-200 text-sm align-top">{children}</td>
);

const PrivacyPolicyView: React.FC = () => {
  return (
    <LegalPageLayout
      title="Política de Tratamiento de Datos Personales"
      documentCode="VEQ-GC-001"
      version="02"
      lastUpdated="30/04/2026"
    >
      <header className="mb-6 pb-4 border-b border-gray-200">
        <p className="text-xs uppercase tracking-wider text-aurora font-semibold">VEQTO S.A.S — NIT 902.051.244-0</p>
        <p className="mt-1 text-sm text-gray-600">
          Código: VEQ-GC-001 · Versión 02 · Fecha: 30/04/2026
        </p>
      </header>

      <table className="w-full mb-6 border border-gray-200">
        <tbody>
          <tr><Th>Responsable</Th><Td>VEQTO S.A.S</Td></tr>
          <tr><Th>NIT</Th><Td>902.051.244-0</Td></tr>
          <tr><Th>Domicilio</Th><Td>Bogotá D.C., Colombia</Td></tr>
          <tr><Th>Correo</Th><Td>informacion@veqto.ai</Td></tr>
          <tr><Th>Representante Legal</Th><Td>Mauricio Alexander Quiroga Fuquene</Td></tr>
          <tr><Th>Normativa</Th><Td>Ley 1581 de 2012 · Decreto 1377 de 2013 · Decreto 2300 de 2023</Td></tr>
        </tbody>
      </table>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Introducción</h2>
        <p className="mb-2">La Constitución Política de Colombia consagra en su artículo 15 el derecho fundamental a la protección de datos personales, el buen nombre y la intimidad personal. En desarrollo de este mandato constitucional, la Ley Estatutaria 1581 de 2012 estableció los principios y disposiciones aplicables al tratamiento de datos personales.</p>
        <p>VEQTO S.A.S. (en adelante &quot;Veqto&quot;), sociedad por acciones simplificada constituida bajo las leyes de la República de Colombia, identificada con NIT 902.051.244-0, con domicilio en la ciudad de Bogotá D.C., adopta la presente Política de Tratamiento de Datos Personales con el fin de garantizar el pleno ejercicio del derecho de Hábeas Data de todos los titulares cuya información sea tratada en el desarrollo de su objeto social: la intermediación financiera digital para la originación de productos financieros, incluyendo crédito vehículo, leasing vehículo, prenda sobre garantía propia, compra de cartera vehicular, libranza y libre inversión.</p>
      </section>

      <section id="responsable" className="mb-8">
        <h2 className="text-lg font-bold mb-3">1. Responsable del tratamiento</h2>
        <p className="mb-3">VEQTO S.A.S., domiciliada en la ciudad de Bogotá D.C., Colombia, identificada con NIT 902.051.244-0, ostentará la calidad de RESPONSABLE DEL TRATAMIENTO de la información personal incorporada en sus bases de datos. Los canales para el ejercicio de derechos son:</p>
        <table className="w-full border border-gray-200">
          <thead><tr><Th>Canal</Th><Th>Dato de contacto</Th></tr></thead>
          <tbody>
            <tr><Td>Correo electrónico</Td><Td>protecciondatos@veqto.ai</Td></tr>
            <tr><Td>Plataforma web</Td><Td>www.veqto.ai — sección &quot;Protección de Datos&quot;</Td></tr>
            <tr><Td>Ciudad y departamento</Td><Td>Bogotá D.C., Colombia</Td></tr>
          </tbody>
        </table>
      </section>

      <section id="objetivo" className="mb-8">
        <h2 className="text-lg font-bold mb-3">2. Objetivo</h2>
        <p>Establecer las directrices para el tratamiento de datos personales que Veqto recolecta, almacena y procesa en el desarrollo de su plataforma de orquestación financiera con inteligencia artificial, con miras a garantizar los derechos de los titulares a conocer, actualizar, rectificar y suprimir la información recolectada, conforme a la normatividad vigente.</p>
      </section>

      <section id="alcance" className="mb-8">
        <h2 className="text-lg font-bold mb-3">3. Alcance</h2>
        <p className="mb-2">La presente política es de obligatorio y estricto cumplimiento por parte de Veqto, sus colaboradores, aliados comerciales, concesionarios vinculados, entidades bancarias aliadas, proveedores tecnológicos y cualquier tercero que, en virtud de un vínculo laboral, contractual o comercial con Veqto, tenga acceso a información personal de los titulares.</p>
        <p>Los titulares cuyos datos son tratados por Veqto incluyen: clientes solicitantes de cualquiera de los productos financieros que comercializa Veqto (crédito vehículo, leasing vehículo, prenda sobre garantía propia, compra de cartera vehicular, libranza y libre inversión), aliados comerciales y concesionarios, colaboradores internos, representantes legales de personas jurídicas vinculadas, y visitantes de la plataforma digital veqto.ai.</p>
      </section>

      <section id="definiciones" className="mb-8">
        <h2 className="text-lg font-bold mb-3">4. Definiciones</h2>
        <p className="mb-3">Para los efectos de la presente política, se adoptan las definiciones establecidas en la Ley 1581 de 2012 y sus decretos reglamentarios:</p>
        <table className="w-full border border-gray-200">
          <thead><tr><Th>Término</Th><Th>Definición</Th></tr></thead>
          <tbody>
            <tr><Td>Autorización</Td><Td>Consentimiento previo, expreso e informado del titular para llevar a cabo el tratamiento de datos personales.</Td></tr>
            <tr><Td>Base de datos</Td><Td>Conjunto organizado de datos personales que sea objeto de tratamiento.</Td></tr>
            <tr><Td>Dato personal</Td><Td>Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</Td></tr>
            <tr><Td>Dato sensible</Td><Td>Aquellos que afectan la intimidad del titular o cuyo uso indebido puede generar discriminación: origen racial, orientación política, convicciones religiosas, datos de salud, vida sexual, datos biométricos.</Td></tr>
            <tr><Td>Dato público</Td><Td>Dato que no tiene naturaleza íntima ni reservada: estado civil, profesión, calidad de comerciante, contenido en registros públicos.</Td></tr>
            <tr><Td>Dato financiero</Td><Td>Información referida al comportamiento crediticio, financiero, comercial y de servicios del titular.</Td></tr>
            <tr><Td>Dato biométrico</Td><Td>Características físicas o comportamentales del titular que permiten su identificación: huella, fotografía, reconocimiento facial.</Td></tr>
            <tr><Td>Encargado del tratamiento</Td><Td>Persona natural o jurídica que realiza el tratamiento de datos personales por cuenta del Responsable.</Td></tr>
            <tr><Td>Titular</Td><Td>Persona natural cuyos datos personales sean objeto de tratamiento.</Td></tr>
            <tr><Td>Tratamiento</Td><Td>Cualquier operación sobre datos personales: recolección, almacenamiento, uso, circulación, supresión.</Td></tr>
            <tr><Td>Transferencia</Td><Td>Envío de datos personales a un receptor que también es Responsable del tratamiento, dentro o fuera del país.</Td></tr>
            <tr><Td>Transmisión</Td><Td>Comunicación de datos personales al Encargado para su tratamiento por cuenta del Responsable.</Td></tr>
          </tbody>
        </table>
      </section>

      <section id="principios" className="mb-8">
        <h2 className="text-lg font-bold mb-3">5. Principios</h2>
        <p className="mb-2">Veqto aplicará de manera armónica e integral los siguientes principios:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Legalidad:</strong> Tratamiento conforme a Ley 1581 de 2012, Ley 1266 de 2008 y demás normas aplicables.</li>
          <li><strong>Finalidad:</strong> Datos recolectados con finalidad legítima, determinada, explícita e informada.</li>
          <li><strong>Libertad:</strong> Tratamiento solo con consentimiento previo, expreso e informado del titular.</li>
          <li><strong>Veracidad o calidad:</strong> Información veraz, completa, exacta, actualizada y comprensible.</li>
          <li><strong>Transparencia:</strong> Derecho del titular a obtener información sobre los datos que le conciernan.</li>
          <li><strong>Acceso y circulación restringida:</strong> Datos accesibles solo por personas autorizadas.</li>
          <li><strong>Seguridad:</strong> Medidas técnicas, humanas y administrativas para proteger los datos.</li>
          <li><strong>Confidencialidad:</strong> Quienes intervengan en el tratamiento garantizan la reserva.</li>
        </ul>
      </section>

      <section id="bases-datos" className="mb-8">
        <h2 className="text-lg font-bold mb-3">6. Bases de datos y tratamiento</h2>
        <p className="mb-3">Veqto gestiona las siguientes bases de datos:</p>
        <table className="w-full border border-gray-200">
          <thead><tr><Th>Base de datos</Th><Th>Titulares</Th><Th>Finalidad principal</Th></tr></thead>
          <tbody>
            <tr><Td>Solicitantes de productos financieros</Td><Td>Personas naturales y jurídicas que solicitan crédito vehículo, leasing, prenda, compra de cartera, libranza o libre inversión</Td><Td>Evaluación, scoring, enrutamiento bancario y gestión del producto financiero</Td></tr>
            <tr><Td>Aliados comerciales</Td><Td>Representantes y empleados de aliados comerciales y concesionarios vinculados</Td><Td>Gestión de alianzas, comisiones y operación comercial</Td></tr>
            <tr><Td>Colaboradores</Td><Td>Empleados, contratistas y prestadores de servicios</Td><Td>Gestión laboral, contractual y operativa</Td></tr>
            <tr><Td>Visitantes digitales</Td><Td>Usuarios que visitan veqto.ai o interactúan por canales</Td><Td>Captación de leads, comunicación y mejora del servicio</Td></tr>
            <tr><Td>Entidades bancarias aliadas</Td><Td>Representantes de bancos con convenio</Td><Td>Gestión de convenios, APIs y procesos de originación</Td></tr>
          </tbody>
        </table>
      </section>

      <section id="finalidades" className="mb-8">
        <h2 className="text-lg font-bold mb-3">7. Finalidades del tratamiento</h2>

        <h3 className="font-bold mt-4 mb-2">7.1 Solicitantes de productos financieros</h3>
        <p className="text-sm text-gray-600 mb-2">(crédito vehículo, leasing, prenda, compra de cartera, libranza y libre inversión)</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Recolectar y procesar la información para realizar scoring crediticio automatizado mediante IA.</li>
          <li>Consultar centrales de riesgo (TransUnión, DataCrédito) para evaluar comportamiento crediticio.</li>
          <li>Enrutar la solicitud hacia las entidades bancarias aliadas que mejor se ajusten al perfil.</li>
          <li>Gestionar la firma digital del contrato de crédito (Decreto 2364/2012, Ley 527/1999).</li>
          <li>Enviar notificaciones (WhatsApp, correo, SMS, llamadas DID) sobre el estado de la solicitud.</li>
          <li>Verificar la identidad mediante autenticación electrónica y validación biométrica.</li>
          <li>Compartir información con entidades bancarias aliadas para evaluación y aprobación del crédito.</li>
          <li>Gestión de cobranza directa o a través de terceros, con sujeción a la Ley 2300 de 2023.</li>
          <li>Destruir la información cuando las solicitudes sean negadas o desistidas.</li>
          <li>Cumplir obligaciones ante DIAN, SFC y demás autoridades.</li>
        </ul>

        <h3 className="font-bold mt-4 mb-2">7.2 Aliados comerciales y concesionarios</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Gestionar el proceso de vinculación formal como aliado referidor.</li>
          <li>Liquidar y pagar comisiones por operaciones exitosamente originadas.</li>
          <li>Capacitar al personal del aliado en el uso de la plataforma.</li>
          <li>Enviar información comercial y actualizaciones del servicio.</li>
          <li>Verificar el origen lícito de los ingresos en cumplimiento de SARLAFT.</li>
        </ul>

        <h3 className="font-bold mt-4 mb-2">7.3 Finalidades comunes</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cumplimiento normativo en materia laboral, tributaria, comercial y de protección de datos.</li>
          <li>Implementar medidas de seguridad de la información conforme a estándares técnicos y legales.</li>
          <li>Verificar antecedentes en listas nacionales e internacionales (OFAC, ONU, etc.).</li>
          <li>Transferir datos a aliados, proveedores tecnológicos y entidades bancarias cuando sea necesario.</li>
          <li>Mejorar continuamente la plataforma mediante análisis estadísticos y de comportamiento.</li>
        </ul>
      </section>

      <section id="datos-sensibles" className="mb-8">
        <h2 className="text-lg font-bold mb-3">8. Tratamiento de datos sensibles</h2>
        <p className="mb-3">Veqto reconoce y trata los siguientes datos sensibles con las finalidades indicadas:</p>
        <table className="w-full border border-gray-200 mb-3">
          <thead><tr><Th>Tipo</Th><Th>Finalidad</Th><Th>Fundamento</Th></tr></thead>
          <tbody>
            <tr><Td>Datos biométricos (huella, reconocimiento facial, fotografía)</Td><Td>Verificación de identidad en firma digital</Td><Td>Decreto 2364/2012, Ley 527/1999</Td></tr>
            <tr><Td>Datos de salud (seguros opcionales)</Td><Td>Estructuración de seguro de vida o desempleo asociado</Td><Td>Código de Comercio, normativa de seguros</Td></tr>
            <tr><Td>Origen étnico (cuando sea relevante)</Td><Td>Cumplimiento FATCA u obligaciones de reporte internacional</Td><Td>Ley 1581/2012 Art. 6</Td></tr>
          </tbody>
        </table>
        <p>El titular no está obligado a autorizar el tratamiento de datos sensibles. Veqto informará en todo momento que se trata de datos de esta naturaleza y obtendrá el consentimiento expreso, previo e informado antes de proceder.</p>
      </section>

      <section id="derechos" className="mb-8">
        <h2 className="text-lg font-bold mb-3">9. Derechos de los titulares</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Conocimiento y acceso:</strong> Información gratuita sobre datos tratados y uso dado.</li>
          <li><strong>Rectificación:</strong> Solicitar la corrección de información inexacta o incompleta.</li>
          <li><strong>Actualización:</strong> Solicitar que la información esté completa y vigente.</li>
          <li><strong>Supresión:</strong> Eliminación cuando no exista deber legal o contractual.</li>
          <li><strong>Revocatoria:</strong> Revocar la autorización en cualquier momento.</li>
          <li><strong>Prueba de la autorización:</strong> Solicitar copia de la autorización otorgada.</li>
          <li><strong>Queja ante la SIC:</strong> Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
          <li><strong>No suministrar datos sensibles:</strong> Abstenerse de responder preguntas sobre datos sensibles.</li>
        </ul>
      </section>

      <section id="procedimiento" className="mb-8">
        <h2 className="text-lg font-bold mb-3">10. Procedimiento para el ejercicio de derechos</h2>
        <h3 className="font-bold mt-3 mb-2">10.1 Consultas</h3>
        <p>Las consultas deberán dirigirse a <strong>protecciondatos@veqto.ai</strong> indicando: nombre completo del titular, descripción de la información a consultar, dirección de respuesta y documentos que acrediten la legitimidad. Veqto responderá dentro de los diez (10) días hábiles siguientes (extensión máxima de cinco (5) días hábiles adicionales si fuese necesario).</p>
        <h3 className="font-bold mt-3 mb-2">10.2 Reclamos</h3>
        <p>Los reclamos para corregir, actualizar o suprimir información se dirigen a <strong>protecciondatos@veqto.ai</strong> con: nombre del titular, descripción de los hechos, dirección de respuesta, firma e identificación, y documentos de soporte. La base de datos incluirá la leyenda &quot;RECLAMO EN TRÁMITE&quot; y el asunto será resuelto dentro de los quince (15) días hábiles siguientes.</p>
      </section>

      <section id="seguridad" className="mb-8">
        <h2 className="text-lg font-bold mb-3">11. Seguridad de la información</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cifrado en tránsito y en reposo (TLS/AES) sobre la infraestructura cloud (Supabase, Railway, Vercel).</li>
          <li>Control de acceso basado en roles (RBAC) con Row Level Security (RLS).</li>
          <li>Autenticación multifactor para accesos a sistemas con datos personales.</li>
          <li>Registro de auditoría de accesos y modificaciones.</li>
          <li>Planes de respuesta a incidentes y notificación a la SIC.</li>
          <li>Acuerdos de confidencialidad con colaboradores, proveedores y encargados.</li>
          <li>Revisión periódica de la seguridad antes y después del Go-Live.</li>
        </ul>
      </section>

      <section id="datos-financieros" className="mb-8">
        <h2 className="text-lg font-bold mb-3">12. Datos financieros — Ley 1266 de 2008</h2>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Evaluación del riesgo crediticio para originación de los productos financieros que comercializa Veqto: crédito vehículo, leasing vehículo, prenda sobre garantía propia, compra de cartera vehicular, libranza y libre inversión.</li>
          <li>Consulta en centrales de riesgo previa autorización expresa del titular.</li>
          <li>Reporte de comportamiento positivo o negativo a operadores autorizados.</li>
          <li>Análisis estadístico para mejoramiento del modelo de scoring con IA.</li>
        </ul>
        <p>Frente al reporte de información negativa, Veqto comunicará previamente al titular con al menos veinte (20) días calendario de anticipación. La permanencia de información negativa no excederá el doble del tiempo de la mora ni cuatro (4) años desde la extinción de la obligación.</p>
      </section>

      <section id="contactabilidad" className="mb-8">
        <h2 className="text-lg font-bold mb-3">13. Contactabilidad — Ley 2300 de 2023</h2>
        <table className="w-full border border-gray-200 mb-3">
          <thead><tr><Th>Día</Th><Th>Horario autorizado</Th></tr></thead>
          <tbody>
            <tr><Td>Lunes a viernes</Td><Td>7:00 a.m. – 7:00 p.m.</Td></tr>
            <tr><Td>Sábados</Td><Td>8:00 a.m. – 3:00 p.m.</Td></tr>
            <tr><Td>Domingos y festivos</Td><Td>Sin contacto permitido</Td></tr>
          </tbody>
        </table>
        <p>No se contactará al titular más de una vez por el mismo canal en el mismo día. Canales autorizados: WhatsApp (360dialog), correo, SMS y llamadas DID. No se contactará referencias personales ni se realizarán visitas al domicilio en cobranza.</p>
      </section>

      <section id="transferencia" className="mb-8">
        <h2 className="text-lg font-bold mb-3">14. Transferencia y transmisión internacional</h2>
        <p>Veqto podrá transferir datos fuera del territorio colombiano cuando: (i) el titular autorice expresamente, (ii) se trate de proveedores de tecnología cloud (Vercel, Railway, Supabase) con acuerdo de encargado del tratamiento, o (iii) sea necesario para obligaciones legales o contractuales con entidades bancarias internacionales.</p>
      </section>

      <section id="vigencia" className="mb-8">
        <h2 className="text-lg font-bold mb-3">15. Vigencia y modificaciones</h2>
        <p className="mb-3">La presente Política entra en vigencia el 14 de abril de 2026. Cualquier modificación sustancial se comunicará a los titulares en www.veqto.ai con al menos quince (15) días de anticipación.</p>
        <table className="w-full border border-gray-200">
          <thead><tr><Th>Versión</Th><Th>Fecha</Th><Th>Modificaciones</Th><Th>Aprobó</Th></tr></thead>
          <tbody>
            <tr><Td>01</Td><Td>14/04/2026</Td><Td>Primera edición</Td><Td>Junta de Socios Veqto</Td></tr>
            <tr><Td>02</Td><Td>30/04/2026</Td><Td>Ampliación a 6 productos financieros</Td><Td>Junta de Socios Veqto</Td></tr>
          </tbody>
        </table>
      </section>

      <section id="sic" className="mb-8">
        <h2 className="text-lg font-bold mb-3">16. Autoridad nacional de protección de datos</h2>
        <p>La <strong>Superintendencia de Industria y Comercio (SIC)</strong> es la autoridad competente para vigilar las actividades de tratamiento de datos personales en Colombia. Los titulares pueden presentar quejas en <strong>www.sic.gov.co</strong>.</p>
      </section>

      <p className="mt-8 text-xs text-gray-500 italic">
        Documento oficial — VEQTO S.A.S — NIT 902.051.244-0 — Versión 02 · 30/04/2026 · Código VEQ-GC-001
      </p>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyView;
