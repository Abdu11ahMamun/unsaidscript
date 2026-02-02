/**
 * Projects data for the portfolio
 * @type {Array<{id: number, title: string, description: string, emoji: string, gradient: string, tech: string[], stars: string, users: string, demo: string, github: string}>}
 */
export const projects = [
  {
    id: 1,
    title: "AI Chat Platform",
    description: "Real-time chat application with AI-powered features and smart replies",
    emoji: "💬",
    gradient: "from-cyan-500 to-blue-600",
    tech: ["React", "Node.js", "OpenAI", "WebSocket"],
    stars: "245",
    users: "1.2k",
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "Analytics dashboard for e-commerce businesses with real-time insights",
    emoji: "📊",
    gradient: "from-purple-500 to-pink-600",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    stars: "189",
    users: "850",
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management with team features and integrations",
    emoji: "✅",
    gradient: "from-orange-500 to-red-600",
    tech: ["React", "Firebase", "Tailwind", "Framer Motion"],
    stars: "312",
    users: "2.1k",
    demo: "#",
    github: "#",
  },
];

export default projects;
