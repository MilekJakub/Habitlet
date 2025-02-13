import React from "react";

export const Caption = ({ children, type }: { children: React.ReactNode, type: "c1" | "c2" }) => {
    return <p className={type === "c1" ? "text-xs font-normal" : "text-xs font-medium"}>{children}</p>
}

export default Caption;