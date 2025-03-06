import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface AuthFormProps<T extends Record<string, unknown>> {
  onSubmit: (data: T) => Promise<void>;
  isLoading: boolean;
  children: React.ReactNode;
  submitText: string;
  form: UseFormReturn<T>;
}

export const AuthForm = <T extends Record<string, unknown>>({
  onSubmit,
  isLoading,
  children,
  submitText,
  form,
}: AuthFormProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await form.trigger();
          if (isValid) {
            const data = form.getValues();
            await onSubmit(data as T);
          }
        }}
        className="flex flex-col w-full h-full gap-[16px]"
      >
        {children}
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : submitText}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
