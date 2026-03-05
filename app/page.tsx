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

export default function Home() {
  // Arranca en "complete" si ya lo vio antes
  const [screen, setScreen] = useState<Screen>("splash");
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      setScreen("complete");
    }
    setReady(true);
  }, []);

  const onReveal = useCallback(() => setUnlockedCount((p) => p + 1), []);

  const handleComplete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setScreen("complete");
  }, []);

  const handleViewCards = useCallback(() => {
    setUnlockedCount(0);
    setScreen("features");
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
          <UpdateComplete key="complete" onViewCards={handleViewCards} />
        )}
      </AnimatePresence>
    </div>
  );
}
