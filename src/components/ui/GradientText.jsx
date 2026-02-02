/**
 * GradientText component for stylized text with gradient
 * @module components/ui/GradientText
 */

import { cn } from "../../utils";

/**
 * GradientText component that renders text with a gradient color effect
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Text content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Span element with gradient text
 * @example
 * <h1>
 *   Hello, <GradientText>World</GradientText>
 * </h1>
 */
export const GradientText = ({ children, className = "" }) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
};

export default GradientText;
