'use client';

/**
 * Ecosistema automotor — diseño aprobado (doc 114B §3.8)
 * --------------------------------------------------------------------------
 * Reemplaza BenefitsAllies. Tres audiencias en un grid 2x2 asimétrico:
 * tarjeta alta con foto y degradado verde (concesionarios), tarjeta verde
 * sólida (aliados comerciales) y tarjeta oscura (entidades financieras).
 *
 * La tarjeta de aliados incluye el enlace que abre AllyRegistrationModal:
 * es la única entrada al registro de aliados desde la home, ya que el diseño
 * retira ese CTA del hero.
 */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Store, Landmark, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import { useModal } from '@/components/ModalContext';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { useReveal, REVEAL_VIEWPORT } from '@/hooks/useReveal';

const Ecosystem: React.FC = () => {
  const { t } = useTranslation();
  const { openAllyModal } = useModal();
  const { reduced, isDesktop, container, item } = useReveal();

  const cardHover = reduced || !isDesktop ? undefined : { scale: 1.02 };

  const [dealers, allies, banks] = t.ecosystem.cards;

  return (
    <section id="beneficios" className="bg-cream py-20 md:py-28">
      <Container>
        <SectionHeading
          title={t.ecosystem.titleSegments}
          centered
          accent={false}
          className="mb-12 md:mb-16"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={container()}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* Concesionarios: foto con degradado verde */}
          <motion.article
            variants={item()}
            whileHover={cardHover}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative min-h-[22rem] overflow-hidden rounded-3xl shadow-lg shadow-negro/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-negro/20 lg:row-span-2 lg:min-h-[30rem]"
          >
            {/* Ken Burns: zoom lentísimo en loop sobre la foto, no sobre la
                tarjeta, para que el degradado y el texto no se muevan. */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/landing/ecosistema-concesionario.jpg"
                alt={t.ecosystem.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-aurora via-aurora/70 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <h3 className="text-xl font-bold text-white md:text-2xl">
                {dealers.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
                {dealers.description}
              </p>
            </div>
          </motion.article>

          {/* Aliados comerciales: verde sólido + entrada al modal de registro */}
          <motion.article
            variants={item()}
            whileHover={cardHover}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-start justify-between gap-6 rounded-3xl bg-aurora p-6 shadow-lg shadow-negro/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-aurora/30 md:p-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white md:text-2xl">
                {allies.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
                {allies.description}
              </p>
              <button
                onClick={openAllyModal}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-aurora transition-colors duration-300 hover:bg-negro hover:text-white"
              >
                {t.ecosystem.allyCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-aurora">
              <Store className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </motion.article>

          {/* Entidades financieras: oscura sólida */}
          <motion.article
            variants={item()}
            whileHover={cardHover}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-start justify-between gap-6 rounded-3xl bg-negro p-6 shadow-lg shadow-negro/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-negro/30 md:p-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white md:text-2xl">
                {banks.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400 md:text-base">
                {banks.description}
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-negro">
              <Landmark className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </motion.article>
        </motion.div>
      </Container>
    </section>
  );
};

export default Ecosystem;
