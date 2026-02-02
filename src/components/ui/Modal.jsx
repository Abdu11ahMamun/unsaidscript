/**
 * Modal component for displaying overlay content
 * @module components/ui/Modal
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn, safeCopy } from "../../utils";

/**
 * Modal component with backdrop and close functionality
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Close handler
 * @param {string} [props.title] - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.copyText] - Text to copy (shows copy button if provided)
 * @returns {JSX.Element} Modal element
 * @example
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="My Modal">
 *   <p>Modal content here</p>
 * </Modal>
 */
export const Modal = ({ isOpen, onClose, title, children, className = "", copyText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copyText) {
      const success = await safeCopy(copyText);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
              "bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              {title && (
                <h3 className="text-xl font-bold text-white">{title}</h3>
              )}
              <div className="flex items-center gap-2 ml-auto">
                {copyText && (
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-zinc-400" />
                    )}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
