import { Body } from "@/components/typography/body";
import { Header } from "@/components/typography/header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { Input } from "@/components/ui/input";
import { registrationSchema } from "@/features/auth/schemas/registration.schema";
import { useAuth } from "@/features/auth/stores/auth.store";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { useNavigate } from "react-router";

const registrationEmailSchema = registrationSchema.pick({
  email: true,
});

type RegistrationEmailSchema = z.infer<typeof registrationEmailSchema>;

export const RegistrationEmailForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { signUpWithEmail, setRegistrationEmail } = useAuth();
  const { toast } = useToast();

  const form = useForm<RegistrationEmailSchema>({
    resolver: zodResolver(registrationEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: RegistrationEmailSchema) => {
    setIsLoading(true);
    try {
      await signUpWithEmail(values.email);
      navigate("/register/otp");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full gap-[16px]"
        >
          <Header type="h2" className="w-full">
            Sign up for an account
          </Header>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Email address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type={"email"}
                    placeholder={"user@company.com"}
                    {...field}
                  />
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
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </Button>
        </form>
      </Form>

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

      <div className="flex flex-col w-full">
        <Button variant="google" className="w-full">
          <GoogleIcon /> Sign in with Google
        </Button>
      </div>
    </>
  );
};
