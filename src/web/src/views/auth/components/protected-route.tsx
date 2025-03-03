import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../services/auth.context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
  requireAuth = true
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading or spinner while checking auth status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If requireAuth is true and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If requireAuth is false and user is authenticated, redirect to dashboard
  // This is for login/register pages that should not be accessible when logged in
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If all conditions pass, render the children
  return <>{children}</>;
}; 