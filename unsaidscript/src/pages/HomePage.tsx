import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { site } from "../content/site";

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Section className="py-16">
        <Container>
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-cyan-300">{site.brand.tagline}</div>

            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              {site.brand.name}
              <span className="text-white/60"> — by {site.brand.author}</span>
            </h1>

            <p className="mt-5 text-base text-white/70 md:text-lg">
              {site.brand.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-black transition hover:brightness-110"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact
              </a>
            </div>

  
          </div>
        </Container>
      </Section>
    </div>
  );
}
