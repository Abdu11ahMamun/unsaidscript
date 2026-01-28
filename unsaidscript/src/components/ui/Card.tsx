import React from "react";
import { cn } from "@/lib/cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]",
        "transition hover:border-white/20 hover:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}
