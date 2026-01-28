import React from "react";
import { cn } from "../../lib/cn";

export function Tag({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70",
        className
      )}
    >
      {children}
    </span>
  );
}
