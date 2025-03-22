import { createEdge } from "@/features/roadmap/components/edges/roadmap-edge";
import { layoutGraph } from "@/features/roadmap/stores/layout";
import {
  PotentialConnection,
  RoadmapData, RoadmapState,
  RoadmapStore,
} from "@/features/roadmap/stores/roadmap.store";
import { RoadmapEdge, RoadmapNode } from "@/features/roadmap/types/roadmap";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { create } from "zustand/index";
import { subscribeWithSelector } from "zustand/middleware";

export const defaultState: RoadmapState = {
  nodes: [],
  edges: [],
  colorMode: "light",
  layout: "free",
  draggedNodes: new Map(),
  connectionSites: new Map(),
  potentialConnection: undefined,
};

export const createRoadmapStore = (initialData?: RoadmapData) => {
  return create<RoadmapStore>()(
    subscribeWithSelector((set, get) => ({
      ...defaultState,

      onInit: () => {
        if (!initialData || !initialData.goal) return;

        const nodes: RoadmapNode[] = [];
        const edges: RoadmapEdge[] = [];

        nodes.push({
          id: initialData.goal.id,
          type: "goal-node",
          data: initialData.goal,
          position: { x: 0, y: 0 },
        });

        initialData.milestones.forEach((milestone) => {
          nodes.push({
            id: milestone.id,
            type: "milestone-node",
            data: milestone,
            position: { x: 0, y: 0 },
          });
        });

        initialData.steps.forEach((step) => {
          nodes.push({
            id: step.id,
            type: "step-node",
            data: step,
            position: { x: 0, y: 0 },
          });
        });

        initialData.dependencies.forEach((dependency) => {
          edges.push(dependency);
        });

        set({ nodes, edges });
      },

      onNodesChange: async (changes) => {
        const nextNodes = applyNodeChanges(changes, get().nodes);
        set({ nodes: nextNodes });

        if (
          get().layout === "fixed" &&
          changes.some((change) => change.type === "dimensions")
        ) {
          const layoutedNodes = await layoutGraph(nextNodes, get().edges);
          set({ nodes: layoutedNodes });
        } else {
          set({ nodes: nextNodes });
        }
      },

      setNodes: (nodes) => set({ nodes }),

      addNode: (node) => {
        const nextNodes = [...get().nodes, node];
        set({ nodes: nextNodes });
      },

      removeNode: (nodeId) =>
        set({ nodes: get().nodes.filter((node) => node.id !== nodeId) }),

      getNodes: () => get().nodes,

      addNodeInBetween: ({
        newNode,
        source,
        target,
        sourceHandleId,
        targetHandleId,
      }: {
        newNode: RoadmapNode;
        source?: string;
        target?: string;
        sourceHandleId?: string | null;
        targetHandleId?: string | null;
      }) => {
        get().addNode(newNode);

        const currentEdges = get().edges;

        const newEdgeSet = [];

        for (const edge of currentEdges) {
          if (edge.source === source && edge.target === target) {
            // This is the edge we want to replace - don't add it to the new set
            continue;
          }

          newEdgeSet.push(edge);
        }

        const nodeHandles = newNode.handles;

        if (!nodeHandles) throw new Error("Node handles not found");

        const nodeSource = nodeHandles.find(
          (handle) => handle.type === "source"
        );

        const nodeTarget = nodeHandles.find(
          (handle) => handle.type === "target"
        );

        if (nodeTarget && source) {
          const sourceToNewEdge = createEdge(
            source,
            newNode.id,
            sourceHandleId,
            nodeTarget.id
          );
          newEdgeSet.push(sourceToNewEdge);
        }

        if (nodeSource && target) {
          const newToTargetEdge = createEdge(
            newNode.id,
            target,
            nodeSource.id,
            targetHandleId
          );

          newEdgeSet.push(newToTargetEdge);
        }

        set({ edges: newEdgeSet });
      },

      setEdges: (edges) => set({ edges }),

      getEdges: () => get().edges,

      addEdge: (edge) => {
        const nextEdges = addEdge(edge, get().edges);
        set({ edges: nextEdges });
      },

      removeEdge: (edgeId) => {
        set({ edges: get().edges.filter((edge) => edge.id !== edgeId) });
      },

      onEdgesChange: (changes) => {
        const nextEdges = applyEdgeChanges(changes, get().edges);
        set({ edges: nextEdges });
      },

      onConnect: (connection) => {
        const newEdge: RoadmapEdge = {
          ...connection,
          type: "roadmap",
          id: `${connection.source}-${connection.target}`,
          animated: true,
        };

        get().addEdge(newEdge);
      },

      toggleDarkMode: () =>
        set((state) => ({
          colorMode: state.colorMode === "dark" ? "light" : "dark",
        })),

      toggleLayout: () =>
        set((state) => ({
          layout: state.layout === "fixed" ? "free" : "fixed",
        })),

      checkForPotentialConnection: (position, options) => {
        const closest: {
          distance: number;
          potentialConnection?: PotentialConnection;
        } = {
          distance: Infinity,
          potentialConnection: undefined,
        };

        for (const connectionSite of get().connectionSites.values()) {
          if (options?.exclude?.includes(connectionSite.id)) {
            continue;
          }

          if (
            options?.type &&
            options.type &&
            options.type === connectionSite.type
          ) {
            continue;
          }

          const distance = Math.hypot(
            connectionSite.position.x - position.x,
            connectionSite.position.y - position.y
          );

          if (distance < closest.distance) {
            closest.distance = distance;
            closest.potentialConnection = connectionSite;
          }
        }

        set({
          potentialConnection:
            closest.distance < 150 ? closest.potentialConnection : undefined,
        });
      },

      resetPotentialConnection: () => {
        set({ potentialConnection: undefined });
      },

      onNodeDragStart: (_, __, nodes) => {
        set({ draggedNodes: new Map(nodes.map((node) => [node.id, node])) });
      },
      onNodeDragStop: () => {
        set({ draggedNodes: new Map() });
        set({ potentialConnection: undefined });
      },
    }))
  );
};
