import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Veqto',
  description: 'Política de privacidad y protección de datos personales de Veqto, conforme a la Ley 1581 de 2012.',
};

export default function PoliticaPrivacidadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
