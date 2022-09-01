import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/layout/App";
import { QueryClientProvider, QueryClient } from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
