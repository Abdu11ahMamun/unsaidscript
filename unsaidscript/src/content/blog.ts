export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;     // keep it simple for now (later we can use ISO + formatter)
  readTime: string; // "8 min read"
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "react-ts",
    title: "Building Modern Web Apps with React and TypeScript",
    excerpt:
      "Learn how to combine React with TypeScript to build type-safe, scalable web applications. Explore best practices and patterns.",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Web Development"],
  },
  {
    id: "api-design",
    title: "The Art of API Design: Creating Developer-Friendly Interfaces",
    excerpt:
      "Discover principles and patterns for designing APIs that developers love to use. From REST to GraphQL and beyond.",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    tags: ["API", "Design", "Backend"],
  },
  {
    id: "perf",
    title: "Performance Optimization: Making Your React App Blazing Fast",
    excerpt:
      "Deep dive into React performance optimization techniques. Learn about memoization, lazy loading, and code splitting.",
    date: "Dec 28, 2025",
    readTime: "12 min read",
    tags: ["React", "Performance", "Optimization"],
  },
];
