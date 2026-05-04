'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

const CreditFlow: React.FC = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  // 3 pasos según narrativa Aleja: perfil → alternativas → acompañamiento
  const steps = Object.keys(t.creditFlow.steps).map((key, index) => ({
    number: String(index + 1),
    title: t.creditFlow.steps[key]?.title || '',
    description: t.creditFlow.steps[key]?.description || '',
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 0 0 0 rgba(0, 196, 160, 0.4)',
        '0 0 0 10px rgba(0, 196, 160, 0)',
        '0 0 0 0 rgba(0, 196, 160, 0)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <section
      id="proceso"
      className="py-20 md:py-32 bg-[#0A0F1E] overflow-hidden"
    >
      <Container>
        <motion.div
          className="space-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        >
          {/* Section Heading */}
          <SectionHeading
            title={t.creditFlow.title}
            centered
            light={true}
          />

          {/* Desktop Timeline - Horizontal */}
          <div className="hidden lg:block">
            <motion.div
              className="relative py-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              {/* Animated Background Path */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'none' }}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="pathGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(0, 196, 160, 0.3)" />
                    <stop offset="50%" stopColor="rgba(0, 196, 160, 0.6)" />
                    <stop offset="100%" stopColor="rgba(0, 196, 160, 0.3)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={`M 30 100 ${Array(steps.length)
                    .fill(0)
                    .map(
                      (_, i) =>
                        `L ${(i + 1) * (100 / (steps.length - 1))}% 100`
                    )
                    .join(' ')}`}
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                />
              </svg>

              {/* Timeline Steps */}
              <div className="relative flex justify-between items-start gap-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex-1 flex flex-col items-center cursor-pointer group"
                    variants={stepVariants}
                    onMouseEnter={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Step Circle with Glow */}
                    <motion.div
                      className={cn(
                        'relative z-10 mb-6 flex items-center justify-center rounded-full font-bold text-xl transition-all duration-300',
                        activeStep === index
                          ? 'w-24 h-24 bg-[#00C4A0] text-white shadow-2xl'
                          : 'w-16 h-16 bg-gray-800 text-gray-300 hover:bg-[#00C4A0]/20'
                      )}
                      whileHover={{ scale: 1.1 }}
                      animate={
                        activeStep === index ? 'pulse' : 'normal'
                      }
                      variants={pulseVariants}
                    >
                      <span>{step.number}</span>
                    </motion.div>

                    {/* Step Info Card */}
                    <motion.div
                      className={cn(
                        'text-center px-4 py-6 rounded-xl transition-all duration-300',
                        activeStep === index
                          ? 'bg-white/10 backdrop-blur border border-[#00C4A0]/50 transform scale-105'
                          : 'bg-transparent border border-transparent'
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        activeStep === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0.6, y: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <h3
                        className={cn(
                          'font-bold text-sm md:text-base mb-2 transition-colors duration-300',
                          activeStep === index
                            ? 'text-[#00C4A0]'
                            : 'text-white'
                        )}
                      >
                        {step.title}
                      </h3>

                      {activeStep === index && (
                        <motion.p
                          className="text-xs md:text-sm text-gray-300 leading-relaxed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tablet Timeline - Horizontal but Compact */}
          <div className="hidden md:block lg:hidden">
            <motion.div
              className="relative py-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              <div className="flex justify-between items-start gap-2 overflow-x-auto pb-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center flex-shrink-0"
                    variants={stepVariants}
                  >
                    {/* Step Circle */}
                    <motion.div
                      className={cn(
                        'w-14 h-14 flex items-center justify-center rounded-full font-bold text-base mb-4 transition-all duration-300 flex-shrink-0',
                        activeStep === index
                          ? 'bg-[#00C4A0] text-white shadow-lg'
                          : 'bg-gray-800 text-gray-400'
                      )}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveStep(index)}
                    >
                      {step.number}
                    </motion.div>

                    {/* Step Title */}
                    <h3
                      className={cn(
                        'text-xs md:text-sm font-bold text-center w-20 transition-colors duration-300',
                        activeStep === index
                          ? 'text-[#00C4A0]'
                          : 'text-gray-400'
                      )}
                    >
                      {step.title}
                    </h3>
                  </motion.div>
                ))}
              </div>

              {/* Active Step Description */}
              <motion.div
                className="mt-8 p-6 bg-white/10 backdrop-blur border border-[#00C4A0]/50 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-[#00C4A0] font-bold text-base mb-2">
                  {steps[activeStep].title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden">
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8"
                  variants={stepVariants}
                >
                  {/* Vertical Line */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-3 top-12 bottom-0 w-1 bg-gradient-to-b from-[#00C4A0] to-transparent" />
                  )}

                  {/* Step Circle */}
                  <motion.div
                    className="absolute left-0 top-0 w-7 h-7 bg-[#00C4A0] rounded-full flex items-center justify-center text-white text-xs font-bold"
                    whileHover={{ scale: 1.15 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Step Content */}
                  <motion.div
                    className="bg-white/10 backdrop-blur border border-[#00C4A0]/50 rounded-xl p-4"
                    whileHover={{
                      boxShadow:
                        '0 0 20px rgba(0, 196, 160, 0.2)',
                    }}
                  >
                    <h3 className="text-[#00C4A0] font-bold text-base mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CreditFlow;
