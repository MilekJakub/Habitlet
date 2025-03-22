import { useRoadmapStore } from "@/features/roadmap/stores/useRoadmapStore";
import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";
import {
  Position,
  useConnection,
  useInternalNode,
  useNodeConnections,
  useNodeId,
  XYPosition,
} from "@xyflow/react";
import { type RoadmapStore } from "@/features/roadmap/stores/roadmap.store";
import { NodeConfig, RoadmapNode } from "@/features/roadmap/types/roadmap";
import { Button } from "@/components/ui/button";
import { ButtonHandle } from "@/features/roadmap/components/button-handle";
import { RoadmapDropdownMenu } from "@/features/roadmap/components/roadmap-dropdown-menu";
import { useDropdown } from "@/hooks/use-dropdown";

const compatibleNodeTypes = () => {
  return (node: NodeConfig) => {
    return node.id === "milestone-node" || node.id === "step-node";
  };
};

const selector =
  (nodeId: string, type: string, id?: string | null) =>
  (state: RoadmapStore) => ({
    addNodeInBetween: state.addNodeInBetween,
    draggedNodes: state.draggedNodes,
    connectionSites: state.connectionSites,
    isPotentialConnection:
      state.potentialConnection?.id === `handle-${nodeId}-${type}-${id}`,
  });

// TODO: we need to streamline how we calculate the yOffset
const yOffset = (type: "source" | "target") => (type === "source" ? 50 : -65);

function getIndicatorPosition(
  nodePosition: XYPosition,
  x: number,
  y: number,
  type: "source" | "target"
): XYPosition {
  return {
    x: nodePosition.x + x,
    y: nodePosition.y + y + yOffset(type),
  };
}

const fallbackPosition = { x: 0, y: 0 };

export const RoadmapHandle = ({
  className,
  position: handlePosition,
  type,
  id,
  x,
  y,
}: {
  className?: string;
  id?: string;
  type: "source" | "target";
  position: Position;
  x: number;
  y: number;
}) => {
  const nodeId = useNodeId() ?? "";

  const connections = useNodeConnections({
    handleType: type,
    handleId: id,
  });

  const allNodeConnections = useNodeConnections();

  const hasIncomingConnections = allNodeConnections.some(
    (conn) => conn.target === nodeId
  );

  const hasOutgoingConnections = allNodeConnections.some(
    (conn) => conn.source === nodeId
  );

  const isConnectionInProgress = useConnection((c) => c.inProgress);

  const { isOpen, toggleDropdown } = useDropdown();
  const { draggedNodes, addNodeInBetween, connectionSites } = useRoadmapStore(
    useShallow(selector(nodeId, type, id))
  );

  // We get the actual position of the node
  const nodePosition =
    useInternalNode(nodeId)?.internals.positionAbsolute ?? fallbackPosition;

  const onClick = () => {
    toggleDropdown();
  };

  const onAddNode = useCallback(
    (node: RoadmapNode) => {
      if (!nodeId) {
        return;
      }

      addNodeInBetween({
        newNode: node,
        source: type === "source" ? nodeId : undefined,
        target: type === "target" ? nodeId : undefined,
        sourceHandleId: type === "source" ? id : undefined,
        targetHandleId: type === "target" ? id : undefined,
        position: getIndicatorPosition(nodePosition, x, y, type),
      });

      toggleDropdown();
    },
    [nodeId, id, type, nodePosition, x, y, toggleDropdown, addNodeInBetween]
  );

  // Only show the add button if:
  // 1. This specific handle doesn't have any connections
  // 2. For source handles: only show if the node has no outgoing connections
  // 3. For target handles: only show if the node has no incoming connections
  // 4. No connection is in progress
  // 5. Node is not being dragged
  const displayAddButton =
    connections.length === 0 &&
    ((type === "source" && !hasOutgoingConnections) ||
      (type === "target" && !hasIncomingConnections)) &&
    !isConnectionInProgress &&
    !draggedNodes.has(nodeId);

  const connectionId = `handle-${nodeId}-${type}-${id}`;
  useEffect(() => {
    if (displayAddButton) {
      connectionSites.set(connectionId, {
        position: getIndicatorPosition(nodePosition, x, y, type),
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
      className={clsx("left-[-6px] top-[-6px]", className)}
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
            filterNodes={compatibleNodeTypes()}
          />
        </div>
      )}
    </ButtonHandle>
  );
};
