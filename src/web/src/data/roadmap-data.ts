import { NODE_SIZE } from "@/constants/roadmap-constants";
import { NodeConfig, RoadmapNodeType } from "@/types/roadmap";
import { Position } from "@xyflow/react";

export const nodesConfig: Record<RoadmapNodeType, NodeConfig> = {
  "goal-node": {
    id: "goal-node",
    title: "Goal",
    status: "unlocked",
    handles: [
      {
        id: "target",
        type: "target",
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
    ],
    icon: "Trophy",
  },
  "step-node": {
    id: "step-node",
    title: "Step",
    handles: [
      {
        id: "source",
        type: "source",
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
      {
        id: "target",
        type: "target",
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
    ],
    icon: "Footprints",
  },
  "milestone-node": {
    id: "milestone-node",
    title: "Milestone",
    handles: [
      {
        id: "source",
        type: "source",
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
      {
        id: "target",
        type: "target",
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
    ],
    icon: "Flag",
  },
  "start-node": {
    id: "start-node",
    title: "Start",
    handles: [
      {
        id: "source",
        type: "source",
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: "Play",
  },
};
