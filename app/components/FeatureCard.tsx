"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
  onVisible?: () => void;
}

export default function FeatureCard({
  title,
  children,
  onVisible,
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
      onVisible?.();
    }
  }, [isInView, hasTriggered, onVisible]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14"
    >
      {/* Feature title - Tesla style: bold, left-aligned */}
      <h3 className="text-[17px] font-semibold text-white mb-5">
        {title}
      </h3>

      {/* Content area - Tesla body text style */}
      <div className="text-[15px] text-tesla-secondary leading-[1.7] space-y-5">
        {children}
      </div>
    </motion.section>
  );
}
