"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Countdown from "./Countdown";

export default function UpdateComplete({ onViewCards }: { onViewCards?: () => void }) {
  useEffect(() => {
    const duration = 3500;
    const end = Date.now() + duration;
    const colors = ["#3E6AE1", "#F59E0B", "#FBBF24", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      {/* Checkmark circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2, stiffness: 180, damping: 15 }}
        className="w-20 h-20 rounded-full bg-tesla-blue/15 flex items-center justify-center mb-8"
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <motion.path
            d="M8 18L15 25L28 11"
            stroke="#3E6AE1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-bold mb-1"
      >
        Actualización Completa
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-tesla-secondary text-[14px] mb-14"
      >
        Tu Tesla está listo para el eclipse
      </motion.p>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-[10px] text-tesla-muted text-center mb-4 uppercase tracking-widest">
          Cuenta atrás para la totalidad
        </p>
        <Countdown />
      </motion.div>

      {/* Gifts summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="w-full max-w-sm bg-tesla-card rounded-2xl p-5 space-y-3"
      >
        <p className="text-[11px] text-tesla-muted uppercase tracking-[0.14em] mb-4">Tu pack de regalo</p>
        {[
          { icon: "🌑", label: "Viaje al eclipse solar total", sub: "Javalambre, Teruel · 12 ago 2026" },
          { icon: "🕶️", label: "Gafas de eclipse certificadas", sub: "ISO 12312-2 · Listas para usar" },
          { icon: "🎁", label: "Tarjeta regalo Decathlon", sub: "100€ para equiparte para la aventura" },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-tesla-card-light flex items-center justify-center text-xl shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-[14px] font-medium text-white leading-snug">{label}</p>
              <p className="text-[12px] text-tesla-muted">{sub}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Personal message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.5 }}
        className="mt-10 text-center max-w-xs"
      >
        <div className="w-10 h-px bg-tesla-tertiary mx-auto mb-6" />
        <p className="text-2xl mb-3">
          Feliz Cumpleaños ❤️
        </p>
        <p className="text-[14px] text-tesla-secondary leading-relaxed">
          Este agosto vas a vivir algo que no se ha visto en España en más de un
          siglo. Juntos, en nuestro Tesla, bajo el eclipse total.
          Nuestro primer camping. Nuestra primera aventura.
        </p>
        <p className="text-[14px] text-tesla-muted mt-5 italic">Te quiero</p>
      </motion.div>

      {/* Botón para ver las cards de nuevo */}
      {onViewCards && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          onClick={onViewCards}
          className="mt-10 px-8 py-3 rounded-xl text-[14px] font-semibold cursor-pointer transition-opacity active:opacity-70"
          style={{ background: "#2a2a2a", color: "#a0a0a5" }}
        >
          Ver los 5 regalos
        </motion.button>
      )}
    </motion.div>
  );
}
