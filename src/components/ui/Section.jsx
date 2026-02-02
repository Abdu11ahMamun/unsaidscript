/**
 * Section wrapper component for page sections
 * @module components/ui/Section
 */

import { cn } from "../../utils";

/**
 * Section component that wraps content with consistent padding and optional background
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} [props.id] - Section ID for navigation
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.dark] - Whether to use dark background
 * @returns {JSX.Element} Section element
 * @example
 * <Section id="services" dark>
 *   <Container>
 *     <h2>Services</h2>
 *   </Container>
 * </Section>
 */
export const Section = ({ children, id, className = "", dark = false }) => {
  return (
    <section
      id={id}
      className={cn(
        "py-24 relative",
        dark ? "bg-zinc-900/50" : "",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
