'use client';

import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const DataAuthorizationView: React.FC = () => {
  return (
    <LegalPageLayout
      title="Autorización de Tratamiento de Datos Personales"
      documentCode="VEQ-AU-001"
      version="2.0"
      lastUpdated="Abril 2026"
    >
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Encabezado</h2>
        <p>En cumplimiento de la Ley Estatutaria 1581 de 2012 de Protección de Datos Personales y su Decreto Reglamentario 1377 de 2013, <strong>VEQTO S.A.S.</strong>, identificada con NIT 901.XXX.XXX-X, con domicilio en Bogotá D.C., Colombia, solicita la siguiente autorización:</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Responsable del Tratamiento</h2>
        <p><strong>VEQTO S.A.S.</strong></p>
        <p>NIT: 901.XXX.XXX-X</p>
        <p>Dirección: Bogotá D.C., Colombia</p>
        <p>Correo: datos@veqto.com</p>
        <p>Teléfono: +57 (601) 601-2345</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Finalidades del Tratamiento</h2>
        <p>Autorizo a VEQTO S.A.S. para que recolecte, almacene, use, circule, suprima y en general trate mis datos personales para las siguientes finalidades:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-2">
          <li>Gestionar mi solicitud de crédito vehicular ante entidades financieras.</li>
          <li>Evaluar mi perfil crediticio mediante herramientas de análisis e inteligencia artificial.</li>
          <li>Enviar mi solicitud a entidades financieras aliadas para su evaluación y aprobación.</li>
          <li>Consultar mi información en centrales de riesgo y bases de datos de información financiera.</li>
          <li>Verificar la autenticidad de mi identidad y documentación.</li>
          <li>Comunicarme el estado de mi solicitud de crédito por cualquier medio.</li>
          <li>Enviarme ofertas de crédito aprobadas por las entidades financieras.</li>
          <li>Compartir mi información con aliados comerciales (concesionarios) para la gestión de la venta.</li>
          <li>Contactarme vía telefónica, correo electrónico, SMS o WhatsApp.</li>
          <li>Enviarme comunicaciones comerciales sobre productos y servicios de Veqto y sus aliados.</li>
          <li>Realizar análisis estadísticos y de mercado.</li>
          <li>Cumplir obligaciones legales y regulatorias.</li>
          <li>Prevenir fraude y lavado de activos.</li>
          <li>Gestionar procesos de cobranza en caso de incumplimiento.</li>
          <li>Mejorar los productos y servicios de la plataforma.</li>
          <li>Compartir información con aseguradoras para la gestión de seguros vehiculares.</li>
          <li>Transferir datos a proveedores de tecnología para el procesamiento seguro.</li>
          <li>Atender peticiones, quejas, reclamos y sugerencias (PQRS).</li>
          <li>Cualquier otra finalidad compatible con las anteriores y con la naturaleza del servicio.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Datos Sensibles</h2>
        <p>Autorizo el tratamiento de mis datos sensibles, incluyendo datos biométricos (firma digital), los cuales son recolectados con la finalidad exclusiva de validar mi identidad y suscribir electrónicamente la solicitud de crédito. El suministro de datos sensibles es facultativo y no condiciona la prestación del servicio cuando no resulten indispensables.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Derechos del Titular</h2>
        <p>Como titular de los datos, tengo derecho a:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Conocer, actualizar y rectificar mis datos personales</li>
          <li>Solicitar prueba de la autorización otorgada</li>
          <li>Ser informado sobre el uso dado a mis datos personales</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
          <li>Revocar la autorización y/o solicitar la supresión de mis datos</li>
          <li>Acceder en forma gratuita a mis datos personales</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Canal de Atención</h2>
        <p>Para ejercer mis derechos como titular puedo comunicarme a:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Correo electrónico:</strong> datos@veqto.com</li>
          <li><strong>Teléfono:</strong> +57 (601) 601-2345</li>
          <li><strong>Dirección:</strong> Bogotá D.C., Colombia</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Marco Normativo</h2>
        <p>La presente autorización se otorga en el marco de:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Ley Estatutaria 1581 de 2012</li>
          <li>Decreto 1377 de 2013</li>
          <li>Decreto 1074 de 2015</li>
          <li>Ley 1266 de 2008 (Habeas Data Financiero)</li>
          <li>Ley 527 de 1999 (Comercio Electrónico y Firma Digital)</li>
        </ul>
      </section>

      <div className="mt-8 p-4 bg-aurora/5 rounded-xl border border-aurora/20">
        <p className="text-sm text-negro font-semibold">Declaro que he leído y comprendido la presente autorización, así como la Política de Privacidad de Veqto, y otorgo mi consentimiento libre, previo, expreso e informado para el tratamiento de mis datos personales conforme a las finalidades aquí descritas.</p>
      </div>
    </LegalPageLayout>
  );
};

export default DataAuthorizationView;
