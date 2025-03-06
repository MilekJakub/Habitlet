import { NODE_SIZE } from '@/constants/roadmap-constants';
import { RoadmapEdge, createEdge } from '@/features/roadmap/components/edges/roadmap-edge';
import { NodeConfig, RoadmapNode, RoadmapNodeData, RoadmapNodeType } from '@/types/roadmap';
import { Position, XYPosition } from '@xyflow/react';
import { nanoid } from 'nanoid';

export const nodesConfig: Record<RoadmapNodeType, NodeConfig> = {
  'goal-node': {
    id: 'goal-node',
    title: 'Goal',
    status: 'initial',
    handles: [
      {
        id: 'target',
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
    ],
    icon: 'Trophy',
  },
  'step-node': {
    id: 'step-node',
    title: 'Step',
    handles: [
      {
        id: 'source',
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
      {
        id: 'target',
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
    ],
    icon: 'Footprints',
  },
  'milestone-node': {
    id: 'milestone-node',
    title: 'Milestone',
    handles: [
      {
        id: 'source',
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
      {
        id: 'target',
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
    ],
    icon: 'Flag',
  },
  'start-node': {
    id: 'start-node',
    title: 'Start',
    handles: [
      {
        id: 'source',
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'Play',
  },
};

export const createNodeByType = ({
  type,
  id,
  position = { x: 0, y: 0 },
  data,
}: {
  type: RoadmapNodeType;
  id?: string;
  position?: XYPosition;
  data?: RoadmapNodeData;
}): RoadmapNode => {
  const node = nodesConfig[type];

  const newNode: RoadmapNode = {
    id: id ?? nanoid(),
    data: data ?? {
      title: node.title,
      status: node.status,
      icon: node.icon,
    },
    position: {
      x: position.x - NODE_SIZE.width * 0.5,
      y: position.y - NODE_SIZE.height * 0.5,
    },
    type,
  };

  return newNode;
}

export const initialNodes: RoadmapNode[] = [
  createNodeByType({ type: 'start-node', id: 'roadmapNode_1' }),
  createNodeByType({ type: 'step-node', id: 'roadmapNode_2' }),
  createNodeByType({ type: 'milestone-node', id: 'roadmapNode_3' }),
  createNodeByType({ type: 'goal-node', id: 'roadmapNode_4' })
];

export const initialEdges: RoadmapEdge[] = [
  createEdge(
    'roadmapNode_1',
    'roadmapNode_2',
    'source',
    'target'
  ),
  createEdge(
    'roadmapNode_2',
    'roadmapNode_3',
    'source',
    'target'
  ),
  createEdge(
    'roadmapNode_3',
    'roadmapNode_4',
    'source',
    'target'
  )
];
