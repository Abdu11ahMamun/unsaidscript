import { useState, useEffect } from "react";
import { C } from "../../tokens.js";
const WORDS  = ["build.", "write.", "dream.", "wonder."];
const COLORS = [C.coral, "#2E6E8E", "#4A7A4E", "#C07F1F"];
export function RotatingWord() {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setOut(true);
      setTimeout(() => { setIdx(i => (i + 1) % WORDS.length); setOut(false); }, 320);
    }, 2600);
    return () => clearInterval(iv);
  }, []);
  return (
    <span style={{ display:"inline-block", color:COLORS[idx], fontStyle:"italic",
      transform: out ? "translateY(-14px) rotate(-2deg)" : "translateY(0) rotate(0)",
      opacity: out ? 0 : 1, transition:"all .32s cubic-bezier(.5,0,.3,1)", minWidth:"3.2ch" }}>
      {WORDS[idx]}
    </span>
  );
}
