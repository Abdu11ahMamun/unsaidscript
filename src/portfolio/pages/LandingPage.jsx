import { useState, useEffect } from "react";
import { C } from "../../tokens.js";
import { BOOKS, EXPERIENCE, TRANSLATION_DESK, TRANSLATION_PIPELINE } from "../data/index.js";
import { BookCover, Stars, Pill, Card, H2, SectionLabel } from "../components/index.js";
import { Marquee } from "../components/Marquee.jsx";
import { TerminalWindow, TLine, TComment, TPrompt } from "../components/TerminalWindow.jsx";
import { Cloud, SootSprite, Hills } from "./helpers.jsx";

/* ── typewriter — the unsaid, typing itself ── */
function useTypewriter(phrases, speed = 52, eraseSpeed = 22, hold = 2100) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [phase, setPhase] = useState("typing");
  useEffect(() => {
    const phrase = phrases[i];
    let t;
    if (phase === "typing") {
      if (len < phrase.length) t = setTimeout(() => setLen(l => l + 1), speed);
      else t = setTimeout(() => setPhase("erasing"), hold);
    } else {
      if (len > 0) t = setTimeout(() => setLen(l => l - 1), eraseSpeed);
      else t = setTimeout(() => { setI(x => (x + 1) % phrases.length); setPhase("typing"); }, 40);
    }
    return () => clearTimeout(t);
  }, [phase, len, i, phrases, speed, eraseSpeed, hold]);
  return phrases[i].slice(0, len);
}

const HERO_LINES = [
  "by day — code that moves money.",
  "by night — pages that move me.",
  "in between — অব্যক্ত, becoming script.",
];
const TERM_LINES = [
  "./deploy banking-core --env prod",
  'grep -r "meaning" ./src',
  'git commit -m "one more chapter"',
  "java -jar life.jar --mode=night",
];

/* night-sky star positions for the engineer half */
const NIGHT_STARS = [["58%","12%"],["66%","28%"],["74%","9%"],["81%","22%"],["88%","14%"],["93%","34%"],["70%","44%"],["84%","52%"],["95%","60%"],["62%","6%"]];
const FIREFLIES = [["52%","58%"],["60%","70%"],["55%","38%"]];

