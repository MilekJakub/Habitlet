import { z } from "zod";

export const registrationSchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .regex(/^\d+$/, "OTP must be a number")
    .length(6, "OTP must be 6 digits"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(64, "Username must be less than 64 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(256, "Password must be less than 256 characters"),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
