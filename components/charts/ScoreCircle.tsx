"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreCircleProps {
  label: string;
  value: number;
  className?: string;
}

export function ScoreCircle({ label, value, className }: ScoreCircleProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative size-28">
        <svg className="-rotate-90" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r={radius} stroke="#e8eef7" strokeWidth="10" fill="none" />
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#f5b942"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-navy-900">
          {value}
        </div>
      </div>
      <div className="text-center text-sm font-semibold text-navy-700">{label}</div>
    </div>
  );
}
