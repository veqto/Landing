"use client";

import React, { useMemo, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { useModal } from "@/components/ModalContext";
import Button from "@/components/ui/Button";

const emptySubscribe = () => () => {};

const Hero = () => {
  const { t } = useTranslation();
  const { openCreditModal, openAllyModal } = useModal();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isVisible = mounted;

  // Generate stable particle positions (deterministic, no Math.random)
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${10 + (i * 6.2) % 80}%`,
      top: `${5 + (i * 7.3) % 85}%`,
      duration: 4 + (i % 4),
      delay: (i % 5) * 0.4,
    }));
  }, []);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8 },
    }),
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.8 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.6 + i * 0.15, duration: 0.6 },
    }),
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.2, duration: 0.8 },
    },
  };

  const bounceVariants = {
    animate: {
      y: [0, 8, 0],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  const isHighlightWord = (word: string) => {
    return t.hero.highlightWords.some(
      (hw) => word.toLowerCase().includes(hw.toLowerCase())
    );
  };

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      aria-label="Hero"
    >
      {/* ── Background layer (z-0, pointer-events-none) ── */}
      <div className="absolute inset-0 bg-negro z-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          {/* Aurora borealis gradient blobs */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-aurora/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 will-change-transform"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 left-1/3 w-96 h-96 bg-aurora/15 rounded-full mix-blend-multiply filter blur-3xl opacity-15 will-change-transform"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-1/3 left-1/2 w-72 h-72 bg-aurora/10 rounded-full mix-blend-multiply filter blur-3xl opacity-10 will-change-transform"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />

          {/* Floating particles (client-only) */}
          {mounted &&
            particles.map((p) => (
              <motion.div
                key={`particle-${p.id}`}
                className="absolute w-1 h-1 bg-aurora/30 rounded-full will-change-transform"
                style={{ left: p.left, top: p.top }}
                animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -30, 0] }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                }}
              />
            ))}
        </div>
      </div>

      {/* ── Content layer (z-10, relative) ── */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-36 pb-8">
        {/* Main hero content — centered vertically */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 md:space-y-10">
          {/* Animated headline */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {t.hero.title.split(" ").map((word, i) => (
              <motion.h1
                key={`word-${i}`}
                custom={i}
                variants={titleVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
              >
                {isHighlightWord(word) ? (
                  <span className="bg-gradient-to-r from-aurora via-aurora to-aurora-dark bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.h1>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl leading-relaxed font-light"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2 sm:pt-4"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div custom={0} variants={buttonVariants}>
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 text-base sm:text-lg font-semibold"
                onClick={openCreditModal}
              >
                {t.hero.cta1}
              </Button>
            </motion.div>

            <motion.div custom={1} variants={buttonVariants}>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 text-base sm:text-lg font-semibold"
                onClick={openAllyModal}
              >
                {t.hero.cta2}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Tagline — static below content */}
        <motion.p
          className="mt-auto pt-8 sm:pt-12 pb-16 sm:pb-20 text-center text-sm sm:text-base text-gray-400/80 font-light"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {t.hero.tagline}
        </motion.p>

        {/* Scroll indicator — at very bottom */}
        <motion.div
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="flex justify-center pb-4"
        >
          <motion.a
            href="#que-es"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#que-es")?.scrollIntoView({ behavior: "smooth" });
            }}
            variants={bounceVariants}
            animate="animate"
            className="flex flex-col items-center gap-2 cursor-pointer"
            aria-label={t.hero.scrollText}
          >
            <p className="text-xs sm:text-sm text-gray-400/70 font-light">
              {t.hero.scrollText}
            </p>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-aurora/60"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
