import React from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className="absolute inset-0 -z-10" aria-hidden="true" />
      {children}
    </section>
  );
}
