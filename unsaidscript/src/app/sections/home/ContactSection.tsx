import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { site } from "../../../content/site";

export function ContactSection() {
  return (
    <Section id="contact" className="py-20">
      <Container>
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl md:p-14">
          <SectionHeader
            eyebrow="Contact"
            title="Let’s build something"
            subtitle="If you need a clean, modern site (with vibe), I can help."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${site.contact.email}`}
              className="rounded-xl bg-cyan-500 px-7 py-3 text-sm font-bold text-black transition hover:brightness-110"
            >
              Send Email
            </a>

            <a
              href={site.contact.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              GitHub
            </a>

            <a
              href={site.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-8 text-xs text-white/50">
            Prefer email? <span className="text-white/70">{site.contact.email}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
