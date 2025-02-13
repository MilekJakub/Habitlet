import React from "react";

export const Header = ({ children, type }: { children: React.ReactNode, type: "h1" | "h2" | "h3" | "h4" | "h5" }) => {
    if (type === "h1") return <h1 className="text-4xl font-semibold">{children}</h1>;
    if (type === "h2") return <h2 className="text-3xl font-semibold">{children}</h2>;
    if (type === "h3") return <h3 className="text-2xl font-semibold">{children}</h3>;
    if (type === "h4") return <h4 className="text-xl font-semibold">{children}</h4>;
    if (type === "h5") return <h5 className="text-lg font-semibold">{children}</h5>;
}

export default Header;