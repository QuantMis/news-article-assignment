import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NewsList from "./pages/NewsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateNews from "./pages/NewsCreate";
import NewsUpdate from "./pages/NewsUpdate";
import NewsDetail from "./pages/NewsDetail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/create-news" element={<CreateNews />} />
        <Route path="/update-news/:id" element={<NewsUpdate />} />
        <Route path="/:id" element={<NewsDetail />} />
      </Routes>
    </Router>
  </StrictMode>,
);
