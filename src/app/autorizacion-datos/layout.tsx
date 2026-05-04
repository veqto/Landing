import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autorización de Datos | Veqto',
  description: 'Autorización de tratamiento de datos personales conforme a la Ley 1581 de 2012.',
};

export default function AutorizacionDatosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
