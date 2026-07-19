import { useState, useEffect } from "react";
import { C } from "../../tokens.js";
import { PROJECTS, EXPERIENCE, PUBLICATIONS, CHAPTERS, SKILL_GROUPS } from "../data/index.js";
import { Logo, Pill, SectionLabel, Card, RotatingWord, TerminalWindow, TLine, TComment, TPrompt, H2, ProjectIDE } from "../components/index.js";
import { LifeScript } from "../components/LifeScript.jsx";
import { Marquee } from "../components/Marquee.jsx";
import { Cloud, Hills, SootSprite } from "./helpers.jsx";

export function HomePage() {
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
            <a href="#story" style={{ display:"inline-flex", alignItems:"center", background:"#fff", color:C.ink, padding:"13px 24px", borderRadius:12, textDecoration:"none", fontSize:13.5, fontWeight:600, border:`1.5px solid ${C.border}` }}>read my story →</a>
          </div>

          {/* a tiny status line — the day, as a dev sees it */}
          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11.5, color:C.muted, display:"flex", gap:14, flexWrap:"wrap" }}>
            <span>⎇ dhaka</span>
            <span>{daypart[0]}</span>
            <span>{daypart[1]}</span>
            <span>🎓 next: dr. abdullah</span>
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

      {/* ═══ THE STORY — chapters of a reading life ═══ */}
      <section id="story" style={{ background:C.bg, padding:"90px 60px 70px", position:"relative", overflow:"hidden" }}>
        {/* <SootSprite style={{ top:60, right:"5%" }} size={16} dur={4.2}/>
        <SectionLabel color={C.coral}>The Story</SectionLabel> */}
        {/* <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start", marginBottom:56 }}>
          <div>
            <H2 style={{ margin:"0 0 16px" }}>A life, told in<br/><span style={{ color:C.coral, fontStyle:"italic" }}>chapters</span></H2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.85, maxWidth:480 }}>
              Every engineer has a stack. Mine starts with a bookshelf. These are the pages that built the person behind the code — and the dream the code is quietly carrying.
            </p>
          </div>
          <TerminalWindow title="soul.log">
            <TPrompt>cat life.log | tail -5</TPrompt>
            <TLine color={C.termYellow}>{"[2014] first book opened — process started"}</TLine>
            <TLine color={C.termBlue}>{"[2016] fell in love: state = irreversible"}</TLine>
            <TLine color={C.termPurple}>{"[teen] himu.walk(barefoot) → rabindranath.read()"}</TLine>
            <TLine color={C.termGreen}>{"[now ] bridge.build(passion, responsibility)"}</TLine>
            <TPrompt>echo $DREAM</TPrompt>
            <TLine color={C.termGreen}>{'> "Dr. Abdullah" — loading… ▓▓▓▓▓░░░░░'}</TLine>
          </TerminalWindow>
        </div> */}

        {/* chapter timeline */}
        {/* <div style={{ position:"relative", maxWidth:900, margin:"0 auto" }}>
          <div style={{ position:"absolute", left:27, top:10, bottom:10, width:2, background:`linear-gradient(180deg,${C.gold},${C.coral},${C.sky},${C.green},${C.gold})`, opacity:0.4, borderRadius:2 }}/>
          {CHAPTERS.map((ch,i)=>(
            <div key={i} style={{ display:"flex", gap:24, marginBottom: i<CHAPTERS.length-1?36:0, position:"relative" }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background:"#fff", border:`2px solid ${ch.color}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0, boxShadow:`0 4px 18px ${ch.color}22`, zIndex:1 }}>{ch.icon}</div>
              <Card accent={ch.color} style={{ flex:1, padding:"24px 28px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8, flexWrap:"wrap", gap:8 }}>
                  <h3 style={{ fontSize:20, fontWeight:600, margin:0, color:C.ink, fontFamily:"'Fraunces',serif", fontStyle:"italic" }}>{ch.title}</h3>
                  <Pill color={ch.color}>{ch.year}</Pill>
                </div>
                <p style={{ color:C.muted, fontSize:14.5, lineHeight:1.85, margin:0 }}>{ch.text}</p>
              </Card>
            </div>
          ))}
        </div> */}
      </section>

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
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:"0 0 28px" }}>5 peer-reviewed papers in AI, computer vision, and deep learning — and a sacred destination: a PhD in LLMs × fintech.</p>
            <TerminalWindow title="scholar.sh">
              <TPrompt>./list-papers --sort year</TPrompt>
              <TLine color={C.termBlue}>{">"} Found 5 papers (4 published, 1 under review)</TLine>
              <TLine color={C.termGreen}>{">"} Elsevier · 2 papers</TLine>
              <TLine color={C.termYellow}>{">"} ICCECE · 2 papers</TLine>
              <TLine color={C.termPurple}>{">"} Int. Conference · 1 paper</TLine>
              <TPrompt>echo $NEXT_MILESTONE</TPrompt>
              <TLine color={C.termGreen}>{'> "PhD — Dr. Abdullah" 🎓'}</TLine>
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
      <section style={{ background:C.bg, padding:"70px 60px 110px", position:"relative", overflow:"hidden" }}>
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

