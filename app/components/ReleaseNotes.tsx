"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import EclipseDiagram from "./EclipseDiagram";

interface ReleaseNotesProps {
  onComplete: () => void;
  onAchievement: (name: string, icon: string) => void;
}

const achievements = [
  { name: "Cazador de Eclipses", icon: "🌑" },
  { name: "Explorador Estelar", icon: "⭐" },
  { name: "Road Tripper", icon: "🚗" },
  { name: "Escudo Solar", icon: "🕶️" },
  { name: "Aventurero Equipado", icon: "🎁" },
];

export default function ReleaseNotes({
  onComplete,
  onAchievement,
}: ReleaseNotesProps) {
  const [viewedFeatures, setViewedFeatures] = useState<Set<number>>(new Set());
  const viewedRef = useRef<Set<number>>(new Set());

  const markViewed = useCallback(
    (index: number) => {
      if (viewedRef.current.has(index)) return;
      viewedRef.current.add(index);
      setViewedFeatures((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
      onAchievement(achievements[index].name, achievements[index].icon);
    },
    [onAchievement]
  );

  const allViewed = viewedFeatures.size >= 5;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen"
    >
      {/* ── Tesla-style sticky nav header ── */}
      <div className="sticky top-0 z-30 bg-[#181818]/90 backdrop-blur-md">
        <div className="px-5 pt-14 pb-3 flex items-center justify-center">
          <p className="text-[17px] font-semibold text-white">
            Notas de la versión
          </p>
        </div>
      </div>

      {/* ── Version header (Tesla style: huge number, muted subtitle) ── */}
      <div className="px-6 pt-6 pb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[46px] font-bold text-white leading-none tracking-tight"
        >
          2026.8.12
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[15px] text-tesla-muted mt-2"
        >
          Edición Eclipse
        </motion.p>
      </div>

      {/* ── Feature sections (no dividers — Tesla uses spacing only) ── */}
      <div className="px-6">
        {/* Feature 1: Modo Visión Eclipse */}
        <FeatureCard
          title="Modo Visión Eclipse"
          onVisible={() => markViewed(0)}
        >
          <div className="bg-tesla-card rounded-2xl flex items-center justify-center min-h-[240px]">
            <EclipseDiagram />
          </div>

          <p>
            El <strong className="text-white">12 de agosto de 2026</strong>, un
            eclipse solar total cruzará la Península Ibérica — el primero
            visible desde España en más de un siglo.
          </p>

          <p>
            La totalidad durará aproximadamente{" "}
            <strong className="text-white">1 minuto y 40 segundos</strong>, con
            una franja de sombra excepcionalmente ancha de{" "}
            <strong className="text-white">290 km</strong>.
          </p>
        </FeatureCard>

        {/* Feature 2: Destino Javalambre */}
        <FeatureCard
          title="Nuevo destino: Javalambre"
          onVisible={() => markViewed(1)}
        >
          <div className="bg-tesla-card rounded-2xl p-6 min-h-[200px] flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-11 h-11 rounded-full bg-tesla-card-light flex items-center justify-center">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <p className="text-[15px] font-medium text-white">Observatorio Astrofísico de Javalambre</p>
                <p className="text-[13px] text-tesla-muted">Pico del Buitre, Teruel</p>
              </div>
            </div>
            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-tesla-secondary">Inicio del eclipse</span>
                <span className="text-white font-medium">~19:36h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tesla-secondary">Totalidad</span>
                <span className="text-eclipse-gold font-medium">~20:30h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tesla-secondary">Tipo</span>
                <span className="text-white font-medium">Eclipse al atardecer</span>
              </div>
            </div>
          </div>

          <p>
            Situado en el Pico del Buitre, este observatorio con certificación{" "}
            <span className="text-eclipse-gold">Reserva Starlight</span> es uno
            de los puntos de observación más privilegiados del planeta para
            este eclipse. Investigadores de todo el mundo se reunirán allí.
          </p>
        </FeatureCard>

        {/* Feature 3: Planificador de Ruta */}
        <FeatureCard
          title="Planificador de ruta"
          onVisible={() => markViewed(2)}
        >
          <div className="bg-tesla-card rounded-2xl p-6 min-h-[160px] flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-tesla-card-light flex items-center justify-center">
                <span className="text-tesla-blue text-sm">⚡</span>
              </div>
              <div>
                <p className="text-[14px] font-medium text-white">Ruta cargada</p>
                <p className="text-[12px] text-tesla-muted">Paradas en Supercharger calculadas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-tesla-card-light flex items-center justify-center">
                <span className="text-achievement text-sm">⛺</span>
              </div>
              <div>
                <p className="text-[14px] font-medium text-white">Modo Camping</p>
                <p className="text-[12px] text-tesla-muted">Primera activación</p>
              </div>
            </div>
          </div>

          <p>
            Destino cargado en el navegador. Tu{" "}
            <strong className="text-white">Tesla</strong> está listo para el
            viaje a las montañas de Teruel. Modo Camping activado por primera
            vez — tu primera experiencia outdoor con el coche.
          </p>
        </FeatureCard>

        {/* Feature 4: Gafas Eclipse */}
        <FeatureCard
          title="Gafas de eclipse · Cargadas"
          onVisible={() => markViewed(3)}
        >
          <div className="bg-tesla-card rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] gap-4">
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
              className="text-7xl"
            >
              🕶️
            </motion.span>
            <div className="flex items-center gap-2 bg-achievement/15 rounded-xl px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-achievement shrink-0" />
              <span className="text-[13px] text-achievement font-medium">Objeto físico · En tu inventario</span>
            </div>
          </div>

          <p>
            Se han adquirido{" "}
            <strong className="text-white">gafas de eclipse con certificación ISO 12312-2</strong>,
            el estándar de seguridad para observación solar directa. Sin
            protección certificada, la retina puede sufrir daños permanentes
            durante las fases parciales.
          </p>

          <p>
            Durante la totalidad —esos{" "}
            <span className="text-eclipse-gold font-medium">~1 minuto y 40 segundos</span>{" "}
            en que la Luna tapa completamente el Sol— podrás quitártelas y
            mirar la corona solar a simple vista. Ese momento no lo olvidarás.
          </p>
        </FeatureCard>

        {/* Feature 5: Tarjeta Decathlon */}
        <FeatureCard
          title="Kit de aventura · Decathlon"
          onVisible={() => markViewed(4)}
        >
          {/* Gift card visual */}
          <div className="rounded-2xl overflow-hidden min-h-[180px] relative bg-[#0082C3] flex flex-col justify-between p-6">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[11px] text-white/60 uppercase tracking-[0.18em] font-medium mb-1">Tarjeta Regalo</p>
                <p className="text-[22px] font-bold text-white tracking-tight leading-none">DECATHLON</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">🎽</span>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[13px] text-white/60 mb-0.5">Saldo disponible</p>
              <p className="text-[42px] font-bold text-white leading-none tracking-tight">100<span className="text-[28px]">€</span></p>
            </div>
          </div>

          <p>
            Para ir juntos a por todo lo que necesitáis para el viaje.{" "}
            <strong className="text-white">100€ en Decathlon</strong> para
            equiparos: sacos de dormir, esterillas, linternas, ropa térmica…
            lo que haga falta para el camping en las montañas de Teruel.
          </p>

          <div className="bg-tesla-card rounded-2xl p-5 space-y-3">
            <p className="text-[12px] text-tesla-muted uppercase tracking-[0.12em]">Ideas de equipamiento</p>
            {[
              { icon: "🛏️", text: "Sacos de dormir y esterillas" },
              { icon: "🔦", text: "Linterna frontal para observar sin luz" },
              { icon: "🧥", text: "Ropa abrigada (en agosto en la sierra hace frío)" },
              { icon: "⛺", text: "Lo que falte para el camping con el Tesla" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span className="text-[14px] text-tesla-secondary">{text}</span>
              </div>
            ))}
          </div>
        </FeatureCard>
      </div>

      {/* ── Complete button ── */}
      {allViewed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-10"
        >
          <button
            onClick={onComplete}
            className="w-full py-[15px] rounded-xl font-semibold text-[16px] cursor-pointer transition-opacity active:opacity-80"
            style={{ background: "#fff", color: "#000" }}
          >
            Completar Actualización
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
