import { useRoadmapStore } from "@/features/roadmap/stores/useRoadmapStore";
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";
import { layoutGraph } from "@/features/roadmap/stores/layout";
import { RoadmapStore } from "@/features/roadmap/stores/roadmap.store";

const selector = (state: RoadmapStore) => ({
  getNodes: state.getNodes,
  setNodes: state.setNodes,
  getEdges: state.getEdges,
  setEdges: state.setEdges,
});

export const useLayout = (
  shouldFitView: boolean = false
): (() => Promise<void>) => {
  const { fitView } = useReactFlow();
  const { getNodes, getEdges, setNodes, setEdges } = useRoadmapStore(
    useShallow(selector)
  );

  return useCallback(async () => {
    const nodes = getNodes();
    const edges = getEdges();

    const layoutedNodes = await layoutGraph(nodes, edges);

    const updatedEdges = edges.map((edge) => ({
      ...edge,
      style: { ...edge.style, opacity: 1 },
    }));

    setNodes(layoutedNodes);
    setEdges(updatedEdges);

    if (shouldFitView) {
      setTimeout(() => fitView({ padding: 0.4 }), 2);
    }
  }, [fitView, getEdges, getNodes, setEdges, setNodes, shouldFitView]);
};
