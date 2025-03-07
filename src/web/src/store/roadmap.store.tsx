import { create, useStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ColorMode,
  OnConnect,
  OnEdgesChange,
  OnNodeDrag,
  OnNodesChange,
  XYPosition,
} from '@xyflow/react';

import {
  RoadmapNode,
  RoadmapNodeType
} from '@/types/roadmap';
import { RoadmapEdge, createEdge } from '@/features/roadmap/components/edges/roadmap-edge';
import { createNodeByType, nodesConfig } from '@/data/roadmap-data';
import { layoutGraph } from './layout';
import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { RoadmapNodeData } from '@/types/roadmap';

export type RoadmapState = {
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  colorMode: ColorMode;
  layout: 'fixed' | 'free';
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
  type?: 'source' | 'target';
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
  addNodeByType: (type: RoadmapNodeType, position: XYPosition) => null | string;
  addNodeInBetween: ({
    type,
    source,
    target,
    sourceHandleId,
    targetHandleId,
    position,
  }: {
    type: RoadmapNodeType;
    source?: string;
    target?: string;
    sourceHandleId?: string | null;
    targetHandleId?: string | null;
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
    options?: { exclude?: string[]; type?: 'source' | 'target' }
  ) => void;
  resetPotentialConnection: () => void;
  onInit: () => void;
};

export type RoadmapStore = RoadmapState & RoadmapActions;

export const defaultState: RoadmapState = {
  nodes: [],
  edges: [],
  colorMode: 'light',
  layout: 'free',
  draggedNodes: new Map(),
  connectionSites: new Map(),
  potentialConnection: undefined,
};

// Add an interface for the initial data
export interface RoadmapData {
  goal: RoadmapNodeData;
  milestones: RoadmapNodeData[];
  steps: RoadmapNodeData[];
  dependencies: RoadmapEdge[];
}

export const createRoadmapStore = (initialData?: RoadmapData) => {
  const store = create<RoadmapStore>()(
    subscribeWithSelector((set, get) => ({
      ...defaultState,

      onInit: () => {
        if (!initialData || !initialData.goal) return;
        
        const nodes: RoadmapNode[] = [];
        const edges: RoadmapEdge[] = [];

        nodes.push({ 
          id: initialData.goal.id,
          type: 'goal-node',
          data: initialData.goal,
          position: { x: 0, y: 0 },
        });

        initialData.milestones.forEach((milestone) => {
          nodes.push({ 
            id: milestone.id,
            type: 'milestone-node',
            data: milestone,
            position: { x: 0, y: 0 },
          });
        });

        initialData.steps.forEach((step) => {
          nodes.push({ 
            id: step.id,
            type: 'step-node',
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
          get().layout === 'fixed' &&
          changes.some((change) => change.type === 'dimensions')
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

      addNodeByType: (type, position) => {
        const newNode = createNodeByType({ type, position });

        if (!newNode) return null;

        get().addNode(newNode);

        return newNode.id;
      },

      getNodes: () => get().nodes,

      addNodeInBetween: ({
        source,
        target,
        type,
        sourceHandleId,
        targetHandleId,
        position,
      }) => {
        // Step 1: Create the new node
        const newNodeId = get().addNodeByType(type, position);
        if (!newNodeId) return;
        
        // Step 2: Get all current edges
        const currentEdges = get().edges;
        
        // Step 3: Create a clean slate for the new edge set
        let newEdgeSet = [];
        
        // Step 4: Carefully copy only edges that are NOT the one we're replacing
        for (const edge of currentEdges) {
          // Skip the edge we want to replace
          if (edge.source === source && 
              edge.target === target) {
            // This is the edge we want to replace - don't add it to the new set
            console.log('Skipping edge:', edge);
            continue;
          }
          
          // Keep all other edges
          newEdgeSet.push(edge);
        }
        
        // Step 5: Find the handles for the new node
        const nodeHandles = nodesConfig[type].handles;
        const nodeSource = nodeHandles.find(handle => handle.type === 'source');
        const nodeTarget = nodeHandles.find(handle => handle.type === 'target');
        
        // Step 6: Create the two new edges
        if (nodeTarget && source) {
          // Source → New Node
          const sourceToNewEdge = createEdge(
            source, 
            newNodeId, 
            sourceHandleId, 
            nodeTarget.id
          );
          newEdgeSet.push(sourceToNewEdge);
        }
        
        if (nodeSource && target) {
          // New Node → Target
          const newToTargetEdge = createEdge(
            newNodeId, 
            target, 
            nodeSource.id, 
            targetHandleId
          );
          newEdgeSet.push(newToTargetEdge);
        }
        
        // Step 7: Set the completely new edge set
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
          type: 'roadmap',
          id: `${connection.source}-${connection.target}`,
          animated: true,
        };

        get().addEdge(newEdge);
      },

      toggleDarkMode: () =>
        set((state) => ({
          colorMode: state.colorMode === 'dark' ? 'light' : 'dark',
        })),

      toggleLayout: () =>
        set((state) => ({
          layout: state.layout === 'fixed' ? 'free' : 'fixed',
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

  return store;
};

export type RoadmapStoreApi = ReturnType<typeof createRoadmapStore>;

export const RoadmapStoreContext = createContext<RoadmapStoreApi | undefined>(
  undefined
);

export interface RoadmapStoreProviderProps {
  children: ReactNode;
  initialData?: RoadmapData;
}

export const RoadmapStoreProvider = ({
  children,
  initialData
}: RoadmapStoreProviderProps) => {
  const store = useRef<RoadmapStoreApi>();
  
  if (!store.current) {
    store.current = createRoadmapStore(initialData);
  }
  
  return (
    <RoadmapStoreContext.Provider value={store.current}>
      {children}
    </RoadmapStoreContext.Provider>
  );
};

export const useRoadmapStore = <T,>(selector: (store: RoadmapStore) => T): T => {
  const roadmapStoreContext = useContext(RoadmapStoreContext);

  if (!roadmapStoreContext) {
    throw new Error(`useRoadmapStore must be used within RoadmapStoreProvider`);
  }

  return useStore(roadmapStoreContext, selector);
};
