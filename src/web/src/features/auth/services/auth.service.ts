import { supabase } from "@/lib/supabase";
import { AuthError, PostgrestError, User } from "@supabase/supabase-js";

export type AuthServiceError = AuthError | PostgrestError | Error;

export interface AuthResponse {
  success: boolean;
  error?: AuthServiceError;
  user?: User;
}

interface SignUpParams {
  email: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface VerifyOtpParams {
  email: string;
  token: string;
}

interface UpdateUserDetailsParams {
  userId: string;
  username: string;
  password: string;
}

export class AuthService {
  static async signUpWithEmail({ email }: SignUpParams): Promise<AuthResponse> {
    try {
      if (!email) {
        return { success: false, error: new Error("Email is required.") };
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: {
            flow: "otp",
          },
        },
      });

      if (error) {
        return { success: false, error };
      }

      return { success: true };
    } catch (error) {
      console.error("Error signing up: ", error);

      if (error instanceof Error) {
        return { success: false, error };
      }

      return { success: false, error: new Error("An unexpected error occurred while singing up.") };
    }
  }

  static async signInWithEmail({ email, password }: SignInParams): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error("Error signing in: ", error);
        return { success: false, error: error as AuthServiceError };
      }

      if (!data.user) {
        console.error("User not found in response.");
        return { success: false, error: Error("User not found in response.") };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error("Error signing in: ", error);

      if (error instanceof Error) {
        return { success: false, error: error };
      }

      return { success: false, error: new Error("An unexpected error occurred while signing in.") };
    }
  }

  static async verifyOtp({ email, token }: VerifyOtpParams): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });

      if (error) {
        console.error("Error verifying OTP: ", error);
        return { success: false, error };
      }

      if (!data.user) {
        console.error("User not found in response.");
        return { success: false, error: new Error("User not found in response.") };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error("Error verifying OTP: ", error);

      if (error instanceof Error) {
        return { success: false, error };
      }

      return { success: false, error: new Error("An unexpected error occurred while verifying OTP.") };
    }
  }

  static async upsertUserDetails({
    userId,
    username,
    password,
  }: UpdateUserDetailsParams): Promise<AuthResponse> {
    try {
      const { error: updatePasswordError } = await supabase.auth.updateUser({ password });

      if (updatePasswordError) {
        console.error("Password update error:", updatePasswordError);
        return { success: false, error: updatePasswordError };
      }

      const { error: fetchProfilesError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchProfilesError) {
        const { error: insertUserProfileError } = await supabase
        .from("profiles")
        .insert([{ id: userId, username }]);

        if (insertUserProfileError) {
          console.error("Error creating profile:", insertUserProfileError);
          return { success: false, error: insertUserProfileError };
        }

        return { success: true };
      }

      const { error: updateUserProfileError } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", userId);

      if (updateUserProfileError) {
        console.error("Profile update error:", updateUserProfileError);
        return { success: false, error: updateUserProfileError };
      }

      return { success: true };
    } catch (error) {
      console.error("Error updating user details:", error);

      if (error instanceof Error) {
        return { success: false, error };
      }

      return { success: false, error: new Error("An unexpected error occurred while updating user details.") };
    }
  }

  static async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });

      if (error) {
        return { success: false, error };
      }

      return { success: true };
    } catch (error) {
      console.error("Error resetting password:", error);

      if (error instanceof Error) {
        return { success: false, error };
      }

      return { success: false, error: new Error("An unexpected error occurred while resetting password.") };
    }
  }

  static async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return { session: null, user: null };
      }

      return { session: data.session, user: data.session?.user };
    } catch (error) {
      console.error("Error getting session:", error);
      return { session: null, user: null };
    }
  }

  static async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { success: false, error };
      }

      return { success: true };
    } catch (error) {
      console.error("Error signing out:", error);
      return { success: false, error: error as AuthServiceError };
    }
  }
}
