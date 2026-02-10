export type IntensityLevel = "Light" | "Moderate" | "Intense";

export interface Workout {
  id: string;
  name: string;
  focus: string;
  intensity: IntensityLevel;
  duration: number; // minutes
  notes?: string;
  completed: boolean;
}

export interface DayPlan {
  day: string;
  workouts: Workout[];
  mobilityMinutes: number;
}

export interface WeeklyPlan {
  id: string;
  weekStart: string; // ISO date
  focus: string;
  hydrationTarget: number;
  energyGoal: string;
  days: Record<string, DayPlan>;
}
