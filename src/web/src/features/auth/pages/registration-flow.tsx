import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "@/components/typography/header";
import { Body } from "@/components/typography/body";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AuthLayout } from "@/layout/auth-layout";
import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthInput } from "@/features/auth/components/auth-input";
import { AuthService } from "@/features/auth/services/auth.service";
import {
  InputOTPGroup,
  InputOTPSlot,
  InputOTP,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useAuth } from "@/store/auth.store";
import {
  emailStepSchema,
  otpStepSchema,
  detailsStepSchema,
  registrationSchema,
  type RegistrationInput,
} from "../schemas/registration.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Step = "email" | "otp" | "details";

const INITIAL_FORM_DATA: RegistrationInput = {
  email: "",
  otp: "",
  username: "",
  password: "",
};

export const RegistrationFlow = () => {
  const navigate = useNavigate();
  const {
    signUpWithEmail,
    verifyOtp,
    updateUserDetails,
    user,
    isRegistering,
    setIsRegistering,
  } = useAuth();
  const [step, setStep] = useState<Step>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Get the current step's schema
  const getStepSchema = () => {
    switch (step) {
      case "email":
        return emailStepSchema;
      case "otp":
        return otpStepSchema;
      case "details":
        return detailsStepSchema;
      default:
        return emailStepSchema;
    }
  };

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(getStepSchema()),
    defaultValues: INITIAL_FORM_DATA,
    mode: "onChange",
  });

  // Update the form's validation schema when the step changes
  useEffect(() => {
    const currentValues = form.getValues();
    form.reset(currentValues, {
      keepValues: true,
      keepDirty: true,
      keepErrors: false,
      keepTouched: false,
      keepIsSubmitted: false,
      keepSubmitCount: false,
      keepIsValid: false,
      keepDefaultValues: false,
    });
    form.clearErrors();
  }, [step, form]);

  useEffect(() => {
    console.log("Form state:", {
      values: form.getValues(),
      errors: form.formState.errors,
      isValid: form.formState.isValid,
      isDirty: form.formState.isDirty,
    });
  }, [form.formState]);

  useEffect(() => {
    return () => {
      setIsRegistering(false);
    };
  }, [setIsRegistering]);

  const handleEmailStep = async (data: RegistrationInput) => {
    console.log("handleEmailStep called with data:", data);
    try {
      setIsLoading(true);
      console.log("Calling signUpWithEmail with:", data.email);
      const result = await signUpWithEmail(data.email);
      console.log("signUpWithEmail result:", result);
      if (result.success) {
        toast({
          title: "Verification email sent! Please check your inbox.",
        });
        setStep("otp");
      } else {
        toast({
          title:
            result.error?.message || "Failed to sign up. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpStep = async () => {
    try {
      const { email, otp } = form.getValues();

      setIsLoading(true);
      const result = await verifyOtp(email, otp);
      if (result.success) {
        toast({
          title: "Email verified successfully!",
        });
        setStep("details");
      } else {
        toast({
          title: result.error?.message || "Invalid verification code",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailsStep = async (data: RegistrationInput) => {
    try {
      if (!user?.id) {
        throw new Error(
          "User information is missing. Please try signing up again."
        );
      }

      setIsLoading(true);
      const result = await updateUserDetails(
        data.username,
        data.password,
        user.id
      );
      if (result.success) {
        toast({
          title: "Profile updated successfully!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: result.error?.message || "Failed to update profile",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGoogleLoading(true);
    try {
      const result = await AuthService.signInWithGoogle();
      if (!result.success) {
        toast({
          title: "Failed to sign in with Google",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // If not registering and user is authenticated, redirect to dashboard
  useEffect(() => {
    if (!isRegistering && user) {
      navigate("/dashboard");
    }
  }, [isRegistering, user, navigate]);

  const renderStep = () => {
    switch (step) {
      case "email":
        return (
          <div className="flex flex-col w-full gap-[32px]">
            <Header type="h2" className="w-full">
              Sign up for an account
            </Header>
            <AuthForm
              onSubmit={handleEmailStep}
              isLoading={isLoading}
              submitText="Continue"
              form={form}
            >
              <AuthInput
                id="email"
                label="Email"
                type="email"
                placeholder="user@example.com"
                disabled={isLoading}
                required
                register={form.register}
                error={form.formState.errors.email?.message}
              />
            </AuthForm>
            <div className="flex flex-col gap-[8px]">
              <Body type="b4">
                By signing up, you agree to our{" "}
                <Link className="link" to="/terms">
                  terms and conditions
                </Link>
                , and{" "}
                <Link className="link" to="/privacy">
                  privacy policy
                </Link>
                .
              </Body>
              <Body type="b4">
                Already have an account?{" "}
                <Link className="link" to="/login">
                  Login
                </Link>
              </Body>
            </div>
            <div className="flex flex-row w-full items-center gap-[16px]">
              <hr className="w-full" />
              <Body type="b4" className="text-zinc-500 w-fit">
                OR
              </Body>
              <hr className="w-full" />
            </div>
            <Button
              onClick={handleGoogleSignIn}
              variant="google"
              disabled={isGoogleLoading}
              className="w-full"
            >
              {isGoogleLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign in with Google"
              )}
            </Button>
          </div>
        );

      case "otp":
        return (
          <div className="flex flex-col w-full gap-[32px]">
            <Header type="h2" className="w-full">
              Verify your email
            </Header>
            <div className="flex flex-col w-full h-full items-center">
              <Body type="b4" className="w-full">
                We've sent you a{" "}
                <span className="font-bold">confirmation code!</span> <br />{" "}
                <br />
                Please check your <span className="font-bold">
                  email inbox
                </span>{" "}
                and enter the verification code below to continue.
              </Body>
            </div>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={form.watch("otp")}
              onChange={(value) => form.setValue("otp", value)}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <div className="flex gap-4 w-full">
              <Button
                variant="primary"
                onClick={handleOtpStep}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
              </Button>
            </div>
          </div>
        );

      case "details":
        return (
          <div className="flex flex-col w-full gap-[32px]">
            <Header type="h2">Complete your profile</Header>
            <AuthForm
              onSubmit={handleDetailsStep}
              isLoading={isLoading}
              submitText="Complete Registration"
              form={form}
            >
              <AuthInput
                id="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
                disabled={isLoading}
                required
                register={form.register}
                error={form.formState.errors.username?.message}
              />
              <AuthInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                disabled={isLoading}
                required
                showPasswordToggle
                showPassword={showPassword}
                onPasswordToggle={() => setShowPassword(!showPassword)}
                register={form.register}
                error={form.formState.errors.password?.message}
              />
            </AuthForm>
          </div>
        );
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col w-fit gap-[32px] items-center max-w-[386px]">
        {renderStep()}
      </div>
    </AuthLayout>
  );
};

export default RegistrationFlow;
