/**
 * Custom hook for intro loader state management
 * @module hooks/useIntroLoader
 */

import { useState, useEffect } from "react";

/**
 * Hook that manages intro loader visibility with auto-dismiss
 * @param {number} duration - Duration in ms before loader dismisses (default: 2500)
 * @returns {Object} Loader state and handlers
 * @property {boolean} showIntro - Whether the intro loader is visible
 * @property {Function} dismiss - Manually dismisses the loader
 * @example
 * const { showIntro, dismiss } = useIntroLoader(3000);
 */
export const useIntroLoader = (duration = 2500) => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  /**
   * Manually dismisses the intro loader
   */
  const dismiss = () => setShowIntro(false);

  return { showIntro, dismiss };
};

export default useIntroLoader;
