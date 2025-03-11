import { RoadmapState } from "@/store/roadmap.store";

export const defaultState: RoadmapState = {
  nodes: [],
  edges: [],
  colorMode: "light",
  layout: "free",
  draggedNodes: new Map(),
  connectionSites: new Map(),
  potentialConnection: undefined,
};
