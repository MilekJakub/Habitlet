import React from "react";
import { Header } from "@/components/typography/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

import "./user-details-page.style.css";

export const UserDetailsPage = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col mx-auto w-full h-fit gap-[16px] items-center justify-center self-center min-h-screen justify-center">
      <div className="flex flex-col w-full h-full items-center max-w-[386px] gap-[32px]">
        <Header type="h2">Provide your details</Header>

        <div className="flex flex-col w-full h-full gap-[16px]">
          <Label htmlFor="username" className="w-full">Username <span className="text-red-500">*</span></Label>
          <Input required id="username" type="text" placeholder="Enter your username" />

          <Label htmlFor="password" className="w-full">Password <span className="text-red-500">*</span></Label>
          <div className="relative w-full">
              <Input required id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
              {showPassword ? <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <EyeOffIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer" onClick={() => setShowPassword(!showPassword)} />}
          </div>
        </div>

        <NavLink to="/dashboard" end tabIndex={-1} className="w-full">
          <Button variant="primary" size="lg" className="w-full">
              Continue
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default UserDetailsPage;