/* ══════════════════════════════════════════
   THE LIBRARY — full review data
══════════════════════════════════════════ */
const BOOKS = [
  {
    slug:"kafka-on-the-shore",
    title:"Kafka on the Shore", author:"Haruki Murakami",
    year:2002, genre:["Magical Realism","Literary Fiction"], pages:505, lang:"English (tr. Philip Gabriel)",
    rating:4.5, readYear:"2021", readTime:"11 min",
    accent:"#2E6E8E",
    cover:{ bg:"linear-gradient(160deg,#1F3A53 0%,#2E6E8E 70%,#3F8CA8 100%)", ink:"#F3EEDF", motif:"moon" },
    verdict:"The most honest portrait of loneliness I've ever read — disguised as a fever dream.",
    pull:"Murakami doesn't explain his worlds, and that's the point. Life never explained itself to me either.",
    tea:"Black tea, no sugar, gone cold because you forgot it — very Murakami.",
    music:"Beethoven's Archduke Trio, like Hoshino plays in the novel.",
    bestAt:"Late night, when the house is asleep.",
    bars:[["Prose",4.4],["Story",4.6],["Characters",4.7],["Emotional impact",4.8]],
    sections:[
      { h:"How this book found me", p:[
        "I came to Murakami the way most people in Dhaka come to anything — through a borrowed copy with somebody else's pencil marks in the margins. A friend handed it over with a warning: 'এটা পড়ে সব বুঝবা না। কিন্তু feel করবা।' He was right on both counts.",
        "By then I had already read enough Bengali literature to think I knew what fiction could do. Rabindranath had shown me beauty, Humayun Ahmed had shown me simplicity. Murakami showed me something else entirely: that a story can behave like a dream and still feel more real than your commute.",
      ]},
      { h:"What it's about — without ruining it", p:[
        "A fifteen-year-old boy runs away from home to escape a prophecy. An old man who talks to cats sets out on a journey he doesn't understand. Their paths bend toward each other through libraries, forests, and a town where time has politely stopped. Fish fall from the sky. Nobody acts like that's the strange part.",
        "If that summary sounds confusing, good — the book isn't meant to be summarized. It's meant to be inhabited. Murakami builds the plot like a piece of music: themes appear, vanish, return transformed. You stop asking 'what is happening' around page 150 and start asking 'what is this doing to me' instead.",
      ]},
      { h:"What it did to me", p:[
        "I read this during a stretch of my life when I felt like two people — the engineer who debugged payment gateways by day, and someone else entirely at 2 AM, someone with questions that had no Jira tickets. Kafka on the Shore is a book about exactly that split. Every character is living in two worlds at once, and the novel never asks them to choose.",
        "The loneliness in this book is not sad, exactly. It's architectural. Murakami treats solitude like a room you can furnish — with music, with books, with routine. As someone who has built most of his inner life in quiet rooms with quiet pages, I felt seen in a way that was almost uncomfortable.",
        "And the library at the center of the story — a small private library where a boy is allowed to simply sit and read all day — remains my idea of what Jannah's waiting room might look like.",
      ]},
      { h:"The craft", p:[
        "Murakami's prose (in Gabriel's translation) is deceptively plain. Short sentences. Concrete details. Sandwiches are made, records are played, shirts are ironed. Then, without changing tone, a man speaks with cats or a spirit slips out of a sleeping body — and because the sentences stayed calm, you believe it. That's the magic trick: the magician never raises his voice.",
        "It isn't flawless. The middle sags slightly, a few mysteries stay unsolved in ways that feel less like ambiguity and more like a shrug, and one or two scenes haven't aged gracefully. I docked half a star and I stand by it. But the spell, overall, holds.",
      ]},
      { h:"Who should read this", p:[
        "Read it if you've ever felt homesick for a place that doesn't exist. Read it if you like your fiction to trust you with unanswered questions. Skip it if you need plots that resolve like unit tests — all green, everything asserted. This book ends with passing tests you didn't write and can't see. You just feel that they passed.",
      ]},
    ],
    loved:[
      "A library as the safest place in the universe — my whole childhood agreed",
      "Magic delivered in a calm, unbothered voice",
      "Loneliness treated as architecture, not tragedy",
      "Hoshino's transformation — the book's quiet miracle",
    ],
    quibbles:[
      "The middle third wanders",
      "A few threads are dropped rather than resolved",
      "One subplot reads differently — and worse — in 2026",
    ],
    similar:["norwegian-wood-ref","the-metamorphosis","forty-rules-of-love"],
  },
  {
    slug:"forty-rules-of-love",
    title:"The Forty Rules of Love", author:"Elif Shafak",
    year:2009, genre:["Sufi Fiction","Spiritual"], pages:354, lang:"English",
    rating:5, readYear:"2016", readTime:"9 min",
    accent:"#D96C4F",
    cover:{ bg:"linear-gradient(160deg,#7E3340 0%,#B5503F 55%,#D96C4F 100%)", ink:"#FBF0DC", motif:"whirl" },
    verdict:"Not my favorite book — my hinge. There is my life before this book and my life after it.",
    pull:"Some books you read. Some books read you. This one read me at the right age and quietly turned me toward Allah.",
    tea:"Cinnamon chai, slightly oversweet — the way truth tastes when Shams says it.",
    music:"Ney flute, barely audible.",
    bestAt:"Fajr-adjacent hours, when the world hasn't started performing yet.",
    bars:[["Prose",4.2],["Story",4.5],["Characters",4.6],["Emotional impact",5.0]],
    sections:[
      { h:"The before and the after", p:[
        "It was 2016. I was a teenager with a growing stack of storybooks and no particular direction. Then this novel arrived — two stories braided together: a bored American housewife reading a manuscript, and inside that manuscript, the thirteenth-century meeting of the scholar Rumi and the wandering dervish Shams of Tabriz.",
        "I came for the story. I stayed for the rules — forty small earthquakes of Sufi wisdom scattered through the book. And somewhere between rule one and rule forty, the direction of my life bent. Reading stopped being a hobby and became a search. The search, in time, led me where all honest searches lead — back to Allah and His Rasul ﷺ.",
      ]},
      { h:"What the book actually does", p:[
        "Shafak's real achievement isn't the plot — it's the temperature. The book runs warm. Every chapter is told from a different voice (a drunk, a leper, a zealot, a killer), and each one is handled with the same radical tenderness. The structure itself is the sermon: everyone gets to speak, everyone is seen, no one is beyond the circle.",
        "The Ella storyline — the modern frame — is, frankly, the weaker half. It exists mostly as a mirror. But I've come to forgive it, because the mirror is the point: the book wants you to ask what would crack open in your own settled life if a Shams walked into it.",
      ]},
      { h:"What it did to me", p:[
        "It gave my restlessness a vocabulary. I had grown up with faith as inheritance; this book made it an encounter. After finishing it I went looking for Rumi's actual poetry, then for the history, then for the Qur'an with fresh eyes — not as ritual but as a love letter I'd been skimming.",
        "Ten years later, I still measure people the way the book taught me: not by how loudly they worship, but by how gently they treat the leper, the drunk, the beggar in the chapter of their own lives.",
      ]},
      { h:"Honest criticism — because love requires it", p:[
        "Is it the greatest novel ever written? No. The prose occasionally turns into a greeting card, the modern half is thin, and scholars will tell you the history is romanticized. All true. I'm rating the collision, not just the craft: five stars for what it set in motion. Some books are doors, and you don't grade a door on its woodwork after it has opened onto your whole life.",
      ]},
      { h:"Who should read this", p:[
        "Anyone standing at the edge of their inherited faith, wondering if there's a room inside it they haven't visited. Anyone who loved The Alchemist but wished it had more blood and history in it. And every reader who has ever underlined a sentence and felt underlined back.",
      ]},
    ],
    loved:[
      "Forty rules that read like forty small doors",
      "Radical tenderness toward every narrator — even the killer",
      "It sent me back to the Qur'an with a lover's eyes",
      "Shams. Just — Shams.",
    ],
    quibbles:[
      "The modern storyline is the thinner braid",
      "History smoothed for the sake of sweetness",
      "Prose occasionally over-sugars",
    ],
    similar:["the-metamorphosis","kafka-on-the-shore","rumi-ref"],
  },
  {
    slug:"the-metamorphosis",
    title:"The Metamorphosis", author:"Franz Kafka",
    year:1915, genre:["Absurdist","Classic Novella"], pages:104, lang:"English (tr. Stanley Corngold)",
    rating:4.5, readYear:"2022", readTime:"7 min",
    accent:"#6B5B43",
    cover:{ bg:"linear-gradient(160deg,#2E2C24 0%,#4A4434 60%,#6B5B43 100%)", ink:"#E9E2CE", motif:"beetle" },
    verdict:"One hundred pages that ask the question every dutiful son is afraid of: what am I worth to my family when I can no longer provide?",
    pull:"I cried over why the world is the way it is. Kafka taught me to stop crying and start seeing — and somehow that was the kinder lesson.",
    tea:"Plain red tea in a glass cup, like roadside tong tea — bitter, honest, finished quickly.",
    music:"None. This book deserves silence.",
    bestAt:"A rainy afternoon when you're slightly unwell — the book's natural habitat.",
    bars:[["Prose",4.6],["Story",4.3],["Characters",4.4],["Emotional impact",4.9]],
    sections:[
      { h:"The famous first morning", p:[
        "Gregor Samsa wakes up transformed into a giant insect, and the most disturbing thing in the entire novella is his reaction: he worries about being late for work. Not the body. Not the legs. The train schedule. The boss. The debt his family owes. Kafka wrote that in 1915 and it lands harder in 2026 than most fiction written this year.",
        "I read it in two sittings, the second one ending well past midnight, and sat for a while afterward doing absolutely nothing — which I've learned is my body's way of marking that something important just happened.",
      ]},
      { h:"Why this hit a middle-class Bengali son so hard", p:[
        "Strip away the insect and the novella is about something painfully familiar in our part of the world: a son whose entire identity is his usefulness. Gregor exists to pay the family's debts. When he can't anymore, the family's love is revealed for what it partly was — gratitude with conditions.",
        "I'm a married man from a middle-class family. I know the quiet arithmetic of being needed. Reading Gregor's family slowly turn away from him, I wasn't horrified by the fantasy — I was horrified by the realism. Kafka just made the metaphor literal enough that you can't look away from it.",
      ]},
      { h:"From crying to accepting", p:[
        "There was a phase of my life when I genuinely grieved over the way the world works — why people are transactional, why love keeps ledgers, why softness gets punished. Kafka was the writer who sat with me in that grief without offering a single false comfort. He doesn't fix anything. He just describes it perfectly, and the precision itself becomes a strange mercy.",
        "After Kafka, I stopped demanding that the world justify itself. Like him, I learned to accept everything exactly as it is — and acceptance, it turns out, is not surrender. It's the only stable ground you can build anything on. Including a life. Including this website.",
      ]},
      { h:"The craft", p:[
        "The prose is dry, bureaucratic, almost comically calm — and that's the engine of the horror. Kafka files a report about a tragedy. No metaphor is explained, no symbol is winked at. In a hundred pages there is not one wasted scene, which is why this novella has outlived ten thousand longer novels.",
        "Half a star withheld only because the sister's final turn, while thematically perfect, is emotionally rushed — the one place where the report could have slowed down.",
      ]},
      { h:"Who should read this", p:[
        "Every eldest son. Every provider who has wondered, in a dark honest moment, what would remain if the providing stopped. And anyone who thinks classics are homework — this one is 104 pages and it will finish you before you finish it.",
      ]},
    ],
    loved:[
      "The calmest narrator in literature describing the saddest story",
      "Family love examined without anesthesia",
      "104 pages, zero waste",
      "It turned my grief about the world into acceptance",
    ],
    quibbles:[
      "Grete's final pivot feels compressed",
      "Bring your own light — the book offers none",
    ],
    similar:["kafka-on-the-shore","forty-rules-of-love","himu-ref"],
  },
];

