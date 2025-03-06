import React, { useState } from "react";
import { format } from "date-fns";
import {
  CheckCircle2,
  Clock,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Step } from "@/types/step";

interface StepItemProps {
  step: Step;
  onEdit: (step: Step) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Step["status"]) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const StepItem = ({
  step,
  onEdit,
  onDelete,
  onStatusChange,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: StepItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format dates
  const dueDateString = step.due_date
    ? format(new Date(step.due_date), "MMM d, yyyy")
    : "No deadline";

  const completedDateString = step.completed_date
    ? format(new Date(step.completed_date), "MMM d, yyyy")
    : "";

  // Status colors and icons
  const statusConfig = {
    not_started: {
      color: "bg-gray-100",
      textColor: "text-gray-700",
      icon: <Clock className="h-4 w-4 mr-1" />,
    },
    in_progress: {
      color: "bg-blue-100",
      textColor: "text-blue-700",
      icon: <Clock className="h-4 w-4 mr-1 text-blue-500" />,
    },
    completed: {
      color: "bg-green-100",
      textColor: "text-green-700",
      icon: <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />,
    },
    blocked: {
      color: "bg-red-100",
      textColor: "text-red-700",
      icon: <AlertCircle className="h-4 w-4 mr-1 text-red-500" />,
    },
  };

  // Difficulty colors
  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  // Toggle step status handler
  const toggleStatus = () => {
    if (step.status === "not_started") {
      onStatusChange(step.id, "in_progress");
    } else if (step.status === "in_progress") {
      onStatusChange(step.id, "completed");
    } else if (step.status === "completed") {
      onStatusChange(step.id, "not_started");
    }
  };

  return (
    <Card
      className={`w-fit mb-3 transition-all duration-200 ${isHovered ? "shadow-md" : "shadow-sm"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="py-3 px-4 flex flex-row items-start justify-between">
        <div className="flex items-start gap-3">
          <Button
            variant="primaryOutline"
            size="icon"
            className={`rounded-full h-6 w-6 ${
              step.status === "completed" ? "bg-green-100 text-green-700" : ""
            }`}
            onClick={toggleStatus}
          >
            {statusConfig[step.status].icon}
          </Button>

          <div>
            <CardTitle className="text-base">{step.title}</CardTitle>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {step.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Badge className={difficultyColors[step.difficulty]}>
            {step.difficulty}
          </Badge>
          {!step.is_required && <Badge variant="outline">Optional</Badge>}
        </div>
      </CardHeader>

      <CardContent className="py-0 px-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>Due: {dueDateString}</span>
          </div>

          {step.status === "completed" && completedDateString && (
            <div className="flex items-center text-gray-500">
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
              <span>Completed: {completedDateString}</span>
            </div>
          )}

          {step.estimated_time && (
            <div className="text-gray-500">
              Est. time: {step.estimated_time} min
            </div>
          )}

          {step.actual_time && (
            <div className="text-gray-500">
              Actual time: {step.actual_time} min
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="py-2 px-4 flex justify-between">
        <div className="flex space-x-1">
          <Button
            variant="primaryOutline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onMoveUp(step.id)}
            disabled={isFirst}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="primaryOutline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onMoveDown(step.id)}
            disabled={isLast}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-1">
          <Button
            variant="primaryOutline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(step)}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="primaryOutline"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700"
            onClick={() => onDelete(step.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
