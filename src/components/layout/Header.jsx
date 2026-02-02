/**
 * Header component with navigation
 * @module components/layout/Header
 */

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../../utils";
import { useScrollTo, useMobileMenu } from "../../hooks";

/**
 * Fixed header with navigation and mobile menu
 * @returns {JSX.Element} Header element
 * @example
 * <Header />
 */
export const Header = () => {
  const scrollTo = useScrollTo();
  const { isOpen, toggle, close } = useMobileMenu();

  const handleNavClick = (id) => {
    scrollTo(id);
    close();
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="text-xl font-black text-white hover:text-cyan-400 transition-colors"
          >
            UnsaidScript
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggle}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  className="text-2xl font-bold text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
