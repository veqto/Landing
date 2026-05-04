'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';
import { ModalProvider } from '@/components/ModalContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import WhatIsVeqto from '@/components/sections/WhatIsVeqto';
import CreditFlow from '@/components/sections/CreditFlow';
import BenefitsAllies from '@/components/sections/BenefitsAllies';
import BenefitsBanks from '@/components/sections/BenefitsBanks';
import Simulator from '@/components/sections/Simulator';
import CTASection from '@/components/sections/CTASection';
import CreditRequestModal from '@/components/sections/CreditRequestModal';
import AllyRegistrationModal from '@/components/sections/AllyRegistrationModal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <Navbar />
        <main>
          <Hero />
          <Simulator />
          <WhatIsVeqto />
          <CreditFlow />
          <BenefitsAllies />
          <BenefitsBanks />
          <CTASection />
        </main>
        <Footer />
        <CreditRequestModal />
        <AllyRegistrationModal />
      </ModalProvider>
    </LanguageProvider>
  );
}
