"use client";

/**
 * HeroIllustration
 * --------------------------------------------------------------------------
 * Ilustracion abstracta del Hero: auto estilizado + check de aprobacion +
 * curva financiera. Implementada como SVG animado con Framer Motion para
 * mantener el bundle liviano (sin asset externo).
 *
 * Si en el futuro queremos reemplazarla por un Lottie de LottieFiles, basta
 * con sustituir este componente por `<DotLottieReact src="/hero.lottie" />`
 * sin tocar el Hero. La API publica es: sin props.
 */

import React from "react";
import { motion } from "framer-motion";

const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 bg-aurora/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <svg
        viewBox="0 0 400 400"
        className="relative w-full h-full"
        role="img"
        aria-label="Ilustracion: credito vehicular aprobado"
      >
        {/* Decorative ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="#00C4A0"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.35"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Inner solid ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="135"
          fill="none"
          stroke="#00C4A0"
          strokeWidth="2"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Car silhouette (simplified, abstract) */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Car body */}
          <rect
            x="120"
            y="180"
            width="160"
            height="50"
            rx="12"
            fill="#00C4A0"
          />
          {/* Car roof */}
          <path
            d="M 145 180 L 165 150 L 235 150 L 255 180 Z"
            fill="#00A387"
          />
          {/* Windshield highlight */}
          <path
            d="M 168 155 L 180 178 L 220 178 L 232 155 Z"
            fill="#E6F9F4"
            opacity="0.8"
          />
          {/* Wheels */}
          <motion.circle
            cx="150"
            cy="235"
            r="16"
            fill="#0A0F1E"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "150px 235px" }}
          />
          <motion.circle
            cx="250"
            cy="235"
            r="16"
            fill="#0A0F1E"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "250px 235px" }}
          />
          {/* Wheel rims */}
          <circle cx="150" cy="235" r="6" fill="#00C4A0" />
          <circle cx="250" cy="235" r="6" fill="#00C4A0" />
        </motion.g>

        {/* Approval badge: floating check */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
        >
          <motion.circle
            cx="300"
            cy="120"
            r="32"
            fill="#00C4A0"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 287 120 L 297 130 L 315 110"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Financial curve (rising trend) */}
        <motion.path
          d="M 90 320 Q 150 310 180 290 T 250 250 T 320 200"
          fill="none"
          stroke="#00C4A0"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
        />

        {/* Curve endpoint dot */}
        <motion.circle
          cx="320"
          cy="200"
          r="6"
          fill="#00C4A0"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, duration: 0.4 }}
        />

        {/* Small floating dots for ambient motion */}
        {[
          { cx: 80, cy: 100, delay: 0 },
          { cx: 340, cy: 280, delay: 0.5 },
          { cx: 100, cy: 280, delay: 1 },
          { cx: 320, cy: 80, delay: 1.5 },
        ].map((dot) => (
          <motion.circle
            key={`dot-${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r="3"
            fill="#00C4A0"
            opacity="0.4"
            animate={{ y: [0, -8, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default HeroIllustration;
