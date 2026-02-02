import { Code, Sparkles, Rocket } from "lucide-react";

/**
 * Services data for the portfolio
 * @type {Array<{icon: React.ComponentType, title: string, description: string, features: string[], gradient: string}>}
 */
export const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with the latest technologies.",
    features: [
      "React & Next.js applications",
      "Responsive design & animations",
      "Performance optimization",
      "API integration",
    ],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love to interact with.",
    features: [
      "User interface design",
      "Prototyping & wireframing",
      "Design systems",
      "User experience optimization",
    ],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Rocket,
    title: "Product Development",
    description: "End-to-end product development from concept to deployment.",
    features: [
      "MVP development",
      "Feature planning",
      "Testing & iteration",
      "Launch & maintenance",
    ],
    gradient: "from-orange-500 to-red-600",
  },
];

export default services;
