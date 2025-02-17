import React from "react";

interface CaptionProps {
  children: React.ReactNode;
  type: "c1" | "c2";
  className?: string;
}

export const Caption: React.FC<CaptionProps> = ({
  children,
  type,
  className,
}) => {
  const typeClasses = {
    c1: "text-sm font-normal",
    c2: "text-xs font-medium",
  };

  return <div className={`${typeClasses[type]} ${className}`}>{children}</div>;
};

export default Caption;
