'use client';

import PageWrapper from '@/components/PageWrapper';
import TermsView from '@/components/legal/TermsView';
import TableOfContents from '@/components/legal/TableOfContents';
import { termsSections } from '@/components/legal/TermsView';

export default function TerminosCondicionesPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
          <TableOfContents items={termsSections} />
          <TermsView />
        </div>
      </div>
    </PageWrapper>
  );
}
