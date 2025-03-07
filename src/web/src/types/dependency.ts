import { Entity } from "@/types/entity";

export type DependencyType = "goal" | "milestone" | "step";

export interface DependencyEntity extends Entity {
  id: string;
  source_id: string;
  source_type: DependencyType;
  target_id: string;
  target_type: DependencyType;
  created_at: string;
  updated_at: string;
}
