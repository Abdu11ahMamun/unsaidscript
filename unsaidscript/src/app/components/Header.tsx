import React from "react";
import { Container } from "../../components/ui/Container";
import { site } from "../../content/site";

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <a href="#top" className="font-black tracking-tight">
            {site.brand.name}
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>

          {/* Mobile button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile nav */}
        {open ? (
          <nav className="mt-4 grid gap-2 md:hidden">
            {site.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
