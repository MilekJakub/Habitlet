import { cn } from "@/lib/utils";
import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label
      {...props}
      className={cn("w-fit text-sm font-medium", props.className)}
    >
      {children}
    </label>
  );
};

export default Label;
