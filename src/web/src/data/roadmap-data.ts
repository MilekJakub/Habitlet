import { NODE_SIZE } from '@/constants/roadmap-constants';
import { RoadmapEdge, createEdge } from '@/features/roadmap/components/edges/roadmap-edge';
import { NodeConfig, RoadmapNode, RoadmapNodeData, RoadmapNodeType } from '@/types/roadmap';
import { Position, XYPosition } from '@xyflow/react';
import { nanoid } from 'nanoid';

export const nodesConfig: Record<RoadmapNodeType, NodeConfig> = {
  'initial-node': {
    id: 'initial-node',
    title: 'Initial Node',
    status: 'initial',
    handles: [
      {
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'Rocket',
  },
  'transform-node': {
    id: 'transform-node',
    title: 'Transform Node',
    handles: [
      {
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
      {
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
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
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
  createNodeByType({ type: 'initial-node', id: 'roadmapNode_1' }),
  createNodeByType({ type: 'branch-node', id: 'roadmapNode_2' }),
  createNodeByType({ type: 'transform-node', id: 'roadmapNode_3' }),
  createNodeByType({ type: 'output-node', id: 'roadmapNode_4' }),
  createNodeByType({ type: 'output-node', id: 'roadmapNode_5' })
];

export const initialEdges: RoadmapEdge[] = [
  createEdge('roadmapNode_1', 'roadmapNode_2'),
  createEdge('roadmapNode_2', 'roadmapNode_3', 'true'),
  createEdge('roadmapNode_3', 'roadmapNode_4'),
  createEdge('roadmapNode_2', 'roadmapNode_5', 'false')
];
