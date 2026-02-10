"use client";

import { addWeeks, formatWeekRange } from "@/lib/date";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface WeekNavigatorProps {
  weekStart: Date;
  onWeekChange: (date: Date) => void;
}

export function WeekNavigator({ weekStart, onWeekChange }: WeekNavigatorProps) {
  const label = useMemo(() => formatWeekRange(weekStart), [weekStart]);

  return (
    <motion.div
      className="flex items-center justify-between gap-3 rounded-3xl bg-muted/80 px-4 py-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        onClick={() => onWeekChange(addWeeks(weekStart, -1))}
        className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
      >
        ← Previous
      </button>
      <span className="text-sm font-semibold uppercase tracking-wide text-subtle">
        {label}
      </span>
      <button
        onClick={() => onWeekChange(addWeeks(weekStart, 1))}
        className="rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/30"
      >
        Next →
      </button>
    </motion.div>
  );
}