/* off-shelf references for the "similar" row */
const SHELF_REFS = {
  "norwegian-wood-ref": { title:"Norwegian Wood", author:"Murakami", cover:{ bg:"linear-gradient(160deg,#2F4A33,#5E8C61)", ink:"#F3EEDF", motif:"none" } },
  "rumi-ref":           { title:"The Essential Rumi", author:"tr. Coleman Barks", cover:{ bg:"linear-gradient(160deg,#8A6A2F,#D9A441)", ink:"#FBF3DF", motif:"whirl" } },
  "himu-ref":           { title:"ময়ূরাক্ষী", author:"হুমায়ূন আহমেদ", cover:{ bg:"linear-gradient(160deg,#B58A1F,#F2C24B)", ink:"#3B3A2F", motif:"none" } },
};
const getShelfItem = (slug) => BOOKS.find(b=>b.slug===slug) || SHELF_REFS[slug];

/* ══════════════════════════════════════════
   BOOK ATOMS — stars, covers, rating bars
══════════════════════════════════════════ */
function Stars({ value, size=15 }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:2 }}>
      {[1,2,3,4,5].map(i=>{
        const fill = value >= i ? 1 : value >= i-0.5 ? 0.5 : 0;
        return (
          <span key={i} style={{ position:"relative", fontSize:size, lineHeight:1 }}>
            <span style={{ color:"#E3DAC2" }}>★</span>
            <span style={{ position:"absolute", left:0, top:0, width:`${fill*100}%`, overflow:"hidden", color:C.gold }}>★</span>
          </span>
        );
      })}
      <span style={{ fontSize:size-3, color:C.muted, fontFamily:"'Fira Code',monospace", marginLeft:5 }}>{value.toFixed(1)}</span>
    </span>
  );
}

