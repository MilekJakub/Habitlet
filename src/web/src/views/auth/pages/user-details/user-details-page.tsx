import React, { useState } from "react";
import { useNavigate } from "react-router";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { Header } from "@/components/typography/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../services/auth.context";
import { toast } from "@/hooks/use-toast";

export const UserDetailsPage = () => {
    const navigate = useNavigate();
    const { user, updateUserDetails } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!username || !password) {
        toast({
          title: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      if (password.length < 6) {
        toast({
          title: "Password must be at least 6 characters long",
          variant: "destructive",
        });
        return;
      }

      if (!user?.id) {
        toast({
          title: "User information is missing. Please try signing up again.",
          variant: "destructive",
        });
        navigate("/register");
        return;
      }

      setIsLoading(true);
      try {
        const result = await updateUserDetails(username, password, user.id);
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
      <div className="flex flex-col mx-auto w-full h-fit gap-[16px] items-center self-center min-h-screen justify-center">
        <div className="flex flex-col w-full h-full items-center max-w-[386px] gap-[32px]">
          <Header type="h2">Provide your details</Header>

          <form onSubmit={handleSubmit} className="flex flex-col w-full h-full gap-[16px]">
            <Label htmlFor="username" className="w-full">Username <span className="text-red-500">*</span></Label>
            <Input 
              required 
              id="username" 
              type="text" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />

            <Label htmlFor="password" className="w-full">Password <span className="text-red-500">*</span></Label>
            <div className="relative w-full">
                <Input 
                  required 
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
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    );
};

export default UserDetailsPage;