import { Entity } from "@/types/entity";

export type GoalStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "cancelled";

export type GoalPriority = "low" | "medium" | "high";

export interface Goal extends Entity {
  title: string;
  description?: string;
  category: string;
  target_date?: string;
  progress: number;
  status: GoalStatus;
  priority: GoalPriority;
  user_id: string;
  is_archived: boolean;
  tags?: string[];
}
