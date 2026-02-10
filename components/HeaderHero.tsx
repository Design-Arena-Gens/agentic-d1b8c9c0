"use client";

import { motion } from "framer-motion";

interface HeaderHeroProps {
  energyGoal: string;
  focus: string;
}

export function HeaderHero({ energyGoal, focus }: HeaderHeroProps) {
  return (
    <motion.header
      className="space-y-6 rounded-3xl border border-primary/20 bg-gradient-to-br from-muted via-dark to-dark p-6 shadow-card"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4rem] text-primary/80">
            PulsePlan
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl">
            Lock in your weekly training rhythm.
          </h1>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3rem] text-white/40">
            Energy protocol
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{energyGoal}</p>
        </div>
      </div>
      <div className="rounded-3xl bg-primary/10 p-4 text-sm text-white">
        <p className="text-xs uppercase tracking-[0.3rem] text-primary/80">
          Week Focus
        </p>
        <p className="mt-2 text-base font-semibold">{focus}</p>
      </div>
    </motion.header>
  );
}
