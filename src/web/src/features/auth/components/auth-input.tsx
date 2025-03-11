import React from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormRegister } from "react-hook-form";

interface AuthInputProps {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  showPassword?: boolean;
  error?: string;
  register?: UseFormRegister<{
    email: string;
    password: string;
    username: string;
    otp: string;
  }>;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  showPasswordToggle = false,
  onPasswordToggle,
  showPassword = false,
  error,
  register,
}) => {
  return (
    <FormItem className="w-full">
      <FormLabel>
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            id={id}
            type={showPasswordToggle && showPassword ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            {...register}
          />
          {showPasswordToggle &&
            (showPassword ? (
              <EyeIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer"
                onClick={onPasswordToggle}
              />
            ) : (
              <EyeOffIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-[16px] h-[16px] cursor-pointer"
                onClick={onPasswordToggle}
              />
            ))}
        </div>
      </FormControl>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};
