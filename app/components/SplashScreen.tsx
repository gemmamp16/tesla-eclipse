"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  "1 experiencia astronómica programada",
  "Nuevo destino cargado en el navegador",
  "Modo aventura: primera activación",
  "Hardware de seguridad solar incluido",
  "Kit de equipamiento outdoor desbloqueado",
];

export default function SplashScreen({ onInstall }: { onInstall: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen flex flex-col px-5 pt-14 pb-10 bg-[#181818]"
    >
      {/* Header — solo "Model Y" como la app, sin logo ni icono */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-4"
      >
        <h2 className="text-[24px] font-bold text-white tracking-tight">Model Y</h2>
      </motion.div>

      {/* Coche */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" }}
        className="-mx-5 mb-4"
        style={{
          maskImage: "radial-gradient(ellipse 90% 85% at 55% 50%, white 50%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 55% 50%, white 50%, transparent 85%)",
        }}
      >
        <Image
          src="/car-display.png"
          alt="Tesla Model Y Juniper"
          width={659}
          height={371}
          className="w-full max-h-[210px] object-contain object-center"
          priority
          unoptimized
        />
      </motion.div>

      {/* Versión */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-1"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#707075] mb-2">
          Actualización de software disponible
        </p>
        <h1 className="text-[52px] font-bold tracking-tight leading-none text-white">
          2026.8.12
        </h1>
        <p className="text-[14px] text-[#F59E0B] mt-1.5 font-medium">
          Edición Eclipse
        </p>
      </motion.div>

      {/* Separador */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="w-full h-px my-5 origin-left"
        style={{ background: "#333" }}
      />

      {/* Lista */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="flex-1"
      >
        <p className="text-[11px] text-[#707075] mb-4 uppercase tracking-[0.15em]">
          Incluido en esta actualización
        </p>
        <div className="space-y-3.5">
          {features.map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              {/* Punto como en la app de Tesla */}
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#707075" }} />
              <span className="text-[14px] text-[#a0a0a5]">{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Botón — blanco sobre azul, estilo Tesla */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="mt-8 space-y-3"
      >
        <button
          onClick={onInstall}
          className="w-full py-[15px] rounded-xl font-semibold text-[16px] tracking-wide cursor-pointer transition-opacity active:opacity-80"
          style={{ background: "#fff", color: "#000" }}
        >
          Instalar ahora
        </button>
        <p className="text-[11px] text-[#505055] text-center">
          Feliz cumpleaños amor
        </p>
      </motion.div>
    </motion.div>
  );
}
