import { NODE_SIZE } from '@/constants/roadmap-constants';
import { RoadmapEdge, createEdge } from '@/features/roadmap/components/edges/roadmap-edge';
import { NodeConfig, RoadmapNode, RoadmapNodeData, RoadmapNodeType } from '@/types/roadmap';
import { Position, XYPosition } from '@xyflow/react';
import { nanoid } from 'nanoid';

export const nodesConfig: Record<RoadmapNodeType, NodeConfig> = {
  'initial-node': {
    id: 'initial-node',
    title: 'Goal Node',
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
  'transform-node': {
    id: 'transform-node',
    title: 'Transform Node',
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
    icon: 'Spline',
  },
  'join-node': {
    id: 'join-node',
    title: 'Join Node',
    status: 'initial',
    handles: [
      {
        id: 'true',
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width - 25,
        y: 0,
      },
      {
        id: 'false',
        type: 'target',
        position: Position.Top,
        x: 25,
        y: 0,
      },
      {
        id: 'source',
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'Split',
  },
  'branch-node': {
    id: 'branch-node',
    title: 'Branch Node',
    status: 'initial',
    handles: [
      {
        id: 'target',
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
      {
        id: 'true',
        type: 'source',
        position: Position.Bottom,
        x: 25,
        y: NODE_SIZE.height,
      },
      {
        id: 'false',
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width - 25,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'Merge',
  },
  'output-node': {
    id: 'output-node',
    title: 'Output Node',
    handles: [
      {
        id: 'source',
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'CheckCheck',
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
  createNodeByType({ type: 'transform-node', id: 'roadmapNode_1' }),
  createNodeByType({ type: 'branch-node', id: 'roadmapNode_2' }),
  createNodeByType({ type: 'transform-node', id: 'roadmapNode_3' }),
  createNodeByType({ type: 'initial-node', id: 'roadmapNode_4' }),
  createNodeByType({ type: 'initial-node', id: 'roadmapNode_5' })
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
    'true',
    'target'
  ),
  createEdge(
    'roadmapNode_3',
    'roadmapNode_4',
    'source',
    'target'
  ),
  createEdge(
    'roadmapNode_2',
    'roadmapNode_5',
    'false',
    'target'
  )
];
