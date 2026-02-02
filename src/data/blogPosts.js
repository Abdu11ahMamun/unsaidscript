/**
 * Blog posts data for the portfolio
 * @type {Array<{id: number, title: string, excerpt: string, date: string, readTime: string, tags: string[], gradient: string}>}
 */
export const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Apps with React and TypeScript",
    excerpt:
      "Learn how to combine React with TypeScript to build type-safe, scalable web applications. Explore best practices and patterns.",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Web Development"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "The Art of API Design: Creating Developer-Friendly Interfaces",
    excerpt:
      "Discover principles and patterns for designing APIs that developers love to use. From REST to GraphQL and beyond.",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    tags: ["API", "Design", "Backend"],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    title: "Performance Optimization: Making Your React App Blazing Fast",
    excerpt:
      "Deep dive into React performance optimization techniques. Learn about memoization, lazy loading, and code splitting.",
    date: "Dec 28, 2025",
    readTime: "12 min read",
    tags: ["React", "Performance", "Optimization"],
    gradient: "from-orange-500 to-red-600",
  },
];

export default blogPosts;
