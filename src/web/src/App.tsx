import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { WelcomePage } from "./components/userManagement/welcome/welcomePage";
import { DevPage } from "./components/dev/devPage";
import { RegistrationPage } from "./components/userManagement/register/registrationPage";
import { OtpPage } from "./components/userManagement/otp/otpPage";
import { UserDetailsPage } from "./components/userManagement/details/userDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/confirm" element={<OtpPage />} />
        <Route path="/details" element={<UserDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
