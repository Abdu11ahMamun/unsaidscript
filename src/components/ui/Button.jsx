/**
 * Button component with variants
 * @module components/ui/Button
 */

import { motion } from "framer-motion";
import { cn } from "../../utils";

/**
 * Button component with multiple style variants
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant] - Button variant: 'primary' | 'secondary' | 'ghost' | 'outline'
 * @param {string} [props.size] - Button size: 'sm' | 'md' | 'lg'
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {boolean} [props.disabled] - Whether button is disabled
 * @param {string} [props.type] - Button type attribute
 * @returns {JSX.Element} Button element
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all rounded-full";
  
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800",
    outline: "border border-zinc-700 text-white hover:bg-zinc-800",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
