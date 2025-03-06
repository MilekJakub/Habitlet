'use client';

import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import {
  Position,
  useConnection,
  useInternalNode,
  useNodeConnections,
  useNodeId,
  XYPosition,
} from '@xyflow/react';

import { type AppStore } from '@/store/roadmap.store';

import { type RoadmapNodeType, NodeConfig } from '@/types/roadmap';
import { Button } from '@/components/ui/button';
import { ButtonHandle } from '@/features/roadmap/components/button-handle';
import { RoadmapDropdownMenu } from '@/features/roadmap/components/roadmap-dropdown-menu';

import { useDropdown } from '@/hooks/use-dropdown';
import { useAppStore } from '@/store/roadmap.store';

const compatibleNodeTypes = (type: 'source' | 'target') => {
  if (type === 'source') {
    return (node: NodeConfig) => {
      return (
        node.id === 'goal-node' ||
        node.id === 'milestone-node' ||
        node.id === 'step-node' ||
        node.id === 'start-node'
      );
    };
  }
  return (node: NodeConfig) => {
    return (
      node.id === 'goal-node' ||
      node.id === 'milestone-node' ||
      node.id === 'step-node' ||
      node.id === 'start-node'
    );
  };
};

const selector =
  (nodeId: string, type: string, id?: string | null) => (state: AppStore) => ({
    addNodeInBetween: state.addNodeInBetween,
    draggedNodes: state.draggedNodes,
    connectionSites: state.connectionSites,
    isPotentialConnection:
      state.potentialConnection?.id === `handle-${nodeId}-${type}-${id}`,
  });

// TODO: we need to streamline how we calculate the yOffset
const yOffset = (type: 'source' | 'target') => (type === 'source' ? 50 : -65);

function getIndicatorPostion(
  nodePosition: XYPosition,
  x: number,
  y: number,
  type: 'source' | 'target'
) {
  return {
    x: nodePosition.x + x,
    y: nodePosition.y + y + yOffset(type),
  };
}

const fallbackPosition = { x: 0, y: 0 };

export const AppHandle = ({
  className,
  position: handlePosition,
  type,
  id,
  x,
  y,
}: {
  className?: string;
  id?: string | null;
  type: 'source' | 'target';
  position: Position;
  x: number;
  y: number;
}) => {
  const nodeId = useNodeId() ?? '';

  const connections = useNodeConnections({
    handleType: type,
    handleId: id ?? undefined,
  });

  const isConnectionInProgress = useConnection((c) => c.inProgress);

  const { isOpen, toggleDropdown } = useDropdown();
  const {
    draggedNodes,
    addNodeInBetween,
    connectionSites,
    isPotentialConnection,
  } = useAppStore(useShallow(selector(nodeId, type, id)));

  // We get the actual position of the node
  const nodePosition =
    useInternalNode(nodeId)?.internals.positionAbsolute ?? fallbackPosition;

  const onClick = () => {
    toggleDropdown();
  };

  const onAddNode = useCallback(
    (nodeType: RoadmapNodeType) => {
      if (!nodeId) {
        return;
      }

      addNodeInBetween({
        type: nodeType,
        [type]: nodeId,
        [`${type}HandleId`]: id,
        position: getIndicatorPostion(nodePosition, x, y, type),
      });

      toggleDropdown();
    },
    [nodeId, id, type, nodePosition, x, y, toggleDropdown, addNodeInBetween]
  );

  const displayAddButton =
    connections.length === 0 &&
    !isConnectionInProgress &&
    !draggedNodes.has(nodeId);

  const connectionId = `handle-${nodeId}-${type}-${id}`;
  useEffect(() => {
    if (displayAddButton) {
      connectionSites.set(connectionId, {
        position: getIndicatorPostion(nodePosition, x, y, type),
        [type]: {
          node: nodeId,
          handle: id,
        },
        type,
        id: connectionId,
      });
    }
    return () => {
      connectionSites.delete(connectionId);
    };
  }, [
    nodePosition,
    connectionSites,
    connectionId,
    id,
    nodeId,
    type,
    x,
    y,
    displayAddButton,
  ]);
  return (
    <ButtonHandle
      type={type}
      position={handlePosition}
      id={id}
      className={clsx('left-[-6px] top-[-6px]', className)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      showButton={displayAddButton}
    >
      <Button
        onClick={onClick}
        size="icon"
        variant="primary"
        className="h-6 w-6"
      >
        +
      </Button>
      {isOpen && (
        <div className="absolute z-50 mt-2 left-1/2 transform -translate-x-1/2">
          <RoadmapDropdownMenu
            onAddNode={onAddNode}
            filterNodes={compatibleNodeTypes(type)}
          />
        </div>
      )}
    </ButtonHandle>
  );
}
