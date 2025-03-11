import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "@/features/landing/pages/landing-page";
import { RegistrationFlow } from "@/features/auth/pages/registration-flow";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-goals-page";
import { LoginPage } from "./features/auth/pages/login-page";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { RoadmapPage } from "@/features/roadmap/pages/roadmap-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
              <RegistrationFlow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute requireAuth={true} redirectTo="/">
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap/:goalId"
          element={
            <ProtectedRoute requireAuth={true} redirectTo="/">
              <RoadmapPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
