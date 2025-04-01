import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

import { App } from "./App.tsx";
import { ThemeProvider } from "@/hook/theme.tsx";
import { ContextStateProvider } from "./hook/state.tsx";
import { AuthProvider } from "./hook/auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ContextStateProvider>
        <AuthProvider>
          <App />
          <ToastContainer style={{ fontSize: 14 }} />
        </AuthProvider>
      </ContextStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
