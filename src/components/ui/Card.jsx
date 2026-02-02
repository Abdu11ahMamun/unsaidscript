/**
 * Card component for consistent card styling
 * @module components/ui/Card
 */

import { motion } from "framer-motion";
import { cn } from "../../utils";

/**
 * Card component with hover animation and consistent styling
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {boolean} [props.hoverable] - Whether card has hover effects (default: true)
 * @returns {JSX.Element} Card element
 * @example
 * <Card onClick={() => console.log('clicked')}>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
export const Card = ({ children, className = "", onClick, hoverable = true }) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5 } : {}}
      onClick={onClick}
      className={cn(
        "bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6",
        hoverable && "cursor-pointer hover:border-zinc-700 transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
