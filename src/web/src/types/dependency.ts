import { Entity } from "@/types/entity";

export type DependencyType = "goal" | "step";
export type DependencyStrength = "strong" | "medium" | "weak";

export interface Dependency extends Entity {
  source_id: string;
  source_type: DependencyType;
  target_id: string;
  target_type: DependencyType;
  dependency_type: string;
  description?: string;
  strength: DependencyStrength;
}
