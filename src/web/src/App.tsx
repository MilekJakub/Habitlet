import React from "react";
import { RegistrationOtpPage } from "@/features/auth/pages/registration-otp-page";
import { RegistrationUserDetailsPage } from "@/features/auth/pages/registration-user-details-page";
import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "@/features/landing/pages/landing-page";
import { RegistrationEmailPage } from "@/features/auth/pages/registration-email-page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-goals-page";
import { LoginPage } from "./features/auth/pages/login-page";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { RoadmapPage } from "@/features/roadmap/pages/roadmap-page";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={false}>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute requireAuth={false}>
              <RegistrationEmailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register/otp"
          element={
            <ProtectedRoute requireAuth={false}>
              <RegistrationOtpPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register/user-details"
          element={
            <ProtectedRoute requireAuth={false}>
              <RegistrationUserDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute requireAuth={true}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap/:goalId"
          element={
            <ProtectedRoute requireAuth={true}>
              <RoadmapPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
