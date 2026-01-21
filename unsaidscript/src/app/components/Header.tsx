import React from "react";
import { Container } from "../../components/ui/Container"; // adjust if your Container lives elsewhere
import { site } from "../../content/site"; // adjust if needed

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <div className="font-black tracking-tight">{site.brand.name}</div>

          <nav className="hidden gap-6 text-sm text-white/70 md:flex">
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
