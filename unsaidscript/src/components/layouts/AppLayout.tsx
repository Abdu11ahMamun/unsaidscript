import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";


export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
