import React from "react";
import type { Project } from "../../content/projects";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group w-full text-left rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-5xl">{project.emoji}</div>
          <h3 className="mt-4 text-xl font-bold text-white">{project.title}</h3>
          <p className="mt-2 text-sm text-white/60">{project.description}</p>
        </div>
        <span className="mt-1 text-white/40 transition group-hover:text-white/70">↗</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs text-white/50">
        {project.stars ? <span>★ {project.stars}</span> : null}
        {project.users ? <span>👥 {project.users}</span> : null}
      </div>
    </button>
  );
}
