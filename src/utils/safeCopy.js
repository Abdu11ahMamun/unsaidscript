/**
 * Safely copies text to clipboard with fallback for older browsers
 * @param {string} text - Text to copy to clipboard
 * @returns {Promise<boolean>} True if copy was successful, false otherwise
 * @example
 * const success = await safeCopy("Hello World");
 * if (success) console.log("Copied!");
 */
export const safeCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
};

export default safeCopy;
