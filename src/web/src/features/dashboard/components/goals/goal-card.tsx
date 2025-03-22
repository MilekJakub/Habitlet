import React from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, Edit, Trash2, Archive } from "lucide-react";
import type { GoalEntity } from "@/types/goal";

interface GoalCardProps {
  goal: GoalEntity;
  onEdit: (goal: GoalEntity) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string, isArchived: boolean) => void;
}

export const GoalCard = ({
  goal,
  onEdit,
  onDelete,
  onArchive,
}: GoalCardProps) => {
  const formattedDate = goal.target_date
    ? format(new Date(goal.target_date), "MMM d, yyyy")
    : "No deadline";

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <Card
      className={`
        w-fit transition-all duration-200 
        ${goal.is_archived ? "opacity-60" : "opacity-100"}
      `}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{goal.title}</CardTitle>
          <div className="flex space-x-1">
            <Badge variant="outline" className={priorityColors[goal.priority]}>
              {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
            </Badge>
            <Badge variant="secondary">
              {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="mb-4">
          <p className="text-sm text-gray-500 line-clamp-2">
            {goal.description}
          </p>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <CalendarIcon size={14} />
          <span>{formattedDate}</span>
        </div>

        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">
              Progress (this needs to be dynamic)
            </span>
            <span className="text-sm font-medium">{50}%</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div className="ml-auto">
          <Button
            variant="primaryOutline"
            size="icon"
            onClick={() => onEdit(goal)}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="primaryOutline"
            size="icon"
            onClick={() => onArchive(goal.id, !goal.is_archived)}
          >
            <Archive className="h-4 w-4" />
          </Button>

          <Button
            variant="primaryOutline"
            size="icon"
            onClick={() => onDelete(goal.id)}
            className="text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
