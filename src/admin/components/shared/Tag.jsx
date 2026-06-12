import { C } from "../../../tokens.js";
import { FONT_MONO } from "../../../tokens.js";
export function Tag({ children, color = C.green }) {
  return <span style={{ background:color+"1A", color, fontSize:10.5, fontWeight:700, letterSpacing:0.8, padding:"3px 10px", borderRadius:20, textTransform:"uppercase", fontFamily:FONT_MONO }}>{children}</span>;
}
