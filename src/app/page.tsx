'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';
import { ModalProvider } from '@/components/ModalContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Solution from '@/components/sections/Solution';
import WhyVeqto from '@/components/sections/WhyVeqto';
import CreditFlow from '@/components/sections/CreditFlow';
import Ecosystem from '@/components/sections/Ecosystem';
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
          <Problem />
          <Solution />
          <WhyVeqto />
          <CreditFlow />
          <Ecosystem />
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
