import React from "react";
import { RoadmapNodeComponentProps } from "@/features/roadmap/components/nodes/roadmap-node";
import { RoadmapNodeComponent } from "@/features/roadmap/components/nodes/roadmap-node";
import { RoadmapHandle } from "@/features/roadmap/components/roadmap-handle";
import { nodesConfig } from "@/data/roadmap-data";

export const MilestoneNodeComponent = ({
  id,
  data,
}: RoadmapNodeComponentProps) => {
  return (
    <RoadmapNodeComponent
      id={id}
      data={data}
      type={data.type}
      dragging={false}
      zIndex={0}
      selectable={true}
      deletable={true}
      selected={false}
      draggable={true}
      isConnectable={true}
      positionAbsoluteX={0}
      positionAbsoluteY={0}
    >
      {nodesConfig["milestone-node"].handles.map((handle) => (
        <RoadmapHandle
          key={`${handle.type}-${handle.id}`}
          id={handle.id ? handle.id : undefined}
          type={handle.type}
          position={handle.position}
          x={handle.x}
          y={handle.y}
        />
      ))}
    </RoadmapNodeComponent>
  );
};
