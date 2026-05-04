import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solicitud de Crédito Vehicular | Veqto',
  description: 'Solicita tu crédito vehicular en línea con Veqto. Completa el formulario y recibe opciones de múltiples bancos en menos de 24 horas.',
};

export default function SolicitudCreditoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
