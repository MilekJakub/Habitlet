import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/ui/tag-input";
import { GoalSummary } from "../goal-summary";
import {
  GOAL_CATEGORIES,
  GOAL_PRIORITIES,
  MAX_TAGS,
} from "@/constants/goals-constants";
import { createGoalInputSchema } from "../create-goal.schema";
import { z } from "zod";

type FormData = z.infer<typeof createGoalInputSchema>;

type StepProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: unknown) => void;
  validationErrors: Record<string, string>;
};

export const DetailsStep = ({
  formData,
  updateFormData,
  validationErrors,
}: StepProps) => {
  const selectRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    selectRef.current?.focus();
  }, []);

  const addTag = (tag: string) => {
    if (!formData.tags?.includes(tag)) {
      updateFormData("tags", [...(formData.tags || []), tag]);
    }
  };

  const removeTag = (tag: string) => {
    updateFormData("tags", formData.tags?.filter((t) => t !== tag) || []);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Add some final details to your goal.</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category-select">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value: string) => updateFormData("category", value)}
          >
            <SelectTrigger
              id="category-select"
              ref={selectRef}
              className={validationErrors?.category ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {GOAL_CATEGORIES.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors?.category && (
            <p className="text-sm text-red-500">{validationErrors.category}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority-select">
            Priority <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.priority}
            onValueChange={(value: string) => updateFormData("priority", value)}
          >
            <SelectTrigger
              id="priority-select"
              className={validationErrors?.priority ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              {GOAL_PRIORITIES.map((priority: string) => (
                <SelectItem key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors?.priority && (
            <p className="text-sm text-red-500">{validationErrors.priority}</p>
          )}
        </div>

        <div className="space-y-2">
          <TagInput
            tags={formData.tags || []}
            onAddTag={addTag}
            maxTags={MAX_TAGS}
          />
        </div>

        <GoalSummary formData={formData} onRemoveTag={removeTag} />
      </div>
    </div>
  );
};
