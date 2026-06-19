export type Locale = "es" | "en";

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
    title: string;
    highlightWords: string[];
    subtitle: string;
    /** CTA principal del Hero (scroll a simulador). Reemplaza cta1+cta2 del v1. */
    ctaPrimary: string;
    /** Link discreto debajo del CTA principal (abre AllyModal). */
    ctaAllySecondary: string;
    /** @deprecated kept for backwards compat in older sections; usar ctaPrimary */
    cta1: string;
    /** @deprecated kept for backwards compat in older sections; usar ctaAllySecondary */
    cta2: string;
    tagline: string;
    scrollText: string;
  };
  whatIs: {
    title: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  creditFlow: {
    title: string;
    subtitle?: string;
    steps: {
      [key: string]: {
        title: string;
        description: string;
      };
    };
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
    title: string;
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
      about: "Qué es Veqto",
      creditFlow: "Flujo de Crédito",
      benefits: "Beneficios",
      simulator: "Simulador",
      cta: "Solicitar Crédito",
    },
    hero: {
      title: "Crédito Vehicular Inteligente",
      highlightWords: ["Crédito", "Vehicular", "Inteligente"],
      subtitle:
        "Conectamos clientes, concesionarios y bancos para financiar tu próximo vehículo de forma rápida, segura y transparente en Colombia.",
      ctaPrimary: "Simular mi crédito",
      ctaAllySecondary: "Soy aliado comercial",
      cta1: "Solicitar Crédito",
      cta2: "Soy Aliado Comercial",
      tagline: "Crédito vehicular inteligente para Colombia",
      scrollText: "Descubre más",
    },
    whatIs: {
      title: "¿Qué es Veqto?",
      description:
        "Veqto es el orquestador de crédito vehicular que conecta clientes, aliados comerciales y concesionarios con bancos en Colombia. Hacemos que el financiamiento sea transparente, eficiente y sin fricciones.",
      features: [
        {
          title: "Proceso 100% Digital",
          description:
            "Sin papeleos ni trámites presenciales. Todo desde tu celular o computador.",
        },
        {
          title: "Aprobación Rápida",
          description:
            "Pre-aprobación en menos de 5 minutos con scoring de IA avanzado.",
        },
        {
          title: "Multi-Banco",
          description:
            "Conectamos con múltiples entidades financieras para encontrar la mejor tasa para ti.",
        },
        {
          title: "Red de Aliados",
          description:
            "Aliados comerciales y concesionarios conectados en todo Colombia.",
        },
        {
          title: "Rápido y Eficiente",
          description:
            "Reduce el tiempo de aprobación de semanas a horas con nuestra tecnología.",
        },
        {
          title: "Crece con Nosotros",
          description:
            "Métricas en tiempo real y herramientas para escalar tu negocio.",
        },
      ],
    },
    creditFlow: {
      title: "¿Cómo funciona?",
      subtitle: "Así te ayudamos a avanzar",
      steps: {
        "1": {
          title: "Entendemos tu perfil",
          description:
            "No todos los bancos prestan igual. Analizamos tu caso antes de mostrar opciones.",
        },
        "2": {
          title: "Ordenamos las mejores alternativas",
          description:
            "Hacemos competir a los bancos y traducimos el crédito a lenguaje claro.",
        },
        "3": {
          title: "Te acompañamos hasta decidir bien",
          description:
            "No firmas a ciegas ni pierdes tiempo. Avanzas con seguridad.",
        },
      },
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
      title: "Simulador de Crédito",
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
      about: "About Veqto",
      creditFlow: "Credit Flow",
      benefits: "Benefits",
      simulator: "Simulator",
      cta: "Apply for Credit",
    },
    hero: {
      title: "Smart Vehicle Credit",
      highlightWords: ["Smart", "Vehicle", "Credit"],
      subtitle:
        "We connect customers, dealers and banks to finance your next vehicle quickly, securely and transparently in Colombia.",
      ctaPrimary: "Simulate my credit",
      ctaAllySecondary: "I'm a commercial partner",
      cta1: "Apply for Credit",
      cta2: "I'm a Commercial Partner",
      tagline: "Smart vehicle financing for Colombia",
      scrollText: "Discover more",
    },
    whatIs: {
      title: "What is Veqto?",
      description:
        "Veqto is the vehicle credit orchestrator that connects customers, car dealerships and banks in Colombia. We make financing transparent, efficient and frictionless.",
      features: [
        {
          title: "100% Digital Process",
          description:
            "No paperwork or in-person procedures. Everything from your phone or computer.",
        },
        {
          title: "Fast Approval",
          description:
            "Pre-approval in less than 5 minutes with advanced AI scoring.",
        },
        {
          title: "Multi-Bank",
          description:
            "We connect with multiple financial institutions to find the best rate for you.",
        },
        {
          title: "Partner Network",
          description:
            "Dealerships and car lots connected throughout Colombia.",
        },
        {
          title: "Fast & Efficient",
          description:
            "Reduce approval time from weeks to hours with our technology.",
        },
        {
          title: "Grow With Us",
          description:
            "Real-time metrics and tools to scale your business.",
        },
      ],
    },
    creditFlow: {
      title: "How does it work?",
      subtitle: "This is how we help you move forward",
      steps: {
        "1": {
          title: "We understand your profile",
          description:
            "Not all banks lend the same way. We analyze your case before showing options.",
        },
        "2": {
          title: "We sort the best alternatives",
          description:
            "We make banks compete and translate the credit into clear language.",
        },
        "3": {
          title: "We accompany you to decide well",
          description:
            "You don't sign blindly nor waste time. You move forward confidently.",
        },
      },
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
      title: "Credit Simulator",
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
