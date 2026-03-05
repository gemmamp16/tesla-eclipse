"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-black/50 backdrop-blur-sm">
      <motion.div
        className="h-full bg-gradient-to-r from-tesla-blue to-eclipse-gold"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
