import { useState, useEffect } from "react";
import { C } from "../../../tokens.js";
export function HBar({ label, pct, color }) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 120); return () => clearTimeout(t); }, []);
  return (
    <div style={{ marginBottom:13 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:5 }}>
        <span style={{ color:C.ink, fontWeight:600 }}>{label}</span>
        <span style={{ color:C.muted, fontFamily:"'Fira Code',monospace" }}>{pct}%</span>
      </div>
      <div style={{ height:7, borderRadius:5, background:C.bg2, overflow:"hidden" }}>
        <div style={{ height:"100%", width:on?`${pct}%`:"0%", background:`linear-gradient(90deg,${color},${color}AA)`, borderRadius:5, transition:"width .9s cubic-bezier(.3,.7,.3,1)" }}/>
      </div>
    </div>
  );
}
