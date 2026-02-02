/**
 * IntroLoader component for initial page load animation
 * @module components/animations/IntroLoader
 */

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Full-screen intro loader with brand animation
 * @param {Object} props - Component props
 * @param {boolean} props.show - Whether to show the loader
 * @returns {JSX.Element} Intro loader element
 * @example
 * const { showIntro } = useIntroLoader();
 * <IntroLoader show={showIntro} />
 */
export const IntroLoader = ({ show }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
        >
          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <div className="text-5xl font-black md:text-6xl">
                <span className="text-shimmer">UnsaidScript</span>
              </div>
              <div className="mt-2 text-sm font-semibold text-gray-400">by Abdullah</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
              className="relative"
            >
              <div className="h-14 w-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/70"
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                style={{ borderTopColor: "rgba(0,0,0,0)", borderRightColor: "rgba(0,0,0,0)" }}
              />
            </motion.div>

            <div className="term text-xs text-gray-500">initializing vibe…</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroLoader;
