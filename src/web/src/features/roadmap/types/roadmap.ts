import { Node, Edge, EdgeProps } from "@xyflow/react";
import { iconMapping } from "@/data/icon-mapping";
import { StepNodeComponent } from "@/features/roadmap/components/nodes/step-node";
import { MilestoneNodeComponent } from "@/features/roadmap/components/nodes/milestone-node";
import { GoalNode } from "@/features/roadmap/components/nodes/goal-node";
import { StartNodeComponent } from "@/features/roadmap/components/nodes/start-node";

export const nodeTypes = {
  "step-node": StepNodeComponent,
  "milestone-node": MilestoneNodeComponent,
  "goal-node": GoalNode,
  "start-node": StartNodeComponent,
};

export type RoadmapNode =
  | Node<RoadmapNodeData, "step-node">
  | Node<RoadmapNodeData, "milestone-node">
  | Node<RoadmapNodeData, "goal-node">
  | Node<RoadmapNodeData, "start-node">;

export type RoadmapEdge = Edge<EdgeProps, "roadmap">;

export type RoadmapNodeData = {
  id: string;
  type: keyof typeof nodeTypes;
  title: string;
  label: string;
  icon: keyof typeof iconMapping;
  status: "locked" | "unlocked" | "in_progress" | "completed" | "skipped";
};

export type NodeConfig = {
  id: RoadmapNodeType;
  title: string;
  status?: "locked" | "unlocked" | "in_progress" | "completed" | "skipped";
  handles: NonNullable<Node["handles"]>;
  icon: keyof typeof iconMapping;
};

export type RoadmapNodeType = NonNullable<RoadmapNode["type"]>;
