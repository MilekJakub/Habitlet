import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Body } from "@/components/typography/body";
import { GoalSummary } from "../goal-summary";
import { createGoalInputSchema } from "../create-goal.schema";
import { z } from "zod";

type FormData = z.infer<typeof createGoalInputSchema>;

type StepProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: unknown) => void;
  validationErrors: Record<string, string>;
};

export const TitleStep = ({ formData, updateFormData, validationErrors }: StepProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return (
    <div className="space-y-4">
      <Body type="b1">Write the goal you have in mind.</Body>
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          ref={inputRef}
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
          placeholder="Write an Engineering Thesis"
          required
          className={validationErrors?.title ? "border-red-500" : ""}
        />
        {validationErrors?.title && (
          <p className="text-sm text-red-500">{validationErrors.title}</p>
        )}
        <GoalSummary 
          formData={formData} 
          onRemoveTag={(tag) => updateFormData("tags", formData.tags?.filter(t => t !== tag) || [])} 
        />
      </div>
    </div>
  );
}; 