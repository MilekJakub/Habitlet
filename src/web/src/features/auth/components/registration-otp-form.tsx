import { Body } from "@/components/typography/body";
import { Header } from "@/components/typography/header";
import { useAuth } from "@/features/auth/stores/auth.store";
import { useToast } from "@/hooks/use-toast";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { registrationSchema } from "@/features/auth/schemas/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";

const registrationOtpSchema = registrationSchema.pick({
  otp: true,
});

type RegistrationOtpSchema = z.infer<typeof registrationOtpSchema>;

export const RegistrationOtpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const {isRegistering, registrationEmail, verifyOtp} = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isRegistering || !registrationEmail) {
      navigate("/register");
    }
  }, [])

  const form = useForm<RegistrationOtpSchema>({
    resolver: zodResolver(registrationOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: RegistrationOtpSchema) => {
    try {
      setIsLoading(true);
      const response = await verifyOtp(registrationEmail!, values.otp);

      if (!response.success) {
        toast({
          title: "Verification failed",
          description: response.error!.message,
          variant: "destructive"
        })

        setIsLoading(false);

        return;
      }

      navigate("/register/user-details");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast({
          title: "Verification failed",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[32px]">
        <Header type="h2" className="w-full">
          Verify your email
        </Header>

        <Body type="b4">
          We've sent you a{" "}
          <span className="font-bold">confirmation code!</span>
        </Body>
        <Body type="b4">
          Please check your <span className="font-bold">email inbox</span> and
          enter the verification code below to continue.
        </Body>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  {...field}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
        </Button>
      </form>
    </Form>
  );
};
