/**
 * Converts a string to a URL-friendly slug
 * @param {string} text - The text to slugify
 * @returns {string} URL-friendly slug
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start
    .replace(/-+$/, '');         // Trim - from end
}

/**
 * Converts a slug back to a readable title
 * @param {string} slug - The slug to convert
 * @returns {string} Readable title
 */
export function deslugify(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}
