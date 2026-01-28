import React from "react";
import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { projects } from "../../../content/projects";
import { Card } from "../../components/ui/Card";

export function ProjectsSection() {
  return (
    <Section id="projects" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Projects"
          title="Featured work"
          subtitle="Clean UI, real outcomes, measurable impact."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.id} className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-4xl">{p.emoji ?? "✨"}</div>
                  <h3 className="mt-4 text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{p.description}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {p.stats?.length ? (
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  {p.stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      <div className="text-white/60">{s.label}</div>
                      <div className="mt-1 font-bold text-white">{s.value}</div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                {p.href ? (
                  <a
                    href={p.href}
                    className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-black transition hover:brightness-110"
                  >
                    Live
                  </a>
                ) : null}

                {p.github ? (
                  <a
                    href={p.github}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    GitHub
                  </a>
                ) : null}
              </div>

              <div className="mt-auto" />
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
