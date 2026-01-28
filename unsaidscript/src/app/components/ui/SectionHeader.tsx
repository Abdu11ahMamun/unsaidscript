import React from "react";
import { cn } from "../../../lib/cn"; // adjust path if needed

type SectionHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={cn("mb-10 md:mb-14", isCenter ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <div className="text-sm font-semibold text-cyan-300">{eyebrow}</div>
      ) : null}

      <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{title}</h2>

      {subtitle ? (
        <p className={cn("mt-4 text-base text-white/70 md:text-lg", isCenter ? "mx-auto max-w-2xl" : "max-w-2xl")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
