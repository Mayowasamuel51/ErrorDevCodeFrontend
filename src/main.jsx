import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./context/ContextProvider.jsx";
const queryClient = new QueryClient();
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <App />
        <Analytics/>
      </ContextProvider>
    </QueryClientProvider>
    
  </React.StrictMode>
);
