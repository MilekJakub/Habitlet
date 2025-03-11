import { Entity } from "@/types/entity";

export type MilestoneStatus =
  | "locked"
  | "unlocked"
  | "in_progress"
  | "completed";

export interface MilestoneEntity extends Entity {
  id: string;
  title: string;
  description?: string;
  goal_id: string;
  completed_date?: string;
  status: MilestoneStatus;
  created_at: string;
  updated_at: string;
}
