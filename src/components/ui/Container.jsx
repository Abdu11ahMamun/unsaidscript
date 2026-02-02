/**
 * Container component for consistent page width and padding
 * @module components/ui/Container
 */

import { cn } from "../../utils";

/**
 * Container component that provides consistent max-width and horizontal padding
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Container element
 * @example
 * <Container className="py-8">
 *   <h1>Content</h1>
 * </Container>
 */
export const Container = ({ children, className = "" }) => {
  return (
    <div className={cn("max-w-6xl mx-auto px-6", className)}>
      {children}
    </div>
  );
};

export default Container;
