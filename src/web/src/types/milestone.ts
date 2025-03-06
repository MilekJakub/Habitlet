import { Entity } from "@/types/entity";

export type MilestoneStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Milestone extends Entity {
  title: string;
  description?: string;
  goal_id: string;
  target_date?: string;
  reached_date?: string;
  status: MilestoneStatus;
  criteria: string;
  reward?: string;
}
