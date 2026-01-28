import React from "react";
import { cn } from "../../../lib/cn"; // adjust path

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
}
