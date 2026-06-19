import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Dominio canonico: https://veqto.ai (NO .com). metadataBase resuelve URLs
// relativas de OG/twitter images automaticamente.
const SITE_URL = "https://veqto.ai";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00C4A0",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Veqto | Crédito Vehicular Inteligente en Colombia",
  description:
    "Veqto: el orquestador de crédito vehicular que conecta clientes, aliados comerciales, concesionarios y bancos en Colombia. Financiamiento rápido, seguro y 100% digital. Multi-banco en paralelo.",
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
    "multi-banco crédito vehicular",
    "financiamiento vehículos",
  ],
  authors: [{ name: "Veqto S.A.S." }],
  creator: "Veqto S.A.S.",
  publisher: "Veqto S.A.S.",
  openGraph: {
    title: "Veqto | Crédito Vehicular Inteligente en Colombia",
    description:
      "Conectamos clientes, aliados comerciales y bancos para financiar tu próximo vehículo. Multi-banco en paralelo, cumplimiento Ley 1581.",
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
    siteName: "Veqto",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Veqto - Crédito Vehicular Inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veqto | Crédito Vehicular Inteligente",
    description:
      "Financiamiento de vehículos rápido, seguro y 100% digital en Colombia.",
    creator: "@veqto",
    images: ["/og-image.png"],
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
    canonical: SITE_URL,
    languages: {
      "es-CO": SITE_URL,
      "en-US": `${SITE_URL}/en`,
    },
  },
};

// Structured data Schema.org: Organization + FinancialService
// (JSON-LD inyectado en el body para visibilidad de motores de busqueda)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService"],
  name: "Veqto S.A.S.",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/Logo-veqto-Positivo.svg`,
  description:
    "Orquestador de crédito vehicular que conecta clientes, aliados comerciales y bancos en Colombia.",
  taxID: "902.051.244-0",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
    addressLocality: "Bogotá",
  },
  areaServed: { "@type": "Country", name: "Colombia" },
  serviceType: "Crédito vehicular",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-cream text-negro font-nunito">
        {/* JSON-LD structured data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
