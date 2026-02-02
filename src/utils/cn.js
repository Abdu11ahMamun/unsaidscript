/**
 * Utility function to conditionally join class names
 * @param {...(string|boolean|undefined|null)} classes - Class names to join
 * @returns {string} Joined class names
 * @example
 * cn("base-class", isActive && "active", "another-class")
 * // Returns: "base-class active another-class" if isActive is true
 */
export const cn = (...classes) => classes.filter(Boolean).join(" ");

export default cn;
