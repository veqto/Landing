'use client';

import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const CreditBureauAuthView: React.FC = () => {
  return (
    <LegalPageLayout
      title="Autorización de Consulta y Reporte en Centrales de Riesgo"
      documentCode="VEQ-AU-002"
      version="1.0"
      lastUpdated="Abril 2026"
    >
      <section className="mb-8">
        <p>En cumplimiento de la Ley 1266 de 2008 (Ley de Habeas Data Financiero) y demás normas concordantes, autorizo de manera previa, expresa e informada a:</p>
        <div className="mt-3 p-4 bg-gray-50 rounded-xl">
          <p><strong>VEQTO S.A.S.</strong> — NIT: 902.051.244-0</p>
          <p className="text-sm text-gray-600 mt-1">y a las entidades financieras aliadas a las que se envíe mi solicitud de cualquiera de los productos financieros que comercializa Veqto</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Alcance de la Autorización</h2>
        <p>La presente autorización comprende los siguientes puntos:</p>
        <ol className="list-decimal pl-5 space-y-2 mt-3">
          <li>
            <strong>Consultar</strong> mi información financiera, crediticia, comercial, de servicios y la proveniente de terceros países, contenida en las bases de datos de los operadores de información financiera y crediticia, incluyendo pero no limitado a <strong>DataCrédito (Experian)</strong> y <strong>TransUnion CIFIN</strong>.
          </li>
          <li>
            <strong>Reportar</strong> a las centrales de riesgo la información sobre el estado de mis obligaciones financieras, incluyendo el cumplimiento o incumplimiento de las mismas.
          </li>
          <li>
            <strong>Actualizar</strong> periódicamente mi información financiera y crediticia en las centrales de riesgo.
          </li>
          <li>
            <strong>Verificar</strong> la autenticidad de la información personal y financiera que he proporcionado en la solicitud de crédito.
          </li>
          <li>
            <strong>Compartir</strong> los resultados de las consultas crediticias con las entidades financieras aliadas que evalúen mi solicitud del producto financiero seleccionado (crédito vehículo, leasing, prenda, compra de cartera, libranza o libre inversión).
          </li>
          <li>
            <strong>Consultar</strong> las listas restrictivas nacionales e internacionales (OFAC, ONU, entre otras) para el cumplimiento de las normas de prevención de lavado de activos y financiación del terrorismo.
          </li>
          <li>
            <strong>Utilizar</strong> mi información crediticia para la evaluación de riesgo crediticio mediante modelos de scoring e inteligencia artificial.
          </li>
          <li>
            <strong>Almacenar</strong> la información de las consultas realizadas como parte del expediente de mi solicitud de crédito.
          </li>
          <li>
            <strong>Transmitir</strong> mi información crediticia a los encargados del tratamiento que presten servicios de análisis de riesgo a Veqto y a las entidades financieras aliadas.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Aviso sobre Dato Negativo</h2>
        <p>Autorizo que, en caso de incumplimiento de mis obligaciones financieras, se reporte dicha situación a las centrales de riesgo, previo aviso conforme a lo establecido en la Ley 1266 de 2008.</p>
        <p className="mt-2">Veqto y/o la entidad financiera que otorgue el crédito me notificarán por escrito al correo electrónico registrado en mi solicitud, con al menos veinte (20) días calendario de anticipación, antes de realizar cualquier reporte de información negativa a las centrales de riesgo.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Permanencia de la Información Negativa</h2>
        <p>De conformidad con el artículo 13 de la Ley 1266 de 2008:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>La información negativa permanecerá por un término máximo de <strong>cuatro (4) años</strong> contados a partir de la fecha de pago voluntario de la obligación vencida.</li>
          <li>En caso de que la mora sea inferior a <strong>dos (2) años</strong>, el término de permanencia será igual al doble de la mora.</li>
          <li>La información positiva permanecerá de manera indefinida en las centrales de riesgo.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Vigencia de la Autorización</h2>
        <p>La presente autorización tendrá vigencia desde la fecha de su otorgamiento y se mantendrá vigente mientras:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Se encuentre en trámite mi solicitud de cualquiera de los productos financieros que comercializa Veqto</li>
          <li>Existan obligaciones financieras vigentes derivadas del crédito aprobado</li>
          <li>Subsista la finalidad del tratamiento de la información</li>
          <li>No sea revocada expresamente por el titular</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Derechos del Titular</h2>
        <p>Como titular de la información financiera y crediticia, tengo derecho a:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Conocer la información que sobre mí se encuentre registrada en las centrales de riesgo</li>
          <li>Solicitar la actualización y rectificación de mi información</li>
          <li>Solicitar prueba de la autorización otorgada</li>
          <li>Presentar reclamos ante el operador o la fuente por violación a mis derechos</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
        </ul>
      </section>

      <div className="mt-8 p-4 bg-aurora/5 rounded-xl border border-aurora/20">
        <p className="text-sm text-negro font-semibold">Declaro que otorgo la presente autorización de forma libre, previa, expresa e informada, y que he sido debidamente informado(a) sobre las finalidades y el alcance de las consultas y reportes en centrales de riesgo conforme a la Ley 1266 de 2008.</p>
      </div>
    </LegalPageLayout>
  );
};

export default CreditBureauAuthView;
