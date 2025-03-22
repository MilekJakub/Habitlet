import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NodeConfig, RoadmapNode } from "@/features/roadmap/types/roadmap";
import { iconMapping } from "@/data/icon-mapping";
import { nodesConfig } from "@/data/roadmap-data";

export const RoadmapDropdownMenu = ({
  onAddNode,
  filterNodes = () => true,
}: {
  onAddNode: (node: RoadmapNode) => void;
  filterNodes?: (node: NodeConfig) => boolean;
}) => {
  return (
    <DropdownMenu open>
      <DropdownMenuTrigger />
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Nodes</DropdownMenuLabel>
        {Object.values(nodesConfig)
          .filter(filterNodes)
          .map((item) => {
            const IconComponent = item?.icon
              ? iconMapping[item.icon]
              : undefined;
            return (
              // TODO: On click, show popup for appropriate node type
              <DropdownMenuItem
                className="flex items-center space-x-2"
                onClick={() => {
                  onAddNode(null!);
                }}
              >
                {IconComponent ? (
                  <IconComponent aria-label={item?.icon} />
                ) : null}
                <span>New {item.title}</span>
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
