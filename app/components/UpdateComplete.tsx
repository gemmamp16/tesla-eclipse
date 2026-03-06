"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Countdown from "./Countdown";

export default function UpdateComplete({
  onViewCards,
  onReset,
}: {
  onViewCards?: () => void;
  onReset?: () => void;
}) {
  useEffect(() => {
    const duration = 3500;
    const end = Date.now() + duration;
    const colors = ["#3E6AE1", "#F59E0B", "#FBBF24", "#ffffff"];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-start px-6 pt-16 pb-12"
    >
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <p className="text-[11px] text-[#707075] uppercase tracking-[0.2em] mb-3">
          Actualización instalada · v2026.8.12
        </p>
        <h1 className="text-[32px] font-bold mb-2">Feliz Cumpleaños amor ❤️</h1>
        <p className="text-[15px] text-[#a0a0a5] leading-relaxed max-w-xs mx-auto">
          Este agosto vamos a vivir algo que no se ha visto en España en más de un siglo.
          Juntos, en el Teslita, bajo el eclipse total.
          Nuestro primer camping. Nuestra aventura.
        </p>
        <p className="text-[14px] text-[#707075] mt-4 italic">Te amo</p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full mb-8"
      >
        <p className="text-[10px] text-[#707075] text-center mb-3 uppercase tracking-widest">
          Cuenta atrás para la totalidad
        </p>
        <Countdown />
      </motion.div>

      {/* Gifts summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: "#222" }}
      >
        <p className="text-[11px] text-[#707075] uppercase tracking-[0.14em] px-5 pt-4 pb-3">
          Tu pack de regalo
        </p>
        {[
          { icon: "🌑", label: "Eclipse Solar Total", sub: "12 ago 2026 · 20:30h · 90 seg · Perseidas" },
          { icon: "⛺", label: "Camping reservado", sub: "8 – 14 de agosto · Manzanera, Teruel" },
          { icon: "🕶️", label: "Gafas de eclipse certificadas", sub: "ISO 12312-2 · Listas para usar" },
          { icon: "🎁", label: "Tarjeta regalo Decathlon", sub: "100€ para equiparte para la aventura" },
          { icon: "⚡", label: "Tarjeta regalo Tesla", sub: "100 USD · Para equipar el Teslita" },
        ].map(({ icon, label, sub }, i) => (
          <div
            key={label}
            className={`flex items-center gap-4 px-5 py-3 ${i < 4 ? "border-b border-white/5" : ""}`}
          >
            {/* Icono sobre fondo blanco */}
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-[14px] font-medium text-white leading-snug">{label}</p>
              <p className="text-[12px] text-[#707075]">{sub}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Link más info eclipse */}
      <motion.a
        href="https://www.turismodearagon.com/eclipse-solar-2026/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-6 text-[13px] text-[#F59E0B] font-medium"
      >
        Más info sobre el eclipse · Turismo de Aragón ↗
      </motion.a>

      {/* Botón ver regalos */}
      {onViewCards && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={onViewCards}
          className="mt-8 px-8 py-3 rounded-xl text-[14px] font-semibold cursor-pointer transition-opacity active:opacity-70"
          style={{ background: "#2a2a2a", color: "#a0a0a5" }}
        >
          Ver los 5 regalos
        </motion.button>
      )}

      {/* Reiniciar */}
      {onReset && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          onClick={onReset}
          className="mt-6 text-[12px] text-[#444] cursor-pointer transition-colors hover:text-[#666] active:opacity-60"
        >
          ↺ Volver al inicio
        </motion.button>
      )}
    </motion.div>
  );
}
