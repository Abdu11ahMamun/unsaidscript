/**
 * Converts a rating (0-10) to a star count (0-5)
 * @param {number} rating - Rating value between 0 and 10
 * @returns {number} Star count between 0 and 5
 * @example
 * ratingToStars(8) // Returns: 4
 * ratingToStars(10) // Returns: 5
 */
export const ratingToStars = (rating) => 
  Math.round((Math.max(0, Math.min(10, rating)) / 10) * 5);

/**
 * Builds a copyable text from a note object
 * @param {Object} note - Note object with title, subtitle, and bullets
 * @param {string} note.title - Note title
 * @param {string} note.subtitle - Note subtitle
 * @param {string[]} note.bullets - Array of bullet points
 * @returns {string} Formatted text for copying
 */
export const buildNoteCopy = (note) => {
  const lines = [
    `# ${note.title}`,
    note.subtitle,
    "",
    "Key points:",
    ...note.bullets.map((b) => `- ${b}`),
  ];
  return lines.join("\n");
};

/**
 * Navigation menu items
 */
export const NAV_ITEMS = ["Services", "Projects", "Books", "Notes", "Blog", "Contact"];

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  email: "mailto:cs.abdullah@gmail.com",
  github: "https://github.com/Abdu11ahMamun",
  linkedin: "https://www.linkedin.com/in/abdu11ahmamun/",
};

export default {
  ratingToStars,
  buildNoteCopy,
  NAV_ITEMS,
  SOCIAL_LINKS,
};
