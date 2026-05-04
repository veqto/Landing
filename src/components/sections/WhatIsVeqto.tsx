'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Building2,
  Users,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { staggerContainer } from '@/lib/animations';

const featureIcons = [Shield, Zap, Building2, Users, Clock, TrendingUp];

const WhatIsVeqto: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="que-es" className="py-20 md:py-32 bg-cream">
      <Container>
        <motion.div
          className="space-y-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        >
          {/* Heading */}
          <SectionHeading
            title={t.whatIs.title}
            subtitle={t.whatIs.description}
            centered
          />

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          >
            {t.whatIs.features.map((feature, index) => {
              const IconComponent = featureIcons[index];

              return (
                <AnimatedCard
                  key={index}
                  className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-aurora transition-all duration-300"
                  delay={index * 0.1}
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      className="mb-6 inline-flex"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="p-4 bg-aurora/10 rounded-xl">
                        <IconComponent
                          className="w-8 h-8 text-aurora"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-negro mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 flex-grow leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedCard>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhatIsVeqto;
