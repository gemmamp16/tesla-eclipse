"use client";

import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import InstallProgress from "./components/InstallProgress";
import DiscoveryCards from "./components/DiscoveryCards";
import UpdateComplete from "./components/UpdateComplete";
import ProgressBar from "./components/ProgressBar";

type Screen = "splash" | "installing" | "features" | "complete";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [unlockedCount, setUnlockedCount] = useState(0);
  const onReveal = useCallback(() => setUnlockedCount((prev) => prev + 1), []);

  const progress =
    screen === "splash"
      ? 0
      : screen === "installing"
        ? 15
        : screen === "features"
          ? 15 + unlockedCount * 16
          : 100;

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
            onComplete={() => setScreen("complete")}
            onReveal={onReveal}
          />
        )}
        {screen === "complete" && <UpdateComplete key="complete" />}
      </AnimatePresence>
    </div>
  );
}
