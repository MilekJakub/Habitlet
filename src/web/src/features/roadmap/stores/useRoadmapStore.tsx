import {
  RoadmapStore,
  RoadmapStoreContext,
} from "@/features/roadmap/stores/roadmap.store";
import { useContext } from "react";
import { useStore } from "zustand/index";

export const useRoadmapStore = <T,>(
  selector: (store: RoadmapStore) => T
): T => {
  const roadmapStoreContext = useContext(RoadmapStoreContext);

  if (!roadmapStoreContext) {
    throw new Error(`useRoadmapStore must be used within RoadmapStoreProvider`);
  }

  return useStore(roadmapStoreContext, selector);
};
