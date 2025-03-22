import { Header } from "@/components/typography/header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registrationSchema } from "@/features/auth/schemas/registration.schema";
import { useAuth } from "@/features/auth/stores/auth.store";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";

const userDetailsRegistrationSchema = registrationSchema.pick({
  username: true,
  password: true,
});

type RegistrationSchema = z.infer<typeof userDetailsRegistrationSchema>;

export const RegistrationUserDetailsForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {user,upsertUserDetails} = useAuth();
  const { toast } = useToast();

  const onPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<RegistrationSchema>({
    resolver: zodResolver(userDetailsRegistrationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegistrationSchema) => {
    try {
      setIsLoading(true);
      await upsertUserDetails(user!.id!, values.username, values.password);
      navigate("/goals");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[16px]">
        <Header type="h2">Complete your profile</Header>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  placeholder={"Enter your username"}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={"Enter your password"}
                    {...field}
                  />
                  {showPassword ? (
                    <EyeIcon
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer"
                      onClick={onPasswordToggle}
                    />
                  ) : (
                    <EyeOffIcon
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer"
                      onClick={onPasswordToggle}
                    />
                  )}
                </div>
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
          {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button>
      </form>
    </Form>
  );
};
