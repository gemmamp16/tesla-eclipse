"use client";

import { useState, useEffect } from "react";

// Eclipse totality: August 12, 2026, ~20:30 CEST (UTC+2)
const ECLIPSE_DATE = new Date("2026-08-12T18:30:00Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = ECLIPSE_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const units = [
    { label: "Días", value: time.days },
    { label: "Horas", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Seg", value: time.seconds },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="bg-tesla-card border border-tesla-card-light rounded-xl w-16 h-16 flex items-center justify-center">
            <span className="text-2xl font-mono font-bold text-white">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-tesla-muted mt-1.5 block uppercase tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
