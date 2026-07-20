import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import PortfolioApp from "./portfolio/index.jsx";

/* The admin studio is lazy-loaded: its code lives in a separate chunk that
   normal visitors never download — it is only fetched on /admin. */
const AdminApp = lazy(() => import("./admin/index.jsx"));

const isAdmin = window.location.pathname.startsWith("/admin");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isAdmin
      ? <Suspense fallback={null}><AdminApp /></Suspense>
      : <PortfolioApp />}
  </StrictMode>
);
