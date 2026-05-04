"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Locale, translations, Translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({
  children,
  initialLocale = "es",
}: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useTranslation must be used within a LanguageProvider"
    );
  }
  return context;
}

export function useT() {
  const { t } = useTranslation();
  return t;
}
