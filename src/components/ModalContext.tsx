'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'credit' | 'ally' | null;

interface ModalContextType {
  activeModal: ModalType;
  openCreditModal: () => void;
  openAllyModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  return (
    <ModalContext.Provider value={{
      activeModal,
      openCreditModal: () => setActiveModal('credit'),
      openAllyModal: () => setActiveModal('ally'),
      closeModal: () => setActiveModal(null),
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
}
