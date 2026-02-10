"use client";

import { DayPlan } from "@/types/planner";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface DayScheduleCardProps {
  plan: DayPlan;
  onToggleComplete: (workoutId: string) => void;
  onRemove: (workoutId: string) => void;
  onAdjustMobility: (minutes: number) => void;
}

export function DayScheduleCard({
  plan,
  onToggleComplete,
  onRemove,
  onAdjustMobility
}: DayScheduleCardProps) {
  return (
    <motion.div
      className="rounded-3xl border border-white/5 bg-muted/60 p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-subtle">
            {plan.day}
          </p>
          <h3 className="mt-1 text-xl font-semibold">
            {plan.workouts.length > 0 ? "Sessions" : "Recovery"}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-subtle">Mobility</p>
          <div className="mt-1 flex items-center gap-2">
            <button
              onClick={() =>
                onAdjustMobility(Math.max(plan.mobilityMinutes - 5, 0))
              }
              className="rounded-full bg-white/10 px-2 text-sm text-white/70 hover:bg-white/15"
            >
              –
            </button>
            <span className="text-base font-semibold">
              {plan.mobilityMinutes}m
            </span>
            <button
              onClick={() => onAdjustMobility(plan.mobilityMinutes + 5)}
              className="rounded-full bg-primary/30 px-2 text-sm text-white hover:bg-primary/40"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {plan.workouts.map((workout) => (
          <motion.div
            key={workout.id}
            className={clsx(
              "rounded-2xl border border-white/5 bg-white/5 p-4 text-sm shadow-inner transition",
              workout.completed && "border-primary/30 bg-primary/10"
            )}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-white">
                  {workout.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-primary">
                  {workout.focus} · {workout.intensity}
                </p>
                {workout.notes && (
                  <p className="mt-2 text-xs text-subtle">{workout.notes}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                  {workout.duration}m
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleComplete(workout.id)}
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold transition",
                      workout.completed
                        ? "bg-primary text-dark"
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    {workout.completed ? "Completed" : "Mark done"}
                  </button>
                  <button
                    onClick={() => onRemove(workout.id)}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-subtle hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