function BookCover({ book, w=150, tilt=true }) {
  const [h, setH] = useState(false);
  const hgt = Math.round(w*1.5);
  const cv = book.cover || {};
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ width:w, height:hgt, position:"relative", flexShrink:0,
        transform: tilt ? (h ? "perspective(700px) rotateY(-14deg) translateY(-4px)" : "perspective(700px) rotateY(-7deg)") : "none",
        transition:"transform .35s ease", transformStyle:"preserve-3d" }}>
      {/* page block on the right */}
      <div style={{ position:"absolute", right:-Math.max(4,w*0.035), top:Math.max(3,w*0.02), bottom:Math.max(3,w*0.02), width:Math.max(5,w*0.045), background:"repeating-linear-gradient(180deg,#FFFDF4 0 2px,#E8E0CC 2px 3px)", borderRadius:"0 3px 3px 0" }}/>
      {/* the cover */}
      <div style={{ position:"absolute", inset:0, background:cv.bg, borderRadius:"4px 8px 8px 4px", boxShadow: h ? "14px 18px 38px rgba(59,58,47,0.35)" : "8px 12px 26px rgba(59,58,47,0.28)", transition:"box-shadow .35s ease", overflow:"hidden", display:"flex", flexDirection:"column", padding:`${w*0.10}px ${w*0.09}px` }}>
        {/* spine shadow */}
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:Math.max(5,w*0.06), background:"linear-gradient(90deg,rgba(0,0,0,0.30),rgba(0,0,0,0))" }}/>
        {/* motif */}
        {cv.motif==="moon" && <div style={{ position:"absolute", right:w*0.10, top:hgt*0.13, width:w*0.30, height:w*0.30 }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:cv.ink, opacity:0.9 }}/>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:cv.bg ? "transparent" : "", boxShadow:`inset ${w*0.085}px ${-w*0.02}px 0 0 #1F3A53` }}/>
        </div>}
        {cv.motif==="whirl" && <div style={{ position:"absolute", right:w*0.08, top:hgt*0.11, width:w*0.34, height:w*0.34, border:`2px solid ${cv.ink}`, borderRadius:"50%", opacity:0.65, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:"38%", height:"38%", border:`2px solid ${cv.ink}`, borderRadius:"50%" }}/>
        </div>}
        {cv.motif==="beetle" && <div style={{ position:"absolute", right:w*0.10, top:hgt*0.12, width:w*0.26, height:w*0.34, border:`2px solid ${cv.ink}`, borderRadius:"50% 50% 46% 46%", opacity:0.55 }}>
          <div style={{ position:"absolute", left:"50%", top:"12%", bottom:"8%", width:1.6, background:cv.ink }}/>
        </div>}
        {/* type */}
        <div style={{ marginTop:"auto", position:"relative" }}>
          <div style={{ width:w*0.22, height:2, background:cv.ink, opacity:0.7, marginBottom:w*0.06 }}/>
          <div style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:Math.max(11,w*0.105), lineHeight:1.18, color:cv.ink, letterSpacing:"-0.01em" }}>{book.title}</div>
          <div style={{ fontFamily:"'Karla',sans-serif", fontSize:Math.max(8.5,w*0.062), color:cv.ink, opacity:0.8, marginTop:w*0.045, letterSpacing:0.6, textTransform:"uppercase" }}>{book.author}</div>
        </div>
      </div>
    </div>
  );
}

