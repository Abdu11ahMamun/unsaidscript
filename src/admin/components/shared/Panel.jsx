import { C } from "../../../tokens.js";
export function Panel({ children, style = {}, pad = 24 }) {
  return (
    <div style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:18, padding:pad, boxShadow:"0 2px 10px rgba(59,58,47,0.04)", ...style }}>
      {children}
    </div>
  );
}
