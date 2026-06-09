import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acceder a la plataforma | Veqto',
  description:
    'Ingresá a la plataforma Veqto según tu rol: administrador, aliado comercial o banco aliado.',
};

export default function AccederLayout({ children }: { children: React.ReactNode }) {
  return children;
}
