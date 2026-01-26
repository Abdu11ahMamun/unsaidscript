export type Book = {
  id: string;
  title: string;
  author: string;
  rating: number; // 0-10
  category: string;
  summary: string;
};

export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    rating: 10,
    category: "Self-Help",
    summary: "A practical framework for building good habits and breaking bad ones through small, incremental changes.",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    rating: 9,
    category: "Productivity",
    summary: "Rules for focused success in a distracted world — how to cultivate deep focus and do exceptional work.",
  },
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    rating: 10,
    category: "Tech",
    summary: "The big ideas behind reliable, scalable, and maintainable systems for modern applications.",
  },
];
