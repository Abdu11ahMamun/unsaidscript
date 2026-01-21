import React from "react";
import { Container } from "../../components/ui/Container";
import { site } from "../../content/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} {site.brand.name}
          </div>
          <div className="text-sm text-white/40">{site.brand.tagline}</div>
        </div>
      </Container>
    </footer>
  );
}
