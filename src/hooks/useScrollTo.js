/**
 * Custom hook for smooth scrolling to elements
 * @module hooks/useScrollTo
 */

import { useCallback } from "react";

/**
 * Hook that provides a smooth scroll function to navigate to elements
 * @returns {Function} scrollTo - Function that scrolls to an element by ID
 * @example
 * const scrollTo = useScrollTo();
 * scrollTo('services'); // Scrolls to element with id="services"
 */
export const useScrollTo = () => {
  /**
   * Scrolls to an element smoothly
   * @param {string} id - The ID of the element to scroll to
   */
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return scrollTo;
};

export default useScrollTo;
