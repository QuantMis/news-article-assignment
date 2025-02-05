import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NewsList from "./pages/NewsList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NewsList />
  </StrictMode>,
);
