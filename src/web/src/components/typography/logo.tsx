import React from "react";

interface LogoProps {
  children: React.ReactNode;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ children, className }) => {
  return (
    <span
      className={className}
      style={{
        color: "hsla(0, 0%, 100%, 1)",
        fontFamily: "Inter",
        WebkitTextStroke: "2px hsla(224, 64%, 33%, 1)",
        textShadow: "hsla(224, 64%, 33%, 1) -5px 5px",
        fontWeight: 900,
        fontSize: "60px",
        lineHeight: "120px",
        letterSpacing: "0%",
        background: "hsla(0, 0%, 100%, 1)",
      }}
    >
      {children}
    </span>
  );
};

