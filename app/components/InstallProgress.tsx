"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const steps = [
  { threshold: 0, message: "Conectando con servidores Tesla..." },
  { threshold: 10, message: "Descargando datos del eclipse..." },
  { threshold: 22, message: "Calibrando sensores solares..." },
  { threshold: 38, message: "Actualizando navegación a Javalambre..." },
  { threshold: 52, message: "Instalando Modo Camping..." },
  { threshold: 66, message: "Optimizando batería para el viaje..." },
  { threshold: 80, message: "Verificando instalación..." },
  { threshold: 93, message: "Casi listo..." },
];

export default function InstallProgress({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 0.7 + Math.random() * 0.4, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onCompleteRef.current(), 600);
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const currentMessage =
    [...steps].reverse().find((s) => progress >= s.threshold)?.message ||
    steps[0].message;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Tesla wordmark pulsing — sin logo, solo texto como en la app */}
      <motion.p
        animate={{ opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-[13px] font-semibold tracking-[0.3em] uppercase text-white mb-16"
      >
        TESLA
      </motion.p>

      {/* Progress section */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-[13px] text-tesla-secondary">Instalando actualización</span>
          <span className="text-[13px] font-mono text-white tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] bg-tesla-card-light rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: "#3EB489" }}
          />
        </div>

        {/* Status message */}
        <motion.p
          key={currentMessage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[12px] text-tesla-muted font-mono text-center"
        >
          {currentMessage}
        </motion.p>
      </div>

      {/* Warning */}
      <p className="text-[10px] text-tesla-tertiary mt-16">
        No desconectar ni conducir durante la instalación
      </p>
    </motion.div>
  );
}
