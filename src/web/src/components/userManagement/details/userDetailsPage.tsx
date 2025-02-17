import React from "react";
import { Header } from "../../ui/typography/header";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export const UserDetailsPage = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col mx-auto w-fit h-fit gap-[16px] items-center justify-center self-center min-h-screen justify-center">
        <Header type="h2">Provide your details</Header>

        <Label htmlFor="username" className="w-full">Username <span className="text-red-500">*</span></Label>
        <Input required id="username" type="text" placeholder="Enter your username" />

        <Label htmlFor="password" className="w-full">Password <span className="text-red-500">*</span></Label>
        <div className="relative">
            <Input required id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
            {showPassword ? <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <EyeOffIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer" onClick={() => setShowPassword(!showPassword)} />}
        </div>

        <Button variant="primary" size="lg" className="w-full">
            Continue
        </Button>
    </div>
  );
};

export default UserDetailsPage;