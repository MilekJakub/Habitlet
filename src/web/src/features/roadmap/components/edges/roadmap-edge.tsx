import React from 'react';
import { BaseEdge, Edge, EdgeProps, getSmoothStepPath } from '@xyflow/react';
import { EdgeButton } from './edge-button';

export type RoadmapEdge = Edge<{}, 'roadmap'>;

export const createEdge = (
  source: string,
  target: string,
  sourceHandleId?: string | null,
  targetHandleId?: string | null
): RoadmapEdge => ({
  id: `${source}-${sourceHandleId}-${target}-${targetHandleId}`,
  source,
  target,
  sourceHandle: sourceHandleId,
  targetHandle: targetHandleId,
  type: 'roadmap',
  animated: true,
});

export const RoadmapEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  source,
  sourceHandleId,
  target,
  style = {},
  markerEnd,
}: EdgeProps<RoadmapEdge>) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{ ...style, pointerEvents: 'auto' }}
      />
      <EdgeButton
        id={id}
        x={labelX}
        y={labelY}
        source={source}
        target={target}
        sourceHandleId={sourceHandleId}
        style={{ ...style }}
      />
    </>
  );
}
