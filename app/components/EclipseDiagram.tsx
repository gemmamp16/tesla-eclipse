"use client";

import { motion } from "framer-motion";

export default function EclipseDiagram() {
  // 12 corona rays around the sun center
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 360;
    const rad = (angle * Math.PI) / 180;
    const inner = 42;
    const outer = inner + 14 + (i % 3) * 10;
    return {
      x1: 100 + Math.cos(rad) * inner,
      y1: 100 + Math.sin(rad) * inner,
      x2: 100 + Math.cos(rad) * outer,
      y2: 100 + Math.sin(rad) * outer,
    };
  });

  // Moon animation: far right → totality (center) → pause → far left → jump back
  // Times: [start, partial-in, totality-start, totality-end, partial-out, end]
  const moonCx    = [210, 140,  100,  100,  60,  -10];
  const moonTimes = [0,   0.25, 0.42, 0.58, 0.75, 1];

  // Corona opacity: only during totality window
  const coronaTimes   = [0, 0.35, 0.42, 0.50, 0.58, 0.65, 1];
  const coronaOpacity = [0, 0,    0.9,  1,    0.9,  0,    0];

  const duration = 9;
  const repeatDelay = 1.5;

  return (
    <div className="relative w-full max-w-[280px] mx-auto py-3">
      <svg viewBox="0 0 200 200" className="w-full">
        {/* Outer ambient glow */}
        <motion.circle
          cx="100" cy="100" r="65"
          fill="none" stroke="#FBBF24" strokeWidth="22" opacity={0.06}
          animate={{ opacity: [0.04, 0.13, 0.04], strokeWidth: [18, 28, 18] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sun disk */}
        <circle cx="100" cy="100" r="38" fill="#F59E0B" />
        {/* Sun bright core */}
        <circle cx="100" cy="100" r="24" fill="#FBBF24" opacity={0.7} />

        {/* Corona rays — appear only at totality */}
        {rays.map((r, i) => (
          <motion.line
            key={i}
            x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke="white"
            strokeWidth={i % 2 === 0 ? 1.5 : 0.8}
            strokeLinecap="round"
            animate={{ opacity: coronaOpacity }}
            transition={{
              duration,
              delay: i * 0.02,
              repeat: Infinity,
              repeatDelay,
              times: coronaTimes,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Moon */}
        <motion.circle
          r="41"
          cy="100"
          fill="#111"
          stroke="#222"
          strokeWidth="1"
          animate={{ cx: moonCx }}
          transition={{
            duration,
            repeat: Infinity,
            repeatDelay,
            times: moonTimes,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Phase labels */}
      <div className="flex justify-between text-[10px] text-[#505055] px-2 mt-0">
        <span>Parcial</span>
        <span className="text-[#F59E0B] font-bold">✦ Totalidad</span>
        <span>Parcial</span>
      </div>
    </div>
  );
}
