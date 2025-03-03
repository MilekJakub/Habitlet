import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "@/components/typography/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Body } from "@/components/typography/body";
import { Link } from "react-router";
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "../../services/auth.context";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signInWithEmail, signInWithGoogle, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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
          title: result.error?.message || "Failed to sign in. Please check your credentials.",
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

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      // This will redirect to Google's OAuth page, so no need to navigate
    } catch (error) {
      toast({
        title: "Failed to sign in with Google",
        variant: "destructive",
      });
      console.error(error);
      setIsGoogleLoading(false);
    }
  };

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsResetLoading(true);
    try {
      const result = await resetPassword(email);
      if (result.success) {
        toast({
          title: "Password reset email sent. Please check your inbox.",
        });
      } else {
        toast({
          title: result.error?.message || "Failed to send reset email",
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
      setIsResetLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col mx-auto w-fit h-fit gap-[64px] items-center justify-center self-center min-h-screen">
        <div className="flex flex-col w-fit gap-[32px] items-center max-w-[386px]">
          <Header type="h2" className="w-full">Sign in to your account</Header>
          <form onSubmit={handleEmailSignIn} className="flex flex-col w-full h-full gap-[16px]">
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
                {showPassword ? 
                  <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : 
                  <EyeOffIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                }
              </div>
              <Button 
                variant="link" 
                className="w-fit h-auto p-0 mt-1 text-sm" 
                onClick={handleResetPassword}
                disabled={isResetLoading}
              >
                {isResetLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                Forgot password?
              </Button>
            </div>
            
            <Button type="submit" variant="primary" disabled={isLoading} className="w-full">
              {isLoading ? (<Loader2 className="animate-spin" />) : "Sign In"}
            </Button>
          </form>
          <div className="flex flex-col gap-[8px]">
            <Body type="b4">Don't have an account? <Link className="link" to="/register">Sign up</Link></Body>
          </div>
          <div className="flex flex-row w-full items-center gap-[16px]">
            <hr className="w-full" />
            <Body type="b4" className="text-zinc-500 w-fit">OR</Body>
            <hr className="w-full" />
          </div>
          
          <div className="flex flex-col w-full">
            <Button onClick={handleGoogleSignIn} variant="google" disabled={isGoogleLoading} className="w-full">
                {isGoogleLoading ? (<Loader2 className="animate-spin" />) : (
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: "block"}}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              )}{" "}
                  Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage; 