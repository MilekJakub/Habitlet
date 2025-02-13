import React from "react";

export const Subtitle = ({ children, type }: { children: React.ReactNode, type: "s1" | "s2" }) => {
  return <p className={type === "s1" ? "text-lg font-semibold" : "text-base font-semibold"}>{children}</p>
};

export default Subtitle;
