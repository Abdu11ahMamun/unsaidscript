import { useState, useEffect } from "react";
import { C } from "../../../tokens.js";
export function Ring({ pct, color, size = 78, stroke = 7, children }) {
  const r = (size-stroke)/2, circ = 2*Math.PI*r;
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 150); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.bg2} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={on ? circ*(1-Math.min(pct,1)) : circ}
          style={{ transition:"stroke-dashoffset 1s cubic-bezier(.3,.7,.3,1)" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>{children}</div>
    </div>
  );
}
