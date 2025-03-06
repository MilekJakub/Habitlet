import { Node, NodeProps } from '@xyflow/react';
import { iconMapping } from '@/data/icon-mapping';
import { StepNode } from '@/features/roadmap/components/nodes/step-node';
import { MilestoneNode } from '@/features/roadmap/components/nodes/milestone-node';
import { GoalNode } from '@/features/roadmap/components/nodes/goal-node';
import { StartNode } from '@/features/roadmap/components/nodes/start-node';

export const nodeTypes = {
  'step-node': StepNode,
  'milestone-node': MilestoneNode,
  'goal-node': GoalNode,
  'start-node': StartNode,
};

export type RoadmapNodeData = {
  title?: string;
  label?: string;
  icon?: keyof typeof iconMapping;
  status?: 'loading' | 'success' | 'error' | 'initial';
};

export type RoadmapNodeProps = NodeProps<Node<RoadmapNodeData>> & {
  type: RoadmapNodeType;
  children?: React.ReactNode;
};
 
export type NodeConfig = {
  id: RoadmapNodeType;
  title: string;
  status?: 'loading' | 'success' | 'error' | 'initial';
  handles: NonNullable<Node['handles']>;
  icon: keyof typeof iconMapping;
};

export type RoadmapNode =
  | Node<RoadmapNodeData, 'step-node'>
  | Node<RoadmapNodeData, 'milestone-node'>
  | Node<RoadmapNodeData, 'goal-node'>
  | Node<RoadmapNodeData, 'start-node'>;

export type RoadmapNodeType = NonNullable<RoadmapNode['type']>;