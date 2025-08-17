import { ThemeProvider } from "@/components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store.ts";
import { Toaster } from "./components/ui/sonner.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
