import React from "react";
import { RegistrationOtpForm } from "@/features/auth/components/registration-otp-form";
import { AuthLayout } from "@/layout/auth-layout";

export const RegistrationOtpPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-[32px] max-w-[386px]">
        <RegistrationOtpForm />
      </div>
    </AuthLayout>
  );
};
