import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoalSummary } from "../goal-summary";
import { StepProps } from "../types";

export const WhyStep = ({ formData, updateFormData, validationErrors }: StepProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Why is this goal important to you?
      </p>
      <div className="space-y-2">
        <Label htmlFor="why">
          Why <span className="text-red-500">*</span>
        </Label>
        <Input
          id="why"
          ref={inputRef}
          value={formData.why}
          onChange={(e) => updateFormData("why", e.target.value)}
          placeholder="This goal will help me get a job at Google."
          required
          className={validationErrors?.why ? "border-red-500" : ""}
        />
        {validationErrors?.why && (
          <p className="text-sm text-red-500">{validationErrors.why}</p>
        )}
        <GoalSummary 
          formData={formData} 
          onRemoveTag={(tag) => updateFormData("tags", formData.tags?.filter(t => t !== tag) || [])} 
        />
      </div>
    </div>
  );
}; 