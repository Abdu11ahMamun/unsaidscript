import React from "react";
import { Header } from "./Header";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      {/* background texture */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-black" />
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_10%,rgba(34,211,238,.22),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,.18),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <Header />
      <main>{children}</main>
    </div>
  );
}
