'use client';

import PageWrapper from '@/components/PageWrapper';
import PrivacyPolicyView from '@/components/legal/PrivacyPolicyView';
import TableOfContents from '@/components/legal/TableOfContents';
import { privacyPolicySections } from '@/components/legal/PrivacyPolicyView';

export default function PoliticaPrivacidadPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
          <TableOfContents items={privacyPolicySections} />
          <PrivacyPolicyView />
        </div>
      </div>
    </PageWrapper>
  );
}
