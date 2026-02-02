/**
 * RoleType component for typewriter effect
 * @module components/animations/RoleType
 */

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animated typewriter component that cycles through roles
 * @param {Object} props - Component props
 * @param {string[]} props.roles - Array of role strings to cycle through
 * @returns {JSX.Element} Typewriter element
 * @example
 * <RoleType roles={["Developer", "Designer", "Creator"]} />
 */
export const RoleType = ({ roles }) => {
  const prefersReducedMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [dir, setDir] = useState("type");

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(roles[0] ?? "");
      return;
    }

    const current = roles[i] ?? "";
    let t;

    if (dir === "type") {
      t = window.setTimeout(() => {
        const next = current.slice(0, typed.length + 1);
        setTyped(next);
        if (next.length >= current.length) setDir("hold");
      }, 28);
    } else if (dir === "hold") {
      t = window.setTimeout(() => setDir("erase"), 950);
    } else {
      t = window.setTimeout(() => {
        const next = typed.slice(0, -1);
        setTyped(next);
        if (next.length === 0) {
          setI((v) => (v + 1) % roles.length);
          setDir("type");
        }
      }, 18);
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [dir, i, prefersReducedMotion, roles, typed]);

  return (
    <span className="inline-flex items-center gap-2 term">
      <span className="text-gray-500">{">"}</span>
      <span className="text-cyan-300">{typed}</span>
      <span className="caret -ml-1 text-cyan-200">▮</span>
    </span>
  );
};

export default RoleType;
