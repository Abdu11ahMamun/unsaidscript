import { C } from "../../tokens.js";
import { Pill } from "./Pill.jsx";
export function SectionLabel({ children, color = C.green }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
      <Pill color={color}>{children}</Pill>
      <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,${color}55,transparent)` }}/>
    </div>
  );
}
