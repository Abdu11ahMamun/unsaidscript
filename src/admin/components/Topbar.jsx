import { C, FONT_MONO } from "../../tokens.js";
import { NAV_ITEMS } from "./Sidebar.jsx";
export function Topbar({ section }) {
  const dateStr = new Date().toLocaleDateString("en-GB",{ weekday:"long", day:"numeric", month:"long", year:"numeric" });
  const item = NAV_ITEMS.find(n => n.id === section);
  return (
    <div style={{ height:62, borderBottom:`1px solid ${C.border}`, background:"rgba(251,246,236,0.9)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 32px", position:"sticky", top:0, zIndex:50 }}>
      <div style={{ fontFamily:FONT_MONO, fontSize:12, color:C.muted }}>
        unsaid.os <span style={{ color:C.border }}>/</span> <span style={{ color:C.ink, fontWeight:700 }}>{item?.label.toLowerCase()}</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <span style={{ fontSize:12, color:C.muted, fontFamily:FONT_MONO }}>{dateStr}</span>
        <span style={{ width:4, height:4, borderRadius:"50%", background:C.border }}/>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, color:"#16a34a", fontWeight:600 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 8px #22c55e", animation:"osPulse 2s infinite" }}/>
          site live
        </span>
      </div>
    </div>
  );
}
