import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ErrorBoundary } from "@/components/ui/error-boundry";
import { AuthInitializer } from "./store/auth.store";
import { Toaster } from "@/components/ui/toaster";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthInitializer>
        <App />
        <Toaster />
      </AuthInitializer>
    </ErrorBoundary>
  </StrictMode>
);
