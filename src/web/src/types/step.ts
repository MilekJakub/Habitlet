import { Entity } from "@/types/entity";

export type StepStatus =
  | "locked"
  | "unlocked"
  | "in_progress"
  | "completed"
  | "skipped";

export type StepDifficulty = "easy" | "medium" | "hard";
export type StepEstimation = "xs" | "s" | "m" | "l" | "xl" | "xxl";

export interface StepEntity extends Entity {
  id: string;
  title: string;
  description?: string;
  goal_id: string;
  status: StepStatus;
  completed_date?: string;
  estimation: StepEstimation;
  difficulty: StepDifficulty;
  is_required: boolean;
  created_at: string;
  updated_at: string;
}
