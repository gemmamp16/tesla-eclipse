"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AchievementToastProps {
  achievement: { name: string; icon: string } | null;
}

export default function AchievementToast({ achievement }: AchievementToastProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={achievement.name}
          initial={{ opacity: 0, y: -60, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -60, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-6 left-1/2 z-50 bg-tesla-card border border-tesla-card-light rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3"
        >
          <span className="text-2xl">{achievement.icon}</span>
          <div>
            <p className="text-[10px] text-achievement uppercase tracking-widest font-bold">
              Logro Desbloqueado
            </p>
            <p className="text-sm text-white font-medium">{achievement.name}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
