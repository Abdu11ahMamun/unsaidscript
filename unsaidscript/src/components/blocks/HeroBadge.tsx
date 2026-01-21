import React from "react";
import { cn } from "../../lib/cn";

type HeroBadgeProps = {
  className?: string;
  children: React.ReactNode;
};

export function HeroBadge({ className, children }: HeroBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-300",
        className
      )}
    >
      {children}
    </span>
  );
}
