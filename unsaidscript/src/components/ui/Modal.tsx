import React, { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  title,
  subtitle,
  onClose,
  actions,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-white">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>

        <div className="mt-6 text-white/80">{children}</div>
      </div>
    </div>
  );
}
