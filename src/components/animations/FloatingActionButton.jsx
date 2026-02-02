/**
 * FloatingActionButton component
 * @module components/animations/FloatingActionButton
 */

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";

/**
 * Floating action button for quick contact access
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler
 * @param {boolean} [props.visible] - Whether the FAB is visible (default: true)
 * @returns {JSX.Element} Floating action button element
 * @example
 * <FloatingActionButton onClick={() => setShowContact(true)} />
 */
export const FloatingActionButton = ({ onClick, visible = true }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25"
          aria-label="Contact me"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;
