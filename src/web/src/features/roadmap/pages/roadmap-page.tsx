import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { MainLayout } from '@/layout/main-layout';
import { RoadmapCanvas } from '@/features/roadmap/components/roadmap-canvas';
import { AppStoreProvider } from '@/store/roadmap.store';

export const RoadmapPage = () => {
  return (
    <MainLayout>
      <ReactFlowProvider>
        <AppStoreProvider>
          <RoadmapCanvas />
        </AppStoreProvider>
      </ReactFlowProvider>
    </MainLayout>
  );
}