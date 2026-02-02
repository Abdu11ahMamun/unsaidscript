/**
 * TerminalPanel component for terminal-style display
 * @module components/terminal/TerminalPanel
 */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Terminal } from "lucide-react";
import { cn } from "../../utils";
import { Card } from "../ui";

/**
 * Animated terminal panel that cycles through commands and outputs
 * @returns {JSX.Element} Terminal panel element
 * @example
 * <TerminalPanel />
 */
export const TerminalPanel = () => {
  const prefersReducedMotion = useReducedMotion();

  const script = useMemo(
    () => [
      {
        cmd: "$ whoami",
        out: [
          { t: "Abdullah Al Mamun", c: "text-cyan-200" },
          { t: "Software Engineer • Researcher • Reader • Believer", c: "text-purple-200" },
          { t: "brand: UnsaidScript", c: "text-emerald-200" },
        ],
      },
      {
        cmd: '$ echo "signal"',
        out: [
          { t: "shipping calm UI with strong systems", c: "text-emerald-200" },
          { t: "writing notes that stay useful", c: "text-gray-400" },
        ],
      },
      {
        cmd: "$ git status",
        out: [
          { t: "On branch main", c: "text-gray-200" },
          { t: "nothing to commit, working tree clean", c: "text-emerald-200" },
        ],
      },
      {
        cmd: "$ npm test",
        out: [
          { t: "PASS  ui/portfolio.spec.ts", c: "text-emerald-200" },
          { t: "✓ 18 tests passed", c: "text-cyan-200" },
          { t: "Time: 0.98s", c: "text-gray-400" },
        ],
      },
      {
        cmd: "$ focus --now",
        out: [
          { t: "→ ship clean UI + fast UX", c: "text-pink-200" },
          { t: "→ write notes like poems (but useful)", c: "text-purple-200" },
        ],
      },
    ],
    []
  );

  const [block, setBlock] = useState(0);
  const [typed, setTyped] = useState("");
  const [doneCmd, setDoneCmd] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(script[block]?.cmd ?? "");
      setDoneCmd(true);
      return;
    }

    const cmd = script[block]?.cmd ?? "";
    setTyped("");
    setDoneCmd(false);

    let i = 0;
    const type = window.setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        window.clearInterval(type);
        setDoneCmd(true);
      }
    }, 20);

    return () => window.clearInterval(type);
  }, [block, prefersReducedMotion, script]);

  useEffect(() => {
    if (!doneCmd) return;

    const t = window.setTimeout(() => {
      setBlock((b) => (b + 1) % script.length);
    }, prefersReducedMotion ? 2300 : 3300);

    return () => window.clearTimeout(t);
  }, [doneCmd, prefersReducedMotion, script.length]);

  const current = script[block];

  return (
    <Card className="term term-glow term-scanlines relative mx-auto mt-10 max-w-4xl overflow-hidden p-0">
      {/* Header */}
      <div className="relative border-b border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
            <Terminal size={16} className="text-cyan-300" aria-hidden="true" />
            <span className="text-gray-200">dev@unsaid</span>
            <span className="text-gray-500">—</span>
            <span className="text-gray-400">zsh</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-6 py-5">
        <div className="text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-emerald-300">➜</span>
            <span className="text-cyan-300">~/uns</span>
            <span className="text-purple-300">git:(main)</span>
            <span className="text-gray-100">{typed}</span>
            <span className="caret -ml-1 text-gray-100">▮</span>
          </div>

          <AnimatePresence initial={false}>
            {doneCmd ? (
              <motion.div
                key={block}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-4 space-y-1"
              >
                {current.out.map((line, idx) => (
                  <div key={idx} className={cn("text-sm", line.c)}>
                    {line.t}
                  </div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-5 text-xs text-gray-500">
            Tip: jump to <span className="text-gray-300">Notes</span> for the nebula vibe.
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TerminalPanel;
