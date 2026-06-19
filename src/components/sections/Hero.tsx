"use client";

/**
 * Hero v2
 * --------------------------------------------------------------------------
 * Layout 2-columnas (lg+): texto + CTA primario a la izq, ilustracion a la der.
 * Mobile: stack vertical (texto arriba, ilustracion abajo).
 *
 * Cambios vs v1 (per "1 mensaje / 1 boton"):
 * - 1 CTA primario unico: "Simular mi credito" (scroll a #simulador)
 * - "Soy aliado" pasa a link discreto debajo del CTA principal
 * - AccessButton "Acceder a la plataforma" pasa a link/secondary debajo
 *   (sigue siendo accesible via navbar)
 * - Particulas reducidas de 15 -> 6 y opacidad mas baja (menos ruido)
 * - min-h-[85vh] en lugar de min-h-screen (evita vacio en monitores 1920+)
 * - Animacion de entrada simplificada (un solo stagger limpio)
 */

import React, { useMemo, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { useModal } from "@/components/ModalContext";
import Button from "@/components/ui/Button";
import HeroIllustration from "@/components/sections/HeroIllustration";

const emptySubscribe = () => () => {};

const Hero = () => {
  const { t } = useTranslation();
  const { openAllyModal } = useModal();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isVisible = mounted;

  // 6 particulas (era 15) con opacidad mas suave
  const particles = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${15 + (i * 14) % 70}%`,
      top: `${10 + (i * 17) % 75}%`,
      duration: 5 + (i % 3),
      delay: (i % 4) * 0.5,
    }));
  }, []);

  // CTA primario: scroll suave al simulador
  const handleScrollToSimulator = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#simulador");
    if (target) {
      const navbarHeight = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const isHighlightWord = (word: string) =>
    t.hero.highlightWords.some((hw) =>
      word.toLowerCase().includes(hw.toLowerCase())
    );

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] overflow-hidden flex flex-col"
      aria-label="Hero"
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-negro z-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          {/* Aurora gradient blobs - menos prominentes */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-aurora/15 rounded-full mix-blend-multiply filter blur-3xl will-change-transform"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 left-1/3 w-96 h-96 bg-aurora/10 rounded-full mix-blend-multiply filter blur-3xl will-change-transform"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />

          {/* Particulas: 6 en lugar de 15 */}
          {mounted &&
            particles.map((p) => (
              <motion.div
                key={`particle-${p.id}`}
                className="absolute w-1 h-1 bg-aurora/20 rounded-full will-change-transform"
                style={{ left: p.left, top: p.top }}
                animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -25, 0] }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                }}
              />
            ))}
        </div>
      </div>

      {/* Content layer — grid 2-col en lg+ */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Columna izquierda: texto + CTA */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              {t.hero.title.split(" ").map((word, i) => (
                <span key={`word-${i}`}>
                  {isHighlightWord(word) ? (
                    <span className="bg-gradient-to-r from-aurora via-aurora to-aurora-dark bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                  {i < t.hero.title.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-xl leading-relaxed font-light"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA primario unico + secundario discreto */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="flex flex-col items-center lg:items-start gap-4 w-full sm:w-auto pt-2"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-10 text-base sm:text-lg font-semibold shadow-lg shadow-aurora/20"
                onClick={handleScrollToSimulator}
                aria-label={t.hero.ctaPrimary}
              >
                {t.hero.ctaPrimary}
              </Button>

              <button
                onClick={openAllyModal}
                className="text-sm sm:text-base text-white/70 hover:text-aurora transition-colors underline-offset-4 hover:underline focus-visible:outline-aurora"
              >
                {t.hero.ctaAllySecondary}
              </button>
            </motion.div>

            {/* Tagline discreto */}
            <motion.p
              variants={fadeUp}
              custom={0.5}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-xs sm:text-sm text-gray-400/70 font-light pt-2"
            >
              {t.hero.tagline}
            </motion.p>
          </div>

          {/* Columna derecha: ilustracion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center order-1 lg:order-2"
          >
            <HeroIllustration />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center pt-6"
        >
          <motion.a
            href="#que-es"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#que-es")?.scrollIntoView({ behavior: "smooth" });
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1 cursor-pointer"
            aria-label={t.hero.scrollText}
          >
            <p className="text-xs text-gray-400/60 font-light">{t.hero.scrollText}</p>
            <svg
              className="w-5 h-5 text-aurora/50"
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
