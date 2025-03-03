import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CalendarIcon, 
  Edit, 
  Trash2, 
  Archive, 
  MessageSquare 
} from 'lucide-react';
import type { Goal } from '@/types/roadmap';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string, isArchived: boolean) => void;
  onViewSteps: (goal: Goal) => void;
}

export function GoalCard({ goal, onEdit, onDelete, onArchive, onViewSteps }: GoalCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Format dates
  const formattedDate = goal.targetDate ? format(new Date(goal.targetDate), 'MMM d, yyyy') : 'No deadline';

  // Status colors
  const statusColors = {
    'not_started': 'bg-gray-400',
    'in_progress': 'bg-blue-400',
    'completed': 'bg-green-400',
    'abandoned': 'bg-red-400',
  };

  // Priority colors
  const priorityColors = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800',
  };

  return (
    <Card 
      className={`
        w-fit transition-all duration-200 
        ${isHovered ? 'shadow-lg' : 'shadow-md'} 
        ${goal.isArchived ? 'opacity-60' : 'opacity-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{goal.title}</CardTitle>
          <div className="flex space-x-1">
            <Badge variant="outline" className={priorityColors[goal.priority]}>
              {goal.priority}
            </Badge>
            <Badge variant="secondary">
              {goal.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="mb-4">
          <p className="text-sm text-gray-500 line-clamp-2">{goal.description}</p>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <CalendarIcon size={14} />
          <span>{formattedDate}</span>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>
        
        <div className="flex mt-2 mb-1">
          <Badge className={`${statusColors[goal.status]} text-white`}>
            {goal.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button variant="primaryOutline" size="sm" onClick={() => onViewSteps(goal)}>
          <MessageSquare className="h-4 w-4 mr-1" />
          Steps
        </Button>
        
        <div className="flex gap-1">
          <Button variant="primaryOutline" size="icon" onClick={() => onEdit(goal)}>
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="primaryOutline" 
            size="icon" 
            onClick={() => onArchive(goal.id, !goal.isArchived)}
          >
            <Archive className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="primaryOutline" 
            size="icon"
            onClick={() => onDelete(goal.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 