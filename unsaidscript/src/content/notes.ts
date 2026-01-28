export type Note = {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
  gradient?: string; // tailwind gradient (optional)
};

export const notes: Note[] = [
  {
    id: "rumi",
    title: "Rumi — small notes",
    subtitle: "On love, motion, and the quiet instruction of the heart",
    gradient: "from-cyan-500 to-blue-600",
    bullets: [
      "A good interface should feel like a poem: minimal words, maximum meaning.",
      "Design is also longing: you build the thing you wish existed.",
      "Clarity is kindness. Beauty is a shortcut to attention.",
    ],
  },
  {
    id: "kafka",
    title: "Kafka — systems & absurdity",
    subtitle: "On rules, hidden constraints, and user journeys",
    gradient: "from-purple-500 to-pink-600",
    bullets: [
      "If the user feels lost, the system is speaking in riddles.",
      "Reduce invisible rules: make state, errors, and next steps obvious.",
      "Good UX is removing the courtroom from the experience.",
    ],
  },
  {
    id: "murakami",
    title: "Murakami — atmosphere",
    subtitle: "On vibe, space, and letting the page breathe",
    gradient: "from-orange-500 to-red-600",
    bullets: [
      "Whitespace is narrative pacing.",
      "Motion should be slow and intentional; never anxious.",
      "Every section needs a mood: Projects (bold), Notes (dreamy), Blog (editorial).",
    ],
  },
];
