import { useState } from "react";
import { C } from "../../tokens.js";
export function Card({ children, style = {}, accent = C.green }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background:C.card, borderRadius:22, border:`1.5px solid ${h ? accent+"66" : C.border}`,
        padding:28, transition:"all .25s",
        boxShadow: h ? `0 12px 44px ${accent}1A, 0 2px 20px rgba(59,58,47,0.05)` : "0 2px 10px rgba(59,58,47,0.05)",
        transform: h ? "translateY(-4px) rotate(-0.3deg)" : "none",
        overflow:"hidden", position:"relative", ...style }}>
      {h && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${accent},${accent}55)`, pointerEvents:"none" }}/>}
      {children}
    </div>
  );
}
