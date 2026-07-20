import { useState, useEffect, useRef } from "react";
import { C } from "../../tokens.js";
export function CommandPalette({ open, onClose, goTo, showToast, openBook }) {
  const [q, setQ] = useState(""); const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  const jump = (path, id) => { onClose(); goTo(path); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }), 320); };
  const ITEMS = [
    { icon:"✍️", label:"The Writer — reviews, translations, notes", hint:"page", run:()=>{ onClose(); goTo("/writer"); } },
    { icon:"⚙️", label:"The Engineer — work, projects, research", hint:"page", run:()=>{ onClose(); goTo("/engineer"); } },
    { icon:"📖", label:"The road to the first book", hint:"writer", run:()=>jump("/writer","path") },
    { icon:"🖋", label:"Visit the translation desk", hint:"writer", run:()=>jump("/writer","translations") },
    { icon:"⌨️", label:"Jump to projects — the IDE", hint:"engineer", run:()=>jump("/engineer","projects") },
    { icon:"🎓", label:"See publications", hint:"engineer", run:()=>jump("/engineer","research") },
    { icon:"🏠", label:"Go home — the two doors", hint:"page", run:()=>{ onClose(); goTo("/"); } },
    { icon:"✉️", label:"Copy email — cs.abdullah.mamun@gmail.com", hint:"copy", run:()=>{ navigator.clipboard?.writeText("cs.abdullah.mamun@gmail.com"); showToast("email copied ✓"); onClose(); } },
    { icon:"💼", label:"Open LinkedIn — linkedin.com/in/abdu11ahmamun", hint:"↗", run:()=>{ window.open("https://www.linkedin.com/in/abdu11ahmamun/","_blank"); onClose(); } },
    { icon:"🌐", label:"Visit AAIINS Lab", hint:"↗", run:()=>{ window.open("https://aaiins-lab.com/","_blank"); onClose(); } },
    ...(openBook ? [
      { icon:"📕", label:"Read: Kafka on the Shore", hint:"book", run:()=>{ onClose(); openBook("kafka-on-the-shore"); } },
      { icon:"📕", label:"Read: The Forty Rules of Love", hint:"book", run:()=>{ onClose(); openBook("forty-rules-of-love"); } },
      { icon:"📕", label:"Read: The Metamorphosis", hint:"book", run:()=>{ onClose(); openBook("the-metamorphosis"); } },
    ] : []),
  ];
  const shown = ITEMS.filter(it => it.label.toLowerCase().includes(q.toLowerCase()));
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
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:3000, background:"rgba(35,32,24,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"16vh" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:"min(580px, 92vw)", background:C.termBg, borderRadius:16, border:"1px solid rgba(255,255,255,0.10)", boxShadow:"0 30px 90px rgba(0,0,0,0.5)", overflow:"hidden", animation:"palettePop .18s ease-out" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"15px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ color:C.termGreen, fontFamily:"monospace", fontSize:15 }}>❯</span>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="type a command…"
            style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#e5e7eb", fontSize:14.5, fontFamily:"'Fira Code',monospace" }}/>
          <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.3)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:5, padding:"2px 7px", fontFamily:"monospace" }}>esc</span>
        </div>
        <div style={{ maxHeight:316, overflowY:"auto", padding:"8px 0" }}>
          {shown.map((it,i) => (
            <div key={it.label} onClick={it.run} onMouseEnter={()=>setSel(i)}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 18px", cursor:"pointer",
                background: sel===i ? "rgba(94,140,97,0.20)" : "transparent",
                borderLeft: sel===i ? `2px solid ${C.termGreen}` : "2px solid transparent" }}>
              <span style={{ fontSize:16 }}>{it.icon}</span>
              <span style={{ flex:1, color:sel===i?"#fff":"rgba(255,255,255,0.72)", fontSize:13.5, fontFamily:"'Fira Code',monospace" }}>{it.label}</span>
              <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.28)", fontFamily:"monospace" }}>{it.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
