export type Project = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tech: string[];
  stars?: string;
  users?: string;
  demo?: string;
  github?: string;
  gradient?: string; // optional if you want later
};

export const projects: readonly Project[] = [
  {
    id: "ai-chat",
    title: "AI Chat Platform",
    description: "Real-time chat application with AI-powered features and smart replies",
    emoji: "💬",
    tech: ["React", "Node.js", "OpenAI", "WebSocket"],
    stars: "245",
    users: "1.2k",
    demo: "#",
    github: "#",
  },
  {
    id: "ecom-dash",
    title: "E-commerce Dashboard",
    description: "Analytics dashboard for e-commerce businesses with real-time insights",
    emoji: "📊",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    stars: "189",
    users: "850",
    demo: "#",
    github: "#",
  },
  {
    id: "task-app",
    title: "Task Management App",
    description: "Collaborative task management with team features and integrations",
    emoji: "✅",
    tech: ["React", "Firebase", "Tailwind", "Framer Motion"],
    stars: "312",
    users: "2.1k",
    demo: "#",
    github: "#",
  },
] as const;
