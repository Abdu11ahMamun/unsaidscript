import { C } from "../../tokens.js";
export function Logo({ size = 30 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }}>
      <svg viewBox="0 0 64 64" width={size} height={size}>
        <circle cx="32" cy="32" r="30" fill={C.dark}/>
        <line x1="32" y1="13.5" x2="32" y2="9.5" stroke="#86B489" strokeWidth="2.6" strokeLinecap="round"/>
        <path d="M32 13 C44 20.5, 45.5 35, 32 53 C18.5 35, 20 20.5, 32 13 Z" fill="#86B489"/>
        <line x1="32" y1="38.5" x2="32" y2="49" stroke={C.dark} strokeWidth="2.4" strokeLinecap="round"/>
        <circle cx="32" cy="36.5" r="2.8" fill={C.gold}/>
      </svg>
      <span style={{ fontWeight:700, fontSize:16, letterSpacing:"-0.3px", color:C.ink, fontFamily:"'Fraunces',serif" }}>unsaidscript</span>
    </div>
  );
}
