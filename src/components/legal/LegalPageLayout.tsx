'use client';

import React from 'react';
import Container from '@/components/ui/Container';

interface LegalPageLayoutProps {
  title: string;
  documentCode?: string;
  version?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title, documentCode, version, lastUpdated, children,
}) => {
  return (
    <div className="bg-cream min-h-screen py-8 md:py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logos/Logo-veqto-Negativo.svg" alt="Veqto" className="h-8 w-auto" onError={(e) => { (e.target as HTMLImageElement).src = '/logos/Logo-veqto-Positivo.svg'; }} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-negro mb-2">{title}</h1>
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              {documentCode && <span className="bg-gray-100 px-2 py-0.5 rounded">{documentCode}</span>}
              {version && <span className="bg-gray-100 px-2 py-0.5 rounded">Versión {version}</span>}
              {lastUpdated && <span className="bg-gray-100 px-2 py-0.5 rounded">Última actualización: {lastUpdated}</span>}
            </div>
          </div>

          {/* Content card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
            <div className="prose prose-sm max-w-none prose-headings:text-negro prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-aurora prose-a:no-underline hover:prose-a:underline">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LegalPageLayout;
