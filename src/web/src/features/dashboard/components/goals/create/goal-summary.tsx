import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { createGoalInputSchema } from "./create-goal.schema";
import { z } from "zod";

type FormData = z.infer<typeof createGoalInputSchema>;

export type GoalSummaryProps = {
  formData: FormData;
  onRemoveTag?: (tag: string) => void;
};

export const GoalSummary = ({ formData, onRemoveTag }: GoalSummaryProps) => (
  <div className="mt-4 p-4 bg-gray-50 rounded-md">
    <h3 className="font-medium mb-2">Goal Summary</h3>
    <div className="mb-2">
      <span className="text-sm text-gray-600">Title: </span>
      <span className="text-sm font-medium">{formData.title}</span>
    </div>
    <p className="text-sm text-gray-600">Description</p>
    <p className="text-sm font-medium mb-2">
      I will {formData.action.toLowerCase() || "[action]"}{" "}
      {formData.what || "[what]"}{" "}
      {formData.when ? `by ${format(formData.when, "MMMM d, yyyy")}` : "[when]"}{" "}
      {formData.where || ""} {formData.which || ""} {formData.why || ""}
    </p>
    {formData.category && (
      <div className="mb-2">
        <span className="text-sm text-gray-600">Category: </span>
        <span className="text-sm font-medium">{formData.category}</span>
      </div>
    )}
    {formData.priority && (
      <div className="mb-2">
        <span className="text-sm text-gray-600">Priority: </span>
        <span className="text-sm font-medium">
          {formData.priority.charAt(0).toUpperCase() +
            formData.priority.slice(1)}
        </span>
      </div>
    )}
    {formData.tags && formData.tags.length > 0 && (
      <div>
        <span className="text-sm text-gray-600">Tags: </span>
        <div className="flex flex-wrap gap-1 mt-2">
          {formData.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs flex items-center gap-1"
            >
              {tag}
              {onRemoveTag && (
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveTag(tag)}
                />
              )}
            </Badge>
          ))}
        </div>
      </div>
    )}
  </div>
);
