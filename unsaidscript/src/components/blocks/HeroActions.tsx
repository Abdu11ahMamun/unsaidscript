import React from "react";
import { ArrowRight, Book } from "lucide-react";
import { cn } from "../../lib/cn";

type HeroActionsProps = {
  onPrimary?: () => void;
  onSecondary?: () => void;
  className?: string;
};

export function HeroActions({ onPrimary, onSecondary, className }: HeroActionsProps) {
  return (
    <div className={cn("mt-10 flex flex-wrap justify-center gap-4", className)}>
      <button
        onClick={onPrimary}
        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-bold shadow-2xl shadow-cyan-500/30 transition hover:brightness-110"
      >
        View Projects
        <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
      </button>

      <button
        onClick={onSecondary}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold backdrop-blur-xl transition hover:bg-white/10"
      >
        <Book size={20} />
        Read Notes
      </button>
    </div>
  );
}
