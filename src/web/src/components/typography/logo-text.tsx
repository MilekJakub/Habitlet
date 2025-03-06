import React from "react";
import styled from "styled-components";

interface LogoTextProps {
  children: React.ReactNode;
  className?: string;
}

const StyledLogoText = styled.span`
  color: hsla(0, 0%, 100%, 1);
  font-family: Inter;
  -webkit-text-stroke: 2px hsla(224, 64%, 33%, 1);
  text-shadow: hsla(224, 64%, 33%, 1) -5px 5px;
  font-weight: 900;
  font-size: 60px;
  line-height: 120px;
  letter-spacing: 0%;
  background: hsla(0, 0%, 100%, 1);
`;

export const LogoText: React.FC<LogoTextProps> = ({ children, className }) => {
  return <StyledLogoText className={className}>{children}</StyledLogoText>;
};
