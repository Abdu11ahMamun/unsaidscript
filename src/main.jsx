import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PortfolioApp from "./portfolio/index.jsx";
import AdminApp from "./admin/index.jsx";

const isAdmin = window.location.pathname.startsWith("/admin");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : <PortfolioApp />}
  </StrictMode>
);
