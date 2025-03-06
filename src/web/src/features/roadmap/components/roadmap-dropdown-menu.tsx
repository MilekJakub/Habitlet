import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RoadmapNodeType, NodeConfig } from '@/types/roadmap';
import { iconMapping } from '@/data/icon-mapping';
import { nodesConfig } from '@/data/roadmap-data';

export const RoadmapDropdownMenu = ({
  onAddNode,
  filterNodes = () => true,
}: {
  onAddNode: (type: RoadmapNodeType) => void;
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
              <a key={item.title} onClick={() => onAddNode(item.id)}>
                <DropdownMenuItem className="flex items-center space-x-2">
                  {IconComponent ? (
                    <IconComponent aria-label={item?.icon} />
                  ) : null}
                  <span>New {item.title}</span>
                </DropdownMenuItem>
              </a>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
