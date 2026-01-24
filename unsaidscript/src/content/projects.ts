export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  href?: string;   // live/demo
  repo?: string;   // github
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "ai-chat",
    title: "AI Chat Platform",
    description: "Real-time chat with AI features, smart replies, and clean UX.",
    tech: ["React", "TypeScript", "Node.js", "WebSocket"],
    href: "#",
    repo: "#",
    featured: true,
  },
  {
    id: "ecom-dashboard",
    title: "E-commerce Dashboard",
    description: "Analytics dashboard for e-commerce businesses with real-time insights.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    href: "#",
    repo: "#",
    featured: true,
  },
  {
    id: "task-app",
    title: "Task Management App",
    description: "Collaborative task management with team features and integrations.",
    tech: ["React", "Firebase", "Tailwind", "Framer Motion"],
    href: "#",
    repo: "#",
  },
];
