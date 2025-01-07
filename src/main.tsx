import { createRoot } from "react-dom/client";
import { AppRouter } from "./AppRouter";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
