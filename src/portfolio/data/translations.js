// ⇄ GET /api/v1/translations
// The translation desk. Nothing published yet — this tracks the pipeline
// honestly: reading → shortlisting → drafting → polishing → published.
export const TRANSLATION_DESK = {
  focus: "Short fiction & essays — English ⇄ বাংলা",
  stage: "shortlisting",
  note:  "Re-reading the shelf with a translator's eye. The first text will announce itself.",
};

// Pipeline stages with progress (0–1). When a real project starts,
// give it a title and move it down the stages.
export const TRANSLATION_PIPELINE = [
  ["Reading with a translator's eye", 0.7],
  ["Shortlisting the first text",     0.35],
  ["Drafting",                        0],
  ["Polishing",                       0],
];

// When translations exist, they live here — same card shape as reviews.
export const TRANSLATIONS = [];
