import { supabase } from '@/lib/supabase';
import { AuthError, PostgrestError, User } from '@supabase/supabase-js';

// Combined error type for auth operations
export type AuthServiceError = AuthError | PostgrestError | Error;

// Common response type for auth operations
export interface AuthResponse<T = undefined> {
  success: boolean;
  error?: AuthServiceError;
  data?: T;
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
  username: string;
  password: string;
  userId: string;
}

interface SignInWithGoogleParams {
  redirectTo?: string;
}

export class AuthService {
  // Register with email
  static async signUpWithEmail({ email }: SignUpParams): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/auth/confirm',
          shouldCreateUser: true,
          data: {
            flow: 'otp'
          }
        },
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error signing up:', error);
      return { success: false, error: error as AuthServiceError };
    }
  }

  // Sign in with email and password
  static async signInWithEmail({ email, password }: SignInParams): Promise<AuthResponse<{ user: User }>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("User not found in response");
      }

      return { success: true, data: { user: data.user } };
    } catch (error) {
      console.error('Error signing in:', error);
      return { success: false, error: error as AuthServiceError };
    }
  }

  // Verify OTP token
  static async verifyOtp({ email, token }: VerifyOtpParams): Promise<AuthResponse<{ user: User }>> {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("User not found in response");
      }

      return { success: true, data: { user: data.user } };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { success: false, error: error as AuthServiceError };
    }
  }

  // Update user details (username and password)
  static async updateUserDetails({ username, password, userId }: UpdateUserDetailsParams): Promise<AuthResponse> {
    try {
      console.log('Starting user details update for userId:', userId);
      
      // First update auth user password
      const { error: passwordError } = await supabase.auth.updateUser({
        password,
      });

      if (passwordError) {
        console.error('Password update error:', passwordError);
        throw passwordError;
      }

      // Check if profile exists first
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        // If profile doesn't exist, create it
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: userId, username }]);
        
        if (insertError) {
          console.error('Error creating profile:', insertError);
          throw insertError;
        }
      } else {
        // Update existing profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ username })
          .eq('id', userId);

        if (profileError) {
          console.error('Profile update error:', profileError);
          throw profileError;
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating user details:', error);
      return { success: false, error: error as AuthServiceError };
    }
  }

  // Sign in with Google
  static async signInWithGoogle({ redirectTo = window.location.origin + '/dashboard' }: SignInWithGoogleParams = {}): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
        },
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return { success: false, error: error as AuthServiceError };
    }
  }

  // Reset password
  static async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, error: error as AuthServiceError };
    }
  }

  // Get current user session
  static async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      return { session: data.session, user: data.session?.user };
    } catch (error) {
      console.error('Error getting session:', error);
      return { session: null, user: null };
    }
  }

  // Sign out
  static async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error: error as AuthServiceError };
    }
  }
} 