import React, { useCallback } from 'react';
import { Play } from 'lucide-react';

import {
  NodeHeaderTitle,
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderAction,
  NodeHeaderDeleteAction,
  NodeHeaderIcon,
} from '@/features/roadmap/components/node-header';
import { RoadmapNodeData } from '@/types/roadmap';
import { iconMapping } from '@/data/icon-mapping';
import { BaseNode } from '@/features/roadmap/components/base-node';
import { NodeStatusIndicator } from '@/features/roadmap/components/node-status-indicator';
import { NODE_SIZE } from '@/constants/roadmap-constants';

function RoadmapNode({
  id,
  data,
  children,
}: {
  id: string;
  data: RoadmapNodeData;
  children?: React.ReactNode;
}) {
  const onClick = useCallback(() => console.log('clicked'), []);

  const IconComponent = data?.icon ? iconMapping[data.icon] : undefined;

  return (
    <NodeStatusIndicator status={data?.status}>
      <BaseNode className="p-1" style={{ ...NODE_SIZE }}>
        <NodeHeader>
          <NodeHeaderIcon>
            {IconComponent ? <IconComponent aria-label={data?.icon} /> : null}
          </NodeHeaderIcon>
          <NodeHeaderTitle>{data?.title}</NodeHeaderTitle>
          <NodeHeaderActions>
            <NodeHeaderAction onClick={onClick} label="Run node">
              <Play className="stroke-blue-500 fill-blue-500" />
            </NodeHeaderAction>
            <NodeHeaderDeleteAction />
          </NodeHeaderActions>
        </NodeHeader>
        {children}
      </BaseNode>
    </NodeStatusIndicator>
  );
}

export default RoadmapNode;
