"use client";

/**
 * Hero — diseño aprobado (doc 114B §3.2)
 * --------------------------------------------------------------------------
 * Fondo oscuro con aro/halo verde en glow detrás del contenido y piso de malla
 * ondulada abajo. Dos columnas en lg+: texto y CTAs a la izquierda, foto real
 * a la derecha (reemplaza la ilustración SVG del v2).
 *
 * CTAs: naranja "Solicitar Financiación" (CreditRequestModal) + outline claro
 * "Conocer cómo funciona" (scroll a #proceso).
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { useModal } from "@/components/ModalContext";
import Button from "@/components/ui/Button";
import HighlightedText from "@/components/ui/HighlightedText";
import MeshFloor from "@/components/ui/MeshFloor";
import { useReveal } from "@/hooks/useReveal";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { openCreditModal } = useModal();
  const { reduced, container, item } = useReveal();

  // Cascada de entrada: título -> subtítulo -> separador -> párrafo -> CTAs.
  const cascade = container(0.12);
  const line = item('up');

  const handleScrollToSteps = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#proceso");
    if (!target) return;
    const navbarHeight = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-negro"
      aria-label="Hero"
    >
      {/* Capa decorativa: aro con glow + halos suaves */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute right-[-10%] top-[8%] h-[26rem] w-[26rem] rounded-full border border-aurora/40 bg-aurora/5 blur-[2px] animate-halo-pulse will-change-transform sm:h-[34rem] sm:w-[34rem] lg:right-[6%] lg:h-[38rem] lg:w-[38rem]" />
        <div className="absolute right-0 top-[12%] h-72 w-72 rounded-full bg-aurora/20 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -left-24 bottom-[18%] h-72 w-72 rounded-full bg-aurora/10 blur-3xl" />
      </div>

      {/* Piso de malla ondulada */}
      <MeshFloor className="absolute inset-x-0 bottom-0 z-0 h-28 w-full opacity-60 sm:h-40 lg:h-56" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:grid-cols-[45fr_55fr] lg:gap-6 lg:px-8 lg:pb-28">
        {/* Columna izquierda: texto + CTAs */}
        <motion.div
          variants={cascade}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left"
        >
          <motion.h1
            variants={line}
            className="text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <HighlightedText segments={t.hero.titleSegments} />
          </motion.h1>

          <motion.p
            variants={line}
            className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={line} className="my-7 h-px w-24 bg-aurora/60" />

          <motion.p
            variants={line}
            className="max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base"
          >
            <HighlightedText
              segments={t.hero.intro}
              highlightClassName="font-bold text-white"
            />
          </motion.p>

          <motion.div
            variants={line}
            className="mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button
              variant="naranja"
              size="lg"
              shine
              className="w-full px-8 text-base sm:w-auto"
              onClick={openCreditModal}
            >
              {t.hero.ctaPrimary}
            </Button>

            <Button
              variant="outlineLight"
              size="lg"
              className="w-full px-8 text-base sm:w-auto"
              onClick={handleScrollToSteps}
            >
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        {/* Columna derecha: foto. Flota suavemente para dar vida a la
            tarjeta "Estudio de crédito 720" que trae la propia imagen. */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-lg will-change-transform lg:max-w-2xl"
          >
            <Image
              src="/images/landing/hero-hombre-carro.png"
              alt={t.hero.imageAlt}
              width={1536}
              height={1024}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
