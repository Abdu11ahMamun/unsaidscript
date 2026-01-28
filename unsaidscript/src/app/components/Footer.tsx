import { Container } from "../../components/ui/Container";
import { site } from "../../content/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-sm font-semibold text-white/70">
            © {new Date().getFullYear()} {site.brand.name}
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-sm">
            {site.contact.github ? (
              <a className="text-white/60 hover:text-white" href={site.contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
            {site.contact.linkedin ? (
              <a
                className="text-white/60 hover:text-white"
                href={site.contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            ) : null}
            {site.contact.email ? (
              <a className="text-white/60 hover:text-white" href={`mailto:${site.contact.email}`}>
                Email
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
