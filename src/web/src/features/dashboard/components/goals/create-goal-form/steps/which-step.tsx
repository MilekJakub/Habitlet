import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoalSummary } from "../goal-summary";
import { StepProps } from "../types";

export const WhichStep = ({ formData, updateFormData, validationErrors }: StepProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Which requirements or obstacles do you need to consider?
      </p>
      <div className="space-y-2">
        <Label htmlFor="which">
          Which <span className="text-red-500">*</span>
        </Label>
        <Input
          id="which"
          ref={inputRef}
          value={formData.which}
          onChange={(e) => updateFormData("which", e.target.value)}
          placeholder="which will require deep knowledge of..."
          required
          className={validationErrors?.which ? "border-red-500" : ""}
        />
        {validationErrors?.which && (
          <p className="text-sm text-red-500">{validationErrors.which}</p>
        )}
        <GoalSummary 
          formData={formData} 
          onRemoveTag={(tag) => updateFormData("tags", formData.tags?.filter(t => t !== tag) || [])} 
        />
      </div>
    </div>
  );
}; 