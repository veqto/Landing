export type Locale = "es" | "en";

/**
 * Fragmento de un titular con resaltado explícito.
 *
 * Los segmentos se concatenan literalmente al renderizar, así que los espacios
 * de separación deben ir dentro del `text`. Sustituye al esquema anterior de
 * `highlightWords`, que hacía match por substring y resaltaba de más en EN.
 */
export type TitleSegment = {
  text: string;
  highlight?: boolean;
};

export type Translations = {
  navbar: {
    home: string;
    about: string;
    creditFlow: string;
    benefits: string;
    simulator: string;
    cta: string;
  };
  hero: {
    titleSegments: TitleSegment[];
    subtitle: string;
    /** Párrafo de apoyo; el segmento resaltado se renderiza en negrita, no en verde. */
    intro: TitleSegment[];
    /** CTA naranja de conversión: abre CreditRequestModal. */
    ctaPrimary: string;
    /** CTA outline claro: hace scroll a la sección de pasos (#proceso). */
    ctaSecondary: string;
    imageAlt: string;
  };
  problem: {
    title: string;
    intro: string;
    items: string[];
  };
  solution: {
    titleTop: string;
    titleBottom: string;
    description: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
    imageAlt: string;
  };
  whyVeqto: {
    titleSegments: TitleSegment[];
    items: string[];
  };
  creditFlow: {
    titleSegments: TitleSegment[];
    steps: {
      [key: string]: {
        title: string;
        description: string;
      };
    };
    imageAlt: string;
  };
  benefitsAllies: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  benefitsBanks: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    trustStatement: string;
  };
  simulator: {
    titleSegments: TitleSegment[];
    vehiclePrice: string;
    downPayment: string;
    downPaymentLabel: string;
    months: string;
    monthsLabel: string;
    annualInterest: string;
    annualInterestLabel: string;
    monthlyPayment: string;
    loanAmount: string;
    calculate: string;
    disclaimer: string;
    ctaButton: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button1: string;
    button2: string;
    trustBadge: string;
  };
  access: {
    navButton: string;
    pageTitle: string;
    pageSubtitle: string;
    roles: {
      admin: { title: string; description: string; button: string };
      ally: { title: string; description: string; button: string };
      bank: { title: string; description: string; button: string };
    };
    helpNote: string;
    contactLabel: string;
    backHome: string;
  };
  footer: {
    company: string;
    companyDescription: string;
    product: string;
    productLinks: Array<{ label: string; href: string }>;
    companyLinks: { title: string; items: Array<{ label: string; href: string }> };
    legal: string;
    legalLinks: Array<{ label: string; href: string }>;
    contact: string;
    email: string;
    address: string;
    copyright: string;
  };
  forms: {
    next: string;
    back: string;
    submit: string;
    step: string;
    required: string;
    success: string;
    successMessage: string;
    backToHome: string;
    goToSimulator: string;
    of: string;
  };
};

