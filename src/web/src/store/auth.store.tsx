import React, { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import {
  AuthService,
  AuthResponse,
} from "@/features/auth/services/auth.service";
import { supabase } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRegistering: boolean;
  tempEmail: string | null;
  
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTempEmail: (email: string | null) => void;
  setIsRegistering: (isRegistering: boolean) => void;
  
  signUpWithEmail: (email: string) => Promise<AuthResponse>;
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<AuthResponse<{ user: User }>>;
  verifyOtp: (
    email: string,
    token: string
  ) => Promise<AuthResponse<{ user: User }>>;
  updateUserDetails: (
    username: string,
    password: string,
    userId: string
  ) => Promise<AuthResponse>;
  signInWithGoogle: () => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isRegistering: false,
  tempEmail: null,
  
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user 
  }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setTempEmail: (tempEmail) => set({ tempEmail }),
  setIsRegistering: (isRegistering) => set({ isRegistering }),
  
  checkSession: async () => {
    set({ isLoading: true });
    try {
      const { user } = await AuthService.getSession();
      set({
        user: user || null,
        isAuthenticated: !!user
      });
    } catch (error) {
      console.error("Error checking session:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
  
  signUpWithEmail: async (email) => {
    set({ tempEmail: email, isRegistering: true });
    return await AuthService.signUpWithEmail({ email });
  },
  
  signInWithEmail: async (email, password) => {
    const result = await AuthService.signInWithEmail({ email, password });
    if (result.success && result.data?.user) {
      set({
        user: result.data.user,
        isAuthenticated: true,
        isRegistering: false
      });
    }
    return result;
  },
  
  verifyOtp: async (email, token) => {
    const result = await AuthService.verifyOtp({ email, token });
    if (result.success && result.data?.user) {
      set({
        user: result.data.user,
        isAuthenticated: true
      });
    }
    return result;
  },
  
  updateUserDetails: async (username, password, userId) => {
    const result = await AuthService.updateUserDetails({
      username,
      password,
      userId,
    });
    if (result.success) {
      set({ isRegistering: false });
    }
    return result;
  },
  
  signInWithGoogle: async () => {
    const result = await AuthService.signInWithGoogle();
    if (result.success) {
      set({ isRegistering: false });
    }
    return result;
  },
  
  resetPassword: async (email) => {
    set({ tempEmail: email });
    return await AuthService.resetPassword(email);
  },
  
  signOut: async () => {
    const result = await AuthService.signOut();
    if (result.success) {
      set({
        user: null,
        isAuthenticated: false,
        tempEmail: null,
        isRegistering: false
      });
    }
    return result;
  },
}));

export const initializeAuthListener = () => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({
      user: session?.user || null,
      isAuthenticated: !!session?.user,
      isLoading: false
    });
  });

  useAuthStore.getState().checkSession();
  
  return () => {
    subscription.unsubscribe();
  };
};

export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const cleanup = initializeAuthListener();
    return cleanup;
  }, []);

  return <>{children}</>;
};

export const useAuth = () => {
  const state = useAuthStore();
  return state;
};
