'use client';

import React, { ReactNode } from 'react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { RoadmapNodeType } from '@/types/roadmap';
import { iconMapping } from '@/data/icon-mapping';
import { useClientPosition } from '@/hooks/use-client-position';
import { useRoadmapStore } from '@/store/roadmap.store';
import { nodesConfig } from '@/data/roadmap-data';

export default function RoadmapContextMenu({ children }: { children: ReactNode }) {
  const [position, setPosition] = useClientPosition();
  const addNodeByType = useRoadmapStore((s) => s.addNodeByType);

  const onItemClick = (nodeType: RoadmapNodeType) => {
    if (!position) {
      return;
    }

    addNodeByType(nodeType, position);
  };

  const nodeTypeOrder = ['step-node', 'milestone-node'];

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
              <a key={item.title} onClick={() => onItemClick(item.id)}>
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
