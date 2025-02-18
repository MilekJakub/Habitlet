import React from "react";
import { InputOTPGroup, InputOTPSlot, InputOTP } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Header } from "@/components/typography/header";
import { Body } from "@/components/typography/body";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

import "./otp-page.style.css";

export const OtpPage = () => {
  return (
    <div className="flex flex-col mx-auto w-fit h-fit gap-[64px] items-center justify-center self-center min-h-screen justify-center">
        <div className="flex flex-col w-full h-full items-center max-w-[386px] gap-[32px]">
            <Header type="h2" className="w-full">Please verify your email</Header>
            <div className="flex flex-col w-full h-full items-center">
                <Body type="b4" className="w-full">
                    We've sent you a <span className="font-bold">confirmation code!</span> <br /> <br />
                    Please check your <span className="font-bold">email inbox.</span> <br />
                    Copy and paste or manually type the verification code (OTP) below to continue.
                </Body>
            </div>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <NavLink className="w-full" to="/details" end tabIndex={-1}>
                <Button variant="primary" size="lg" className="w-full">
                    Verify
                </Button>
            </NavLink>
        </div>
    </div>
  );
};

export default OtpPage;
