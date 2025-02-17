import React from "react";

interface BodyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  type: "b1" | "b2" | "b3" | "b4";
  as?: keyof JSX.IntrinsicElements;
}

export const Body: React.FC<BodyProps> = ({
  children,
  type,
  className,
  as = "p",
  ...props
}) => {
  const typeClasses = {
    b1: "text-base font-normal leading-5",
    b2: "text-sm font-normal leading-4",
    b3: "text-xs font-normal leading-3",
    b4: "text-2xs font-normal leading-2",
  };

  return React.createElement(
    as,
    { className: `${typeClasses[type]} ${className}`, ...props },
    children
  );
};

export default Body;
