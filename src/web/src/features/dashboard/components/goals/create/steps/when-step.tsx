import React from "react";
import { Calendar } from "@/components/ui/calendar";
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

export const WhenStep = ({ formData, updateFormData, validationErrors }: StepProps) => (
  <div className="space-y-4">
    <p className="text-gray-600">
      When do you want to achieve this goal?
    </p>
    <div className="space-y-2">
      <Label htmlFor="when">
        When <span className="text-red-500">*</span>
      </Label>
      <div className={`p-3 ${validationErrors?.when ? "border-red-500" : ""} flex justify-center`}>
        <Calendar
          mode="single"
          selected={formData.when}
          onSelect={(date) => updateFormData("when", date)}
          className="rounded-md border"
          disabled={{ before: new Date() }}
        />
      </div>
      {validationErrors?.when && (
        <p className="text-sm text-red-500">{validationErrors.when}</p>
      )}
      <GoalSummary 
        formData={formData} 
        onRemoveTag={(tag) => updateFormData("tags", formData.tags?.filter(t => t !== tag) || [])} 
      />
    </div>
  </div>
); 