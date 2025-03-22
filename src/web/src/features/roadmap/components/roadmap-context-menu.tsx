import React, { ReactNode } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { RoadmapNodeType } from "@/features/roadmap/types/roadmap";
import { iconMapping } from "@/data/icon-mapping";
import { useClientPosition } from "@/features/roadmap/hooks/use-client-position";
import { nodesConfig } from "@/data/roadmap-data";

export function RoadmapContextMenu({
  children,
}: {
  children: ReactNode;
}) {
  const [position, setPosition] = useClientPosition();
  // const addNode= useRoadmapStore((s) => s.addNode);

  const onItemClick = () => {
    if (!position) {
      return;
    }

    console.log("RoadmapContextMenu:onItemClick");

    // TODO: Show a popup form for appropriate node type
    // addNode(node);
  };

  const nodeTypeOrder = ["step-node", "milestone-node"];

  return (
    <div className="h-full w-full bg-gray-100" onContextMenu={setPosition}>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {nodeTypeOrder.map((nodeType) => {
            const item = nodesConfig[nodeType as RoadmapNodeType];
            const IconComponent = item?.icon
              ? iconMapping[item.icon]
              : undefined;
            return (
              <a key={item.title} onClick={() => onItemClick()}>
                <ContextMenuItem className="flex items-center space-x-2">
                  {IconComponent ? (
                    <IconComponent aria-label={item?.icon} />
                  ) : null}
                  <span>New {item.title}</span>
                </ContextMenuItem>
              </a>
            );
          })}
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
