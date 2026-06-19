'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { ArrowUp, Mail, MapPin, Globe } from 'lucide-react';

/**
 * Footer Link Component
 */
const FooterLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-gray-400 hover:text-aurora transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform"
      >
        {children}
      </Link>
    );
  }

  return (
    <motion.a
      href={href}
      className="text-gray-400 hover:text-aurora transition-colors duration-300 text-sm"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
};

/**
 * Social Media SVG Icons
 */
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);


/**
 * Footer Component
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { platform: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://www.linkedin.com/company/veqto' },
  ];

  return (
    <footer className="bg-negro text-white relative" role="contentinfo">
      <Container className="py-16 lg:py-20">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Company Info & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            {/* Logo */}
            <div className="mb-4">
              <img
                src="/logos/Logo-veqto-Positivo.svg"
                alt="Veqto"
                className="h-10 w-auto"
              />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.footer.companyDescription}
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4 items-center">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-aurora transition-colors duration-300"
                  whileHover={{ scale: 1.2, y: -4 }}
                  transition={{ duration: 0.2 }}
                  aria-label={`Síguenos en ${social.platform}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4 text-base">
              {t.footer.product}
            </h3>
            <ul className="space-y-3">
              {t.footer.productLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4 text-base">
              {t.footer.companyLinks.title}
            </h3>
            <ul className="space-y-3">
              {t.footer.companyLinks.items.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Legal & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-6"
          >
            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-base">
                {t.footer.legal}
              </h3>
              <ul className="space-y-3">
                {t.footer.legalLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-base">
                {t.footer.contact}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-aurora mt-1 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${t.footer.email}`}
                    className="text-gray-400 hover:text-aurora transition-colors duration-300 text-sm"
                  >
                    {t.footer.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-aurora mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-400 text-sm">{t.footer.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe size={16} className="text-aurora mt-1 flex-shrink-0" aria-hidden="true" />
                  <a
                    href="https://www.veqto.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-aurora transition-colors duration-300 text-sm"
                  >
                    www.veqto.ai
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm"
          >
            {t.footer.copyright}
          </motion.p>

          <div className="flex flex-wrap gap-4 items-center justify-start md:justify-end">
            {t.footer.legalLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
                {index < t.footer.legalLinks.length - 1 && (
                  <span className="text-gray-700">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Container>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-8 right-8 z-40',
          'w-12 h-12 rounded-full',
          'bg-aurora text-white',
          'flex items-center justify-center',
          'hover:bg-aurora-dark transition-colors duration-300',
          'shadow-lg hover:shadow-xl hover:shadow-aurora/30',
          'cursor-pointer'
        )}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
