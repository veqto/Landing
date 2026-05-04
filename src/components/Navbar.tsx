"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/LanguageContext";
import { useModal } from "@/components/ModalContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { openCreditModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: t.navbar.home, href: "#inicio" },
    { label: t.navbar.about, href: "#que-es" },
    { label: t.navbar.creditFlow, href: "#proceso" },
    { label: t.navbar.benefits, href: "#beneficios" },
    { label: t.navbar.simulator, href: "#simulador" },
    { label: t.navbar.cta, href: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // If not on home page, redirect to home with hash
    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-negro/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#inicio"
            onClick={(e) => handleSmoothScroll(e, "#inicio")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
            aria-label="Veqto - Ir al inicio"
          >
            <img
              src="/logos/Logo-veqto-Positivo.svg"
              alt="Veqto"
              className="h-8 sm:h-10 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                className="text-white/80 hover:text-aurora transition-colors duration-300 text-sm font-medium link-hover"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex text-xs sm:text-sm"
              aria-label={t.navbar.cta}
              onClick={openCreditModal}
            >
              {t.navbar.cta}
            </Button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden bg-negro/90 backdrop-blur-md border-t border-white/10 py-4 px-4 rounded-b-2xl"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-white/80 hover:text-aurora transition-colors duration-300 text-sm font-medium py-2 px-2 rounded hover:bg-white/5"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="border-t border-white/10 my-2 pt-3 flex gap-2 items-center justify-between">
                  <LanguageSwitcher />
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => { setIsMenuOpen(false); openCreditModal(); }}
                  >
                    {t.navbar.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
