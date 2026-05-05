'use client';

import React from 'react';
import Link from 'next/link';
import LegalPageLayout from './LegalPageLayout';

const DataAuthorizationView: React.FC = () => {
  return (
    <LegalPageLayout
      title="Autorización de consulta en centrales de riesgo y tratamiento de datos personales"
      documentCode="VEQ-AU-001"
      version="02"
      lastUpdated="Abril 2026"
    >
      <header className="mb-6 pb-4 border-b border-gray-200">
        <p className="text-xs uppercase tracking-wider text-aurora font-semibold">VEQTO S.A.S — NIT 902.051.244-0</p>
        <p className="mt-1 text-sm text-gray-600">Ley 1581 de 2012 · Ley 1266 de 2008 · Decreto 2300 de 2023</p>
        <p className="mt-1 text-xs text-gray-500 italic">Versión 02 · Abril 2026 · Código: VEQ-AU-001 · FOVQTO-01</p>
      </header>

      <section className="mb-8">
        <p className="mb-2">
          Yo <strong>____________________________________________</strong> identificado con
          {' '}<strong>CC ___ CE ___</strong> No. <strong>________________________</strong>,
          actuando en nombre propio, de forma voluntaria, autorizo de manera expresa, previa e
          irrevocable a la sociedad <strong>VEQTO S.A.S.</strong> identificada con NIT
          {' '}902.051.244-0, con domicilio en la ciudad de Bogotá D.C., página web
          {' '}<strong>www.veqto.ai</strong>, correo electrónico
          {' '}<strong>protecciondatos@veqto.ai</strong>, a quien haga sus veces, a quien actúe como
          cesionario de sus derechos y/o a cualquiera de sus aliados, y a todas aquellas
          entidades crediticias y financieras con quienes VEQTO S.A.S. tenga o tuviese convenio
          o contratos firmados de intermediación de productos financieros (crédito vehículo,
          leasing vehículo, prenda sobre garantía propia, compra de cartera vehicular, libranza
          y libre inversión) (en adelante <strong>LAS PARTES</strong>),
          para que de forma permanente e irrevocable, en los términos expresados en la Política
          de Tratamiento de Datos Personales de VEQTO S.A.S. publicada en
          {' '}<Link href="/politica-tratamiento-datos" className="text-aurora underline">www.veqto.ai</Link>:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-3">
          <li>Consulte, solicite, suministre, reporte, procese, obtenga, recolecte, compile, confirme, intercambie, modifique, emplee, analice, conserve, reciba y envíe toda la información que se refiere a mi comportamiento crediticio, financiero, comercial y de servicios a cualquier Operador de Información debidamente constituido o entidad que maneje bases de datos con fines similares, dentro y fuera del territorio nacional.</li>
          <li>Libere la información necesaria para la búsqueda de mi cupo en cualquiera de los productos financieros que comercializa VEQTO (crédito vehículo, leasing vehículo, prenda sobre garantía propia, compra de cartera vehicular, libranza y libre inversión) ante las entidades financieras aliadas. Entiendo que LAS PARTES no asumen responsabilidad por la aprobación o negación del producto solicitado, pues actúan como canal de información entre el solicitante y la entidad financiera.</li>
          <li>Destruir toda la información y documentación aportada cuando las solicitudes sean negadas o desistidas, dentro del término establecido por la ley.</li>
        </ol>
        <p className="mt-3">VEQTO S.A.S. ha diseñado políticas y procedimientos que, en conjunto con la presente autorización, permiten hacer uso de sus datos personales conforme a la ley.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">En relación con mis Datos Personales</h2>

        <h3 className="font-bold mt-4 mb-2">¿Para qué se utilizará mi información?</h3>
        <p className="mb-2">Por vía de este documento, autorizo a VEQTO S.A.S. a dar tratamiento a mis datos personales para:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>El desarrollo de su objeto social como intermediario de productos financieros (crédito vehículo, leasing vehículo, prenda sobre garantía propia, compra de cartera vehicular, libranza y libre inversión) y de la relación contractual que nos vincula, lo que supone la atención de mis solicitudes, la gestión del proceso de originación, la generación de documentos, y la realización de actividades de cobranza.</li>
          <li>La evaluación de mi solicitud del producto financiero seleccionado mediante el motor de scoring con inteligencia artificial de la plataforma Veqto, incluyendo el análisis automatizado de mi perfil crediticio y la determinación de la oferta más adecuada.</li>
          <li>Consultar mis datos en centrales de riesgo (TransUnión, DataCrédito/CIFIN) y en bases de datos de administradoras de fondos de pensiones, operadores de información de seguridad social, facturación y nómina electrónica, con el fin de realizar gestión de riesgo crediticio.</li>
          <li>La estructuración de ofertas comerciales y la remisión de información sobre los productos financieros que comercializa Veqto (crédito vehículo, leasing, prenda, compra de cartera, libranza, libre inversión) y productos asociados (seguros, asistencias) a través de los canales que Veqto establezca.</li>
          <li>La adopción de medidas tendientes a la prevención de actividades ilícitas, incluyendo la verificación en listas de control SARLAFT (OFAC, ONU, UIAF).</li>
          <li>El cumplimiento de las normas que implican el intercambio o suministro de información para efectos tributarios, tal como FATCA, y demás obligaciones legales ante la DIAN, SFC y SIC.</li>
          <li>Hacer uso de mi registro fotográfico y datos biométricos (huella dactilar, reconocimiento facial) para validar y verificar mi identidad en el proceso de firma digital, conforme al Decreto 2364 de 2012 y la Ley 527 de 1999.</li>
          <li>Emplear mecanismos de identificación y autenticación electrónica para la suscripción de contratos, solicitudes de productos y demás documentos electrónicos en favor de Veqto S.A.S.</li>
          <li>Analizar, estudiar y evaluar la información sobre gustos, hábitos e intereses, que le permitan a Veqto mejorar la relación con el Titular e identificar sus verdaderas necesidades financieras.</li>
          <li>Actualizar la información del Titular de conformidad con los datos registrados en bases de terceros, operadores de información y demás entidades legalmente autorizadas.</li>
          <li>Enviar comunicaciones de tipo legal, comercial y operativo que Veqto se encuentre en obligación de remitir, a través de WhatsApp, correo electrónico, SMS y llamadas DID.</li>
          <li>Realizar el tratamiento de la información a través de aplicativos, desarrollos digitales o canales no presenciales propios o de terceros, incluyendo la infraestructura cloud de la plataforma (Vercel, Railway, Supabase).</li>
          <li>Compartir la información con aliados comerciales y concesionarios (entidades referidoras y empleadores en el caso de libranza) y entidades bancarias con quienes Veqto celebre acuerdos para la intermediación de los productos financieros que comercializa.</li>
          <li>Tratar y compartir la información personal a través de mecanismos de finanzas abiertas y datos abiertos regulados, en aras de contribuir a la inclusión financiera.</li>
          <li>Para el cumplimiento de las obligaciones contractuales, directamente o a través de terceros contratados por Veqto (Encargados).</li>
          <li>Realizar llamadas DID, mensajes SMS, mensajes por WhatsApp y correos para cobranza y/o seguimiento, con sujeción a los horarios establecidos en la Ley 2300 de 2023 (lunes a viernes 7:00 a.m.–7:00 p.m.; sábados 8:00 a.m.–3:00 p.m.).</li>
          <li>Que sean solicitados y tratados los datos personales de carácter sensible (grupo étnico, datos biométricos), en cumplimiento de un deber legal. Declaro que he sido informado que no estoy obligado a autorizar su tratamiento.</li>
          <li>Para comprobar y verificar toda la información consignada en esta solicitud y realizar gestión de riesgo crediticio mediante visitas, registro fotográfico, revisión documental y entrevistas, cuando aplique.</li>
          <li>Las demás finalidades que se integren en la Política de Tratamiento de Datos Personales de Veqto S.A.S.</li>
        </ul>

        <h3 className="font-bold mt-4 mb-2">¿Quiénes están autorizados para utilizar mi información?</h3>
        <p>La presente autorización se hace extensiva a quien represente los derechos de VEQTO S.A.S., a quien éste contrate para el ejercicio de los mismos o a quien éste ceda sus derechos, sus obligaciones o su posición contractual a cualquier título, en relación con los servicios de los que soy titular. Así mismo, a las entidades con quienes Veqto establezca alianzas comerciales de intermediación de los productos financieros que comercializa (crédito vehículo, leasing, prenda, compra de cartera, libranza y libre inversión).</p>

        <h3 className="font-bold mt-4 mb-2">¿Por cuánto tiempo estará vigente esta autorización?</h3>
        <p>VEQTO S.A.S. conservará los datos personales por el período que la normatividad vigente así lo exija. El tratamiento estará atado al tiempo razonable y necesario para cumplir con las finalidades autorizadas. El período mínimo de conservación corresponderá al término de duración de la relación legal o contractual con Veqto. Terminado este tiempo, Veqto podrá eliminar los datos, salvo que continúe vigente un deber legal o contractual que disponga lo contrario.</p>

        <h3 className="font-bold mt-4 mb-2">¿Cuáles son los derechos de los Titulares de Datos?</h3>
        <p>Los titulares tienen derecho a: conocer, actualizar y rectificar sus datos personales; solicitar prueba de la autorización otorgada; presentar quejas ante la Superintendencia de Industria y Comercio (SIC); suprimir sus datos y/o revocar la autorización cuando no medie deber legal o contractual que lo impida. Para ejercer sus derechos, comuníquese al correo <strong>protecciondatos@veqto.ai</strong> o consulte la <Link href="/politica-tratamiento-datos" className="text-aurora underline">Política de Tratamiento de Datos</Link>.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Espacio de uso exclusivo de VEQTO S.A.S.</h2>
        <p>
          Certifica que la firma de este documento se tomó en presencia de:
          {' '}<strong>____________________________________</strong> &nbsp;
          FIRMA: <strong>__________________________</strong> &nbsp;
          FECHA: <strong>__________________________</strong>
        </p>
      </section>

      <p className="mt-8 text-xs text-gray-500 italic">
        Documento oficial — VEQTO S.A.S — NIT 902.051.244-0 — Versión 02 · Abril 2026 · Código VEQ-AU-001
      </p>
    </LegalPageLayout>
  );
};

export default DataAuthorizationView;
