import { C } from "../../tokens.js";
export function Pill({ children, color = C.green }) {
  return (
    <span style={{ background:color+"1C", color, fontSize:10.5, fontWeight:700, letterSpacing:1.2,
      padding:"3px 11px", borderRadius:30, textTransform:"uppercase" }}>
      {children}
    </span>
  );
}
