export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  rating10: number; // 0..10
  summary: string;
  emoji?: string;
  href?: string; // optional: link to review/article
};

export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    rating10: 10,
    emoji: "📘",
    summary: "A practical framework for building good habits and breaking bad ones through small, incremental changes.",
    href: "#",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    rating10: 9,
    emoji: "🧠",
    summary: "Rules for focused success in a distracted world. Learn to cultivate deep focus and produce exceptional results.",
    href: "#",
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    rating10: 9,
    emoji: "🚀",
    summary: "Contrarian thinking about innovation and competition — and how to build the future.",
    href: "#",
  },
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Tech",
    rating10: 10,
    emoji: "💾",
    summary: "The big ideas behind reliable, scalable, and maintainable systems for modern applications.",
    href: "#",
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    rating10: 9,
    emoji: "💻",
    summary: "A handbook of agile software craftsmanship — how to write code that’s clean and maintainable.",
    href: "#",
  },
];
