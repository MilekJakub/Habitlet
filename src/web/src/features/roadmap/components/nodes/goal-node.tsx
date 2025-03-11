import React from "react";
import {
  RoadmapNodeComponent,
  RoadmapNodeComponentProps,
} from "@/features/roadmap/components/nodes/roadmap-node";
import { RoadmapHandle } from "@/features/roadmap/components/roadmap-handle";
import { Position } from "@xyflow/react";
import { NODE_SIZE } from "@/constants/roadmap-constants";

export const GoalNode = ({ id, data }: RoadmapNodeComponentProps) => {
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
      <RoadmapHandle
        key="target"
        id="target"
        type="target"
        position={Position.Top}
        x={NODE_SIZE.width * 0.5}
        y={0}
      />
    </RoadmapNodeComponent>
  );
};
