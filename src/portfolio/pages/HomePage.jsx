import { useState, useEffect } from "react";
import { C } from "../../tokens.js";
import { PROJECTS, EXPERIENCE, PUBLICATIONS, SKILL_GROUPS } from "../data/index.js";
import { Logo, Pill, SectionLabel, Card, RotatingWord, TerminalWindow, TLine, TComment, TPrompt, H2, ProjectIDE } from "../components/index.js";
import { LifeScript } from "../components/LifeScript.jsx";
import { Marquee } from "../components/Marquee.jsx";
import { Cloud, Hills, SootSprite } from "./helpers.jsx";

export function HomePage({ goTo }) {
  const [mx,setMx]=useState(0),[my,setMy]=useState(0);
  /* the status line reads the visitor's clock */
  const hour = new Date().getHours();
  const daypart = hour < 5  ? ["🌙 reading hour","🕯 the city sleeps"]
               : hour < 11 ? ["☕ tea: brewing","🌅 morning pages"]
               : hour < 17 ? ["☕ tea: refilled","⚙ deep-work mode"]
               : hour < 21 ? ["🌆 golden hour","📖 evening chapter"]
               :             ["🌙 reading hour","🕯 quiet mode"];
  useEffect(()=>{
    const h=(/** @type {any} */ e)=>{setMx((e.clientX/window.innerWidth-.5)*2);setMy((e.clientY/window.innerHeight-.5)*2);};
    window.addEventListener("mousemove",h); return()=>window.removeEventListener("mousemove",h);
  },[]);

  return (
    <div>
      {/* ═══ HERO — the unsaid script, typing itself ═══ */}
      <section style={{ minHeight:"94vh", display:"grid", gridTemplateColumns:"1.05fr 1fr", alignItems:"center", padding:"100px 60px 70px", gap:56, position:"relative", overflow:"hidden" }}>

        {/* অব্যক্ত — the word the whole site is named after */}
        <div style={{ position:"absolute", top:24, right:-20, fontFamily:"'Fraunces',serif", fontStyle:"italic", fontWeight:600, fontSize:"clamp(120px,15vw,220px)", color:C.ink, opacity:0.05, transform:`rotate(-5deg) translate(${mx*-6}px,${my*-4}px)`, pointerEvents:"none", lineHeight:1, userSelect:"none", whiteSpace:"nowrap" }}>অব্যক্ত</div>

        {/* a warm lamp glow behind the editor */}
        <div style={{ position:"absolute", top:"20%", right:"2%", width:560, height:560, borderRadius:"50%", background:"radial-gradient(circle, rgba(217,164,65,0.10), rgba(217,164,65,0) 65%)", pointerEvents:"none" }}/>
        {/* faint oversized quote mark behind the headline */}
        <div style={{ position:"absolute", top:"14%", left:30, fontFamily:"'Fraunces',serif", fontSize:240, color:C.coral, opacity:0.06, lineHeight:1, pointerEvents:"none", userSelect:"none" }}>"</div>

        {/* Left — the thesis */}
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:30}}>
            <span style={{fontSize:12,color:C.muted,letterSpacing:1.5,textTransform:"uppercase",fontWeight:500}}>Dhaka, Bangladesh</span>
            <span style={{width:3,height:3,borderRadius:"50%",background:C.border,display:"inline-block"}}/>
            <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,color:"#16a34a",fontWeight:600}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px #22c55e",display:"inline-block",animation:"pulse 2s infinite"}}/>
              Available
            </span>
          </div>

          <h1 style={{ fontSize:"clamp(44px,5.8vw,80px)", fontWeight:600, lineHeight:1.06, letterSpacing:"-0.03em", margin:"0 0 26px", color:C.ink, fontFamily:"'Fraunces',serif" }}>
            I read,<br/>therefore I <RotatingWord/>
          </h1>

          <p style={{ fontSize:"clamp(16px,1.8vw,19px)", color:C.ink, letterSpacing:"-0.01em", margin:"0 0 14px", lineHeight:1.5, fontWeight:600, fontFamily:"'Fraunces',serif" }}>
            Abdullah Al Mamun <span style={{ color:C.muted, fontWeight:400, fontStyle:"italic" }}>— software engineer @ Koalafi · researcher · reader</span>
          </p>
          <p style={{ color:C.muted, fontSize:15.5, lineHeight:1.85, maxWidth:480, margin:"0 0 34px" }}>
            A fintech engineer who grew up inside books. By day I build banking systems
            and AI tools in <strong style={{ color:C.ink }}>Java · Spring Boot · React</strong>;
            by night I chase pages — Himu's Dhaka, Murakami's wells, Rumi's fire.
            Some of it becomes code. The rest becomes this site.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:26 }}>
            <a href="#projects" style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.termBg, color:C.termGreen, padding:"13px 24px", borderRadius:12, textDecoration:"none", fontSize:13.5, fontWeight:700, fontFamily:"'Fira Code',monospace", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 10px 30px rgba(13,17,23,0.25)" }}>❯ open the projects</a>
            <a href="/writer" onClick={(e)=>{ e.preventDefault(); goTo?.("/writer"); }} style={{ display:"inline-flex", alignItems:"center", background:"#fff", color:C.ink, padding:"13px 24px", borderRadius:12, textDecoration:"none", fontSize:13.5, fontWeight:600, border:`1.5px solid ${C.border}` }}>read my story →</a>
          </div>

          {/* a tiny status line — the day, as a dev sees it */}
          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11.5, color:C.muted, display:"flex", gap:14, flexWrap:"wrap" }}>
            <span>⎇ dhaka</span>
            <span>{daypart[0]}</span>
            <span>{daypart[1]}</span>
          </div>
        </div>

        {/* Right — a life, written as a script */}
        <div style={{ position:"relative", zIndex:2, transform:`perspective(1100px) rotateX(${my*-2}deg) rotateY(${mx*2.4}deg)`, transition:"transform .18s ease-out", transformStyle:"preserve-3d" }}>
          <LifeScript/>
          <div style={{ textAlign:"center", marginTop:14, fontSize:12.5, color:C.muted, fontStyle:"italic", fontFamily:"'Fraunces',serif" }}>
            unsaidscript — অব্যক্ত যা ছিল, script হয়ে গেল।
          </div>
        </div>
      </section>

      {/* ═══ the two languages of one person ═══ */}
      <Marquee/>

      {/* the reading-life story now lives on /writer — this page stays all engineer */}
      <Hills front="#fff" back="#EDE6D4" bg={C.bg}/>

      {/* ═══ EXPERIENCE ═══ */}
      <section style={{ background:"#fff", padding:"70px 60px 90px" }}>
        <SectionLabel>Experience</SectionLabel>
        <H2>Work History</H2>
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {EXPERIENCE.map((e,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:40, padding:"44px 0", borderBottom:i<EXPERIENCE.length-1?`1px solid ${C.border}`:"none", alignItems:"start" }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <div style={{ width:44,height:44,borderRadius:13,background:C.greenS,border:`1px solid ${C.green}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{e.icon}</div>
                  <div>
                    <div style={{ fontSize:18, fontWeight:700, color:C.ink, letterSpacing:"-0.02em", display:"flex", gap:6, alignItems:"center", fontFamily:"'Fraunces',serif" }}>
                      {e.company}
                      {e.url && <a href={e.url} target="_blank" rel="noreferrer" style={{ fontSize:11, color:C.coral, textDecoration:"none", fontWeight:700 }}>↗</a>}
                    </div>
                    <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{e.role}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
                  <Pill color={C.coral}>{e.type}</Pill>
                  <span style={{ fontSize:12, color:C.muted, paddingTop:4 }}>{e.period}</span>
                </div>
                <div style={{ fontSize:12, color:C.muted }}>📍 {e.location}</div>
              </div>
              <div>
                <TerminalWindow title={`${e.company.toLowerCase().replace(/\s+/g,"-")}.sh`}>
                  <TComment>{`// ${e.role}`}</TComment>
                  <TLine color="#e5e7eb">{e.desc}</TLine>
                  <div style={{ marginTop:10 }}>
                    <TComment>{"// stack"}</TComment>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:6 }}>
                      {e.stack.map(s=><span key={s} style={{ background:"rgba(74,222,128,0.12)", color:C.termGreen, fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:20 }}>{s}</span>)}
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Hills front={C.bg} back="#EFE8D6" bg="#fff"/>

      {/* ═══ TECH STACK ═══ */}
      <section style={{ background:C.bg, padding:"70px 60px 90px", position:"relative", overflow:"hidden" }}>
        <SootSprite style={{ top:50, left:"4%" }} size={17} dur={5}/>
        <SectionLabel color={C.sky}>Tech Stack</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
          <div>
            <H2 style={{ margin:"0 0 16px" }}>What I Work With</H2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:"0 0 32px" }}>From core banking APIs to AI/ML systems — a full stack spanning enterprise Java to modern React frontends.</p>
            <TerminalWindow title="skills.sh">
              <TPrompt>cat skills.json | grep expert</TPrompt>
              <TLine color={C.termGreen}>{">"} Java, Spring Boot, React, Oracle, REST APIs</TLine>
              <TPrompt>whoami --summary</TPrompt>
              <TLine color={C.termBlue}>{">"} Fintech dev | AI builder | Backend specialist</TLine>
              <TPrompt>echo $AVAILABLE</TPrompt>
              <TLine color={C.termGreen}>{">"} true ✓</TLine>
            </TerminalWindow>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {SKILL_GROUPS.map(g=>(
              <div key={g.label} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ width:90, fontSize:10.5, fontWeight:700, letterSpacing:1.5, color:g.color, textTransform:"uppercase", paddingTop:6, flexShrink:0 }}>{g.label}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {g.items.map(t=><span key={t} style={{ background:g.color+"16", border:`1px solid ${g.color}30`, color:g.color, fontSize:12, fontWeight:600, padding:"4px 12px", borderRadius:20 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Hills front="#fff" back="#EDE6D4" bg={C.bg}/>

      {/* ═══ PROJECTS — THE IDE ═══ */}
      <section id="projects" style={{ background:"#fff", padding:"70px 60px 90px", position:"relative", overflow:"hidden" }}>
        <SootSprite style={{ top:54, right:"7%" }} size={15} dur={4.6}/>
        <SectionLabel color={C.coral}>Projects</SectionLabel>
        <H2 style={{ margin:"0 0 14px" }}>Selected Work, <span style={{ color:C.coral, fontStyle:"italic" }}>opened in the editor</span></H2>
        <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:"0 0 40px", maxWidth:560 }}>
          The way an engineer actually shows his work — click a file in the explorer, hit ▶ Run on the live ones.
        </p>
        <ProjectIDE/>
      </section>

      <Hills front={C.bg} back="#EFE8D6" bg="#fff"/>

      {/* ═══ PUBLICATIONS ═══ */}
      <section id="research" style={{ background:C.bg, padding:"70px 60px 90px" }}>
        <SectionLabel color={C.gold}>Research</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start" }}>
          <div>
            <H2 style={{ margin:"0 0 16px" }}>Publications</H2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:"0 0 16px" }}>5 peer-reviewed papers in AI, computer vision, and deep learning. My current research interest sits at the intersection of <strong style={{ color:C.ink }}>LLMs × fintech</strong> — and I'm actively looking for the right PhD opportunity to pursue it properly.</p>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.goldS, border:`1.5px solid ${C.gold}44`, borderRadius:30, padding:"8px 18px", marginBottom:24, fontSize:13, fontWeight:700, color:C.ink }}>
              🎓 Open to PhD & research collaborations — <a href="#contact" style={{ color:C.coral, textDecoration:"none" }}>let's talk research</a>
            </div>
            <TerminalWindow title="scholar.sh">
              <TPrompt>./list-papers --sort year</TPrompt>
              <TLine color={C.termBlue}>{">"} Found 5 papers (4 published, 1 under review)</TLine>
              <TLine color={C.termGreen}>{">"} Elsevier · 2 papers</TLine>
              <TLine color={C.termYellow}>{">"} ICCECE · 2 papers</TLine>
              <TLine color={C.termPurple}>{">"} Int. Conference · 1 paper</TLine>
              <TPrompt>cat research-interests.txt</TPrompt>
              <TLine color={C.termGreen}>{">"} LLMs × fintech · Shariah-compliant AI · applied NLP</TLine>
              <TComment>{"# open to PhD & research collaboration"}</TComment>
            </TerminalWindow>
          </div>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {PUBLICATIONS.map((p,i)=>(
              <div key={i} style={{ padding:"18px 12px", borderBottom:i<PUBLICATIONS.length-1?`1px solid ${C.border}`:"none", borderRadius:10, transition:"background .2s" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.goldS}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:C.muted }}>{p.year}</span>
                  <Pill color={p.tag==="Journal"?C.coral:C.sky}>{p.tag}</Pill>
                </div>
                <div style={{ fontSize:14, fontWeight:700, color:C.ink, lineHeight:1.45, marginBottom:3 }}>{p.title}</div>
                <div style={{ fontSize:12, color:C.muted }}>{p.venue}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Hills front="#fff" back="#EDE6D4" bg={C.bg}/>

      {/* ═══ EDUCATION ═══ */}
      <section style={{ background:"#fff", padding:"70px 60px 90px" }}>
        <SectionLabel>Education</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
          <div>
            <H2 style={{ margin:"0 0 36px" }}>Academic Background</H2>
            {[
              { school:"University of Dhaka", degree:"Professional Master's — Information & Cyber Security", period:"Mar 2025 – Present", icon:"🎓" },
              { school:"United International University", degree:"B.Sc. Computer Science & Engineering", period:"2019 – 2023", icon:"🎓" },
              { school:"CodersTrust Bangladesh", degree:"Responsive Web Design + Advanced Web Dev", period:"2019 – 2020", icon:"📜" },
            ].map((e,i)=>(
              <div key={i} style={{ display:"flex", gap:14, marginBottom:20, paddingBottom:20, borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
                <div style={{ width:40,height:40,borderRadius:12,background:C.greenS,border:`1px solid ${C.green}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{e.icon}</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:C.ink, fontFamily:"'Fraunces',serif" }}>{e.school}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{e.degree}</div>
                  <div style={{ fontSize:11.5, color:C.green, marginTop:3, fontWeight:600 }}>{e.period}</div>
                </div>
              </div>
            ))}
          </div>
          <TerminalWindow title="education.log">
            <TComment>{"# git log --oneline education"}</TComment>
            <div style={{ marginTop:8 }}>
              <TLine color={C.termYellow}>a3f2c1e</TLine>
              <TLine color="#e5e7eb">{"  MSc Cyber Security — Univ. of Dhaka (2025–)"}</TLine>
              <TLine color={C.termYellow}>9d1b4f8</TLine>
              <TLine color="#e5e7eb">{"  BSc CSE — United Int'l Univ. (2019–23)"}</TLine>
              <TLine color={C.termYellow}>4c8a2e1</TLine>
              <TLine color="#e5e7eb">{"  Advanced Web Dev — CodersTrust (2020)"}</TLine>
              <TLine color={C.termYellow}>1f3d9b2</TLine>
              <TLine color="#e5e7eb">{"  Responsive Web Design — CodersTrust (2019)"}</TLine>
            </div>
            <div style={{ marginTop:12 }}>
              <TComment>{"# next checkout: branch phd/llm-x-fintech"}</TComment>
              <TLine color={C.termGreen}>{"HEAD -> dr-abdullah (in progress) ✓"}</TLine>
            </div>
          </TerminalWindow>
        </div>
      </section>

      <Hills front={C.bg} back="#EFE8D6" bg="#fff"/>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ background:C.bg, padding:"70px 60px 110px", position:"relative", overflow:"hidden" }}>
        <Cloud top="10%" left="-20%" scale={0.6} dur={90} opacity={0.5}/>
        <SootSprite style={{ bottom:50, right:"8%" }} dur={4.6}/>
        <SectionLabel color={C.coral}>Contact</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60 }}>
          <div>
            <H2 style={{ margin:"0 0 20px" }}>
              Let's write the<br/><span style={{ color:C.coral, fontStyle:"italic" }}>next chapter.</span>
            </H2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:"0 0 32px" }}>
              Open to fintech roles, backend engineering, AI projects, and full-stack freelance work. Remote or Dhaka-based.
            </p>
            {[["📧","cs.abdullah.mamun@gmail.com"],["📍","Dhaka, Bangladesh · Remote OK"],["⚡","Replies within 24 hours"]].map(([ic,v])=>(
              <div key={v} style={{ display:"flex", gap:12, marginBottom:14, fontSize:14, color:C.muted }}>
                <span>{ic}</span><span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
