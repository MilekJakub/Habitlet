import React from "react";

interface SubtitleProps {
  children: React.ReactNode;
  type: "s1" | "s2";
  className?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ children, type, className }) => {
  const typeClasses = {
    s1: "text-lg font-semibold",
    s2: "text-base font-semibold",
  };

  return (
    <div className={`${typeClasses[type]} ${className || ""}`}>{children}</div>
  );
};

export default Subtitle;
