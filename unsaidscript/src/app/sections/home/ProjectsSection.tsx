import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { projects } from "../../../content/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  return (
    <Section id="projects" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Projects"
          title="Featured work"
          subtitle="Clean UI, real outcomes, measurable impact."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
