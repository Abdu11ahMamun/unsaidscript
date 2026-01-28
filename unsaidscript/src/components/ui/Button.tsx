import React from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  className,
  variant = "secondary",
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: false;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition";
  const styles: Record<Variant, string> = {
    primary: "bg-cyan-500 text-black hover:brightness-110",
    secondary: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    ghost: "text-white/70 hover:text-white",
  };

  return <button className={cn(base, styles[variant], className)} {...props} />;
}

export function LinkButton({
  className,
  variant = "secondary",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition";
  const styles: Record<Variant, string> = {
    primary: "bg-cyan-500 text-black hover:brightness-110",
    secondary: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    ghost: "text-white/70 hover:text-white",
  };

  return <a className={cn(base, styles[variant], className)} {...props} />;
}
