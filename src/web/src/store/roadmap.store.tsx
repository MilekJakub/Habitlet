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
import { createNodeByType, nodesConfig, initialNodes, initialEdges } from '@/data/roadmap-data';
import { layoutGraph } from './layout';
import React, { createContext, useContext, useRef, ReactNode } from 'react';

export type AppState = {
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

export type AppActions = {
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

export type AppStore = AppState & AppActions;

export const defaultState: AppState = {
  nodes: [],
  edges: [],
  colorMode: 'light',
  layout: 'free',
  draggedNodes: new Map(),
  connectionSites: new Map(),
  potentialConnection: undefined,
};

export const createAppStore = (initialState: AppState = defaultState) => {
  const store = create<AppStore>()(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      onInit: () => {
        set({
          nodes: initialNodes.map((node: RoadmapNode) => ({ ...node, style: { opacity: 0 } })),
          edges: initialEdges.map((edge: RoadmapEdge) => ({ ...edge, style: { opacity: 0 } })),
        });
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
        const newNodeId = get().addNodeByType(type, position);
        if (!newNodeId) return;

        get().removeEdge(
          `${source}-${sourceHandleId}-${target}-${targetHandleId}`
        );

        const nodeHandles = nodesConfig[type].handles;
        const nodeSource = nodeHandles.find(
          (handle) => handle.type === 'source'
        );
        const nodeTarget = nodeHandles.find(
          (handle) => handle.type === 'target'
        );

        const edges = [];
        if (nodeTarget && source) {
          edges.push(
            createEdge(source, newNodeId, sourceHandleId, nodeTarget.id)
          );
        }

        if (nodeSource && target) {
          edges.push(
            createEdge(newNodeId, target, nodeSource.id, targetHandleId)
          );
        }

        const nextEdges = [...get().edges, ...edges];
        set({ edges: nextEdges });
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

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(
  undefined
);

export interface AppStoreProviderProps {
  children: ReactNode;
  initialState?: AppState;
}

export const AppStoreProvider = ({
  children,
  initialState,
}: AppStoreProviderProps) => {
  const storeRef = useRef<AppStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAppStore(initialState);
    // Initialize the store with data after creation
    storeRef.current.getState().onInit();
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useAppStore must be used within AppStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
