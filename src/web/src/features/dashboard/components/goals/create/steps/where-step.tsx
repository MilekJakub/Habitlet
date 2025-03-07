import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoalSummary } from "../goal-summary";
import { createGoalInputSchema } from "../create-goal.schema";
import { z } from "zod";

type FormData = z.infer<typeof createGoalInputSchema>;

type StepProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: unknown) => void;
  validationErrors: Record<string, string>;
};

export const WhereStep = ({ formData, updateFormData, validationErrors }: StepProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Where will you work on this goal?
      </p>
      <div className="space-y-2">
        <Label htmlFor="where">
          Where <span className="text-red-500">*</span>
        </Label>
        <Input
          id="where"
          ref={inputRef}
          value={formData.where}
          onChange={(e) => updateFormData("where", e.target.value)}
          placeholder="in the comfort of my home"
          required
          className={validationErrors?.where ? "border-red-500" : ""}
        />
        {validationErrors?.where && (
          <p className="text-sm text-red-500">{validationErrors.where}</p>
        )}
        <GoalSummary 
          formData={formData} 
          onRemoveTag={(tag) => updateFormData("tags", formData.tags?.filter(t => t !== tag) || [])} 
        />
      </div>
    </div>
  );
}; 