export type Project = {
  id: string;
  title: string;
  description: string;
  emoji?: string;
  tech: string[];
  href?: string;   // live demo
  github?: string; // repo
  stats?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    id: "ai-chat",
    title: "AI Chat Platform",
    description: "Real-time chat app with AI-powered features and smart replies.",
    emoji: "💬",
    tech: ["React", "Node.js", "OpenAI", "WebSocket"],
    href: "#",
    github: "#",
    stats: [
      { label: "Stars", value: "245" },
      { label: "Users", value: "1.2k" },
    ],
  },
  {
    id: "ecommerce-dashboard",
    title: "E-commerce Dashboard",
    description: "Analytics dashboard with real-time insights for e-commerce teams.",
    emoji: "📊",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    href: "#",
    github: "#",
    stats: [
      { label: "Stars", value: "189" },
      { label: "Users", value: "850" },
    ],
  },
  {
    id: "task-manager",
    title: "Task Management App",
    description: "Collaborative task manager with team features and integrations.",
    emoji: "✅",
    tech: ["React", "Firebase", "Tailwind", "Framer Motion"],
    href: "#",
    github: "#",
    stats: [
      { label: "Stars", value: "312" },
      { label: "Users", value: "2.1k" },
    ],
  },
];
