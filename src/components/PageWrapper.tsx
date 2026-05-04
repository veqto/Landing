'use client';

import React from 'react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { ModalProvider } from '@/components/ModalContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CreditRequestModal from '@/components/sections/CreditRequestModal';
import AllyRegistrationModal from '@/components/sections/AllyRegistrationModal';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <ModalProvider>
        <Navbar />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
        <CreditRequestModal />
        <AllyRegistrationModal />
      </ModalProvider>
    </LanguageProvider>
  );
};

export default PageWrapper;
