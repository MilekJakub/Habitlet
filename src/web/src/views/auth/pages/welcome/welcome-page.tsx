import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router";

import { LogoText } from "@/components/typography/logo";
import { Header } from "@/components/typography/header";
import { Button } from "@/components/ui/button";
import { Subtitle } from "@/components/typography/subtitle";

const Underline = styled.span`
  text-decoration: underline;
  text-decoration-color: #1e40af;
  text-decoration-style: wavy;
  text-underline-offset: 10%;
  text-decoration-thickness: 10%;
`;

const UnderlineCenterText = ({ children, className }: { children: string, className: string }) => {
  return (
    <span className={className}>
      {children.slice(0, 1)}
      <Underline>{children.slice(1, -1)}</Underline>
      {children.slice(-1)}
    </span>
  );
};

export const WelcomePage = () => (
  <div className="flex flex-col mx-auto w-fit h-fit gap-[64px] items-center self-center min-h-screen justify-center">
    <div className="flex flex-col w-fit h-fit gap-[16px]">
      <LogoText className="text-center">HABITLET</LogoText>
      <Header type="h1" className="text-center border-none">
        Your own <UnderlineCenterText className="text-yellow-500">success</UnderlineCenterText> assistant!
      </Header>
    </div>

    <div className="flex flex-col w-fit h-fit gap-[16px]">
      <NavLink to="/register" end tabIndex={-1}>
        <Button variant="primary" size="lg">
          Let's get started!
        </Button>
      </NavLink>
    </div>

    <div className="flex flex-row w-full">
      <div className="flex flex-col w-full">
        <Subtitle type="s1" className="text-yellow-500 text-center">
          100%
        </Subtitle>
        <Subtitle type="s2" className="text-center">
          Free
        </Subtitle>
      </div>
      <div className="flex flex-col w-full">
        <Subtitle type="s1" className="text-yellow-500 text-center">
          100%
        </Subtitle>
        <Subtitle type="s2" className="text-center">
          Useful
        </Subtitle>
      </div>
      <div className="flex flex-col w-full">
        <Subtitle type="s1" className="text-yellow-500 text-center">
          100%
        </Subtitle>
        <Subtitle type="s2" className="text-center">
          Satisfying
        </Subtitle>
      </div>
    </div>
  </div>
);

export default WelcomePage;
