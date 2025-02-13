import React from "react";

export const Body = ({ children, type }: { children: React.ReactNode, type: "b1" | "b2" | "b3" | "b4" }) => {
    if (type === "b1") return <p className="text-base font-normal">{children}</p>
    if (type === "b2") return <p className="text-base font-medium">{children}</p>
    if (type === "b3") return <p className="text-sm font-normal">{children}</p>
    if (type === "b4") return <p className="text-sm font-medium">{children}</p>
}

export default Body;