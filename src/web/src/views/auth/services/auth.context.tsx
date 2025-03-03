import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { AuthService, AuthResponse } from './auth.service';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUpWithEmail: (email: string) => Promise<AuthResponse>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResponse<{ user: User }>>;
  verifyOtp: (email: string, token: string) => Promise<AuthResponse<{ user: User }>>;
  updateUserDetails: (username: string, password: string, userId: string) => Promise<AuthResponse>;
  signInWithGoogle: () => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;
  tempEmail: string | null;
  setTempEmail: (email: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tempEmail, setTempEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on component mount
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const { user } = await AuthService.getSession();
        setUser(user || null);
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUpWithEmail = async (email: string) => {
    setTempEmail(email);
    return await AuthService.signUpWithEmail({ email });
  };

  const signInWithEmail = async (email: string, password: string) => {
    const result = await AuthService.signInWithEmail({ email, password });
    if (result.success && result.data?.user) {
      setUser(result.data.user);
    }
    return result;
  };

  const verifyOtp = async (email: string, token: string) => {
    const result = await AuthService.verifyOtp({ email, token });
    if (result.success && result.data?.user) {
      setUser(result.data.user);
    }
    return result;
  };

  const updateUserDetails = async (username: string, password: string, userId: string) => {
    return await AuthService.updateUserDetails({ username, password, userId });
  };

  const signInWithGoogle = async () => {
    return await AuthService.signInWithGoogle();
  };

  const resetPassword = async (email: string) => {
    setTempEmail(email);
    return await AuthService.resetPassword(email);
  };

  const signOut = async () => {
    const result = await AuthService.signOut();
    if (result.success) {
      setUser(null);
      setTempEmail(null);
    }
    return result;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signUpWithEmail,
    signInWithEmail,
    verifyOtp,
    updateUserDetails,
    signInWithGoogle,
    resetPassword,
    signOut,
    tempEmail,
    setTempEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 