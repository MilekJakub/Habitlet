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

export const WhatStep = ({
  formData,
  updateFormData,
  validationErrors,
}: StepProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Now, we will use a formula to make your goal more specific.
      </p>
      <div className="space-y-2">
        <Label htmlFor="what">
          What <span className="text-red-500">*</span>
        </Label>
        <Input
          id="what"
          ref={inputRef}
          value={formData.what}
          onChange={(e) => updateFormData("what", e.target.value)}
          placeholder="an Engineering Thesis in Applied Computer Science"
          required
          className={validationErrors?.what ? "border-red-500" : ""}
        />
        {validationErrors?.what && (
          <p className="text-sm text-red-500">{validationErrors.what}</p>
        )}
        <GoalSummary
          formData={formData}
          onRemoveTag={(tag) =>
            updateFormData(
              "tags",
              formData.tags?.filter((t) => t !== tag) || []
            )
          }
        />
      </div>
    </div>
  );
};
