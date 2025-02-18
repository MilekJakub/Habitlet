import React from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  type: "h1" | "h2" | "h3" | "h4" | "h5";
}

export const Header: React.FC<HeaderProps> = ({
  children,
  type,
  className,
  ...props
}) => {
  const typeClasses = {
    h1: "text-5xl font-semibold border-b-2 pb-2 my-2",
    h2: "text-4xl font-semibold my-2",
    h3: "text-3xl font-semibold my-2",
    h4: "text-2xl font-semibold my-2",
    h5: "text-xl font-semibold my-2",
  };

  const Tag = type as "h1" | "h2" | "h3" | "h4" | "h5";

  return (
    <Tag className={`${typeClasses[type]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};
