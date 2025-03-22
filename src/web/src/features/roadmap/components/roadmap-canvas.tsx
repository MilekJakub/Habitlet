'use client';

import React, { useEffect } from 'react';
import { Background, ReactFlow, ConnectionLineType } from '@xyflow/react';
import { useShallow } from 'zustand/react/shallow';
import { nodeTypes } from '@/types/roadmap';
import { RoadmapEdge } from '@/features/roadmap/components/edges/roadmap-edge';
import { useRoadmapStore } from '@/store/roadmap.store';
import { useLayout } from '@/hooks/use-layout';
import { RoadmapControls } from '@/features/roadmap/components/roadmap-controls';

import '@xyflow/react/dist/style.css'

const edgeTypes = {
  default: RoadmapEdge
};

export const RoadmapCanvas = () => {
  const {
    nodes,
    edges,
    colorMode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStart,
    onNodeDragStop,
    init
  } = useRoadmapStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      colorMode: state.colorMode,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      onNodeDragStart: state.onNodeDragStart,
      onNodeDragStop: state.onNodeDragStop,
      init: state.onInit
    }))
  );
  const runLayout = useLayout(true);

  // Initialize the roadmap data
  useEffect(() => {
    init();
  }, [init]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={runLayout}
      onNodeDragStart={onNodeDragStart}
      onNodeDragStop={onNodeDragStop}
      colorMode={colorMode}
      defaultEdgeOptions={{ type: 'roadmap' }}
    >
      <Background />
      <RoadmapControls />
    </ReactFlow>
  );
}
