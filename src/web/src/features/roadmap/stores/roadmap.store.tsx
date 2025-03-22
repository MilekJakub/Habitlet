import { createRoadmapStore } from "@/features/roadmap/stores/createRoadmapStore";
import { RoadmapEdge, RoadmapNode, RoadmapNodeData } from "@/features/roadmap/types/roadmap";
import {
  ColorMode,
  OnConnect,
  OnEdgesChange,
  OnNodeDrag,
  OnNodesChange,
  XYPosition,
} from "@xyflow/react";
import { createContext, ReactNode } from "react";

export type RoadmapState = {
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  colorMode: ColorMode;
  layout: "fixed" | "free";
  draggedNodes: Map<string, RoadmapNode>;
  connectionSites: Map<string, PotentialConnection>;
  potentialConnection?: PotentialConnection;
};

/**
 * You can potentially connect to an already existing edge or to a free handle of a node.
 */
export type PotentialConnection = {
  id: string;
  position: XYPosition;
  type?: "source" | "target";
  source?: ConnectionHandle;
  target?: ConnectionHandle;
};
export type ConnectionHandle = {
  node: string;
  handle?: string | null;
};

export type RoadmapActions = {
  toggleDarkMode: () => void;
  toggleLayout: () => void;
  onNodesChange: OnNodesChange<RoadmapNode>;
  setNodes: (nodes: RoadmapNode[]) => void;
  addNode: (node: RoadmapNode) => void;
  removeNode: (nodeId: string) => void;

  addNodeInBetween: ({
    newNode,
    source,
    target,
    sourceHandleId,
    targetHandleId,
    position,
  }: {
    newNode: RoadmapNode;
    source?: string;
    target?: string;
    sourceHandleId?: string;
    targetHandleId?: string;
    position: XYPosition;
  }) => void;

  getNodes: () => RoadmapNode[];
  setEdges: (edges: RoadmapEdge[]) => void;
  getEdges: () => RoadmapEdge[];
  addEdge: (edge: RoadmapEdge) => void;
  removeEdge: (edgeId: string) => void;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange<RoadmapEdge>;
  onNodeDragStart: OnNodeDrag<RoadmapNode>;
  onNodeDragStop: OnNodeDrag<RoadmapNode>;
  checkForPotentialConnection: (
    position: XYPosition,
    options?: { exclude?: string[]; type?: "source" | "target" }
  ) => void;
  resetPotentialConnection: () => void;
  onInit: () => void;
};

export type RoadmapStore = RoadmapState & RoadmapActions;

export interface RoadmapData {
  goal: RoadmapNodeData;
  milestones: RoadmapNodeData[];
  steps: RoadmapNodeData[];
  dependencies: RoadmapEdge[];
}

export type RoadmapStoreApi = ReturnType<typeof createRoadmapStore>;

export interface RoadmapStoreProviderProps {
  children: ReactNode;
  initialData?: RoadmapData;
}

export const RoadmapStoreContext = createContext<RoadmapStoreApi | undefined>(
  undefined
);