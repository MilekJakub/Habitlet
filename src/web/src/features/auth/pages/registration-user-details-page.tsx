import React from "react";
import { RegistrationUserDetailsForm } from "@/features/auth/components/registration-user-details-form";
import { AuthLayout } from "@/layout/auth-layout";

export const RegistrationUserDetailsPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col min-w-[386px]">
        <RegistrationUserDetailsForm />
      </div>
    </AuthLayout>
  );
};
