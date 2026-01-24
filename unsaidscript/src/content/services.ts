import type { LucideIcon } from "lucide-react";
import { Code, Sparkles, Rocket } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Modern, responsive web apps built with clean architecture.",
    points: ["React + TypeScript", "Performance-first UI", "API integration"],
    icon: Code,
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Interfaces that feel calm, clear, and premium.",
    points: ["Design systems", "Prototypes & wireframes", "Accessibility-focused"],
    icon: Sparkles,
  },
  {
    id: "product",
    title: "Product Development",
    description: "From idea → MVP → iteration → ship.",
    points: ["MVP planning", "Testing & iteration", "Launch support"],
    icon: Rocket,
  },
];
