import { useState, useEffect } from "react";
import { C } from "../../tokens.js";
import { PROJECTS } from "../data/index.js";

export function ProjectIDE() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(false);
  const p = PROJECTS[active];

  useEffect(() => {
    setTyped(false);
    const t = setTimeout(() => setTyped(true), 60);
    return () => clearTimeout(t);
  }, [active]);

  const statusColor = { LIVE:C.termGreen, PROJECT:C.termYellow, AI:C.termPurple, MOBILE:C.termOrange }[p.label] || C.termGreen;

  const K = ({children}) => <span style={{color:"#a78bfa"}}>{children}</span>;     // keyword
  const S = ({children}) => <span style={{color:"#a5d6ff"}}>{children}</span>;     // string
  const F = ({children}) => <span style={{color:"#f97316"}}>{children}</span>;     // field
  const Cm = ({children}) => <span style={{color:"rgba(255,255,255,0.28)"}}>{children}</span>;

  const lines = [
    <><K>const</K> <span style={{color:"#79c0ff"}}>project</span> = {"{"}</>,
    <>&nbsp;&nbsp;<F>name</F>: <S>"{p.title}"</S>,</>,
    <>&nbsp;&nbsp;<F>type</F>: <S>"{p.sub}"</S>,</>,
    <>&nbsp;&nbsp;<F>stack</F>: [{p.tags.map((t,i)=><span key={t}><S>"{t}"</S>{i<p.tags.length-1?", ":""}</span>)}],</>,
    <>&nbsp;&nbsp;<F>status</F>: <span style={{color:statusColor,fontWeight:700}}>"{p.label}"</span>,</>,
    <>{"}"};</>,
    <>&nbsp;</>,
    <><Cm>{"// "+p.desc}</Cm></>,
    <><span style={{color:"#79c0ff"}}>deploy</span>.<span style={{color:"#d2a8ff"}}>run</span>(project); <Cm>{p.link ? "// → "+p.link.replace("https://","").replace("http://","").replace(/\/$/,"") : "// internal build"}</Cm></>,
  ];

  return (
    <div style={{ background:C.termBg, borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.07)", boxShadow:"0 18px 60px rgba(13,17,23,0.35)" }}>
      {/* window chrome */}
      <div style={{ background:"#161b22", padding:"10px 16px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
        <span style={{ color:"rgba(255,255,255,0.3)", fontSize:11, marginLeft:8, fontFamily:"monospace", letterSpacing:0.5 }}>projects — unsaidscript IDE</span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"210px 1fr", minHeight:380 }}>
        {/* ── EXPLORER sidebar ── */}
        <div style={{ borderRight:"1px solid rgba(255,255,255,0.06)", padding:"14px 0", background:"#10151c" }}>
          <div style={{ fontSize:10, letterSpacing:1.6, color:"rgba(255,255,255,0.35)", fontFamily:"monospace", padding:"0 16px 10px", textTransform:"uppercase" }}>Explorer</div>
          <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.55)", fontFamily:"'Fira Code',monospace", padding:"3px 16px" }}>▾ 📁 projects</div>
          {PROJECTS.map((pr,i)=>(
            <div key={i} onClick={()=>setActive(i)}
              style={{
                padding:"7px 16px 7px 32px", cursor:"pointer", fontSize:12.5,
                fontFamily:"'Fira Code',monospace",
                color: active===i ? "#fff" : "rgba(255,255,255,0.5)",
                background: active===i ? "rgba(94,140,97,0.18)" : "transparent",
                borderLeft: active===i ? `2px solid ${C.termGreen}` : "2px solid transparent",
                transition:"all .18s", display:"flex", alignItems:"center", gap:8,
                whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
              }}
              onMouseEnter={e=>{ if(active!==i) e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
              onMouseLeave={e=>{ if(active!==i) e.currentTarget.style.background="transparent"; }}
            >
              <span style={{ fontSize:13 }}>{pr.icon}</span>{pr.file}
              {pr.label==="LIVE" && <span style={{ width:6, height:6, borderRadius:"50%", background:C.termGreen, boxShadow:`0 0 6px ${C.termGreen}`, marginLeft:"auto", flexShrink:0 }}/>}
            </div>
          ))}
        </div>

        {/* ── EDITOR pane ── */}
        <div style={{ display:"flex", flexDirection:"column" }}>
          {/* tab bar */}
          <div style={{ display:"flex", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"#0d1117" }}>
            <div style={{ padding:"9px 18px", fontSize:12, fontFamily:"'Fira Code',monospace", color:"#fff", background:"#161b22", borderRight:"1px solid rgba(255,255,255,0.06)", borderTop:`2px solid ${p.accent}`, display:"flex", alignItems:"center", gap:8 }}>
              <span>{p.icon}</span>{p.file}<span style={{ color:"rgba(255,255,255,0.3)", marginLeft:4 }}>×</span>
            </div>
          </div>

          {/* code area */}
          <div style={{ flex:1, padding:"18px 0", opacity: typed?1:0, transform: typed?"translateY(0)":"translateY(6px)", transition:"all .35s ease" }}>
            {lines.map((ln,i)=>(
              <div key={active+"-"+i} style={{ display:"flex", fontFamily:"'Fira Code','SF Mono',monospace", fontSize:13, lineHeight:1.9 }}>
                <span style={{ width:44, textAlign:"right", paddingRight:16, color:"rgba(255,255,255,0.2)", userSelect:"none", flexShrink:0 }}>{i+1}</span>
                <span style={{ color:"#e5e7eb", paddingRight:20 }}>{ln}</span>
              </div>
            ))}
            {/* run button */}
            <div style={{ padding:"18px 0 0 44px", display:"flex", gap:10, alignItems:"center" }}>
              {p.link ? (
                <a href={p.link} target="_blank" rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(74,222,128,0.14)", border:`1px solid ${C.termGreen}55`, color:C.termGreen, padding:"8px 18px", borderRadius:8, fontSize:12.5, fontWeight:700, fontFamily:"'Fira Code',monospace", textDecoration:"none", transition:"all .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(74,222,128,0.24)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(74,222,128,0.14)"}
                >▶ Run — visit live site</a>
              ) : (
                <span style={{ display:"inline-flex", alignItems:"center", gap:8, color:"rgba(255,255,255,0.35)", fontSize:12.5, fontFamily:"'Fira Code',monospace" }}>▶ Run <span style={{ fontSize:11 }}>— internal build, ask me for a demo</span></span>
              )}
            </div>
          </div>

          {/* status bar */}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 16px", background:"#161b22", borderTop:"1px solid rgba(255,255,255,0.06)", fontSize:11, fontFamily:"'Fira Code',monospace", color:"rgba(255,255,255,0.4)" }}>
            <span>⎇ main &nbsp;·&nbsp; {p.lang}</span>
            <span style={{ color:statusColor }}>⬤ {p.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
