import React, { useMemo, useState } from "react";
import { Container } from "../ui/Container";
import { site } from "../../content/site";
import { scrollToHash } from "../../lib/scroll";
import { useActiveSection } from "../../hooks/useActiveSection";


export function Header() {
  const [open, setOpen] = useState(false);

  const ids = useMemo(
    () => site.nav.map((n) => n.href).filter((h) => h.startsWith("#")).map((h) => h.slice(1)),
    []
  );

  const active = useActiveSection(ids);

  const onNav = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
    history.replaceState(null, "", href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" onClick={onNav("#top")} className="font-black tracking-tight">
            {site.brand.name}
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {site.nav.map((n) => {
              const id = n.href.startsWith("#") ? n.href.slice(1) : "";
              const isActive = id && active === id;

              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={onNav(n.href)}
                  className={[
                    "transition",
                    isActive ? "text-white" : "text-white/70 hover:text-white",
                  ].join(" ")}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile button */}
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open ? (
          <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-black/70 p-3 md:hidden">
            {site.nav.map((n) => {
              const id = n.href.startsWith("#") ? n.href.slice(1) : "";
              const isActive = id && active === id;

              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={onNav(n.href)}
                  className={[
                    "block rounded-xl px-3 py-2 text-sm font-semibold transition",
                    isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {n.label}
                </a>
              );
            })}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
