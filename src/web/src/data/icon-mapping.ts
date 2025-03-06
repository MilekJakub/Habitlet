import {
  Trophy,
  Footprints,
  Flag,
  Play
} from 'lucide-react';

export const iconMapping: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  Trophy: Trophy,
  Footprints: Footprints,
  Flag: Flag,
  Play: Play
};
