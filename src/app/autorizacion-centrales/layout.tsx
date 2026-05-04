import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autorización Centrales de Riesgo | Veqto',
  description: 'Autorización de consulta y reporte en centrales de riesgo conforme a la Ley 1266 de 2008.',
};

export default function AutorizacionCentralesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
