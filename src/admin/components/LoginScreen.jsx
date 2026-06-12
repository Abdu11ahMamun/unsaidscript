import { useState } from "react";
import { C, FONT_SERIF, FONT_MONO, FONT_BODY } from "../../tokens.js";
import { Panel } from "./shared/Panel.jsx";
import { Btn } from "./shared/Btn.jsx";
import { Field, Input } from "./shared/Field.jsx";
export function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [lines, setLines] = useState([]);
  const submit = () => {
    if (busy) return; setBusy(true);
    const seq = [
      { html:`<span style="color:#4ade80">❯</span> auth --user ${email||"abdullah"}`, t:0 },
      { html:`<span style="color:#79c0ff">›</span> verifying credentials…`, t:380 },
      { html:`<span style="color:#79c0ff">›</span> session granted · welcome home`, t:820 },
      { html:`<span style="color:#4ade80">✓</span> opening unsaid.os`, t:1200 },
    ];
    seq.forEach(l => setTimeout(() => setLines(p => [...p, l.html]), l.t));
    setTimeout(onLogin, 1650);
  };
  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONT_BODY, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize:"26px 26px", opacity:0.35, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"8%", right:"6%", fontFamily:FONT_SERIF, fontStyle:"italic", fontWeight:600, fontSize:"clamp(100px,14vw,200px)", color:C.ink, opacity:0.045, transform:"rotate(-5deg)", userSelect:"none" }}>অব্যক্ত</div>
      <div style={{ width:"min(420px, 92vw)", position:"relative" }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:30 }}>
          <svg viewBox="0 0 64 64" width="64" height="64">
            <circle cx="32" cy="32" r="30" fill={C.dark}/>
            <line x1="32" y1="13.5" x2="32" y2="9.5" stroke="#86B489" strokeWidth="2.6" strokeLinecap="round"/>
            <path d="M32 13 C44 20.5, 45.5 35, 32 53 C18.5 35, 20 20.5, 32 13 Z" fill="#86B489"/>
            <line x1="32" y1="38.5" x2="32" y2="49" stroke={C.dark} strokeWidth="2.4" strokeLinecap="round"/>
            <circle cx="32" cy="36.5" r="2.8" fill={C.gold}/>
          </svg>
          <div style={{ fontFamily:FONT_SERIF, fontWeight:700, fontSize:24, color:C.ink, marginTop:14 }}>unsaid<span style={{ color:C.coral }}>.os</span></div>
          <div style={{ fontFamily:FONT_MONO, fontSize:11, color:C.muted, letterSpacing:2, marginTop:6 }}>THE STUDIO BEHIND THE SCRIPT</div>
        </div>
        <Panel pad={28}>
          {busy ? (
            <div style={{ background:C.termBg, borderRadius:12, padding:"18px 20px", fontFamily:FONT_MONO, fontSize:12.5, lineHeight:2, minHeight:120 }}>
              {lines.map((l,i) => <div key={i} dangerouslySetInnerHTML={{ __html:l }}/>)}
              <span style={{ color:C.termGreen, animation:"osBlink 1s infinite" }}>▌</span>
            </div>
          ) : (
            <>
              <Field label="Email"><Input type="email" placeholder="abdullah@unsaidscript.dev" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
              <Field label="Password"><Input type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/></Field>
              <Btn onClick={submit} style={{ width:"100%", justifyContent:"center", marginTop:4 }}>❯ enter the studio</Btn>
              <div style={{ textAlign:"center", marginTop:16, fontSize:11.5, color:C.muted, fontFamily:FONT_MONO }}>demo build — any credentials open the door</div>
            </>
          )}
        </Panel>
        <div style={{ textAlign:"center", marginTop:22, fontSize:12, color:C.muted, fontStyle:"italic", fontFamily:FONT_SERIF }}>"Every morning the desk is waiting."</div>
      </div>
    </div>
  );
}
