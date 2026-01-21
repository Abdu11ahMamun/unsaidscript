import { i } from "framer-motion/client";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
