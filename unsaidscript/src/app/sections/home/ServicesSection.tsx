import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { services } from "../../../content/services";

export function ServicesSection() {
  return (
    <Section id="services" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Services"
          title="What I do"
          subtitle="Freelance-ready delivery: design, build, polish."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <s.icon className="h-6 w-6 text-cyan-300" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.description}</p>

              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
