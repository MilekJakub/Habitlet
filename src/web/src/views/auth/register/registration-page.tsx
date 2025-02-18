import React, { useState } from "react";
import { Header } from "@/components/typography/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Body } from "@/components/typography/body";
import { Link, NavLink } from "react-router";
import { Loader2 } from "lucide-react";

import "./registration-page.style.css";

export const RegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  return (
    <>
      <div className="flex flex-col mx-auto w-fit h-fit gap-[64px] items-center justify-center self-center min-h-screen justify-center">
        <div className="flex flex-col w-fit gap-[32px] items-center max-w-[386px]">
          <Header type="h2" className="w-full">Sign up for an account</Header>
          <div className="flex flex-col w-full h-full gap-[16px]">
            <Input id="email" type="email" placeholder="user@example.com" />
            <NavLink to="/confirm" end tabIndex={-1}>
              <Button onClick={() => {setIsLoading(true)}} variant="primary" disabled={isLoading} className="w-full">
                {isLoading ? (<Loader2 className="animate-spin" />) : "Sign Up"}
              </Button>
            </NavLink>
          </div>
            <div className="flex flex-col gap-[8px]">
              <Body type="b4">By signing up, you agree to our <Link className="link" to="/terms">terms and conditions</Link>, and <Link className="link" to="/privacy">privacy policy</Link>.</Body>
              <Body type="b4">Already have an account? <Link className="link" to="/login">Login</Link></Body>
            </div>
          <div className="flex flex-row w-full items-center gap-[16px]">
            <hr className="w-full" />
            <Body type="b4" className="text-zinc-500 w-fit">OR</Body>
            <hr className="w-full" />
          </div>
          
          <div className="flex flex-col w-full">
            
              <Button onClick={() => {setIsGoogleLoading(true)}} variant="google" disabled={isGoogleLoading} className="w-full">
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
