export interface ExerciseSet {
  setNumber: number;
  weight: number; // in kg, 0 if bodyweight
  reps: number; // or minutes for cardio
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: '하체' | '가슴' | '등' | '어깨' | '팔' | '코어' | '유산소' | '전신';
  sets: ExerciseSet[];
  notes?: string;
  targetDetail?: string; // e.g., "중등승모근", "내전근"
  postureImage?: string; // path or key to posture guide illustration
}

export interface PTSession {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  focus: string[]; // e.g., ["하체", "코어"]
  duration: number; // in minutes
  trainerFeedback: string;
  userNotes: string;
  exercises: Exercise[];
  completed: boolean;
  score?: number; // 1-5 rating of the session
  homework?: string; // homework text
  homeworkCompleted?: boolean; // tracking if homework was completed
}

export interface MonthlySummary {
  month: string; // e.g., "2025-12", "2026-01"
  count: number;
  completedCount: number;
}
