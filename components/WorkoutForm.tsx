"use client";

import { useState } from "react";
import { IntensityLevel, Workout } from "@/types/planner";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const defaultForm = {
  name: "",
  focus: "",
  intensity: "Moderate" as IntensityLevel,
  duration: 45,
  notes: "",
  day: "Monday"
};

interface WorkoutFormProps {
  days: string[];
  onCreate: (day: string, workout: Workout) => void;
  onAutoPlan: (day: string) => void;
}

export function WorkoutForm({
  days,
  onCreate,
  onAutoPlan
}: WorkoutFormProps) {
  const [form, setForm] = useState(defaultForm);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    const workout: Workout = {
      id: `w-${Date.now()}`,
      name: form.name,
      focus: form.focus || "General",
      intensity: form.intensity,
      duration: form.duration,
      notes: form.notes,
      completed: false
    };
    onCreate(form.day, workout);
    setForm(defaultForm);
    setExpanded(false);
  };

  return (
    <motion.div
      className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25rem] text-primary">
            Build Session
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Add a workout
          </h2>
        </div>
        <button
          onClick={() => setExpanded((val) => !val)}
          className="rounded-full bg-primary/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary/40"
        >
          {expanded ? "Close" : "Open"}
        </button>
      </div>

      {expanded ? (
        <form className="mt-5 space-y-4 text-sm" onSubmit={handleSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-subtle">
                Workout name
              </span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-dark/60 px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                placeholder="e.g. Push Strength Circuit"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-subtle">
                Focus area
              </span>
              <input
                type="text"
                value={form.focus}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, focus: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-dark/60 px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                placeholder="e.g. Upper Body Power"
              />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-subtle">
                Day
              </span>
              <select
                value={form.day}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, day: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-dark/60 px-4 py-3 text-white focus:border-primary focus:outline-none"
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-wide text-subtle">
                Intensity
              </span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["Light", "Moderate", "Intense"] satisfies IntensityLevel[]).map(
                  (level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, intensity: level }))
                      }
                      className={clsx(
                        "rounded-2xl border border-white/10 px-2 py-2 text-xs font-semibold uppercase tracking-wide transition",
                        form.intensity === level
                          ? "border-primary bg-primary/20 text-white"
                          : "bg-dark/40 text-white/60 hover:bg-dark/60"
                      )}
                    >
                      {level}
                    </button>
                  )
                )}
              </div>
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-wide text-subtle">
                Duration (min)
              </span>
              <input
                type="number"
                min={10}
                max={120}
                step={5}
                value={form.duration}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    duration: Number(event.target.value)
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-dark/60 px-4 py-3 text-white focus:border-primary focus:outline-none"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-subtle">
              Notes
            </span>
            <textarea
              value={form.notes}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
              rows={3}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-dark/60 px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
              placeholder="Break down sets, rep ranges, pacing cues…"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => onAutoPlan(form.day)}
              className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:bg-white/20"
            >
              Auto plan suggestion
            </button>
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-dark shadow-lg shadow-primary/40 transition hover:bg-primary/90"
            >
              Add Workout
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-4 text-sm text-white/65">
          Quickly craft fresh sessions, drop in fast auto plans, and keep your
          week dialed-in.
        </p>
      )}
    </motion.div>
  );
}
