import React from "react";
import { RegistrationEmailForm } from "@/features/auth/components/registration-email-form";
import { AuthLayout } from "@/layout/auth-layout";

export const RegistrationEmailPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col w-full gap-[32px] max-w-[386px]">
        <RegistrationEmailForm />
      </div>
    </AuthLayout>
  );
};
