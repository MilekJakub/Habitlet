import React, { useState } from "react";
import { useNavigate } from "react-router";
import { InputOTPGroup, InputOTPSlot, InputOTP } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Header } from "@/components/typography/header";
import { Body } from "@/components/typography/body";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../services/auth.context";
import { toast } from "@/hooks/use-toast";

export const OtpPage = () => {
  const navigate = useNavigate();
  const { verifyOtp, tempEmail } = useAuth();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!tempEmail) {
      toast({
        title: "Email address is missing. Please try again.",
        variant: "destructive",
      });
      navigate("/register");
      return;
    }

    if (otp.length !== 6) {
      toast({
        title: "Please enter a valid 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyOtp(tempEmail, otp);
      if (result.success) {
        toast({
          title: "Email verified successfully!",
        });
        navigate("/details");
      } else {
        toast({
          title: result.error?.message || "Invalid verification code",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-auto w-fit h-fit gap-[64px] items-center justify-center self-center min-h-screen">
        <div className="flex flex-col w-full h-full items-center max-w-[386px] gap-[32px]">
            <Header type="h2" className="w-full">Please verify your email</Header>
            <div className="flex flex-col w-full h-full items-center">
                <Body type="b4" className="w-full">
                    We've sent you a <span className="font-bold">confirmation code!</span> <br /> <br />
                    Please check your <span className="font-bold">email inbox.</span> <br />
                    Copy and paste or manually type the verification code (OTP) below to continue.
                </Body>
            </div>
            <InputOTP 
                maxLength={6} 
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS} 
                value={otp}
                onChange={setOtp}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <Button 
                variant="primary" 
                size="lg" 
                className="w-full" 
                onClick={handleVerify}
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
            </Button>
        </div>
    </div>
  );
};

export default OtpPage;
