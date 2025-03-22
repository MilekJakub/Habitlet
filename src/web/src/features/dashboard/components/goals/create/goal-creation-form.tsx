import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { createGoal } from "../../../api/create-goal";
import { createGoalInputSchema } from "./create-goal.schema";
import { format } from "date-fns";
import { useAuth } from "@/features/auth/stores/auth.store";
import { INITIAL_CREATE_GOAL_FORM_DATA } from "@/constants/goals-constants";
import { TitleStep } from "./steps/title-step";
import { ActionStep } from "./steps/action-step";
import { WhatStep } from "./steps/what-step";
import { WhenStep } from "./steps/when-step";
import { WhereStep } from "./steps/where-step";
import { WhichStep } from "./steps/which-step";
import { WhyStep } from "./steps/why-step";
import { DetailsStep } from "./steps/details-step";

type FormData = z.infer<typeof createGoalInputSchema>;

type CreateGoalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess?: () => void;
};

export const CreateGoal = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: CreateGoalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(
    INITIAL_CREATE_GOAL_FORM_DATA
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLastStep) {
      try {
        const smartDescription =
          `I will ${formData.action.toLowerCase() || ""} ${formData.what || ""} by ${formData.when ? format(formData.when, "MMMM d, yyyy") : ""} ${formData.where || ""} ${formData.which || ""} ${formData.why || ""}`.trim();

        const updatedFormData = {
          ...formData,
          description: smartDescription,
        };

        const result = createGoalInputSchema.safeParse(updatedFormData);
        if (!result.success) {
          const errors = result.error.format();
          console.log(errors);
          setValidationErrors(
            Object.entries(errors)
              .filter(
                ([key, value]) =>
                  key !== "_errors" &&
                  typeof value === "object" &&
                  "_errors" in value
              )
              .reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [key]:
                    value &&
                    "_errors" in value &&
                    Array.isArray(value._errors) &&
                    value._errors.length > 0
                      ? value._errors[0]
                      : "Invalid value",
                }),
                {}
              )
          );
          toast({
            title: "Validation Error",
            description: "Please fix the errors before submitting.",
            variant: "destructive",
          });
          return;
        }

        setIsSubmitting(true);

        const when = formData.when ? format(formData.when, "yyyy-MM-dd") : "";

        const user_id = user?.id;

        if (!user_id) {
          throw new Error("User ID is required");
        }

        await createGoal({
          ...updatedFormData,
          when: new Date(when),
          user_id,
        });

        toast({
          title: "Success",
          description: "Goal created successfully",
        });
        setIsOpen(false);
        onSuccess?.();
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to create goal. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      handleNext();
    }
  };

  const validateCurrentStep = (): boolean => {
    setValidationErrors({});

    switch (step) {
      case 0: {
        const titleResult = createGoalInputSchema.shape.title.safeParse(
          formData.title
        );
        if (!titleResult.success) {
          setValidationErrors({ title: titleResult.error.errors[0].message });
          return false;
        }
        return true;
      }
      case 1: {
        const actionResult = createGoalInputSchema.shape.action.safeParse(
          formData.action
        );
        if (!actionResult.success) {
          setValidationErrors({ action: actionResult.error.errors[0].message });
          return false;
        }
        return true;
      }
      case 2: {
        const whatResult = createGoalInputSchema.shape.what.safeParse(
          formData.what
        );
        if (!whatResult.success) {
          setValidationErrors({ what: whatResult.error.errors[0].message });
          return false;
        }
        return true;
      }
      case 3: {
        const whenResult = createGoalInputSchema.shape.when.safeParse(
          formData.when
        );
        if (!whenResult.success) {
          setValidationErrors({ when: whenResult.error.errors[0].message });
          return false;
        }
        return true;
      }
      case 4: {
        const whereResult = createGoalInputSchema.shape.where.safeParse(
          formData.where
        );
        if (!whereResult.success) {
          setValidationErrors({ where: whereResult.error.errors[0].message });
          return false;
        }
        return true;
      }
      case 5: {
        const whichResult = createGoalInputSchema.shape.which.safeParse(
          formData.which
        );
        if (!whichResult.success) {
          setValidationErrors({ which: whichResult.error.errors[0].message });
          return false;
        }
        return true;
      }
      case 6: {
        const whyResult = createGoalInputSchema.shape.why.safeParse(
          formData.why
        );
        if (!whyResult.success) {
          setValidationErrors({ why: whyResult.error.errors[0].message });
          return false;
        }
        return true;
      }
      case 7: {
        const categoryResult = createGoalInputSchema.shape.category.safeParse(
          formData.category
        );

        if (!categoryResult.success) {
          setValidationErrors({
            category: categoryResult.error.errors[0].message,
          });
          return false;
        }

        if (!formData.priority) {
          setValidationErrors({ priority: "Please select a priority" });
          return false;
        }

        const priorityResult = z
          .enum(["low", "medium", "high"] as const)
          .safeParse(formData.priority);
        if (!priorityResult.success) {
          setValidationErrors({ priority: "Please select a valid priority" });
          return false;
        }

        return true;
      }
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1);
    } else {
      toast({
        title: "Validation Error",
        description:
          Object.values(validationErrors)[0] ||
          "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const updateFormData = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const renderStep = () => {
    const stepProps = { formData, updateFormData, validationErrors };

    switch (step) {
      case 0:
        return <TitleStep {...stepProps} />;
      case 1:
        return <ActionStep {...stepProps} />;
      case 2:
        return <WhatStep {...stepProps} />;
      case 3:
        return <WhenStep {...stepProps} />;
      case 4:
        return <WhereStep {...stepProps} />;
      case 5:
        return <WhichStep {...stepProps} />;
      case 6:
        return <WhyStep {...stepProps} />;
      case 7:
        return <DetailsStep {...stepProps} />;
      default:
        return null;
    }
  };

  const isLastStep = step === 7;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex-1 overflow-y-auto px-6 py-4 max-w-3xl">
          <DialogTitle>Create a goal</DialogTitle>
          <form id="create-goal" onSubmit={handleSubmit}>
            <div className="">{renderStep()}</div>
            <div className="flex justify-between py-4 border-t mt-4">
              {step > 0 && (
                <Button
                  type="button"
                  variant="primaryOutline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={step === 0 ? "ml-auto" : ""}
              >
                {isLastStep ? "Create a goal" : "Next"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
