import { useEffect } from "react";
import { C } from "../../tokens.js";

export function useLeafCursor() {
  useEffect(() => {
    let last = 0;
    const colors = [C.green, "#86B489", C.gold, C.coral];
    const onMove = (e) => {
      const now = Date.now();
      if (now - last < 90) return;
      last = now;
      const d = document.createElement("div");
      const isLeaf = Math.random() > 0.4;
      const col = colors[Math.floor(Math.random() * colors.length)];
      const sz = isLeaf ? 7 + Math.random() * 5 : 3 + Math.random() * 3;
      d.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${sz}px;height:${sz}px;pointer-events:none;z-index:9999;background:${col};opacity:0.85;border-radius:${isLeaf ? "0 60% 0 60%" : "50%"};transform:rotate(${Math.random() * 360}deg);transition:all 1.3s cubic-bezier(.2,.6,.3,1);`;
      document.body.appendChild(d);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        d.style.transform = `translate(${(Math.random() - .5) * 70}px, ${30 + Math.random() * 60}px) rotate(${180 + Math.random() * 360}deg)`;
        d.style.opacity = "0";
      }));
      setTimeout(() => d.remove(), 1400);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}
