import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00C4A0",
};

export const metadata: Metadata = {
  title: "Veqto | Crédito Vehicular Inteligente en Colombia",
  description:
    "Veqto: el orquestador de crédito vehicular que conecta clientes, aliados comerciales, concesionarios y bancos en Colombia. Financiamiento rápido, seguro y 100% digital. Pre-aprobación en menos de 5 minutos.",
  keywords: [
    "crédito vehicular",
    "crédito vehicular Colombia",
    "financiamiento auto",
    "fintech Colombia",
    "crédito de carros",
    "aliados comerciales",
    "concesionario de carros",
    "crédito digital",
    "Veqto",
    "pre-aprobación crédito",
    "financiamiento vehículos",
  ],
  authors: [{ name: "Veqto" }],
  creator: "Veqto",
  openGraph: {
    title: "Veqto | Crédito Vehicular Inteligente en Colombia",
    description:
      "Conectamos clientes, aliados comerciales, concesionarios y bancos para financiar tu próximo vehículo de forma rápida y segura. Pre-aprobación en minutos.",
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
    siteName: "Veqto",
    url: "https://veqto.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veqto | Crédito Vehicular Inteligente",
    description:
      "Financiamiento de vehículos rápido, seguro y 100% digital en Colombia",
    creator: "@veqto",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://veqto.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-cream text-negro font-nunito">
        {children}
      </body>
    </html>
  );
}
