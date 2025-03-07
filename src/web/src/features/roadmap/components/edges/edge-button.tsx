import React, { CSSProperties, useCallback, useEffect } from 'react';
import { EdgeLabelRenderer, EdgeProps } from '@xyflow/react';

import { Button } from '@/components/ui/button';
import { useDropdown } from '@/hooks/use-dropdown';
import { RoadmapDropdownMenu } from '@/features/roadmap/components/roadmap-dropdown-menu';
import { useRoadmapStore } from '@/store/roadmap.store';
import { RoadmapNodeType, NodeConfig } from '@/types/roadmap';
import { RoadmapEdge } from '@/features/roadmap/components/edges/roadmap-edge';
import { RoadmapStore } from '@/store/roadmap.store';
import { useShallow } from 'zustand/react/shallow';
import clsx from 'clsx';

const selector = (id: string) => {
  return (state: RoadmapStore) => ({
    addNodeInBetween: state.addNodeInBetween,
    connectionSites: state.connectionSites,
    isPotentialConnection: state.potentialConnection?.id === `edge-${id}`,
  });
};

const filterNodes = (node: NodeConfig) => {
  return (
    node.id === 'step-node' ||
    node.id === 'milestone-node'
  );
};

export const EdgeButton = ({
  x,
  y,
  id,
  source,
  target,
  sourceHandleId,
  targetHandleId,
  style,
}: Pick<
  EdgeProps<RoadmapEdge>,
  'source' | 'target' | 'sourceHandleId' | 'targetHandleId' | 'id'
> & {
  x: number;
  y: number;
  style: CSSProperties;
}) => {
  const { addNodeInBetween, connectionSites, isPotentialConnection } =
    useRoadmapStore(useShallow(selector(id)));
  const { isOpen, toggleDropdown, ref } = useDropdown();

  const onAddNode = useCallback(
    (type: RoadmapNodeType) => {
      addNodeInBetween({
        type,
        source,
        target,
        sourceHandleId: sourceHandleId ?? undefined,
        targetHandleId: targetHandleId ?? undefined,
        position: { x, y },
      });
    },
    [addNodeInBetween, source, sourceHandleId, targetHandleId, target, x, y]
  );

  const connectionId = `edge-${id}`;
  // We add the possible connection sites to the store
  useEffect(() => {
    connectionSites.set(connectionId, {
      position: { x, y },
      source: { node: source, handle: sourceHandleId },
      target: { node: target, handle: targetHandleId },
      id: connectionId,
    });
  }, [
    connectionSites,
    x,
    y,
    connectionId,
    source,
    sourceHandleId,
    target,
    targetHandleId,
  ]);

  // we only want to remove the connection site when the component is unmounted
  useEffect(() => {
    return () => {
      connectionSites.delete(connectionId);
    };
  }, [connectionSites, connectionId]);

  return (
    <EdgeLabelRenderer>
      <div
        className="nodrag nopan pointer-events-auto absolute"
        style={{
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          ...style,
        }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
          size="icon"
          variant="primary"
          className="h-6 w-6"
        >
          +
        </Button>
      </div>
      {isOpen && (
        <div
          ref={ref}
          className="absolute z-50"
          style={{
            top: `${y}px`,
            left: `${x}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <RoadmapDropdownMenu onAddNode={onAddNode} filterNodes={filterNodes} />
        </div>
      )}
    </EdgeLabelRenderer>
  );
}
