import { C } from "../../../tokens.js";
import { FONT_BODY, FONT_MONO } from "../../../tokens.js";
export function Btn({ children, kind = "primary", onClick, small = false, style = {} }) {
  const base = { border:"none", cursor:"pointer", fontWeight:700, borderRadius:10, padding:small?"8px 14px":"11px 20px", fontSize:small?12.5:13.5, fontFamily:FONT_BODY, transition:"all .18s", display:"inline-flex", alignItems:"center", gap:8 };
  const kinds = {
    primary:{ background:C.green, color:"#fff", boxShadow:`0 6px 18px ${C.green}44` },
    dark:{ background:C.termBg, color:C.termGreen, fontFamily:FONT_MONO, border:"1px solid rgba(255,255,255,0.08)" },
    ghost:{ background:"#fff", color:C.ink, border:`1.5px solid ${C.border}` },
    danger:{ background:C.coralS, color:C.coral, border:`1.5px solid ${C.coral}40` },
  };
  return <button onClick={onClick} style={{ ...base, ...kinds[kind], ...style }}>{children}</button>;
}
