import React from 'react';
import { RoadmapNodeProps } from '@/types/roadmap';
import RoadmapNode from '@/features/roadmap/components/nodes/roadmap-node';
import { AppHandle } from '@/features/roadmap/components/app-handle';
import { Position } from '@xyflow/react';
import { NODE_SIZE } from '@/constants/roadmap-constants';

export const GoalNode = ({ id, data }: RoadmapNodeProps) => {
  return (
    <RoadmapNode id={id} data={{...data, label: data.label || 'Goal'}}>
      <AppHandle
        key="target"
        id="target"
        type="target"
        position={Position.Top}
        x={NODE_SIZE.width * 0.5}
        y={0}
      />
    </RoadmapNode>
  );
} 