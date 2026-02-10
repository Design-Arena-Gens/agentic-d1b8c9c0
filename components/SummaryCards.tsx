"use client";

import { calculateCompletion, calculateWeeklyMinutes } from "@/lib/metrics";
import { WeeklyPlan } from "@/types/planner";
import { motion } from "framer-motion";

interface SummaryCardsProps {
  plan: WeeklyPlan;
}

const cardMotion = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.3 }
  })
};

export function SummaryCards({ plan }: SummaryCardsProps) {
  const weeklyMinutes = calculateWeeklyMinutes(plan);
  const completion = calculateCompletion(plan);

  const cards = [
    {
      title: "Weekly Volume",
      value: `${weeklyMinutes} min`,
      detail: `${Math.round(weeklyMinutes / 7)} min per day`,
      accent: "bg-gradient-to-br from-primary/60 to-primary/20 text-white"
    },
    {
      title: "Hydration Target",
      value: `${plan.hydrationTarget} oz`,
      detail: "Stay consistent & split across day",
      accent: "bg-white/5 text-primary"
    },
    {
      title: "Completion",
      value: `${completion}%`,
      detail: "Mark workouts done to stay on track",
      accent: "bg-white/5 text-white"
    }
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`rounded-3xl p-5 shadow-card ${card.accent}`}
          variants={cardMotion}
          initial="hidden"
          animate="visible"
          custom={index}
        >
          <p className="text-xs uppercase tracking-wide text-white/60">
            {card.title}
          </p>
          <p className="mt-2 text-2xl font-bold">{card.value}</p>
          <p className="mt-1 text-sm text-white/70">{card.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}
