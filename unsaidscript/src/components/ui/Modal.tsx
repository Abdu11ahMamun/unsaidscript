import React, { useEffect } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  rightSlot?: React.ReactNode; // e.g. copy button
  children: React.ReactNode;
};

export function Modal({ open, title, subtitle, onClose, rightSlot, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close overlay"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0b0f1a] p-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/80 transition hover:bg-white/10"
        >
          Close
        </button>

        <div className="flex flex-wrap items-start justify-between gap-3 pr-16">
          <div>
            {title ? <h3 className="text-2xl font-black">{title}</h3> : null}
            {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
          </div>
          {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
        </div>

        <div className="mt-5 text-white/80">{children}</div>
      </div>
    </div>
  );
}
