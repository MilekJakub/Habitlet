import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoalSummary } from "../goal-summary";
import { ACTIONS } from "@/constants/goals-constants";
import { createGoalInputSchema } from "../create-goal.schema";
import { z } from "zod";

type FormData = z.infer<typeof createGoalInputSchema>;

type StepProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: unknown) => void;
  validationErrors: Record<string, string>;
};

export const ActionStep = ({ formData, updateFormData, validationErrors }: StepProps) => {
  const selectRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    selectRef.current?.focus();
  }, []);
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Now, we will use a formula to make your goal more specific.
      </p>
      <div className="space-y-2">
        <Label htmlFor="action">
          Action <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.action}
          onValueChange={(value: string) => updateFormData("action", value)}
        >
          <SelectTrigger 
            ref={selectRef}
            className={validationErrors?.action ? "border-red-500" : ""}
          >
            <SelectValue placeholder="Select an action that suits your goal" />
          </SelectTrigger>
          <SelectContent>
            {ACTIONS.map((action) => (
              <SelectItem key={action} value={action}>
                {action}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {validationErrors?.action && (
          <p className="text-sm text-red-500">{validationErrors.action}</p>
        )}
        <GoalSummary 
          formData={formData} 
          onRemoveTag={(tag) => updateFormData("tags", formData.tags?.filter(t => t !== tag) || [])} 
        />
      </div>
    </div>
  );
}; 