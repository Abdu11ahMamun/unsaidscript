import React from "react";
import { Container } from "../ui/Container";
import { site } from "../../content/site";


export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm font-semibold text-white/70">
            © {new Date().getFullYear()} {site.brand.name}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a
              href={`mailto:${site.contact.email}`}
              className="text-white/70 hover:text-white"
            >
              Email
            </a>
            <a
              href={site.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white"
            >
              GitHub
            </a>
            <a
              href={site.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
