'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  TrendingUp,
  Clock,
  Shield,
  Smartphone,
  DollarSign,
} from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import { useModal } from '@/components/ModalContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

const BenefitsAllies: React.FC = () => {
  const { t } = useTranslation();
  const { openAllyModal } = useModal();

  const icons = [Store, TrendingUp, Clock, Shield, Smartphone, DollarSign];

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="beneficios"
      className="relative bg-white py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-aurora rounded-full blur-3xl opacity-5 z-0 pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-64 h-64 bg-aurora rounded-full blur-3xl opacity-5 z-0 pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="mb-16 md:mb-20">
          <SectionHeading
            title={t.benefitsAllies.title}
            subtitle={t.benefitsAllies.subtitle}
            centered
          />
        </div>

        {/* Main Layout: Illustration + Benefits */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side: Animated Illustration */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
          >
            <div className="relative w-full aspect-square max-w-sm bg-gradient-to-br from-aurora/10 via-aurora/5 to-negro/5 rounded-3xl">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Concentric circles */}
                <div className="absolute w-80 h-80 border-2 border-aurora/20 rounded-full" />
                <div className="absolute w-64 h-64 border-2 border-aurora/30 rounded-full" />
                <div className="absolute w-48 h-48 bg-gradient-to-br from-aurora/40 to-negro/10 rounded-full flex items-center justify-center">
                  {/* Abstract car silhouette */}
                  <div className="relative w-32 h-20">
                    <div className="absolute bottom-0 left-4 right-4 h-10 bg-aurora/60 rounded-t-lg" />
                    <div className="absolute bottom-10 left-8 right-8 h-6 bg-aurora/50 rounded-t-lg" />
                    <div className="absolute bottom-0 left-2 w-6 h-6 bg-negro/40 rounded-full border-2 border-aurora/50" />
                    <div className="absolute bottom-0 right-2 w-6 h-6 bg-negro/40 rounded-full border-2 border-aurora/50" />
                    <div className="absolute bottom-8 left-10 right-10 h-4 bg-aurora/30 rounded-sm" />
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute w-12 h-12 bg-aurora/20 rounded-lg will-change-transform"
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ top: '10%', left: '10%' }}
                />
                <motion.div
                  className="absolute w-8 h-8 bg-aurora/15 rounded-full will-change-transform"
                  animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ bottom: '15%', right: '15%' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Benefits Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {t.benefitsAllies.items.map((item, index) => {
              const IconComponent = icons[index];

              return (
                <motion.div
                  key={index}
                  className="group flex flex-col"
                  variants={itemVariants}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-aurora/10 to-aurora/5 group-hover:from-aurora/20 group-hover:to-aurora/10 transition-all duration-300 mb-4">
                    <IconComponent className="w-8 h-8 text-aurora" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-negro mb-3 group-hover:text-aurora transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <Button
            variant="primary"
            size="lg"
            className="px-10 text-base font-semibold"
            onClick={openAllyModal}
          >
            {t.cta.button2}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default BenefitsAllies;
