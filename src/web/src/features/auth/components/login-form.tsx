import { Body } from "@/components/typography/body";
import { Header } from "@/components/typography/header";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/stores/auth.store";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

export const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signInWithEmail, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please enter your email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await signInWithEmail(email, password);
      if (result.success) {
        toast({
          title: "Logged in successfully!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title:
            result.error?.message ||
            "Failed to sign in. Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.MouseEvent) => {
  }

  return (
    <>
      <div className="flex flex-col mx-auto w-fit h-fit gap-[64px] items-center justify-center self-center min-h-screen">
        <div className="flex flex-col w-fit gap-[32px] items-center max-w-[386px]">
          <Header type="h2" className="w-full">
            Sign in to your account
          </Header>
          <form
            onSubmit={handleEmailSignIn}
            className="flex flex-col w-full h-full gap-[16px]"
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isResetLoading}
              />
            </div>

            <div className="relative w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                {showPassword ? (
                  <EyeIcon
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOffIcon
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <Button
                variant="link"
                className="w-fit h-auto p-0 mt-1 text-sm"
                onClick={handleResetPassword}
                disabled={isResetLoading}
              >
                {isResetLoading ? (
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                ) : null}
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
          <div className="flex flex-col gap-[8px]">
            <Body type="b4">
              Don't have an account?{" "}
              <Link className="link" to="/register">
                Sign up
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
        </div>
      </div>
    </>
  );
}