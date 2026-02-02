/**
 * Custom hook for mobile menu state management
 * @module hooks/useMobileMenu
 */

import { useState, useCallback, useEffect } from "react";

/**
 * Hook that manages mobile menu open/close state with body scroll locking
 * @returns {Object} Mobile menu state and handlers
 * @property {boolean} isOpen - Whether the menu is open
 * @property {Function} open - Opens the menu
 * @property {Function} close - Closes the menu
 * @property {Function} toggle - Toggles the menu state
 * @example
 * const { isOpen, open, close, toggle } = useMobileMenu();
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Opens the mobile menu
   */
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * Closes the mobile menu
   */
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Toggles the mobile menu state
   */
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle };
};

export default useMobileMenu;
