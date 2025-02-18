import React from "react";
import { Logo } from "@/components/typography/logo";
import { Header } from "@/components/typography/header";
import { Button } from "@/components/ui/button";
import { Subtitle } from "@/components/typography/subtitle";
import { NavLink } from "react-router";

import "./welcome-page.style.css";

export const WelcomePage = () => (
  <div className="flex flex-col mx-auto w-fit h-fit gap-[64px] items-center justify-center self-center min-h-screen justify-center">
    <div className="flex flex-col w-fit h-fit gap-[16px]">
      <Logo className="text-center">HABITLET</Logo>
      <Header type="h1" className="text-center border-none">
        Your ownz {" "}
        <span className="text-yellow-500">
          s<span className="decoration">ucces</span>s
        </span>{" "}
        assistant!
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
