/**
 * GlobalStyles component for animations and global CSS
 * @module components/animations/GlobalStyles
 */

/**
 * Global CSS styles for animations and effects
 * Should be included once at the root of the app
 * @returns {JSX.Element} Style element
 * @example
 * <GlobalStyles />
 */
export const GlobalStyles = () => (
  <style>{`
    @keyframes float { 0%,100%{ transform: translateY(0px);} 50%{ transform: translateY(-20px);} }
    @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
    @keyframes caretBlink { 0%,45%{ opacity:1;} 46%,100%{ opacity:0;} }

    .animate-float { animation: float 6s ease-in-out infinite; }

    ::selection { background: rgba(34, 211, 238, 0.3); color: white; }

    .text-shimmer {
      background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);
      background-size: 200% auto;
      animation: shimmer 3s linear infinite;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .term {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }

    .caret { animation: caretBlink 1s steps(2, jump-none) infinite; }

    .term-scanlines::before {
      content: "";
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.06) 0px,
        rgba(255,255,255,0.02) 2px,
        rgba(0,0,0,0) 4px
      );
      opacity: .10;
      pointer-events: none;
      mix-blend-mode: overlay;
    }

    .term-glow {
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.10) inset,
        0 0 40px rgba(34,211,238,0.10),
        0 0 60px rgba(168,85,247,0.08);
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-float,
      .text-shimmer,
      .caret { animation: none !important; }
      .caret { opacity: 1; }
    }
  `}</style>
);

export default GlobalStyles;
