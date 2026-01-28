export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  gradient?: string; // optional tailwind gradient
};

export const blogPosts: BlogPost[] = [
  {
    id: "react-ts",
    title: "Building Modern Web Apps with React and TypeScript",
    excerpt:
      "Combine React with TypeScript to build type-safe, scalable web applications. Best practices, patterns, and pitfalls.",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Web Development"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "api-design",
    title: "The Art of API Design: Creating Developer-Friendly Interfaces",
    excerpt:
      "Principles and patterns for designing APIs developers love. From REST to GraphQL and beyond.",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    tags: ["API", "Design", "Backend"],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "perf",
    title: "Performance Optimization: Making Your React App Blazing Fast",
    excerpt:
      "Memoization, lazy loading, code splitting, and real-world performance tactics for React apps.",
    date: "Dec 28, 2025",
    readTime: "12 min read",
    tags: ["React", "Performance", "Optimization"],
    gradient: "from-orange-500 to-red-600",
  },
];
