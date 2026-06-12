import { C } from "../../tokens.js";
export function TerminalWindow({ title = "terminal", children, style = {} }) {
  return (
    <div style={{ background:C.termBg, borderRadius:14, overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)", boxShadow:"0 8px 40px rgba(0,0,0,0.25)", ...style }}>
      <div style={{ background:"#161b22", padding:"10px 16px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
        <span style={{ color:"rgba(255,255,255,0.25)", fontSize:11, marginLeft:8, fontFamily:"monospace", letterSpacing:0.5 }}>{title}</span>
      </div>
      <div style={{ padding:"18px 20px", fontFamily:"'Fira Code','SF Mono','Courier New',monospace", fontSize:12.5, lineHeight:1.85 }}>
        {children}
      </div>
    </div>
  );
}
export const TLine   = ({ children, color = "#e5e7eb" }) => <div style={{ color }}>{children}</div>;
export const TComment= ({ children }) => <div style={{ color:"rgba(255,255,255,0.25)" }}>{children}</div>;
export const TPrompt = ({ children }) => <div><span style={{ color:C.termGreen }}>❯ </span><span style={{ color:"#e5e7eb" }}>{children}</span></div>;
