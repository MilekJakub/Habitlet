import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col mx-auto w-fit h-fit justify-center min-h-screen">
      {children}
    </div>
  );
};
