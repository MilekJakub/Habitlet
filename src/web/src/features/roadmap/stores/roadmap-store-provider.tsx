import {createRoadmapStore} from "@/features/roadmap/stores/createRoadmapStore";
import {RoadmapStoreApi, RoadmapStoreContext, RoadmapStoreProviderProps} from "@/features/roadmap/stores/roadmap.store";
import React, {useRef} from "react";

export const RoadmapStoreProvider = ({children, initialData}: RoadmapStoreProviderProps) => {
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