function BarRow({ label, value, accent }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setOn(true); io.disconnect(); } },{ threshold:0.4 });
    if (ref.current) io.observe(ref.current);
    return ()=>io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:13, color:C.ink, fontWeight:600 }}>{label}</span>
        <span style={{ fontSize:12, color:C.muted, fontFamily:"'Fira Code',monospace" }}>{value.toFixed(1)} / 5</span>
      </div>
      <div style={{ height:7, borderRadius:5, background:C.bg2, overflow:"hidden" }}>
        <div style={{ height:"100%", width: on ? `${(value/5)*100}%` : "0%", borderRadius:5, background:`linear-gradient(90deg,${accent},${accent}AA)`, transition:"width 1s cubic-bezier(.3,.7,.3,1)" }}/>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   REVIEW PAGE — the reading room.
══════════════════════════════════════════ */
function ScrollProgress({ accent }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setW(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div style={{ position:"fixed", top:60, left:0, height:3, width:`${w}%`, background:`linear-gradient(90deg,${accent},${accent}AA)`, zIndex:1500, transition:"width .1s linear" }}/>;
}

function ReviewPage({ slug, openBook, closeBook }) {
  const book = BOOKS.find(b=>b.slug===slug) || BOOKS[0];
  const idx = BOOKS.findIndex(b=>b.slug===book.slug);
  const prev = BOOKS[(idx-1+BOOKS.length)%BOOKS.length];
  const next = BOOKS[(idx+1)%BOOKS.length];
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true); setTimeout(()=>setCopied(false), 2000);
  };

  return (
    <div className="rvgroup" style={{ position:"relative" }}>
      <ScrollProgress accent={book.accent}/>

      {/* ── HERO ── */}
      <section style={{ padding:"56px 60px 64px", position:"relative", overflow:"hidden" }}>
        {/* giant faint motif letter */}
        <div style={{ position:"absolute", top:-30, right:-10, fontFamily:"'Fraunces',serif", fontStyle:"italic", fontWeight:700, fontSize:300, lineHeight:1, color:book.accent, opacity:0.05, pointerEvents:"none", userSelect:"none" }}>{book.title[0]}</div>

        <button onClick={closeBook} style={{ background:"none", border:"none", color:C.muted, fontSize:13, fontFamily:"'Fira Code',monospace", cursor:"pointer", padding:0, marginBottom:38, display:"inline-flex", alignItems:"center", gap:8 }}
          onMouseEnter={e=>e.currentTarget.style.color=book.accent} onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
          ← cd ../writing
        </button>

        <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:56, alignItems:"center", maxWidth:1020 }}>
          <BookCover book={book} w={225}/>
          <div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
              <Pill color={book.accent}>Book Review</Pill>
              {book.genre.map(g=><span key={g} style={{ fontSize:11, color:C.muted, border:`1px solid ${C.border}`, borderRadius:30, padding:"3px 11px" }}>{g}</span>)}
            </div>
            <h1 style={{ fontSize:"clamp(34px,4.4vw,56px)", fontWeight:600, letterSpacing:"-0.03em", margin:"0 0 8px", color:C.ink, lineHeight:1.06, fontFamily:"'Fraunces',serif" }}>{book.title}</h1>
            <div style={{ fontSize:17, color:C.muted, fontStyle:"italic", fontFamily:"'Fraunces',serif", marginBottom:16 }}>by {book.author}</div>
            <div style={{ marginBottom:18 }}><Stars value={book.rating} size={19}/></div>
            <p style={{ fontSize:16.5, color:C.ink, lineHeight:1.7, fontFamily:"'Fraunces',serif", fontStyle:"italic", maxWidth:560, margin:"0 0 22px", borderLeft:`3px solid ${book.accent}`, paddingLeft:16 }}>
              "{book.verdict}"
            </p>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap", fontSize:12, color:C.muted, fontFamily:"'Fira Code',monospace", marginBottom:22 }}>
              <span>📅 {book.year}</span><span>📄 {book.pages} pages</span><span>🌐 {book.lang}</span><span>📖 read in {book.readYear}</span><span>⏱ {book.readTime}</span>
            </div>
            <button onClick={copyLink} style={{ background: copied ? C.greenS : "#fff", border:`1.5px solid ${copied ? C.green : C.border}`, color: copied ? C.green : C.muted, padding:"9px 18px", borderRadius:30, cursor:"pointer", fontSize:12.5, fontWeight:600, transition:"all .2s" }}>
              {copied ? "link copied ✓" : "🔗 share this review"}
            </button>
          </div>
        </div>
      </section>

      <Hills front={C.bg} back="#EFE8D6" bg="transparent"/>

      {/* ── BODY ── */}
      <section style={{ background:C.bg, padding:"64px 60px 80px" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>

          {book.sections.map((sec, si)=>(
            <div key={si} style={{ marginBottom:46 }}>
              <h2 style={{ fontSize:25, fontWeight:600, color:C.ink, fontFamily:"'Fraunces',serif", margin:"0 0 18px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ color:book.accent, fontSize:14 }}>✦</span>{sec.h}
              </h2>
              {sec.p.map((para, pi)=>(
                <p key={pi} className={si===0 && pi===0 ? "dropcap" : undefined}
                  style={{ fontSize:16.5, lineHeight:1.95, color:"#4A4839", margin:"0 0 20px", fontFamily:"'Karla',sans-serif" }}>
                  {para}
                </p>
              ))}
              {/* pull quote after the second section */}
              {si===1 && (
                <blockquote style={{ margin:"38px 0 14px", padding:"6px 0 6px 26px", borderLeft:`3px solid ${book.accent}`, fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:22, lineHeight:1.55, color:C.ink }}>
                  {book.pull}
                  <div style={{ fontSize:12.5, color:C.muted, marginTop:12, fontStyle:"normal", fontFamily:"'Fira Code',monospace" }}>— margin note, my copy</div>
                </blockquote>
              )}
            </div>
          ))}

          {/* ── rating breakdown ── */}
          <div style={{ background:"#fff", border:`1.5px solid ${C.border}`, borderRadius:20, padding:"28px 30px", margin:"54px 0 26px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:10 }}>
              <h3 style={{ fontSize:18, fontWeight:600, margin:0, color:C.ink, fontFamily:"'Fraunces',serif" }}>The scorecard</h3>
              <Stars value={book.rating} size={16}/>
            </div>
            {book.bars.map(([label,val])=><BarRow key={label} label={label} value={val} accent={book.accent}/>)}
          </div>

          {/* ── loved / quibbles ── */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:26 }}>
            <div style={{ background:C.greenS, border:`1.5px solid ${C.green}30`, borderRadius:20, padding:"24px 26px" }}>
              <h3 style={{ fontSize:15, fontWeight:700, margin:"0 0 14px", color:C.green, letterSpacing:0.5 }}>WHAT I LOVED</h3>
              {book.loved.map(l=><div key={l} style={{ display:"flex", gap:10, fontSize:13.5, color:"#4A4839", lineHeight:1.6, marginBottom:10 }}><span style={{ color:C.green }}>✦</span>{l}</div>)}
            </div>
            <div style={{ background:C.coralS, border:`1.5px solid ${C.coral}30`, borderRadius:20, padding:"24px 26px" }}>
              <h3 style={{ fontSize:15, fontWeight:700, margin:"0 0 14px", color:C.coral, letterSpacing:0.5 }}>HONEST QUIBBLES</h3>
              {book.quibbles.map(l=><div key={l} style={{ display:"flex", gap:10, fontSize:13.5, color:"#4A4839", lineHeight:1.6, marginBottom:10 }}><span style={{ color:C.coral }}>✕</span>{l}</div>)}
            </div>
          </div>

          {/* ── pairs well with ── */}
          <div style={{ background:"#fff", border:`1.5px solid ${C.border}`, borderRadius:20, padding:"24px 28px", marginBottom:26 }}>
            <h3 style={{ fontSize:15, fontWeight:700, margin:"0 0 16px", color:C.gold, letterSpacing:0.5 }}>PAIRS WELL WITH</h3>
            {[["🍵", book.tea],["🎵", book.music],["🕰", book.bestAt]].map(([ic,v])=>(
              <div key={String(v)} style={{ display:"flex", gap:12, fontSize:14, color:"#4A4839", lineHeight:1.7, marginBottom:10 }}>
                <span>{ic}</span><span style={{ fontStyle:"italic", fontFamily:"'Fraunces',serif" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* ── closing terminal — the signature ── */}
          <TerminalWindow title="review.meta" style={{ marginBottom:54 }}>
            <TPrompt>./rate "{book.title}" --final</TPrompt>
            <TLine color={C.termYellow}>{`> ${"★".repeat(Math.floor(book.rating))}${book.rating%1?"½":""} — ${book.rating.toFixed(1)} / 5`}</TLine>
            <TPrompt>mv book ~/shelf/keep-forever</TPrompt>
            <TLine color={C.termGreen}>{"> done ✓"}</TLine>
            <TComment>{"# reviewed by a reader who became an engineer"}</TComment>
          </TerminalWindow>

          {/* ── similar shelf ── */}
          <h3 style={{ fontSize:20, fontWeight:600, margin:"0 0 22px", color:C.ink, fontFamily:"'Fraunces',serif" }}>If this one moved you, try…</h3>
          <div style={{ display:"flex", gap:26, flexWrap:"wrap", marginBottom:10 }}>
            {book.similar.map(sl=>{
              const it = getShelfItem(sl);
              if (!it) return null;
              const clickable = !!it.slug;
              return (
                <div key={sl} onClick={()=> clickable && openBook(it.slug)} style={{ width:118, cursor: clickable ? "pointer" : "default" }}>
                  <BookCover book={it} w={118}/>
                  <div style={{ fontSize:12, color:C.ink, fontWeight:600, marginTop:12, lineHeight:1.4 }}>{it.title}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{it.author}</div>
                  {clickable && <div style={{ fontSize:11, color:book.accent, fontWeight:700, marginTop:5 }}>reviewed →</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT ── */}
      <section style={{ background:"#fff", borderTop:`1px solid ${C.border}`, display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        {[["← previous review", prev],["next review →", next]].map(([lbl, b],i)=>(
          <div key={String(lbl)} onClick={()=>openBook(b.slug)}
            style={{ padding:"34px 60px", cursor:"pointer", display:"flex", alignItems:"center", gap:20, justifyContent: i===0 ? "flex-start":"flex-end", borderRight: i===0 ? `1px solid ${C.border}`:"none", transition:"background .2s" }}
            onMouseEnter={e=>e.currentTarget.style.background=C.bg}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {i===1 && <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, color:C.muted, fontFamily:"'Fira Code',monospace", marginBottom:6 }}>{lbl}</div>
              <div style={{ fontSize:16, fontWeight:600, color:C.ink, fontFamily:"'Fraunces',serif" }}>{b.title}</div>
              <div style={{ fontSize:12, color:C.muted }}>{b.author}</div>
            </div>}
            <BookCover book={b} w={56} tilt={false}/>
            {i===0 && <div>
              <div style={{ fontSize:11, color:C.muted, fontFamily:"'Fira Code',monospace", marginBottom:6 }}>{lbl}</div>
              <div style={{ fontSize:16, fontWeight:600, color:C.ink, fontFamily:"'Fraunces',serif" }}>{b.title}</div>
              <div style={{ fontSize:12, color:C.muted }}>{b.author}</div>
            </div>}
          </div>
        ))}
      </section>
    </div>
  );
}
