import { useState, useEffect, useRef } from "react";
import { C, FONT_MONO } from "../../tokens.js";
import { NAV_ITEMS } from "./Sidebar.jsx";
export function OsPalette({ open, onClose, setSection, toast }) {
  const [q, setQ] = useState(""); const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  const ITEMS = [
    ...NAV_ITEMS.map(n => ({ icon:n.icon, label:`Go to ${n.label}`, run:()=>{ setSection(n.id); onClose(); } })),
    { icon:"📕", label:"New book review", run:()=>{ setSection("reviews"); onClose(); toast("opening the editor — click + New review"); } },
    { icon:"📓", label:"Write today's diary", run:()=>{ setSection("diary"); onClose(); } },
    { icon:"🌐", label:"Open public site ↗", run:()=>{ window.open("https://unsaidscript.dev","_blank"); onClose(); } },
  ];
  const shown = ITEMS.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));
  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => { setSel(0); }, [q]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key==="Escape") onClose();
      if (e.key==="ArrowDown") { e.preventDefault(); setSel(i=>Math.min(i+1,shown.length-1)); }
      if (e.key==="ArrowUp")   { e.preventDefault(); setSel(i=>Math.max(i-1,0)); }
      if (e.key==="Enter" && shown[sel]) shown[sel].run();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shown, sel, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:5000, background:"rgba(35,32,24,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"15vh" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:"min(540px,92vw)", background:C.termBg, borderRadius:16, border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 30px 90px rgba(0,0,0,0.5)", overflow:"hidden", animation:"osPop .18s ease-out" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ color:C.termGreen, fontFamily:FONT_MONO, fontSize:15 }}>❯</span>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="jump anywhere…" style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#e5e7eb", fontSize:14, fontFamily:FONT_MONO }}/>
          <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.3)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:5, padding:"2px 7px", fontFamily:FONT_MONO }}>esc</span>
        </div>
        <div style={{ maxHeight:300, overflowY:"auto", padding:"8px 0" }}>
          {shown.map((it,i) => (
            <div key={it.label} onClick={it.run} onMouseEnter={() => setSel(i)}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 18px", cursor:"pointer", background:sel===i?"rgba(94,140,97,0.20)":"transparent", borderLeft:sel===i?`2px solid ${C.termGreen}`:"2px solid transparent" }}>
              <span style={{ fontSize:15 }}>{it.icon}</span>
              <span style={{ color:sel===i?"#fff":"rgba(255,255,255,0.7)", fontSize:13, fontFamily:FONT_MONO }}>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
