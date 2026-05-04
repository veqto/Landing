import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Veqto',
  description: 'Términos y condiciones de uso de la plataforma de crédito vehicular Veqto.',
};

export default function TerminosCondicionesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
