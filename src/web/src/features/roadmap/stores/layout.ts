import { type Edge } from "@xyflow/react";
import ELK, { ElkNode, ElkPort } from "elkjs/lib/elk.bundled.js";
import { type RoadmapNode } from "@/features/roadmap/types/roadmap";
import { nodesConfig } from "@/data/roadmap-data";

const elk = new ELK();

const layoutOptions = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "elk.layered.spacing.edgeNodeBetweenLayers": "80",
  "elk.spacing.nodeNode": "150",
  "elk.layered.nodePlacement.strategy": "SIMPLE",
  "elk.separateConnectedComponents": "true",
  "elk.spacing.componentComponent": "150",
};

function createTargetPort(id: string) {
  return {
    id,
    layoutOptions: {
      side: "NORTH",
    },
  };
}

function createSourcePort(id: string) {
  return {
    id,
    layoutOptions: {
      side: "SOUTH",
    },
  };
}

// Create a safe port ID that doesn't use null values
function safePortId(
  nodeId: string,
  type: "source" | "target",
  handleId: string | null | undefined
) {
  return `${nodeId}-${type}-${handleId || "default"}`;
}

function getPorts(node: RoadmapNode) {
  const handles = nodesConfig[node.type!].handles;

  const targetPorts: ElkPort[] = [];
  const sourcePorts: ElkPort[] = [];

  handles?.forEach((handle) => {
    if (handle.type === "target") {
      targetPorts.push(
        createTargetPort(safePortId(node.id, "target", handle.id))
      );
    }

    if (handle.type === "source") {
      sourcePorts.push(
        createSourcePort(safePortId(node.id, "source", handle.id))
      );
    }
  });

  return { targetPorts, sourcePorts };
}

export async function layoutGraph(nodes: RoadmapNode[], edges: Edge[]) {
  const connectedNodes = new Set();
  // Keep track of all required ports
  const requiredPorts = new Map<string, Set<string>>();

  // First pass: identify all nodes and ports needed for the edges
  edges.forEach((edge) => {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);

    // Track required source ports
    if (!requiredPorts.has(edge.source)) {
      requiredPorts.set(edge.source, new Set());
    }
    requiredPorts
      .get(edge.source)
      ?.add(safePortId(edge.source, "source", edge.sourceHandle));

    // Track required target ports
    if (!requiredPorts.has(edge.target)) {
      requiredPorts.set(edge.target, new Set());
    }
    requiredPorts
      .get(edge.target)
      ?.add(safePortId(edge.target, "target", edge.targetHandle));
  });

  const graph: ElkNode = {
    id: "root",
    layoutOptions,
    edges: edges.map((edge) => {
      return {
        id: edge.id,
        sources: [safePortId(edge.source, "source", edge.sourceHandle)],
        targets: [safePortId(edge.target, "target", edge.targetHandle)],
      };
    }),
    children: nodes.reduce<ElkNode[]>((acc, node) => {
      if (!connectedNodes.has(node.id)) {
        return acc;
      }

      const { targetPorts, sourcePorts } = getPorts(node);

      // Create a set of all port IDs we already have
      const existingPortIds = new Set([
        ...targetPorts.map((p) => p.id),
        ...sourcePorts.map((p) => p.id),
      ]);

      // Add any missing required ports
      const additionalPorts: ElkPort[] = [];
      const nodeRequiredPorts = requiredPorts.get(node.id);

      if (nodeRequiredPorts) {
        nodeRequiredPorts.forEach((portId) => {
          if (!existingPortIds.has(portId)) {
            if (portId.includes("-target-")) {
              additionalPorts.push(createTargetPort(portId));
            } else if (portId.includes("-source-")) {
              additionalPorts.push(createSourcePort(portId));
            }
          }
        });
      }

      acc.push({
        id: node.id,
        width: node.width ?? node.measured?.width ?? 150,
        height: node.height ?? node.measured?.height ?? 50,
        ports: [
          createSourcePort(node.id),
          ...targetPorts,
          ...sourcePorts,
          ...additionalPorts, // Add any missing ports required by edges
        ],
        layoutOptions: {
          "org.eclipse.elk.portConstraints": "FIXED_ORDER",
        },
      });
      return acc;
    }, []),
  };

  const elkNodes = await elk.layout(graph);

  const layoutedNodesMap = new Map(elkNodes.children?.map((n) => [n.id, n]));

  const layoutedNodes: RoadmapNode[] = nodes.map((node) => {
    const layoutedNode = layoutedNodesMap.get(node.id);

    if (!layoutedNode) {
      return node;
    }

    if (
      layoutedNode.x === undefined ||
      layoutedNode.y === undefined ||
      (layoutedNode.x === node.position.x && layoutedNode.y === node.position.y)
    ) {
      return node;
    }

    return {
      ...node,
      position: {
        x: layoutedNode.x,
        y: layoutedNode.y,
      },
      style: { ...node.style, opacity: 1 },
    };
  });

  return layoutedNodes;
}
