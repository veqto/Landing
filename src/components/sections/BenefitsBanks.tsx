'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Target,
  BarChart3,
  Lock,
  GitBranch,
  Wallet,
} from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, viewportConfig } from '@/lib/animations';

const BenefitsBanks: React.FC = () => {
  const { t } = useTranslation();

  const icons = [Building2, Target, BarChart3, Lock, GitBranch, Wallet];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="beneficios-bancos"
      className="relative bg-negro py-20 md:py-28 overflow-hidden"
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative aurora glows */}
      <div className="absolute top-32 left-10 w-96 h-96 bg-aurora rounded-full blur-3xl opacity-10 z-0 pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-aurora rounded-full blur-3xl opacity-5 z-0 pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <SectionHeading
            title={t.benefitsBanks.title}
            subtitle={t.benefitsBanks.subtitle}
            centered
            light
            accent={false}
          />
        </div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {t.benefitsBanks.items.map((item, index) => {
            const IconComponent = icons[index];

            return (
              <motion.div
                key={index}
                className="group relative"
                variants={cardVariants}
              >
                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 group-hover:border-aurora/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />

                {/* Card */}
                <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 h-full flex flex-col transition-all duration-500 group-hover:bg-white/10">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-aurora/20 to-aurora/10 group-hover:from-aurora/30 group-hover:to-aurora/20 transition-all duration-500 border border-aurora/20 group-hover:border-aurora/40">
                      <IconComponent className="w-8 h-8 text-aurora" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-aurora transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust statement */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-400 text-lg md:text-xl">
            {t.benefitsBanks.trustStatement}
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default BenefitsBanks;
