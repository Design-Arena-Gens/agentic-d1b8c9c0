"use client";

import { useEffect, useMemo, useState } from "react";
import { HeaderHero } from "@/components/HeaderHero";
import { WeekNavigator } from "@/components/WeekNavigator";
import { SummaryCards } from "@/components/SummaryCards";
import { FocusPillList } from "@/components/FocusPillList";
import { WorkoutForm } from "@/components/WorkoutForm";
import { DayScheduleCard } from "@/components/DayScheduleCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WeeklyPlan, Workout } from "@/types/planner";
import { suggestionFor } from "@/lib/suggestions";
import { createDefaultPlan } from "@/lib/sampleData";
import { addWeeks, startOfWeek, toISODate } from "@/lib/date";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
] as const;

type PlanDictionary = Record<string, WeeklyPlan>;

export default function PlannerPage() {
  const [activeWeek, setActiveWeek] = useState(startOfWeek(new Date()));
  const [plans, setPlans] = useLocalStorage<PlanDictionary>("pulse-plan", {});

  useEffect(() => {
    setPlans((current) => {
      const weekKey = toISODate(activeWeek);
      if (current[weekKey]) return current;
      return { ...current, [weekKey]: createDefaultPlan(activeWeek) };
    });
  }, [activeWeek, setPlans]);

  const currentPlan = useMemo(() => {
    const weekKey = toISODate(activeWeek);
    if (!plans[weekKey]) {
      return createDefaultPlan(activeWeek);
    }
    return plans[weekKey];
  }, [plans, activeWeek]);

  const updateCurrentPlan = (updater: (plan: WeeklyPlan) => WeeklyPlan) => {
    const weekKey = toISODate(activeWeek);
    setPlans((current) => {
      const existing = current[weekKey] ?? createDefaultPlan(activeWeek);
      return {
        ...current,
        [weekKey]: updater(existing)
      };
    });
  };

  const handleWeekChange = (date: Date) => {
    setActiveWeek(startOfWeek(date));
  };

  const handleCreateWorkout = (day: string, workout: Workout) => {
    updateCurrentPlan((plan) => ({
      ...plan,
      days: {
        ...plan.days,
        [day]: {
          ...plan.days[day],
          workouts: [...plan.days[day].workouts, workout]
        }
      }
    }));
  };

  const handleAutoPlan = (day: string) => {
    const suggestion = suggestionFor(day);
    handleCreateWorkout(day, suggestion);
  };

  const handleToggleComplete = (day: string, workoutId: string) => {
    updateCurrentPlan((plan) => ({
      ...plan,
      days: {
        ...plan.days,
        [day]: {
          ...plan.days[day],
          workouts: plan.days[day].workouts.map((workout) =>
            workout.id === workoutId
              ? { ...workout, completed: !workout.completed }
              : workout
          )
        }
      }
    }));
  };

  const handleRemoveWorkout = (day: string, workoutId: string) => {
    updateCurrentPlan((plan) => ({
      ...plan,
      days: {
        ...plan.days,
        [day]: {
          ...plan.days[day],
          workouts: plan.days[day].workouts.filter(
            (workout) => workout.id !== workoutId
          )
        }
      }
    }));
  };

  const handleMobilityAdjust = (day: string, minutes: number) => {
    updateCurrentPlan((plan) => ({
      ...plan,
      days: {
        ...plan.days,
        [day]: {
          ...plan.days[day],
          mobilityMinutes: Math.max(minutes, 0)
        }
      }
    }));
  };

  const isCurrentWeek =
    toISODate(activeWeek) === toISODate(startOfWeek(new Date()));

  const nextWeekPlanExists = useMemo(() => {
    const nextWeek = toISODate(startOfWeek(addWeeks(activeWeek, 1)));
    return Boolean(plans[nextWeek]);
  }, [plans, activeWeek]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-6">
      <HeaderHero
        energyGoal={currentPlan.energyGoal}
        focus={currentPlan.focus}
      />

      <WeekNavigator weekStart={activeWeek} onWeekChange={handleWeekChange} />

      <section className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <SummaryCards plan={currentPlan} />
        <motion.div
          className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs uppercase tracking-[0.25rem] text-white/40">
            Momentum
          </p>
          <p className="mt-3 text-sm text-white">
            {isCurrentWeek
              ? "Dial in your day-by-day flow. Keep hydration, mobility and sleep aligned to crush sessions."
              : nextWeekPlanExists
              ? "Week ready to roll. Review the lineup or tweak sessions before you lock it in."
              : "Plan this week to stay aligned with your training goals. Auto suggestions are ready to drop in."}
          </p>
          <div className="mt-4">
            <FocusPillList plan={currentPlan} />
          </div>
        </motion.div>
      </section>

      <WorkoutForm
        days={[...dayOrder]}
        onCreate={handleCreateWorkout}
        onAutoPlan={handleAutoPlan}
      />

      <section className="space-y-4 pb-16">
        {dayOrder.map((day) => (
          <DayScheduleCard
            key={day}
            plan={currentPlan.days[day]}
            onToggleComplete={(workoutId) =>
              handleToggleComplete(day, workoutId)
            }
            onRemove={(workoutId) => handleRemoveWorkout(day, workoutId)}
            onAdjustMobility={(minutes) => handleMobilityAdjust(day, minutes)}
          />
        ))}
      </section>

      <footer className="pb-10 text-center text-xs text-white/40">
        PulsePlan · Build better weeks.
      </footer>
    </main>
  );
}
