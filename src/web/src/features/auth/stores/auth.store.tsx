import React, { useEffect } from "react";
import { AuthResponse, AuthService } from "@/features/auth/services/auth.service";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRegistering: boolean;
  registrationEmail: string | null;

  setUser: (user: User | null) => void;

  setRegistrationEmail: (email: string) => void;

  setIsLoading: (isLoading: boolean) => void;

  setIsRegistering: (isRegistering: boolean) => void;

  signUpWithEmail: (email: string) => Promise<AuthResponse>;

  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<AuthResponse>;

  verifyOtp: (
    email: string,
    token: string
  ) => Promise<AuthResponse>;

  upsertUserDetails: (
    userId: string,
    username: string,
    password: string
  ) => Promise<AuthResponse>;

  resetPassword: (email: string) => Promise<AuthResponse>;

  signOut: () => Promise<AuthResponse>;

  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isRegistering: false,
  registrationEmail: null,

  setUser: (user) => set({ user, isAuthenticated: !!user, }),

  setRegistrationEmail: (email: string) => set({ registrationEmail: email }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setIsRegistering: (isRegistering) => set({ isRegistering }),

  checkSession: async () => {
    set({ isLoading: true });
    try {
      const { user } = await AuthService.getSession();
      set({ user: user || null, isAuthenticated: !!user });
    } catch (error) {
      console.error("Error checking session:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signUpWithEmail: async (email) => {
    set({ registrationEmail: email, isRegistering: true });
    return await AuthService.signUpWithEmail({ email })
  },

  signInWithEmail: async (email, password) => {
    const result = await AuthService.signInWithEmail({ email, password });
    if (result.success && result.user) {
      set({
        user: result.user,
        isAuthenticated: true,
        isRegistering: false,
      });
    }
    return result;
  },

  verifyOtp: async (email, token) => {
    const result = await AuthService.verifyOtp({ email, token });
    if (result.success && result.user) {
      set({ user: result.user, isAuthenticated: true, isRegistering: false, registrationEmail: null });
    }
    return result;
  },

  upsertUserDetails: async (userId, username, password ) => {
    const result = await AuthService.upsertUserDetails({
      userId,
      username,
      password,
    });
    if (result.success) {
      set({ isRegistering: false });
    }
    return result;
  },

  resetPassword: async (email) => await AuthService.resetPassword(email),

  signOut: async () => {
    const result = await AuthService.signOut();
    if (result.success) {
      set({
        user: null,
        isAuthenticated: false,
        isRegistering: false,
      });
    }
    return result;
  },
}));

export const initializeAuthListener = () => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({
      user: session?.user || null,
      isAuthenticated: !!session?.user,
      isLoading: false,
    });
  });

  useAuthStore.getState().checkSession().then();

  return () => {
    subscription.unsubscribe();
  };
};

export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    return initializeAuthListener();
  }, []);

  return <>{children}</>;
};

export const useAuth = () => {
  return useAuthStore();
};