export const translations: Record<Locale, Translations> = {
  es: {
    navbar: {
      home: "Inicio",
      about: "¿Qué es?",
      creditFlow: "¿Cómo funciona?",
      benefits: "Beneficios",
      simulator: "Simulador",
      cta: "Solicitar Crédito",
    },
    hero: {
      titleSegments: [{ text: "EL CRÉDITO VEHICULAR, SIN VUELTAS" }],
      subtitle:
        "Compara, elige y obtén la mejor financiación para tu vehículo desde un solo lugar.",
      intro: [
        { text: "Veqto conecta", highlight: true },
        {
          text: " clientes, concesionarios y entidades financieras para hacer que el proceso de crédito sea transparente, rápido y sin fricciones.",
        },
      ],
      ctaPrimary: "Solicitar Financiación",
      ctaSecondary: "Conocer cómo funciona",
      imageAlt:
        "Cliente junto a su vehículo con el estudio de crédito Veqto aprobado",
    },
    problem: {
      title: "Conseguir un crédito vehicular no debería ser complicado",
      intro: "Hoy comprar un vehículo implica:",
      items: [
        "Llenar formularios varias veces.",
        "Esperar respuestas de diferentes bancos.",
        "No saber cuál oferta es realmente la mejor.",
        "Perder tiempo entre concesionarios y trámites.",
      ],
    },
    solution: {
      titleTop: "Un solo proceso",
      titleBottom: "Múltiples entidades financieras.",
      description:
        "Con Veqto centralizas todo el proceso en una sola plataforma.",
      cards: [
        {
          title: "Compara opciones",
          description:
            "Accede a diferentes entidades financieras desde un solo lugar.",
        },
        {
          title: "Más transparencia",
          description:
            "Conoce las condiciones y toma decisiones con información clara.",
        },
        {
          title: "Respuestas más rápidas",
          description:
            "Menos trámites y más agilidad para avanzar hacia tu vehículo.",
        },
        {
          title: "Acompañamiento",
          description: "Te guiamos durante todo el proceso.",
        },
      ],
      imageAlt:
        "Persona consultando el avance de su solicitud de crédito en la app de Veqto",
    },
    whyVeqto: {
      titleSegments: [
        { text: "¿Por qué elegir " },
        { text: "Veqto", highlight: true },
        { text: "?" },
      ],
      items: [
        "Más opciones de financiación",
        "Un proceso más rápido",
        "Transparencia en cada paso",
        "Todo en un solo lugar",
      ],
    },
    creditFlow: {
      titleSegments: [
        { text: "Obtener tu crédito " },
        { text: "es más fácil de lo que imaginas", highlight: true },
      ],
      steps: {
        "1": {
          title: "Cuéntanos qué vehículo buscas",
          description: "Nuevo o usado.",
        },
        "2": {
          title: "Analizamos tu perfil",
          description:
            "Conectamos tu solicitud con las entidades financieras.",
        },
        "3": {
          title: "Recibes las mejores opciones",
          description: "Compara tasas, plazos y condiciones.",
        },
        "4": {
          title: "Elige y estrena",
          description:
            "Nos encargamos de que el proceso sea simple y transparente.",
        },
      },
      imageAlt: "Clienta celebrando con las llaves de su vehículo nuevo",
    },
    benefitsAllies: {
      title: "Beneficios para Aliados",
      subtitle: "Más ventas, procesos ágiles y herramientas digitales para tu negocio",
      items: [
        {
          title: "Más Ventas",
          description:
            "Acceso a más clientes con capacidad de compra a través de nuestra plataforma de financiamiento.",
        },
        {
          title: "Proceso Ágil",
          description:
            "Aprobaciones rápidas que permiten cerrar ventas en menos tiempo sin papeleo.",
        },
        {
          title: "Sin Costo",
          description:
            "Integración sin comisiones ocultas. Modelo transparente y justo para tu negocio.",
        },
        {
          title: "Gestión Digital",
          description:
            "Portal completo para gestionar solicitudes y documentación de forma eficiente.",
        },
        {
          title: "Reportes en Tiempo Real",
          description:
            "Seguimiento detallado de cada transacción y estado de créditos al instante.",
        },
        {
          title: "Soporte Dedicado",
          description:
            "Equipo especializado para resolver dudas y optimizar tus resultados de venta.",
        },
      ],
    },
    benefitsBanks: {
      title: "Beneficios para Bancos",
      subtitle: "Cartera diversificada, riesgo reducido y operaciones optimizadas",
      items: [
        {
          title: "Cartera Diversificada",
          description:
            "Acceso a nuevos segmentos de clientes con perfiles verificados y variados.",
        },
        {
          title: "Reducción de Riesgo",
          description:
            "Análisis avanzado de riesgo crediticio con datos verificados y scoring de IA.",
        },
        {
          title: "Eficiencia Operativa",
          description:
            "Automatización de procesos reduce costos y acelera aprobaciones significativamente.",
        },
        {
          title: "Integración API",
          description:
            "APIs modernas para integración fluida con sus sistemas bancarios existentes.",
        },
        {
          title: "Compliance Garantizado",
          description:
            "Cumplimiento regulatorio completo de normativas colombianas y estándares internacionales.",
        },
        {
          title: "Analytics Avanzado",
          description:
            "Dashboards detallados para análisis de desempeño, tendencias y ROI.",
        },
      ],
      trustStatement:
        "Veqto es tu aliado tecnológico para expandir tu cartera de crédito vehicular con confianza y resultados mensurables.",
    },
    simulator: {
      titleSegments: [
        { text: "Simula " },
        { text: "tu crédito", highlight: true },
        { text: " en segundos" },
      ],
      vehiclePrice: "Precio del Vehículo",
      downPayment: "Cuota Inicial",
      downPaymentLabel: "% del precio",
      months: "Plazo",
      monthsLabel: "meses",
      annualInterest: "Tasa de Interés Anual",
      annualInterestLabel: "%",
      monthlyPayment: "Cuota Mensual Estimada",
      loanAmount: "Monto a Financiar",
      calculate: "Calcular Cuota",
      disclaimer:
        "Esta es una simulación referencial. La tasa y condiciones finales dependen de la evaluación crediticia y la entidad financiera.",
      ctaButton: "¿Listo? Solicita tu crédito real",
    },
    cta: {
      title: "¿Listo para transformar tu negocio?",
      subtitle:
        "Únete a la revolución del crédito vehicular en Colombia. Acelera tus ventas, simplifica tu operación y crece con Veqto.",
      button1: "Solicitar Crédito",
      button2: "Ser Aliado Comercial",
      trustBadge:
        "La plataforma de crédito vehicular más innovadora de Colombia",
    },
    access: {
      navButton: "Acceder a la plataforma",
      pageTitle: "¿Cómo querés ingresar?",
      pageSubtitle: "Seleccioná tu rol para continuar",
      roles: {
        admin: {
          title: "Administrador",
          description: "Gestión de solicitudes, aliados y bancos",
          button: "Ingresar con email y contraseña",
        },
        ally: {
          title: "Aliado",
          description: "Concesionarios y referidores que capturan clientes",
          button: "Ingresar con cédula",
        },
        bank: {
          title: "Banco (asesor)",
          description: "Asesores de entidades bancarias aliadas",
          button: "Ingresar con email",
        },
      },
      helpNote: "¿Sos aliado y no tenés acceso? Contactá a tu asesor F&I de Veqto",
      contactLabel: "Escribinos a",
      backHome: "Volver al inicio",
    },
    footer: {
      company: "Veqto",
      companyDescription:
        "Plataforma de crédito vehicular inteligente que conecta clientes, concesionarios y bancos en Colombia.",
      product: "Producto",
      productLinks: [
        { label: "Simulador", href: "#simulador" },
        { label: "Aliados", href: "#beneficios" },
        { label: "Bancos", href: "#beneficios-bancos" },
        { label: "API", href: "#" },
      ],
      companyLinks: {
        title: "Compañía",
        items: [
          { label: "Nosotros", href: "#que-es" },
          { label: "Blog", href: "#" },
          { label: "Carreras", href: "#" },
          { label: "Contacto", href: "#contacto" },
        ],
      },
      legal: "Legal",
      legalLinks: [
        { label: "Términos y Condiciones", href: "/terminos-condiciones" },
        { label: "Política de Tratamiento de Datos", href: "/politica-tratamiento-datos" },
        { label: "Autorización de Datos", href: "/autorizacion-datos" },
      ],
      contact: "Contacto",
      email: "contacto@veqto.ai",
      address: "Cr 15 No. 93 A - 84 Of 413, Bogotá D.C.",
      copyright: "© 2026 Veqto S.A.S. NIT 902.051.244-0. Todos los derechos reservados.",
    },
    forms: {
      next: "Siguiente",
      back: "Atrás",
      submit: "Enviar Solicitud",
      step: "Paso",
      required: "Obligatorio",
      success: "¡Solicitud enviada!",
      successMessage: "Nuestro equipo analizará tu perfil y te contactaremos en menos de 24 horas con las mejores opciones.",
      backToHome: "Volver al inicio",
      goToSimulator: "Ir al simulador",
      of: "de",
    },
  },
  en: {
    navbar: {
      home: "Home",
      about: "What is it?",
      creditFlow: "How it works",
      benefits: "Benefits",
      simulator: "Simulator",
      cta: "Apply for Credit",
    },
    hero: {
      titleSegments: [{ text: "CAR FINANCING, NO RUNAROUND" }],
      subtitle:
        "Compare, choose and get the best financing for your vehicle, all in one place.",
      intro: [
        { text: "Veqto connects", highlight: true },
        {
          text: " customers, dealerships and financial institutions to make the credit process transparent, fast and frictionless.",
        },
      ],
      ctaPrimary: "Request Financing",
      ctaSecondary: "See how it works",
      imageAlt:
        "Customer next to their vehicle with an approved Veqto credit assessment",
    },
    problem: {
      title: "Getting a car loan shouldn't be complicated",
      intro: "Today, buying a vehicle means:",
      items: [
        "Filling out the same forms over and over.",
        "Waiting on answers from different banks.",
        "Not knowing which offer is really the best.",
        "Losing time between dealerships and paperwork.",
      ],
    },
    solution: {
      titleTop: "One process",
      titleBottom: "Multiple financial institutions.",
      description:
        "With Veqto you centralize the entire process in a single platform.",
      cards: [
        {
          title: "Compare options",
          description:
            "Reach different financial institutions from a single place.",
        },
        {
          title: "More transparency",
          description:
            "Know the conditions and make decisions with clear information.",
        },
        {
          title: "Faster answers",
          description:
            "Less paperwork and more speed on the way to your vehicle.",
        },
        {
          title: "Guidance",
          description: "We guide you through the entire process.",
        },
      ],
      imageAlt:
        "Person checking the progress of their credit application in the Veqto app",
    },
    whyVeqto: {
      titleSegments: [
        { text: "Why choose " },
        { text: "Veqto", highlight: true },
        { text: "?" },
      ],
      items: [
        "More financing options",
        "A faster process",
        "Transparency at every step",
        "Everything in one place",
      ],
    },
    creditFlow: {
      titleSegments: [
        { text: "Getting your loan " },
        { text: "is easier than you think", highlight: true },
      ],
      steps: {
        "1": {
          title: "Tell us which vehicle you want",
          description: "New or used.",
        },
        "2": {
          title: "We analyze your profile",
          description:
            "We connect your application with the financial institutions.",
        },
        "3": {
          title: "You get the best options",
          description: "Compare rates, terms and conditions.",
        },
        "4": {
          title: "Choose and drive away",
          description:
            "We make sure the process stays simple and transparent.",
        },
      },
      imageAlt: "Customer celebrating with the keys to her new vehicle",
    },
    benefitsAllies: {
      title: "Benefits for Partners",
      subtitle: "More sales, agile processes, and digital tools for your dealership",
      items: [
        {
          title: "More Sales",
          description:
            "Access to more customers with purchasing power through our financing platform.",
        },
        {
          title: "Agile Process",
          description:
            "Fast approvals that allow you to close sales in less time without paperwork.",
        },
        {
          title: "No Cost",
          description:
            "Integration without hidden commissions. Transparent and fair model for your business.",
        },
        {
          title: "Digital Management",
          description:
            "Complete portal to manage requests and documentation efficiently.",
        },
        {
          title: "Real-time Reports",
          description:
            "Detailed tracking of each transaction and instant credit status.",
        },
        {
          title: "Dedicated Support",
          description:
            "Specialized team to resolve questions and optimize your sales results.",
        },
      ],
    },
    benefitsBanks: {
      title: "Benefits for Banks",
      subtitle: "Diversified portfolio, reduced risk, and optimized operations",
      items: [
        {
          title: "Diversified Portfolio",
          description:
            "Access to new customer segments with verified and varied profiles.",
        },
        {
          title: "Risk Reduction",
          description:
            "Advanced credit risk analysis with verified data and AI scoring.",
        },
        {
          title: "Operational Efficiency",
          description:
            "Process automation significantly reduces costs and accelerates approvals.",
        },
        {
          title: "API Integration",
          description:
            "Modern APIs for smooth integration with your existing banking systems.",
        },
        {
          title: "Guaranteed Compliance",
          description:
            "Complete regulatory compliance with Colombian regulations and international standards.",
        },
        {
          title: "Advanced Analytics",
          description:
            "Detailed dashboards for performance analysis, trends, and ROI.",
        },
      ],
      trustStatement:
        "Veqto is your technology partner to expand your vehicle credit portfolio with confidence and measurable results.",
    },
    simulator: {
      titleSegments: [
        { text: "Simulate " },
        { text: "your loan", highlight: true },
        { text: " in seconds" },
      ],
      vehiclePrice: "Vehicle Price",
      downPayment: "Down Payment",
      downPaymentLabel: "% of price",
      months: "Term",
      monthsLabel: "months",
      annualInterest: "Annual Interest Rate",
      annualInterestLabel: "%",
      monthlyPayment: "Estimated Monthly Payment",
      loanAmount: "Amount to Finance",
      calculate: "Calculate Payment",
      disclaimer:
        "This is a reference simulation. The final rate and conditions depend on the credit evaluation and financial institution.",
      ctaButton: "Ready? Apply for real credit",
    },
    cta: {
      title: "Ready to transform your business?",
      subtitle:
        "Join the vehicle credit revolution in Colombia. Accelerate your sales, simplify your operation and grow with Veqto.",
      button1: "Apply for Credit",
      button2: "Become a Partner",
      trustBadge:
        "Colombia's most innovative vehicle credit platform",
    },
    access: {
      navButton: "Access the platform",
      pageTitle: "How would you like to sign in?",
      pageSubtitle: "Select your role to continue",
      roles: {
        admin: {
          title: "Administrator",
          description: "Manage applications, partners and banks",
          button: "Sign in with email and password",
        },
        ally: {
          title: "Partner",
          description: "Dealerships and referrers who capture clients",
          button: "Sign in with ID number",
        },
        bank: {
          title: "Bank (advisor)",
          description: "Advisors from partner banking institutions",
          button: "Login with email",
        },
      },
      helpNote: "Are you a partner without access? Contact your Veqto F&I advisor",
      contactLabel: "Email us at",
      backHome: "Back to home",
    },
    footer: {
      company: "Veqto",
      companyDescription:
        "Smart vehicle credit platform connecting customers, dealers, and banks in Colombia.",
      product: "Product",
      productLinks: [
        { label: "Simulator", href: "#simulador" },
        { label: "Partners", href: "#beneficios" },
        { label: "Banks", href: "#beneficios-bancos" },
        { label: "API", href: "#" },
      ],
      companyLinks: {
        title: "Company",
        items: [
          { label: "About Us", href: "#que-es" },
          { label: "Blog", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#contacto" },
        ],
      },
      legal: "Legal",
      legalLinks: [
        { label: "Terms & Conditions", href: "/terminos-condiciones" },
        { label: "Data Processing Policy", href: "/politica-tratamiento-datos" },
        { label: "Data Authorization", href: "/autorizacion-datos" },
      ],
      contact: "Contact",
      email: "contacto@veqto.ai",
      address: "Cr 15 No. 93 A - 84 Of 413, Bogotá D.C.",
      copyright: "© 2026 Veqto S.A.S. NIT 902.051.244-0. All rights reserved.",
    },
    forms: {
      next: "Next",
      back: "Back",
      submit: "Submit Application",
      step: "Step",
      required: "Required",
      success: "Application sent!",
      successMessage: "Our team will analyze your profile and contact you within 24 hours with the best options.",
      backToHome: "Back to home",
      goToSimulator: "Go to simulator",
      of: "of",
    },
  },
};
