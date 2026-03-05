"use client";

import { motion } from "framer-motion";

export default function EclipseDiagram() {
  // Moon travels: right (170) → totality (100) → left (30)
  // Corona rays appear only near totality
  const coronaRays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360;
    const rad = (angle * Math.PI) / 180;
    const x1 = 100 + Math.cos(rad) * 43;
    const y1 = 100 + Math.sin(rad) * 43;
    const x2 = 100 + Math.cos(rad) * (54 + (i % 3) * 7);
    const y2 = 100 + Math.sin(rad) * (54 + (i % 3) * 7);
    return { x1, y1, x2, y2 };
  });

  return (
    <div className="relative w-full max-w-[260px] mx-auto py-4">
      <svg viewBox="0 0 200 200" className="w-full">
        {/* Outer corona glow */}
        <motion.circle
          cx="100" cy="100" r="60"
          fill="none" stroke="#FBBF24" strokeWidth="20" opacity={0.08}
          animate={{ opacity: [0.04, 0.18, 0.04], strokeWidth: [16, 26, 16] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sun disk */}
        <circle cx="100" cy="100" r="38" fill="#F59E0B" />
        <circle cx="100" cy="100" r="26" fill="#FBBF24" opacity={0.6} />

        {/* Corona rays — appear at totality (moon cx ≈ 100) */}
        {coronaRays.map((ray, i) => (
          <motion.line
            key={i}
            x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2}
            stroke="white" strokeWidth="1.2" strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.7, 0.9, 0.7, 0, 0] }}
            transition={{
              duration: 10,
              delay: 0.5 + i * 0.02,
              repeat: Infinity,
              repeatDelay: 2,
              times: [0, 0.28, 0.38, 0.5, 0.62, 0.72, 1],
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Moon — slides across the sun */}
        <motion.circle
          r="40" cy="100"
          fill="#1a1a1a"
          stroke="#2a2a2a" strokeWidth="1"
          style={{ cx: 170 }}
          animate={{ cx: [170, 100, 30] }}
          transition={{
            duration: 10,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: [0.4, 0, 0.6, 1],
          }}
        />
      </svg>

      {/* Phase labels */}
      <div className="flex justify-between text-[10px] text-[#505055] mt-1 px-2">
        <span>Parcial</span>
        <span className="text-[#F59E0B] font-semibold">Totalidad</span>
        <span>Parcial</span>
      </div>
    </div>
  );
}
