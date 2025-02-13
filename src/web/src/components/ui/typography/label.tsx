import React from "react";
import { Caption } from "./caption";

export const Label = ({ children }: { children: React.ReactNode }) => {
    return <Caption type="c2">{children}</Caption>
}

export default Label;