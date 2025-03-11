import { z } from "zod";

// Schema for the email step
export const emailStepSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

// Schema for the OTP step
export const otpStepSchema = z.object({
  email: z.string(),
  otp: z.string().length(6, "Please enter a valid 6-digit verification code"),
});

// Schema for the details step
export const detailsStepSchema = z.object({
  email: z.string().email(),
  otp: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

// Full registration schema (used for the form's type)
export const registrationSchema = detailsStepSchema;

export type RegistrationInput = z.infer<typeof registrationSchema>;
