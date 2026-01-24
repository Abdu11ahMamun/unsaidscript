import { ExternalLink, Github } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import type { Project } from "../../../content/projects";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="mt-2 text-sm text-white/60">{project.description}</p>
        </div>

        <div className="flex items-center gap-2">
          {project.href ? (
            <a
              href={project.href}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10"
              aria-label="Open demo"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}

          {project.repo ? (
            <a
              href={project.repo}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10"
              aria-label="Open repo"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </div>
  );
}
