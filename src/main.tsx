import { createRoot } from "react-dom/client";
import { AppRouter } from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </BrowserRouter>
);
