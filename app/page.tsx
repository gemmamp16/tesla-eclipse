"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import InstallProgress from "./components/InstallProgress";
import DiscoveryCards from "./components/DiscoveryCards";
import UpdateComplete from "./components/UpdateComplete";
import ProgressBar from "./components/ProgressBar";

type Screen = "splash" | "installing" | "features" | "complete";

const STORAGE_KEY = "tesla_eclipse_done";
const STORAGE_VER  = "tesla_eclipse_ver";
// Cambia con cada deploy de Vercel (NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA),
// o usa la fecha de build como fallback para desarrollo local
const BUILD_ID =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  process.env.NEXT_PUBLIC_BUILD_TIME ||
  "dev";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedVersion = localStorage.getItem(STORAGE_VER);
    const done = localStorage.getItem(STORAGE_KEY) === "1";
    // Solo restaura el estado completado si es la misma versión desplegada
    if (done && savedVersion === BUILD_ID) {
      setScreen("complete");
    } else if (savedVersion !== BUILD_ID) {
      // Nueva versión → borra el estado anterior para empezar desde cero
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_VER);
    }
    setReady(true);
  }, []);

  const onReveal = useCallback(() => setUnlockedCount((p) => p + 1), []);

  const handleComplete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    localStorage.setItem(STORAGE_VER, BUILD_ID);
    setScreen("complete");
  }, []);

  const handleViewCards = useCallback(() => {
    setUnlockedCount(0);
    setScreen("features");
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_VER);
    setUnlockedCount(0);
    setScreen("splash");
  }, []);

  const progress =
    screen === "splash" ? 0
    : screen === "installing" ? 15
    : screen === "features" ? 15 + unlockedCount * 16
    : 100;

  // Evita flash mientras lee localStorage
  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[#181818] text-white relative overflow-x-hidden">
      <ProgressBar progress={Math.min(progress, 100)} />
      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <SplashScreen key="splash" onInstall={() => setScreen("installing")} />
        )}
        {screen === "installing" && (
          <InstallProgress key="installing" onComplete={() => setScreen("features")} />
        )}
        {screen === "features" && (
          <DiscoveryCards
            key="features"
            onComplete={handleComplete}
            onReveal={onReveal}
          />
        )}
        {screen === "complete" && (
          <UpdateComplete key="complete" onViewCards={handleViewCards} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
}
