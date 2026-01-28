import React, { useState } from "react";
import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Modal } from "../../../components/ui/Modal";
import { projects, type Project } from "../../../content/projects";
import { ProjectCard } from "../../../components/blocks/ProjectCard";

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section id="projects" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Projects"
          title="Featured projects"
          subtitle="Clean UI, real outcomes, measurable impact."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </div>
      </Container>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        subtitle={selected ? selected.description : undefined}
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {selected.demo ? (
                <a
                  href={selected.demo}
                  className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-black transition hover:brightness-110"
                >
                  Live Demo
                </a>
              ) : null}

              {selected.github ? (
                <a
                  href={selected.github}
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  GitHub
                </a>
              ) : null}
            </div>

            <p className="text-sm text-white/50">
              (Later you can replace this modal body with a full project page route like /projects/:id.)
            </p>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
