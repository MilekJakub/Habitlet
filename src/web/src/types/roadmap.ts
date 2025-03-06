import { Node, NodeProps } from '@xyflow/react';
import { iconMapping } from '@/data/icon-mapping';
import { OutputNode } from '@/features/roadmap/components/nodes/output-node';
import { InitialNode } from '@/features/roadmap/components/nodes/initial-node';
import { TransformNode } from '@/features/roadmap/components/nodes/transform-node';
import { BranchNode } from '@/features/roadmap/components/nodes/branch-node';
import { JoinNode } from '@/features/roadmap/components/nodes/join-node';

export const nodeTypes = {
  'initial-node': InitialNode,
  'output-node': OutputNode,
  'transform-node': TransformNode,
  'branch-node': BranchNode,
  'join-node': JoinNode,
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
  | Node<RoadmapNodeData, 'initial-node'>
  | Node<RoadmapNodeData, 'transform-node'>
  | Node<RoadmapNodeData, 'join-node'>
  | Node<RoadmapNodeData, 'branch-node'>
  | Node<RoadmapNodeData, 'output-node'>;

export type RoadmapNodeType = NonNullable<RoadmapNode['type']>;