export function LandingPage({ goTo }) {
  const [mx, setMx] = useState(0), [my, setMy] = useState(0);
  const [door, setDoor] = useState(null); // "writer" | "engineer" | null
  const typed = useTypewriter(HERO_LINES);
  const termTyped = useTypewriter(TERM_LINES, 42, 16, 1500);
  const featured = BOOKS[0];
  const job = EXPERIENCE[0];

  useEffect(() => {
    const h = (e) => { setMx((e.clientX / window.innerWidth - .5) * 2); setMy((e.clientY / window.innerHeight - .5) * 2); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div style={{ position:"relative" }}>

      {/* ═══ HERO — the desk at dusk: day on the left, night on the right ═══ */}
      <section className="lpHero" style={{ minHeight:"calc(100vh - 60px)", position:"relative", overflow:"hidden", background:`linear-gradient(112deg, ${C.bg} 0%, #F6EDDB 49.9%, #24322A 50.1%, ${C.termBg} 100%)`, display:"flex", flexDirection:"column" }}>

        {/* ── day sky ── */}
        <div style={{ position:"absolute", top:"-12%", left:"-8%", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle, rgba(217,164,65,0.16), rgba(217,164,65,0) 65%)", pointerEvents:"none" }}/>
        <Cloud top="9%" left="-12%" scale={0.85} dur={75} opacity={0.75}/>
        <Cloud top="24%" left="-20%" scale={0.55} dur={95} delay={6} opacity={0.5}/>
        <SootSprite style={{ top:"16%", left:"38%" }} size={15} dur={4.4}/>
        {/* অব্যক্ত — drifting with the cursor */}
        <div style={{ position:"absolute", bottom:"4%", left:"1%", fontFamily:"'Fraunces',serif", fontStyle:"italic", fontWeight:600, fontSize:"clamp(90px,10vw,150px)", color:C.coral, opacity:0.06, transform:`rotate(-5deg) translate(${mx*-8}px,${my*-5}px)`, pointerEvents:"none", lineHeight:1, userSelect:"none", whiteSpace:"nowrap" }}>অব্যক্ত</div>

        {/* ── night sky ── */}
        {NIGHT_STARS.map(([l,t],i)=>(
          <div key={`s${i}`} style={{ position:"absolute", left:l, top:t, width:i%3?2:3, height:i%3?2:3, borderRadius:"50%", background:"#fff", opacity:0.6, animation:`twinkle ${2.2+i*0.5}s ease-in-out ${i*0.3}s infinite`, pointerEvents:"none" }}/>
        ))}
        {FIREFLIES.map(([l,t],i)=>(
          <div key={`f${i}`} style={{ position:"absolute", left:l, top:t, width:5, height:5, borderRadius:"50%", background:C.gold, boxShadow:`0 0 12px ${C.gold}`, animation:`firefly ${5+i*1.6}s ease-in-out ${i*0.8}s infinite`, pointerEvents:"none" }}/>
        ))}
        {/* moon */}
        <div style={{ position:"absolute", top:"9%", right:"7%", width:54, height:54, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, #F3EEDF, #D8CFB4)", boxShadow:"0 0 40px rgba(243,238,223,0.35)", opacity:0.9, transform:`translate(${mx*6}px,${my*4}px)`, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:12, left:26, width:9, height:9, borderRadius:"50%", background:"rgba(0,0,0,0.07)" }}/>
          <div style={{ position:"absolute", top:28, left:14, width:6, height:6, borderRadius:"50%", background:"rgba(0,0,0,0.06)" }}/>
        </div>
        {/* </> watermark */}
        <div style={{ position:"absolute", bottom:"5%", right:"2%", fontFamily:"'Fira Code',monospace", fontWeight:700, fontSize:"clamp(80px,9vw,130px)", color:C.termGreen, opacity:0.05, transform:`translate(${mx*8}px,${my*5}px)`, lineHeight:1, pointerEvents:"none", userSelect:"none" }}>{"</>"}</div>

        {/* ── headline — sits on the seam, split like the person ── */}
        <div style={{ textAlign:"center", padding:"56px 24px 8px", position:"relative", zIndex:3 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:18 }}>
            <span style={{ fontSize:11.5, letterSpacing:2.5, textTransform:"uppercase", color:C.muted, fontWeight:600 }}>Abdullah Al Mamun · Dhaka</span>
            <span style={{ width:3, height:3, borderRadius:"50%", background:C.gold, display:"inline-block" }}/>
            <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11.5, color:"#16a34a", fontWeight:700, letterSpacing:1 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 8px #22c55e", display:"inline-block", animation:"pulse 2s infinite" }}/>
              AVAILABLE
            </span>
          </div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:"clamp(40px,5.6vw,74px)", letterSpacing:"-0.03em", lineHeight:1.04, margin:"0 0 10px" }}>
            <span style={{ color:C.ink }}>One person. </span>
            <span className="lpGradText" style={{ fontStyle:"italic" }}>Two scripts.</span>
          </h1>
          {/* hand-drawn ink underline */}
          <svg viewBox="0 0 340 14" width="min(340px,60vw)" height="14" style={{ display:"block", margin:"0 auto 14px" }}>
            <path className="lpInk" d="M6 9 C 60 3, 120 12, 170 7 S 300 4, 334 8" fill="none" stroke={C.coral} strokeWidth="2.6" strokeLinecap="round" opacity="0.75"/>
          </svg>
          {/* the typewriter line */}
          <div style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:"clamp(15px,1.9vw,19px)", minHeight:30, color:C.ink }}>
            <span className="lpTypedLight">{typed}</span>
            <span style={{ display:"inline-block", width:9, height:"1.05em", verticalAlign:"-0.18em", marginLeft:3, background:C.coral, animation:"blink 1s step-end infinite" }}/>
          </div>
        </div>

        {/* ── the two doors ── */}
        <div className="lpDoors" style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(24px,4vw,64px)", alignItems:"stretch", padding:"30px clamp(24px,5vw,72px) 56px", position:"relative", zIndex:3, maxWidth:1280, width:"100%", margin:"0 auto" }}>

          {/* WRITER DOOR — a paper card on the day side */}
          <div onClick={()=>goTo("/writer")} onMouseEnter={()=>setDoor("writer")} onMouseLeave={()=>setDoor(null)}
            style={{ cursor:"pointer", background:"#fff", border:`1.5px solid ${C.border}`, borderRadius:22, padding:"30px 34px", position:"relative", overflow:"hidden",
              transform: door==="writer" ? "translateY(-8px) rotate(0deg)" : `rotate(-1.1deg) translate(${mx*3}px,${my*2}px)`,
              boxShadow: door==="writer" ? `0 24px 60px ${C.coral}2E` : "0 10px 36px rgba(59,58,47,0.12)",
              transition:"transform .35s ease, box-shadow .35s ease", display:"flex", flexDirection:"column" }}>
            {/* paper texture corner fold */}
            <div style={{ position:"absolute", top:0, right:0, width:0, height:0, borderStyle:"solid", borderWidth:"0 34px 34px 0", borderColor:`transparent ${C.coralS} transparent transparent` }}/>
            <div style={{ fontSize:11, letterSpacing:2.5, textTransform:"uppercase", color:C.coral, fontWeight:700, marginBottom:10 }}>✦ Door one</div>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", fontWeight:600, fontSize:"clamp(26px,2.6vw,36px)", color:C.ink, margin:"0 0 10px", letterSpacing:"-0.02em" }}>The Writer</h2>
            <p style={{ color:C.muted, fontSize:13.5, lineHeight:1.75, margin:"0 0 20px" }}>
              Reviews written like letters, a reading life told in chapters, a translation
              desk warming up — and one day, ইনশাআল্লাহ, a book of my own.
            </p>
            {/* the shelf — fans open on hover */}
            <div style={{ display:"flex", alignItems:"flex-end", gap:6, marginBottom:20, height:64 }}>
              {BOOKS.map((b,i)=>(
                <div key={b.slug} style={{ width:38, height:58, borderRadius:3.5, background:b.cover.bg, boxShadow:"3px 4px 10px rgba(59,58,47,0.22)",
                  transform: door==="writer" ? `rotate(${(i-1)*10}deg) translateY(-7px)` : `rotate(${(i-1)*2}deg)`,
                  transformOrigin:"bottom center", transition:`transform .4s cubic-bezier(.34,1.4,.5,1) ${i*0.06}s` }}/>
              ))}
              <div style={{ marginLeft:12, fontSize:11.5, color:C.muted, fontFamily:"'Fira Code',monospace", lineHeight:1.7 }}>
                {BOOKS.length} reviews live<br/>★ {(BOOKS.reduce((a,b)=>a+b.rating,0)/BOOKS.length).toFixed(1)} average
              </div>
            </div>
            <div style={{ marginTop:"auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ color:C.coral, fontWeight:700, fontSize:14.5, fontFamily:"'Fraunces',serif", fontStyle:"italic" }}>enter the library {door==="writer"?"⟶":"→"}</span>
              <span style={{ fontSize:10.5, color:C.muted, fontFamily:"monospace", border:`1px solid ${C.border}`, borderRadius:20, padding:"3px 10px" }}>reviews · translations · notes</span>
            </div>
          </div>

          {/* ENGINEER DOOR — a live terminal on the night side */}
          <div onClick={()=>goTo("/engineer")} onMouseEnter={()=>setDoor("engineer")} onMouseLeave={()=>setDoor(null)}
            style={{ cursor:"pointer", position:"relative",
              transform: door==="engineer" ? "translateY(-8px)" : `rotate(0.8deg) translate(${mx*-3}px,${my*-2}px)`,
              transition:"transform .35s ease", display:"flex", flexDirection:"column" }}>
            <TerminalWindow title="door-two — the engineer" style={{ flex:1, display:"flex", flexDirection:"column", border: door==="engineer" ? `1px solid ${C.termGreen}55` : "1px solid rgba(255,255,255,0.06)", boxShadow: door==="engineer" ? `0 24px 60px rgba(74,222,128,0.13)` : "0 14px 44px rgba(0,0,0,0.45)", transition:"border .35s, box-shadow .35s" }}>
              <TPrompt>whoami</TPrompt>
              <TLine color={C.termBlue}>software engineer @ {job.company} · {job.location}</TLine>
              <TPrompt>cat stack.txt</TPrompt>
              <TLine color={C.termPurple}>{job.stack.join(" · ")}</TLine>
              <TComment># by day: fintech that people rely on</TComment>
              {/* the live line — always typing something */}
              <div style={{ minHeight:23 }}>
                <span style={{ color:C.termGreen }}>❯ </span>
                <span style={{ color:"#e5e7eb" }}>{termTyped}</span>
                <span style={{ display:"inline-block", width:8, height:15, verticalAlign:"-2px", marginLeft:2, background:C.termGreen, animation:"blink 1s step-end infinite" }}/>
              </div>
              <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize:11, letterSpacing:2.5, textTransform:"uppercase", color:C.termGreen, fontWeight:700, marginBottom:8, fontFamily:"'Fira Code',monospace" }}>❯ door two</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:"clamp(24px,2.4vw,32px)", color:"#F3EEDF", letterSpacing:"-0.02em", marginBottom:8 }}>The Engineer</div>
                <p style={{ color:"rgba(243,238,223,0.5)", fontSize:13, lineHeight:1.75, margin:"0 0 16px", fontFamily:"'Karla',sans-serif" }}>
                  Banking systems, payment APIs and AI tools. Work history, selected
                  projects and research — the part that pays for the ink.
                </p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ color:C.termGreen, fontWeight:600, fontSize:13.5 }}>./open --workbench {door==="engineer"?"⟶":"→"}</span>
                  <span style={{ fontSize:10.5, color:"rgba(243,238,223,0.35)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:"3px 10px" }}>projects · research · cv</span>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>

        {/* scroll hint */}
        <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", zIndex:3, textAlign:"center", animation:"bob 3s ease-in-out infinite", pointerEvents:"none" }}>
          <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:"rgba(133,128,110,0.9)", textShadow:"0 0 8px rgba(251,246,236,0.5)" }}>more on the desk ⌄</div>
        </div>
      </section>

      {/* ═══ the two languages of one person ═══ */}
      <Marquee/>

      {/* ═══ TODAY AT THE DESK — what's actually happening right now ═══ */}
      <section className="rvgroup" style={{ background:"#fff", padding:"70px clamp(24px,5vw,60px) 80px", position:"relative", overflow:"hidden" }}>
        <SootSprite style={{ top:50, right:"7%" }} size={16} dur={4}/>
        <SectionLabel color={C.gold}>Today at the Desk</SectionLabel>
        <H2 style={{ margin:"0 0 14px" }}>One desk, <span style={{ color:C.gold, fontStyle:"italic" }}>three open tabs</span></H2>
        <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, maxWidth:540, margin:"0 0 40px" }}>
          A live snapshot of both scripts — what I'm reading, what I'm translating, and what I'm shipping.
        </p>

        <div className="lpDeskGrid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {/* 1 — on the shelf */}
          <Card accent={featured.accent} style={{ cursor:"pointer", padding:26 }}>
            <div onClick={()=>goTo(`/reviews/${featured.slug}`)}>
              <Pill color={featured.accent}>📖 latest review</Pill>
              <div style={{ display:"flex", gap:18, margin:"18px 0 14px", alignItems:"center" }}>
                <BookCover book={featured} w={82}/>
                <div>
                  <h3 style={{ fontSize:16.5, fontWeight:700, margin:"0 0 3px", color:C.ink, fontFamily:"'Fraunces',serif", lineHeight:1.35 }}>{featured.title}</h3>
                  <div style={{ fontSize:12, color:C.muted, fontStyle:"italic", marginBottom:8 }}>{featured.author}</div>
                  <Stars value={featured.rating} size={13}/>
                </div>
              </div>
              <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:"0 0 14px", fontStyle:"italic" }}>"{featured.pull}"</p>
              <span style={{ color:featured.accent, fontSize:12.5, fontWeight:700 }}>read the review →</span>
            </div>
          </Card>

          {/* 2 — at the translation desk */}
          <Card accent={C.gold} style={{ cursor:"pointer", padding:26 }}>
            <div onClick={()=>goTo("/writer")}>
              <Pill color={C.gold}>🖋 translation desk</Pill>
              <h3 style={{ fontSize:16.5, fontWeight:700, margin:"18px 0 8px", color:C.ink, fontFamily:"'Fraunces',serif" }}>English ⇄ বাংলা</h3>
              <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:"0 0 16px" }}>
                {TRANSLATION_DESK.note} Current stage: <strong style={{ color:C.ink }}>{TRANSLATION_DESK.stage}</strong>.
              </p>
              {TRANSLATION_PIPELINE.slice(0,2).map(([label,val])=>(
                <div key={label} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11.5, marginBottom:4 }}>
                    <span style={{ color:C.ink, fontWeight:600 }}>{label}</span>
                    <span style={{ color:C.muted, fontFamily:"'Fira Code',monospace" }}>{Math.round(val*100)}%</span>
                  </div>
                  <div style={{ height:5, borderRadius:4, background:C.bg2, overflow:"hidden" }}>
                    <div style={{ width:`${val*100}%`, height:"100%", borderRadius:4, background:`linear-gradient(90deg,${C.gold},${C.coral})` }}/>
                  </div>
                </div>
              ))}
              <span style={{ color:C.gold, fontSize:12.5, fontWeight:700 }}>visit the desk →</span>
            </div>
          </Card>

          {/* 3 — now shipping */}
          <Card accent={C.green} style={{ cursor:"pointer", padding:26 }}>
            <div onClick={()=>goTo("/engineer")}>
              <Pill color={C.green}>⚙ now shipping</Pill>
              <div style={{ display:"flex", alignItems:"center", gap:12, margin:"18px 0 10px" }}>
                <div style={{ width:42, height:42, borderRadius:12, background:C.greenS, border:`1px solid ${C.green}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>{job.icon}</div>
                <div>
                  <h3 style={{ fontSize:16.5, fontWeight:700, margin:0, color:C.ink, fontFamily:"'Fraunces',serif" }}>{job.role}</h3>
                  <div style={{ fontSize:12, color:C.muted }}>{job.company} · {job.location}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", margin:"0 0 14px" }}>
                {job.stack.map(s=><span key={s} style={{ fontSize:11, color:C.muted, border:`1px solid ${C.border}`, borderRadius:20, padding:"3px 10px", fontFamily:"'Fira Code',monospace" }}>{s}</span>)}
              </div>
              <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:"0 0 14px" }}>
                Fintech that helps non-prime consumers make life-changing purchases.
              </p>
              <span style={{ color:C.green, fontSize:12.5, fontWeight:700 }}>open the workbench →</span>
            </div>
          </Card>
        </div>
      </section>

      <Hills front={C.bg} back="#EDE6D4" bg="#fff"/>

      {/* ═══ CLOSER — one line, two buttons ═══ */}
      <section className="rvgroup" style={{ background:C.bg, padding:"64px clamp(24px,5vw,60px) 84px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <SootSprite style={{ top:36, left:"9%" }} size={14} dur={5}/>
        <div style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:"clamp(21px,2.6vw,30px)", color:C.ink, lineHeight:1.55, maxWidth:720, margin:"0 auto 30px" }}>
          "I read, therefore I build — and one day,
          <span style={{ color:C.coral }}> a book with my own name on the spine.</span>"
        </div>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>goTo("/writer")} style={{ background:C.coral, border:"none", color:"#fff", padding:"14px 28px", borderRadius:12, cursor:"pointer", fontSize:14, fontWeight:700, boxShadow:`0 10px 30px ${C.coral}44`, fontFamily:"inherit" }}>✦ enter the library</button>
          <button onClick={()=>goTo("/engineer")} style={{ background:C.termBg, border:"1px solid rgba(255,255,255,0.1)", color:C.termGreen, padding:"14px 28px", borderRadius:12, cursor:"pointer", fontSize:13.5, fontWeight:700, fontFamily:"'Fira Code',monospace", boxShadow:"0 10px 30px rgba(13,17,23,0.3)" }}>❯ open the workbench</button>
        </div>
        <div style={{ marginTop:26, fontSize:12.5, color:C.muted, fontStyle:"italic", fontFamily:"'Fraunces',serif" }}>
          unsaidscript — অব্যক্ত যা ছিল, script হয়ে গেল।
        </div>
      </section>

      {/* landing-only styles */}
      <style>{`
        .lpGradText{
          background:linear-gradient(105deg, ${C.coral} 20%, ${C.gold} 55%, ${C.green} 90%);
          -webkit-background-clip:text; background-clip:text; color:transparent;
        }
        .lpInk{ stroke-dasharray:360; stroke-dashoffset:360; animation:lpInkDraw 1.4s ease-out .5s forwards; }
        @keyframes lpInkDraw{ to{ stroke-dashoffset:0; } }
        @media (max-width: 900px){
          .lpDoors{ grid-template-columns:1fr !important; }
          .lpDeskGrid{ grid-template-columns:1fr !important; }
          .lpHero{ background:linear-gradient(165deg, ${C.bg} 0%, #F6EDDB 44%, #24322A 60%, ${C.termBg} 100%) !important; }
        }
      `}</style>
    </div>
  );
}
