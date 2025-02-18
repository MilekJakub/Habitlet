import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { WelcomePage } from "@/views/auth/welcome/welcome-page";
import { DevPage } from "@/views/dev/dev-page";
import { RegistrationPage } from "@/views/auth/register/registration-page";
import { OtpPage } from "@/views/auth/otp/otp-page";
import { UserDetailsPage } from "@/views/auth/user-details/user-details-page";
import { DashboardPage } from "@/views/dashboard/dashboard-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/confirm" element={<OtpPage />} />
        <Route path="/details" element={<UserDetailsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
