import React from 'react';
import { RoadmapNodeProps } from '@/types/roadmap';
import RoadmapNode from '@/features/roadmap/components/nodes/roadmap-node';
import { RoadmapHandle } from '@/features/roadmap/components/roadmap-handle';
import { nodesConfig } from '@/data/roadmap-data';

export const StepNode = ({ id, data }: RoadmapNodeProps) => {
  return (
    <RoadmapNode id={id} data={data}>
      {nodesConfig['step-node'].handles.map((handle) => (
        <RoadmapHandle
          key={`${handle.type}-${handle.id}`}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          x={handle.x}
          y={handle.y}
        />
      ))}
      {/* Step-specific content can be added here */}
    </RoadmapNode>
  );
} 