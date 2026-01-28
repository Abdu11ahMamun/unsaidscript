import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, subtitle, children }: ModalProps) {
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white/80 hover:bg-white/10"
        >
          Close
        </button>

        <h3 className="text-2xl font-black text-white">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
