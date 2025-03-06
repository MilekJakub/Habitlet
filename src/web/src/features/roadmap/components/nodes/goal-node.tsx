import React from 'react';
import { RoadmapNodeProps } from '@/types/roadmap';
import RoadmapNode from '@/features/roadmap/components/nodes/roadmap-node';
import { AppHandle } from '@/features/roadmap/components/app-handle';
import { Position } from 'reactflow';

export const GoalNode = ({ id, data }: RoadmapNodeProps) => {
  return (
    <RoadmapNode id={id} data={{...data, label: data.label || 'Goal'}}>
      {/* Only include a target handle since this is an endpoint */}
      <AppHandle
        key="target"
        id="target" // explicit ID - this is critical
        type="target"
        position={Position.Top}
        x={100} // adjust based on node width
        y={0}
      />
    </RoadmapNode>
  );
} 