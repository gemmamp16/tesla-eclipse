"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import EclipseDiagram from "./EclipseDiagram";

const RouteMap = dynamic(() => import("./RouteMap"), { ssr: false, loading: () => (
  <div className="rounded-2xl bg-[#0d0d0d] border border-white/5 flex items-center justify-center" style={{ height: 210 }}>
    <p className="text-[13px] text-[#505055]">Cargando mapa…</p>
  </div>
)});

interface DiscoveryCardsProps {
  onComplete: () => void;
  onReveal: () => void;
}

// ── Card 1: Eclipse ──────────────────────────────────────────────────────────
const EclipseVisual = () => (
  <div className="bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden">
    <EclipseDiagram />
    {/* Spain path info */}
    <div className="px-4 pb-4 space-y-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#F59E0B] mb-2">
        Franja de totalidad · España
      </p>
      {[
        { zona: "Galicia · Asturias", desc: "Entrada por el Cantábrico" },
        { zona: "Castilla y León · Aragón", desc: "Zona central — máxima duración" },
        { zona: "Teruel · Javalambre ✦", desc: "Tu destino — ~2 min totalidad", highlight: true },
        { zona: "Valencia · Mediterráneo", desc: "Salida hacia Baleares" },
      ].map(({ zona, desc, highlight }) => (
        <div key={zona} className={`flex items-start gap-2 py-1.5 px-2 rounded-lg ${highlight ? "bg-[#F59E0B]/10" : ""}`}>
          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${highlight ? "bg-[#F59E0B]" : "bg-[#404040]"}`} />
          <div>
            <p className={`text-[13px] font-medium ${highlight ? "text-[#F59E0B]" : "text-white/80"}`}>{zona}</p>
            <p className="text-[11px] text-[#505055]">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Card 2: Destino ──────────────────────────────────────────────────────────
const MapVisual = () => (
  <div className="rounded-2xl overflow-hidden border border-white/5" style={{ height: 220 }}>
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=-1.0%2C39.95%2C-0.75%2C40.15&layer=mapnik&marker=40.0528%2C-0.8693"
      width="100%"
      height="220"
      style={{ border: 0, display: "block" }}
      loading="lazy"
      title="Camping Javalambre"
    />
  </div>
);

// ── Card 3: Ruta Supercharger ────────────────────────────────────────────────
const RouteVisual = () => (
  <div className="space-y-3">
    {/* Mapa Leaflet oscuro con marcadores y ruta real */}
    <RouteMap />
    {/* Paradas Supercharger ruta Almoradí → Manzanera */}
    <div className="bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/5">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#a0a0a5]">Paradas Supercharger · ~250 km</p>
      </div>
      {[
        { ciudad: "Almoradí", km: "Salida", sc: "Alicante · inicio de ruta", icon: "🏁" },
        { ciudad: "SC Torrent", km: "~130 km", sc: "Parc Comercial Torrent · Valencia", icon: "⚡", highlight: true },
        { ciudad: "Camping Javalambre", km: "~250 km", sc: "Manzanera, Teruel · Destino", icon: "⛺" },
      ].map(({ ciudad, km, sc, icon, highlight }) => (
        <div key={ciudad} className={`flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 ${highlight ? "bg-[#F59E0B]/8" : ""}`}>
          <span className="text-base w-6 text-center">{icon}</span>
          <div className="flex-1">
            <p className={`text-[13px] font-semibold ${highlight ? "text-[#F59E0B]" : "text-white"}`}>{ciudad}</p>
            <p className="text-[11px] text-[#505055]">{sc}</p>
          </div>
          <span className="text-[11px] text-[#505055] shrink-0">{km}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Card 4: Regalo misterioso ────────────────────────────────────────────────
const GlassesVisual = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="rounded-2xl border border-white/5 overflow-hidden min-h-[180px]">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1e1e1e] flex flex-col items-center justify-center min-h-[180px] gap-4 px-6 py-6"
          >
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[60px]"
            >
              🎁
            </motion.span>
            <p className="text-[15px] text-[#a0a0a5] text-center">
              Hardware incluido en esta actualización
            </p>
            <button
              onClick={() => setOpened(true)}
              className="flex items-center gap-2 bg-[#F59E0B] rounded-xl px-6 py-3 cursor-pointer transition-opacity active:opacity-80"
            >
              <span className="text-[15px] text-black font-bold">Abre tu regalo físico</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f0f0ee] flex flex-col items-center justify-center min-h-[180px] gap-3 px-6 py-6"
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="text-[72px]"
            >
              🕶️
            </motion.span>
            <p className="text-[16px] font-bold text-[#111]">¡Gafas de Eclipse!</p>
            <div className="flex items-center gap-2 bg-black/8 rounded-xl px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#333] shrink-0" />
              <span className="text-[13px] text-[#222] font-semibold">Certificación ISO 12312-2</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Card 5: Decathlon ────────────────────────────────────────────────────────
const DecathlonVisual = () => (
  <div className="rounded-2xl overflow-hidden relative bg-[#0082C3] border border-white/10">
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid2" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />
      </svg>
    </div>
    {/* Card header */}
    <div className="relative z-10 flex items-start justify-between p-5 pb-2">
      <div>
        <p className="text-[10px] text-white/60 uppercase tracking-[0.18em] mb-0.5">Tarjeta Regalo</p>
        <p className="text-[20px] font-bold text-white">DECATHLON</p>
      </div>
      <p className="text-[32px] font-bold text-white leading-none">100<span className="text-[20px]">€</span></p>
    </div>
    {/* QR + datos en horizontal */}
    <div className="relative z-10 flex items-center gap-4 px-5 pb-5">
      {/* QR real */}
      <div className="bg-white rounded-xl p-2 shrink-0">
        <Image
          src="/decathlon-qr.png"
          alt="QR Decathlon"
          width={90}
          height={90}
          className="rounded-lg"
          unoptimized
        />
      </div>
      {/* Datos tarjeta */}
      <div className="flex-1 space-y-2">
        <div>
          <p className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">Número de tarjeta</p>
          <p className="text-[13px] font-mono font-bold text-white tracking-widest">6341 9336 6532 0327</p>
        </div>
        <div>
          <p className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">Código PIN</p>
          <p className="text-[18px] font-mono font-bold text-white tracking-[0.3em]">3771</p>
        </div>
        <p className="text-[10px] text-white/40">Canjeable en tienda y online</p>
      </div>
    </div>
  </div>
);

// ── Cards data ────────────────────────────────────────────────────────────────
const cards = [
  {
    label: "01 / 05",
    tag: "EXPERIENCIA ASTRONÓMICA",
    title: "Eclipse Solar Total",
    subtitle: "12 de agosto de 2026 · Javalambre, Teruel",
    body: "El primer eclipse solar total visible desde España en más de un siglo. La Luna tapará el Sol durante ~2 minutos — la corona solar brillará a simple vista. Solo en la franja de totalidad.",
    visual: <EclipseVisual />,
  },
  {
    label: "02 / 05",
    tag: "NUEVO DESTINO",
    title: "Camping Javalambre",
    subtitle: "Manzanera, Teruel · Partida de las bateas s/n",
    body: "A los pies del Pico del Buitre (1.957 m), uno de los cielos más oscuros de Europa. Certificación Starlight. El camping perfecto para esperar la noche del eclipse.",
    visual: <MapVisual />,
  },
  {
    label: "03 / 05",
    tag: "RUTA CALCULADA",
    title: "Paradas Supercharger",
    subtitle: "Almoradí → Manzanera · ~270 km",
    body: "Parada en Valencia para cargar cómodo, y otra en Teruel a solo 30 km del camping. Llegas con batería de sobra para explorar la sierra.",
    visual: <RouteVisual />,
  },
  {
    label: "04 / 05",
    tag: "HARDWARE INCLUIDO",
    title: "Hardware incluido",
    subtitle: "Objeto físico · Ya está en tus manos",
    body: "Este componente es imprescindible para disfrutar el eclipse de forma segura. Sin él, la experiencia no sería completa.",
    visual: <GlassesVisual />,
  },
  {
    label: "05 / 05",
    tag: "KIT DE AVENTURA",
    title: "Tarjeta Decathlon",
    subtitle: "100€ · Para equiparos juntos",
    body: "Para ir juntos a elegir todo lo que necesitáis: sacos de dormir, esterillas, ropa de sierra... Lo que haga falta para vuestra primera aventura outdoor.",
    visual: <DecathlonVisual />,
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function DiscoveryCards({ onComplete, onReveal }: DiscoveryCardsProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [revealed, setRevealed] = useState<Set<number>>(new Set([0]));

  const goNext = useCallback(() => {
    const next = index + 1;
    if (next >= cards.length) { onComplete(); return; }
    setDirection(1);
    setIndex(next);
    if (!revealed.has(next)) {
      setRevealed((prev) => new Set(prev).add(next));
      onReveal();
    }
  }, [index, revealed, onComplete, onReveal]);

  const goPrev = useCallback(() => {
    if (index === 0) return;
    setDirection(-1);
    setIndex(index - 1);
  }, [index]);

  const card = cards[index];
  const isLast = index === cards.length - 1;

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#181818]">
      {/* Stories progress bar */}
      <div className="sticky top-0 z-30 bg-[#181818]/90 backdrop-blur-md">
        <div className="px-5 pt-12 pb-3">
          <div className="flex gap-1.5 mb-3">
            {cards.map((_, i) => (
              <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: "#333" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: i <= index ? "#fff" : "transparent" }}
                  initial={false}
                  animate={{ width: i <= index ? "100%" : "0%" }}
                  transition={{ duration: i === index ? 0.3 : 0 }}
                />
              </div>
            ))}
          </div>
          <p className="text-[17px] font-semibold text-white text-center">Notas de la versión</p>
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 flex flex-col px-5 pt-5 pb-4 overflow-y-auto"
          >
            {/* Tag + counter */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-md text-[#a0a0a5] bg-[#2a2a2a]">
                {card.tag}
              </span>
              <span className="text-[12px] font-mono text-[#505055]">{card.label}</span>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-5"
            >
              {card.visual}
            </motion.div>

            {/* Title + body */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-[26px] font-bold text-white leading-tight mb-1">{card.title}</h2>
              <p className="text-[13px] mb-3 text-[#707075]">{card.subtitle}</p>
              <p className="text-[15px] text-white/60 leading-relaxed">{card.body}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-5 pb-10 pt-4 flex gap-3 bg-[#181818]">
        {index > 0 && (
          <button
            onClick={goPrev}
            className="py-4 px-6 rounded-xl font-semibold text-[15px] cursor-pointer transition-opacity active:opacity-70"
            style={{ background: "#2a2a2a", color: "#a0a0a5" }}
          >
            ‹
          </button>
        )}
        <button
          onClick={goNext}
          className="flex-1 py-[15px] rounded-xl font-semibold text-[16px] cursor-pointer transition-opacity active:opacity-80"
          style={{ background: "#fff", color: "#000" }}
        >
          {isLast ? "Completar actualización" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
