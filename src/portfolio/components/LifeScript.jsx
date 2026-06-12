import { useState, useEffect } from "react";
import { C } from "../../tokens.js";

const LIFE_LINES = [
  { raw:"// unsaid.script — the story that compiles",
    jsx: <span style={{color:"rgba(255,255,255,0.30)"}}>{"// unsaid.script — the story that compiles"}</span> },
  { raw:"", jsx:<span>&nbsp;</span> },
  { raw:'import { books } from "./childhood";',
    jsx:<><span style={{color:"#a78bfa"}}>import</span>{" "}<span style={{color:"#e5e7eb"}}>{"{ books }"}</span>{" "}<span style={{color:"#a78bfa"}}>from</span>{" "}<span style={{color:"#a5d6ff"}}>"./childhood"</span><span style={{color:"#666"}}>;</span></> },
  { raw:'import { dhaka } from "./home";',
    jsx:<><span style={{color:"#a78bfa"}}>import</span>{" "}<span style={{color:"#e5e7eb"}}>{"{ dhaka }"}</span>{" "}<span style={{color:"#a78bfa"}}>from</span>{" "}<span style={{color:"#a5d6ff"}}>"./home"</span><span style={{color:"#666"}}>;</span></> },
  { raw:"", jsx:<span>&nbsp;</span> },
  { raw:"class Abdullah extends Reader {",
    jsx:<><span style={{color:"#a78bfa"}}>class</span>{" "}<span style={{color:"#79c0ff"}}>Abdullah</span>{" "}<span style={{color:"#a78bfa"}}>extends</span>{" "}<span style={{color:"#79c0ff"}}>Reader</span>{" "}<span style={{color:"#e5e7eb"}}>{"{"}</span></> },
  { raw:'  builds   = "banking systems @ Koalafi";',
    jsx:<>&nbsp;&nbsp;<span style={{color:"#f97316"}}>builds</span>&nbsp;&nbsp;{" "}<span style={{color:"#e5e7eb"}}>=</span>{" "}<span style={{color:"#a5d6ff"}}>"banking systems @ Koalafi"</span><span style={{color:"#666"}}>;</span></> },
  { raw:'  research = { papers: 5, goal: "Dr. Abdullah" };',
    jsx:<>&nbsp;&nbsp;<span style={{color:"#f97316"}}>research</span>{" "}<span style={{color:"#e5e7eb"}}>= {"{"}</span>{" "}<span style={{color:"#f97316"}}>papers</span><span style={{color:"#e5e7eb"}}>:</span>{" "}<span style={{color:"#fbbf24"}}>5</span><span style={{color:"#666"}}>,</span>{" "}<span style={{color:"#f97316"}}>goal</span><span style={{color:"#e5e7eb"}}>:</span>{" "}<span style={{color:"#a5d6ff"}}>"Dr. Abdullah"</span>{" "}<span style={{color:"#e5e7eb"}}>{"}"}</span><span style={{color:"#666"}}>;</span></> },
  { raw:'  fuel     = ["tea", "murakami", "quiet"];',
    jsx:<>&nbsp;&nbsp;<span style={{color:"#f97316"}}>fuel</span>&nbsp;&nbsp;&nbsp;&nbsp;{" "}<span style={{color:"#e5e7eb"}}>=</span>{" ["}
      <span style={{color:"#a5d6ff"}}>"tea"</span><span style={{color:"#666"}}>,</span>{" "}
      <span style={{color:"#a5d6ff"}}>"murakami"</span><span style={{color:"#666"}}>,</span>{" "}
      <span style={{color:"#a5d6ff"}}>"quiet"</span>
      <span style={{color:"#e5e7eb"}}>]</span><span style={{color:"#666"}}>;</span></> },
  { raw:"  faith    = constant;",
    jsx:<>&nbsp;&nbsp;<span style={{color:"#f97316"}}>faith</span>&nbsp;&nbsp;&nbsp;{" "}<span style={{color:"#e5e7eb"}}>=</span>{" "}<span style={{color:"#a78bfa"}}>constant</span><span style={{color:"#666"}}>;</span></> },
  { raw:"}", jsx:<span style={{color:"#e5e7eb"}}>{"}"}</span> },
  { raw:"", jsx:<span>&nbsp;</span> },
  { raw:"export default Abdullah;  // still compiling…",
    jsx:<><span style={{color:"#a78bfa"}}>export default</span>{" "}<span style={{color:"#79c0ff"}}>Abdullah</span><span style={{color:"#666"}}>;</span>&nbsp;&nbsp;<span style={{color:"#4ade80"}}>{"// still compiling…"}</span></> },
];

export function LifeScript() {
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  const [blinkOn, setBlinkOn] = useState(true);
  const done = li >= LIFE_LINES.length;
  useEffect(() => {
    if (done) return;
    const line = LIFE_LINES[li].raw;
    if (ci < line.length) { const t = setTimeout(() => setCi(c => c + 1), 16); return () => clearTimeout(t); }
    const t = setTimeout(() => { setLi(l => l + 1); setCi(0); }, line === "" ? 60 : 150);
    return () => clearTimeout(t);
  }, [li, ci, done]);
  useEffect(() => { const iv = setInterval(() => setBlinkOn(b => !b), 530); return () => clearInterval(iv); }, []);
  return (
    <div style={{ background:C.termBg, borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.07)", boxShadow:"0 24px 70px rgba(13,17,23,0.30)" }}>
      <div style={{ background:"#161b22", padding:"10px 16px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
        <span style={{ color:"rgba(255,255,255,0.30)", fontSize:11, marginLeft:8, fontFamily:"monospace", letterSpacing:0.5 }}>unsaid.script — ~/abdullah</span>
      </div>
      <div style={{ padding:"18px 0 14px" }}>
        {LIFE_LINES.map((ln, i) => {
          if (i > li) return null;
          const typingThis = i === li && !done;
          return (
            <div key={i} style={{ display:"flex", fontFamily:"'Fira Code','SF Mono',monospace", fontSize:13, lineHeight:1.95 }}>
              <span style={{ width:44, textAlign:"right", paddingRight:16, color:"rgba(255,255,255,0.18)", userSelect:"none", flexShrink:0 }}>{i + 1}</span>
              <span style={{ color:"#e5e7eb", paddingRight:18, whiteSpace:"pre-wrap" }}>
                {typingThis ? <>{ln.raw.slice(0, ci)}<span style={{ color:C.termGreen, opacity:blinkOn ? 1 : 0 }}>▌</span></> : ln.jsx}
                {i === LIFE_LINES.length - 1 && done && <span style={{ color:C.termGreen, opacity:blinkOn ? 1 : 0 }}> ▌</span>}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 16px", background:"#161b22", borderTop:"1px solid rgba(255,255,255,0.06)", fontSize:11, fontFamily:"'Fira Code',monospace", color:"rgba(255,255,255,0.38)" }}>
        <span>⎇ life &nbsp;·&nbsp; bn + en &nbsp;·&nbsp; UTF-8</span>
        <span style={{ color:C.termGreen }}>⬤ compiling</span>
      </div>
    </div>
  );
}
