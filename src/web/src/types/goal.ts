import { Entity } from "@/types/entity";

export type GoalCategory =
  | "work"
  | "personal"
  | "health"
  | "finance"
  | "education"
  | "family"
  | "social"
  | "spiritual"
  | "home";

export type GoalStatus =
  | "locked"
  | "unlocked"
  | "in_progress"
  | "completed";

export type GoalPriority = "low" | "medium" | "high";

export interface GoalEntity extends Entity {
  id: string;
  title: string;
  description?: string;
  category: GoalCategory;
  target_date?: string;
  status: GoalStatus;
  priority: GoalPriority;
  user_id: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
  tags?: string[];
}