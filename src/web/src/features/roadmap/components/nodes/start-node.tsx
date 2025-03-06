import React from 'react';
import { RoadmapNodeProps } from '@/types/roadmap';
import RoadmapNode from '@/features/roadmap/components/nodes/roadmap-node';
import { AppHandle } from '@/features/roadmap/components/app-handle';
import { nodesConfig } from '@/data/roadmap-data';

export const StartNode = ({ id, data }: RoadmapNodeProps) => {
  return (
    <RoadmapNode id={id} data={data}>
      {nodesConfig['start-node'].handles.map((handle) => (
        <AppHandle
          key={`${handle.type}-${handle.id}`}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          x={handle.x}
          y={handle.y}
        />
      ))}
      {/* Start-specific content can be added here */}
    </RoadmapNode>
  );
} 