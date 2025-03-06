import { Entity } from "@/types/entity";

export type StepStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "blocked";

export type StepDifficulty = "easy" | "medium" | "hard";

export interface Step extends Entity {
  title: string;
  description?: string;
  goal_id: string;
  status: StepStatus;
  due_date?: string;
  completed_date?: string;
  order: number;
  estimated_time?: number;
  actual_time?: number;
  difficulty: StepDifficulty;
  is_required: boolean;
  notes?: string;
  attachments?: string[];
}
