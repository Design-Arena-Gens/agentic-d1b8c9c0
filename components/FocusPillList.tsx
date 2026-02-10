"use client";

import { calculateFocusSpread } from "@/lib/metrics";
import { WeeklyPlan } from "@/types/planner";
import { motion } from "framer-motion";

interface FocusPillListProps {
  plan: WeeklyPlan;
}

export function FocusPillList({ plan }: FocusPillListProps) {
  const focusSpread = calculateFocusSpread(plan);

  return (
    <div className="flex flex-wrap gap-2">
      {focusSpread.map(([focus, sessions], index) => (
        <motion.span
          key={focus}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-subtle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
        >
          {focus} · {sessions}x
        </motion.span>
      ))}
    </div>
  );
}
