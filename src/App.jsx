import { useState, useEffect, useRef } from "react";

/** @type {any} */
const THREE = typeof window !== 'undefined' ? window.THREE : null;

/* ══════════════════════════════════════════
   TOKENS — Ghibli morning: paper cream, meadow
   green, persimmon coral, soft sky, warm gold
══════════════════════════════════════════ */
const C = {
  bg:     "#FBF6EC",   // warm paper
  bg2:    "#F3ECDD",   // aged page
  card:   "#FFFFFF",
  ink:    "#3B3A2F",   // warm sepia ink
  muted:  "#85806E",
  border: "#E8E0CC",

  green:  "#5E8C61",   // meadow
  greenS: "#EAF3E7",
  coral:  "#D96C4F",   // persimmon sunset
  coralS: "#FBEDE5",
  sky:    "#6FA8BC",   // distant mountains
  skyS:   "#E9F3F6",
  gold:   "#D9A441",   // lantern light
  goldS:  "#FBF3DF",

  dark:   "#2C3A30",   // forest dusk (footer)

  // terminal palette — UNCHANGED
  termBg: "#0d1117",
  termGreen: "#4ade80",
  termBlue:  "#79c0ff",
  termPurple:"#a78bfa",
  termOrange:"#f97316",
  termYellow:"#fbbf24",
};

const SKILL_GROUPS = [
  { label:"Languages",  color:C.green, items:["Java","Python","C","C++","PHP"] },
  { label:"Backend",    color:C.coral, items:["Spring Boot","Spring","Hibernate","JPA","REST APIs","Microservices","JWT","OAuth2"] },
  { label:"Frontend",   color:C.sky,   items:["React","Angular","HTML","CSS","JavaScript"] },
  { label:"Databases",  color:C.gold,  items:["Oracle","MySQL","MongoDB","Redis"] },
  { label:"DevOps",     color:C.green, items:["Docker","Git","GitLab CI/CD","Kubernetes"] },
  { label:"Testing",    color:C.sky,   items:["JMeter","Postman","Selenium","Swagger/OpenAPI"] },
  { label:"ML / AI",    color:C.coral, items:["TensorFlow","PyTorch","Scikit-learn","NLP","OpenCV","Pandas","NumPy"] },
  { label:"Mgmt",       color:C.gold,  items:["JIRA","Trello","Mantis","Agile","SDLC"] },
];

const EXPERIENCE = [
  {
    company:"Koalafi", role:"Software Engineer", period:"Present", icon:"💳",
    url:"https://koalafi.com", type:"FULL-TIME", location:"Remote · USA",
    desc:"Working at a US-based fintech offering convenient and transparent lease-to-own financing options that enable non-prime consumers to make life-changing purchases.",
    stack:["Java","Spring Boot","React","Microservices"],
  },
  {
    company:"Millennium Information Solution Ltd.", role:"Assistant Software Engineer", period:"Jun 2023 – Oct 2025", icon:"🏦",
    type:"FULL-TIME", location:"Dhaka, Bangladesh",
    desc:"Worked on BEFTN, RTGS, Payment Gateway, and Ababil Islamic CBS. Built REST APIs with Spring Boot, optimised Oracle databases, developed AI-based Shariah Auditing System using LLMs, and implemented Angular UI features.",
    stack:["Java","Spring Boot","Oracle","Angular","Python","LLMs"],
  },
  {
    company:"Freelance Web Developer", role:"Web Developer", period:"2020 – Present", icon:"💻",
    type:"FREELANCE", location:"Remote",
    desc:"Built and deployed websites for international clients. WordPress development, custom themes, and performance optimisation.",
    stack:["WordPress","HTML","CSS","JavaScript","PHP"],
  },
];

/* ── Projects — opened in the IDE ── */
const PROJECTS = [
  {
    emoji:"🌐", label:"LIVE", title:"AAIINS Lab", sub:"Research & Innovation Lab",
    desc:"Full website for AAIINS Lab — a cutting-edge research and AI innovation hub.",
    tags:["React","Tailwind","Web"], accent:C.green, link:"https://aaiins-lab.com/",
    file:"aaiins-lab.tsx", lang:"TypeScript React", icon:"⚛️",
  },
  {
    emoji:"🤖", label:"LIVE", title:"Codex AI BD", sub:"AI Solutions Platform",
    desc:"Platform for Codex AI BD — bringing enterprise AI solutions to Bangladesh.",
    tags:["React","Node.js","AI"], accent:C.sky, link:"http://codexaitbd.com/",
    file:"codex-ai-bd.jsx", lang:"JavaScript", icon:"⚛️",
  },
  {
    emoji:"⚡", label:"PROJECT", title:"SPARK", sub:"Agile Management Tool",
    desc:"Spring Boot microservices + React. Full agile project management with sprints, boards, and team collaboration.",
    tags:["Spring Boot","Microservices","React"], accent:C.coral, link:null,
    file:"spark.java", lang:"Java", icon:"☕",
  },
  {
    emoji:"🧠", label:"AI", title:"Shariah Auditor", sub:"LLM Compliance Tool",
    desc:"LLM-powered automated Shariah compliance auditing system for Islamic finance.",
    tags:["Python","LLMs","NLP"], accent:C.gold, link:null,
    file:"shariah-auditor.py", lang:"Python", icon:"🐍",
  },
  {
    emoji:"🍜", label:"MOBILE", title:"Khabo", sub:"Food Ordering App",
    desc:"Android food-ordering app with secure login, real-time DB, and push notifications.",
    tags:["Android","Java","Firebase"], accent:"#A8674C", link:null,
    file:"khabo.java", lang:"Android", icon:"🤖",
  },
];

const PUBLICATIONS = [
  { year:"2024", venue:"Elsevier · Decision Analytics Journal", title:"A systematic review of hyperparameter optimisation in CNNs", tag:"Journal" },
  { year:"2023", venue:"Int. Conf. on Sustainable Development", title:"E-Waste Separation Using YOLOv5 and IoT", tag:"Conference" },
  { year:"2023", venue:"ICCECE 2023", title:"Envy Prediction from Users' Photos using CNNs", tag:"Conference" },
  { year:"2023", venue:"ICCECE 2023", title:"Predicting Gender from Social Media Photos using Transfer Learning", tag:"Conference" },
  { year:"Under Review", venue:"Elsevier", title:"Automated Suicidal Ideation Prediction via Deep Learning", tag:"Journal" },
];

/* ── The Story — chapters of a reading life ── */
const CHAPTERS = [
  {
    year:"2014 – 2016", icon:"🕯️", color:C.gold,
    title:"The First Spark",
    text:"Class nine. Books found me before I found them. Then came The Forty Rules of Love — Elif Shafak, Rumi, Shams — and reading stopped being a hobby. It became a search for meaning, a quiet path that always led back to Allah and His Rasul ﷺ. Sufi pages taught me that knowing is a form of love.",
  },
  {
    year:"The Teenage Years", icon:"🌼", color:C.coral,
    title:"Himu's Yellow Panjabi",
    text:"Humayun Ahmed's Himu walked barefoot through my teenage years, and Misir Ali asked the questions I didn't know I had. Narendranath Mitra, Sharatchandra, Bankim, Bibhutibhushan... and then Rabindranath — after him, I finally understood why the world handed him a Nobel. These writers quietly built the person I am: calm, simple, in love with small colorful things.",
  },
  {
    year:"Magic & Melancholy", icon:"🌙", color:C.sky,
    title:"Murakami's Wells, Kafka's Rooms",
    text:"Murakami felt like a magician holding a pen — I kept finding real life hidden inside his strange wells and parallel moons. Kafka gave my old questions a name. I cried over why the world is the way it is, why people are the way they are... and then, like Kafka, I learned to accept everything as it is.",
  },
  {
    year:"Now", icon:"🌉", color:C.green,
    title:"Building the Bridge",
    text:"A married man from a middle-class family doesn't get to abandon everything for passion — not when the people you love depend on you. So I'm building a bridge instead: engineering that pays for the life, writing and books that give it meaning. This site is that bridge.",
  },
  {
    year:"The Dream", icon:"🎓", color:C.gold,
    title:"Dr. Abdullah",
    text:"A PhD in LLMs × fintech. It's not a career goal — it's the sacred thing that keeps me moving, the version of myself I'm walking toward. One day, someone will say \"Dr. Abdullah\" and the whole long road of books and late nights will have been worth it.",
  },
];

const ARTICLES = [
  { emoji:"📝", title:"How I Built a Shariah-Compliant AI Auditing System with LLMs", desc:"Using large language models to automate Islamic finance compliance checks at scale.", tag:"Article", read:"8 min" },
  { emoji:"📝", title:"Microservices with Spring Boot: What I Learned Building SPARK", desc:"Lessons from designing a multi-service agile project management tool from scratch.", tag:"Article", read:"12 min" },
  { emoji:"📝", title:"From RTGS to REST: Modernising Core Banking APIs", desc:"My experience building and optimising payment gateway APIs at Millennium.", tag:"Article", read:"10 min" },
];

const BOOK_NOTES = [
  { emoji:"🌹", title:"The Forty Rules of Love — Elif Shafak", desc:"The book that changed the direction of my life. How a Sufi story rewired the way I see love, faith, and meaning.", tag:"Book Review", read:"9 min" },
  { emoji:"🌙", title:"Kafka on the Shore — Haruki Murakami", desc:"Talking cats, fish falling from the sky, and somehow the most honest portrait of loneliness I've ever read.", tag:"Book Review", read:"11 min" },
  { emoji:"🪲", title:"The Metamorphosis — Franz Kafka", desc:"Gregor Samsa woke up changed — and so did I. On melancholy, family, and accepting the world as it is.", tag:"Book Review", read:"7 min" },
];

/* ══════════════════════════════════════════
   ROTATING WORD — "I read, therefore I ___"
══════════════════════════════════════════ */
function RotatingWord() {
  const WORDS = ["build.", "write.", "dream.", "wonder."];
  const COLORS = [C.coral, "#2E6E8E", "#4A7A4E", "#C07F1F"];
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setOut(true);
      setTimeout(() => { setIdx(i => (i + 1) % WORDS.length); setOut(false); }, 320);
    }, 2600);
    return () => clearInterval(iv);
  }, []);
  return (
    <span style={{
      display:"inline-block",
      color: COLORS[idx],
      fontStyle:"italic",
      transform: out ? "translateY(-14px) rotate(-2deg)" : "translateY(0) rotate(0)",
      opacity: out ? 0 : 1,
      transition:"all .32s cubic-bezier(.5,0,.3,1)",
      minWidth:"3.2ch",
    }}>{WORDS[idx]}</span>
  );
}

/* ══════════════════════════════════════════
   LIFE SCRIPT — the hero editor. A file named
   unsaid.script types itself: a life, written
   in the only language that holds both halves.
══════════════════════════════════════════ */
const LIFE_LINES = [
  { raw:'// unsaid.script — the story that compiles', jsx:<span style={{color:"rgba(255,255,255,0.30)"}}>{"// unsaid.script — the story that compiles"}</span> },
  { raw:'', jsx:<span>&nbsp;</span> },
  { raw:'import { books } from "./childhood";', jsx:<><span style={{color:"#a78bfa"}}>import</span> <span style={{color:"#e5e7eb"}}>{"{ books }"}</span> <span style={{color:"#a78bfa"}}>from</span> <span style={{color:"#a5d6ff"}}>"./childhood"</span><span style={{color:"#666"}}>;</span></> },
  { raw:'import { dhaka } from "./home";', jsx:<><span style={{color:"#a78bfa"}}>import</span> <span style={{color:"#e5e7eb"}}>{"{ dhaka }"}</span> <span style={{color:"#a78bfa"}}>from</span> <span style={{color:"#a5d6ff"}}>"./home"</span><span style={{color:"#666"}}>;</span></> },
  { raw:'', jsx:<span>&nbsp;</span> },
  { raw:'class Abdullah extends Reader {', jsx:<><span style={{color:"#a78bfa"}}>class</span> <span style={{color:"#79c0ff"}}>Abdullah</span> <span style={{color:"#a78bfa"}}>extends</span> <span style={{color:"#79c0ff"}}>Reader</span> <span style={{color:"#e5e7eb"}}>{"{"}</span></> },
  { raw:'  builds   = "banking systems @ Koalafi";', jsx:<>&nbsp;&nbsp;<span style={{color:"#f97316"}}>builds</span>&nbsp;&nbsp; <span style={{color:"#e5e7eb"}}>=</span> <span style={{color:"#a5d6ff"}}>"banking systems @ Koalafi"</span><span style={{color:"#666"}}>;</span></> },
  { raw:'  research = { papers: 5, goal: "Dr. Abdullah" };', jsx:<>&nbsp;&nbsp;<span style={{color:"#f97316"}}>research</span> <span style={{color:"#e5e7eb"}}>= {"{"}</span> <span style={{color:"#f97316"}}>papers</span><span style={{color:"#e5e7eb"}}>:</span> <span style={{color:"#fbbf24"}}>5</span><span style={{color:"#666"}}>,</span> <span style={{color:"#f97316"}}>goal</span><span style={{color:"#e5e7eb"}}>:</span> <span style={{color:"#a5d6ff"}}>"Dr. Abdullah"</span> <span style={{color:"#e5e7eb"}}>{"}"}</span><span style={{color:"#666"}}>;</span></> },
  { raw:'  fuel     = ["tea", "murakami", "quiet"];', jsx:<>&nbsp;&nbsp;<span style={{color:"#f97316"}}>fuel</span>&nbsp;&nbsp;&nbsp;&nbsp; <span style={{color:"#e5e7eb"}}>= [</span><span style={{color:"#a5d6ff"}}>"tea"</span><span style={{color:"#666"}}>,</span> <span style={{color:"#a5d6ff"}}>"murakami"</span><span style={{color:"#666"}}>,</span> <span style={{color:"#a5d6ff"}}>"quiet"</span><span style={{color:"#e5e7eb"}}>]</span><span style={{color:"#666"}}>;</span></> },
  { raw:'  faith    = constant;', jsx:<>&nbsp;&nbsp;<span style={{color:"#f97316"}}>faith</span>&nbsp;&nbsp;&nbsp; <span style={{color:"#e5e7eb"}}>=</span> <span style={{color:"#a78bfa"}}>constant</span><span style={{color:"#666"}}>;</span></> },
  { raw:'}', jsx:<span style={{color:"#e5e7eb"}}>{"}"}</span> },
  { raw:'', jsx:<span>&nbsp;</span> },
  { raw:'export default Abdullah;  // still compiling…', jsx:<><span style={{color:"#a78bfa"}}>export default</span> <span style={{color:"#79c0ff"}}>Abdullah</span><span style={{color:"#666"}}>;</span>&nbsp;&nbsp;<span style={{color:"#4ade80"}}>{"// still compiling…"}</span></> },
];

function LifeScript() {
  const [li, setLi] = useState(0);      // current line
  const [ci, setCi] = useState(0);      // chars revealed in current line
  const [blinkOn, setBlinkOn] = useState(true);
  const done = li >= LIFE_LINES.length;

  useEffect(() => {
    if (done) return;
    const line = LIFE_LINES[li].raw;
    if (ci < line.length) {
      const t = setTimeout(() => setCi(c => c + 1), 16);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLi(l => l + 1); setCi(0); }, line === '' ? 60 : 150);
    return () => clearTimeout(t);
  }, [li, ci, done]);

  useEffect(() => {
    const iv = setInterval(() => setBlinkOn(b => !b), 530);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background:C.termBg, borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.07)", boxShadow:"0 24px 70px rgba(13,17,23,0.30)" }}>
      {/* chrome */}
      <div style={{ background:"#161b22", padding:"10px 16px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
        <span style={{ color:"rgba(255,255,255,0.30)", fontSize:11, marginLeft:8, fontFamily:"monospace", letterSpacing:0.5 }}>unsaid.script — ~/abdullah</span>
      </div>
      {/* code */}
      <div style={{ padding:"18px 0 14px" }}>
        {LIFE_LINES.map((ln, i) => {
          if (i > li) return null;
          const typingThis = i === li && !done;
          return (
            <div key={i} style={{ display:"flex", fontFamily:"'Fira Code','SF Mono',monospace", fontSize:13, lineHeight:1.95 }}>
              <span style={{ width:44, textAlign:"right", paddingRight:16, color:"rgba(255,255,255,0.18)", userSelect:"none", flexShrink:0 }}>{i+1}</span>
              <span style={{ color:"#e5e7eb", paddingRight:18, whiteSpace:"pre-wrap" }}>
                {typingThis
                  ? <>{ln.raw.slice(0, ci)}<span style={{ color:C.termGreen, opacity:blinkOn?1:0 }}>▌</span></>
                  : ln.jsx}
                {i === LIFE_LINES.length-1 && done && <span style={{ color:C.termGreen, opacity:blinkOn?1:0 }}> ▌</span>}
              </span>
            </div>
          );
        })}
      </div>
      {/* status bar */}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 16px", background:"#161b22", borderTop:"1px solid rgba(255,255,255,0.06)", fontSize:11, fontFamily:"'Fira Code',monospace", color:"rgba(255,255,255,0.38)" }}>
        <span>⎇ life &nbsp;·&nbsp; bn + en &nbsp;·&nbsp; UTF-8</span>
        <span style={{ color:C.termGreen }}>⬤ compiling</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PROJECT IDE — projects, opened the way an
   engineer actually opens things.
══════════════════════════════════════════ */
function ProjectIDE() {
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

/* ══════════════════════════════════════════
   GHIBLI SCENERY — clouds, hills, sprites
══════════════════════════════════════════ */
function Cloud({ top, left, scale=1, dur=60, delay=0, opacity=0.9 }) {
  return (
    <div style={{ position:"absolute", top, left, transform:`scale(${scale})`, opacity, animation:`drift ${dur}s linear ${delay}s infinite`, pointerEvents:"none", zIndex:0 }}>
      <div style={{ position:"relative", width:150, height:46 }}>
        <div style={{ position:"absolute", bottom:0, left:0,  width:150, height:30, background:"#fff", borderRadius:30, boxShadow:"0 6px 18px rgba(111,168,188,0.12)" }}/>
        <div style={{ position:"absolute", bottom:14, left:28, width:54, height:54, background:"#fff", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", bottom:10, left:72, width:40, height:40, background:"#fff", borderRadius:"50%" }}/>
      </div>
    </div>
  );
}

function Hills({ flip=false, front="#EAF3E7", back="#DCE9DA", bg="transparent" }) {
  return (
    <div style={{ lineHeight:0, transform:flip?"scaleY(-1)":"none", background:bg, position:"relative", zIndex:1 }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width:"100%", height:80, display:"block" }}>
        <path d="M0,80 C240,20 420,95 720,55 C1020,15 1240,90 1440,45 L1440,120 L0,120 Z" fill={back} opacity="0.7"/>
        <path d="M0,95 C300,45 560,110 880,70 C1160,38 1320,100 1440,75 L1440,120 L0,120 Z" fill={front}/>
      </svg>
    </div>
  );
}

function SootSprite({ size=22, style={}, dur=4, delay=0 }) {
  return (
    <div style={{ position:"absolute", pointerEvents:"none", animation:`bob ${dur}s ease-in-out ${delay}s infinite`, zIndex:2, ...style }}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <g>
          {Array.from({length:14}).map((_,i)=>{
            const a=(i/14)*Math.PI*2;
            return <line key={i} x1="12" y1="12" x2={12+Math.cos(a)*11} y2={12+Math.sin(a)*11} stroke="#3B3A2F" strokeWidth="1.6" strokeLinecap="round"/>;
          })}
          <circle cx="12" cy="12" r="7.5" fill="#3B3A2F"/>
          <circle cx="9.4" cy="11" r="2.1" fill="#fff"/>
          <circle cx="14.6" cy="11" r="2.1" fill="#fff"/>
          <circle cx="9.7" cy="11.3" r="0.9" fill="#222"/>
          <circle cx="14.9" cy="11.3" r="0.9" fill="#222"/>
        </g>
      </svg>
    </div>
  );
}

/* ── cursor trail: drifting leaves & sparks ── */
function useLeafCursor() {
  useEffect(() => {
    let last = 0;
    const colors = [C.green, "#86B489", C.gold, C.coral];
    const onMove = (/** @type {any} */ e) => {
      const now = Date.now();
      if (now - last < 90) return; last = now;
      const d = document.createElement("div");
      const isLeaf = Math.random() > 0.4;
      const col = colors[Math.floor(Math.random()*colors.length)];
      const sz = isLeaf ? 7+Math.random()*5 : 3+Math.random()*3;
      d.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${sz}px;height:${sz}px;pointer-events:none;z-index:9999;background:${col};opacity:0.85;border-radius:${isLeaf?"0 60% 0 60%":"50%"};transform:rotate(${Math.random()*360}deg);transition:all 1.3s cubic-bezier(.2,.6,.3,1);`;
      document.body.appendChild(d);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        d.style.transform = `translate(${(Math.random()-.5)*70}px, ${30+Math.random()*60}px) rotate(${180+Math.random()*360}deg)`;
        d.style.opacity = "0";
      }));
      setTimeout(() => d.remove(), 1400);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}

/* ══════════════════════════════════════════
   TERMINAL WIDGETS — UNCHANGED DESIGN
══════════════════════════════════════════ */
function TerminalWindow({ title="terminal", children=null, style={} }) {
  return (
    <div style={{ background:C.termBg, borderRadius:14, overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)", boxShadow:"0 8px 40px rgba(0,0,0,0.25)", ...style }}>
      <div style={{ background:"#161b22", padding:"10px 16px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
        <span style={{ color:"rgba(255,255,255,0.25)", fontSize:11, marginLeft:8, fontFamily:"monospace", letterSpacing:0.5 }}>{title}</span>
      </div>
      <div style={{ padding:"18px 20px", fontFamily:"'Fira Code','SF Mono','Courier New',monospace", fontSize:12.5, lineHeight:1.85 }}>
        {children}
      </div>
    </div>
  );
}

const TLine = ({ children=null, color = "#e5e7eb" }) => <div style={{ color }}>{children}</div>;
const TComment = ({ children=null }) => <div style={{ color:"rgba(255,255,255,0.25)" }}>{children}</div>;
const TPrompt = ({ children=null }) => <div><span style={{ color:C.termGreen }}>❯ </span><span style={{ color:"#e5e7eb" }}>{children}</span></div>;

function TypewriterTerminal({ lines=[], title="bash", style={} }) {
  const [shown, setShown] = useState(/** @type {any} */ ([]));
  const idx = useRef(0);
  useEffect(() => {
    if (!lines || lines.length === 0) { setShown([]); return; }
    idx.current = 0; setShown([]);
    const iv = setInterval(() => {
      if (idx.current < lines.length) {
        const line = lines[idx.current++];
        if (line) setShown(p => [...p, line]);
      } else clearInterval(iv);
    }, 180);
    return () => clearInterval(iv);
  }, [lines]);
  const [blink, setBlink] = useState(true);
  useEffect(() => { const iv = setInterval(() => setBlink(b => !b), 530); return () => clearInterval(iv); }, []);
  return (
    <TerminalWindow title={title} style={style}>
      {shown && shown.length > 0 ? shown.map((l, i) => l ? <div key={i} style={{ color: l.color || "#e5e7eb", marginBottom: 2 }} dangerouslySetInnerHTML={{ __html: l.html || l.text || '' }} /> : null) : null}
      {shown && shown.length < (lines?.length || 0) && <span style={{ color: C.termGreen, opacity: blink ? 1 : 0 }}>▌</span>}
    </TerminalWindow>
  );
}

/* ══════════════════════════════════════════
   LOGO — a sprout lantern
══════════════════════════════════════════ */
function Logo({ size = 28 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }}>
      <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
        <circle cx="16" cy="16" r="15" fill={C.dark}/>
        <circle cx="16" cy="16" r="15" fill="none" stroke={C.gold} strokeWidth="1" opacity="0.5"/>
        <path d="M16 24 L16 14" stroke="#EAF3E7" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 15 C16 10, 11 9, 9 11 C9 15, 13 16.5, 16 15Z" fill="#86B489"/>
        <path d="M16 13 C16 8, 21 7, 23 9 C23 13, 19 14.5, 16 13Z" fill="#B7D9A8"/>
        <circle cx="16" cy="25" r="1.6" fill={C.gold}/>
      </svg>
      <span style={{ fontWeight:700, fontSize:16, letterSpacing:"-0.3px", color:C.ink, fontFamily:"'Fraunces',serif" }}>unsaidscript</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   UI ATOMS
══════════════════════════════════════════ */
function Pill({ children=null, color = C.green }) {
  return <span style={{ background:color+"1C", color, fontSize:10.5, fontWeight:700, letterSpacing:1.2, padding:"3px 11px", borderRadius:30, textTransform:"uppercase" }}>{children}</span>;
}

function SectionLabel({ children=null, color=C.green }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
      <Pill color={color}>{children}</Pill>
      <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,${color}55,transparent)` }}/>
    </div>
  );
}

function H2({ children=null, style={} }) {
  return <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:600, letterSpacing:"-0.02em", margin:"0 0 52px", color:C.ink, fontFamily:"'Fraunces',serif", ...style }}>{children}</h2>;
}

function Card({ children=null, style={}, accent=C.green }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ background:C.card, borderRadius:22, border:`1.5px solid ${h?accent+"66":C.border}`, padding:28, transition:"all .25s", boxShadow:h?`0 12px 44px ${accent}1A, 0 2px 20px rgba(59,58,47,0.05)`:"0 2px 10px rgba(59,58,47,0.05)", transform:h?"translateY(-4px) rotate(-0.3deg)":"none", overflow:"hidden", position:"relative", ...style }}>
      {h && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${accent},${accent}55)`, pointerEvents:"none" }}/>}
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
function HomePage() {
  const [mx,setMx]=useState(0),[my,setMy]=useState(0);
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
            <span>☕ tea: refilled</span>
            <span>📖 reading: kafka on the shore</span>
            <span>🎓 next: dr. abdullah</span>
          </div>
        </div>

        {/* Right — a life, written as a script */}
        <div style={{ position:"relative", zIndex:2 }}>
          <LifeScript/>
          <div style={{ textAlign:"center", marginTop:14, fontSize:12.5, color:C.muted, fontStyle:"italic", fontFamily:"'Fraunces',serif" }}>
            unsaidscript — অব্যক্ত যা ছিল, script হয়ে গেল।
          </div>
        </div>
      </section>

      {/* ═══ THE STORY — chapters of a reading life ═══ */}
      <section id="story" style={{ background:C.bg, padding:"90px 60px 70px", position:"relative", overflow:"hidden" }}>
        <SootSprite style={{ top:60, right:"5%" }} size={16} dur={4.2}/>
        <SectionLabel color={C.coral}>The Story</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start", marginBottom:56 }}>
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
        </div>

        {/* chapter timeline */}
        <div style={{ position:"relative", maxWidth:900, margin:"0 auto" }}>
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
        </div>
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
      <section style={{ background:C.bg, padding:"70px 60px 90px" }}>
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
   WRITING PAGE — articles & book reviews
══════════════════════════════════════════ */
function WritingPage() {
  const [filter,setFilter]=useState("All");
  const all=[...BOOK_NOTES,...ARTICLES];
  const shown=filter==="All"?all:filter==="Articles"?ARTICLES:BOOK_NOTES;
  return (
    <div style={{ padding:"80px 60px", position:"relative", overflow:"hidden" }}>
      <Cloud top="4%" left="-15%" scale={0.8} dur={80} opacity={0.6}/>
      <SootSprite style={{ top:90, right:"6%" }} size={17} dur={4}/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", marginBottom:64 }}>
        <div>
          <SectionLabel color={C.coral}>Writing</SectionLabel>
          <h1 style={{ fontSize:"clamp(36px,5vw,62px)", fontWeight:600, letterSpacing:"-0.03em", margin:"0 0 16px", color:C.ink, lineHeight:1.05, fontFamily:"'Fraunces',serif" }}>
            Articles &<br/><span style={{ color:C.coral, fontStyle:"italic" }}>Book Reviews</span>
          </h1>
          <p style={{ color:C.muted, fontSize:15, lineHeight:1.8 }}>
            Engineering notes from the fintech trenches — and honest reviews of the books that built me, from Rumi to Rabindranath to Murakami. When I think about my life now, mostly I remember the books I've read.
          </p>
        </div>
        <TerminalWindow title="writing.sh">
          <TPrompt>ls ./writing --type all</TPrompt>
          <TLine color={C.termBlue}>{"drwxr-xr-x  articles/"}</TLine>
          <TLine color={C.termBlue}>{"drwxr-xr-x  book-reviews/"}</TLine>
          <TPrompt>grep -r "favourite" book-reviews/</TPrompt>
          <TLine color={C.termGreen}>{"  shafak, rumi, humayun, rabindranath…"}</TLine>
          <TLine color={C.termGreen}>{"  murakami, kafka — and counting"}</TLine>
          <TComment>{"# one day: a book of my own"}</TComment>
        </TerminalWindow>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:40 }}>
        {["All","Articles","Book Reviews"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ background:filter===f?C.green:"#fff", border:`1.5px solid ${filter===f?C.green:C.border}`, color:filter===f?"#fff":C.muted, padding:"8px 20px", borderRadius:30, cursor:"pointer", fontSize:13, fontWeight:600, transition:"all .2s" }}>{f}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {shown.map((item,i)=>(
          <Card key={i} accent={item.tag==="Article"?C.sky:C.coral} style={{ cursor:"pointer" }}>
            <div style={{ height:100, borderRadius:12, marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", background:item.tag==="Article"?C.skyS:C.coralS, border:`1px solid ${item.tag==="Article"?C.sky+"30":C.coral+"30"}`, fontSize:38 }}>
              {item.emoji}
            </div>
            <Pill color={item.tag==="Article"?C.sky:C.coral}>{item.tag}</Pill>
            <h3 style={{ fontSize:15, fontWeight:700, margin:"12px 0 8px", lineHeight:1.45, color:C.ink, fontFamily:"'Fraunces',serif" }}>{item.title}</h3>
            <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:"0 0 16px" }}>{item.desc}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:11.5, color:C.muted, fontFamily:"monospace" }}>{item.read} read</span>
              <button style={{ background:"none", border:"none", color:C.coral, fontSize:12.5, fontWeight:700, cursor:"pointer", padding:0 }}>Read →</button>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop:64 }}>
        <TerminalWindow title="subscribe.sh" style={{ maxWidth:500, margin:"0 auto" }}>
          <TComment>{"# get notified when I publish"}</TComment>
          <TPrompt>./subscribe --newsletter unsaidscript</TPrompt>
          <TLine color={C.termGreen}>{">"} Drop your email below ↓</TLine>
        </TerminalWindow>
        <div style={{ display:"flex", gap:0, maxWidth:500, margin:"16px auto 0" }}>
          <input placeholder="your@email.com" style={{ flex:1, background:"#fff", border:`1.5px solid ${C.border}`, borderRight:"none", borderRadius:"12px 0 0 12px", padding:"13px 16px", fontSize:14, color:C.ink, outline:"none", fontFamily:"inherit" }}
            onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border}/>
          <button style={{ background:C.green, border:"none", color:"#fff", padding:"13px 22px", borderRadius:"0 12px 12px 0", cursor:"pointer", fontSize:13, fontWeight:700 }}>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   APP SHELL
══════════════════════════════════════════ */
export default function App() {
  const [page,setPage]=useState("home");
  const [fading,setFading]=useState(false);
  useLeafCursor();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Karla:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const goTo=(p)=>{
    if(p===page)return;
    setFading(true);
    setTimeout(()=>{setPage(p);setFading(false);window.scrollTo(0,0);},220);
  };

  const PAGES={home:<HomePage/>,writing:<WritingPage/>};
  const NAV=[["home","Home"],["writing","Writing"]];

  return (
    <div style={{ background:C.bg, color:C.ink, fontFamily:"'Karla','SF Pro Display',system-ui,sans-serif", minHeight:"100vh", overflowX:"hidden" }}>
      {/* warm paper grain */}
      <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize:"26px 26px", opacity:0.35, pointerEvents:"none", zIndex:0 }}/>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", inset:"0 0 auto 0", zIndex:1000, background:"rgba(251,246,236,0.92)", backdropFilter:"blur(24px)", borderBottom:`1px solid ${C.border}`, height:60, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 44px" }}>
        <div onClick={()=>goTo("home")}><Logo/></div>
        <div style={{ display:"flex", gap:2 }}>
          {NAV.map(([id,label])=>(
            <button key={id} onClick={()=>goTo(id)} style={{ background:"none", border:"none", color:page===id?C.ink:C.muted, padding:"7px 18px", cursor:"pointer", fontSize:14, fontWeight:page===id?700:400, borderRadius:20, transition:"all .2s", borderBottom:page===id?`2px solid ${C.coral}`:"2px solid transparent" }}>{label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ background:C.termBg, borderRadius:8, padding:"6px 12px", fontFamily:"monospace", fontSize:11, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ color:"#22c55e" }}>●</span>
            <span style={{ color:"rgba(255,255,255,0.5)" }}>available</span>
          </div>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ paddingTop:60, position:"relative", zIndex:1, opacity:fading?0:1, transform:fading?"translateY(8px)":"none", transition:"opacity .22s, transform .22s" }}>
        {PAGES[page]}
      </div>

      {/* ── FOOTER — forest twilight with fireflies ── */}
      <footer style={{ background:`linear-gradient(180deg, ${C.dark}, #1E2A22)`, padding:"40px 44px 32px", position:"relative", zIndex:1, overflow:"hidden" }}>
        {[["12%","20%"],["30%","60%"],["55%","30%"],["70%","70%"],["85%","25%"],["44%","15%"],["92%","55%"]].map(([l,t],i)=>(
          <div key={i} style={{ position:"absolute", left:l, top:t, width:2.5, height:2.5, borderRadius:"50%", background:"#fff", opacity:0.5, animation:`twinkle ${2+i*0.6}s ease-in-out ${i*0.4}s infinite` }}/>
        ))}
        {[["20%","45%"],["62%","55%"],["80%","40%"]].map(([l,t],i)=>(
          <div key={i} style={{ position:"absolute", left:l, top:t, width:5, height:5, borderRadius:"50%", background:C.gold, boxShadow:`0 0 10px ${C.gold}`, animation:`firefly ${5+i*1.5}s ease-in-out ${i}s infinite` }}/>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16, position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
              <circle cx="16" cy="16" r="15" fill="rgba(255,255,255,0.08)"/>
              <path d="M16 24 L16 14" stroke="#EAF3E7" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M16 15 C16 10, 11 9, 9 11 C9 15, 13 16.5, 16 15Z" fill="#86B489"/>
              <path d="M16 13 C16 8, 21 7, 23 9 C23 13, 19 14.5, 16 13Z" fill="#B7D9A8"/>
              <circle cx="16" cy="25" r="1.6" fill={C.gold}/>
            </svg>
            <span style={{ fontWeight:700, fontSize:14, color:"rgba(255,255,255,0.9)", fontFamily:"'Fraunces',serif" }}>unsaidscript</span>
          </div>
          <div style={{ display:"flex", gap:16 }}>
            {NAV.map(([id,label])=>(
              <button key={id} onClick={()=>goTo(id)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.4)", cursor:"pointer", fontSize:13 }}>{label}</button>
            ))}
          </div>
          <span style={{ fontSize:12, color:"rgba(255,255,255,0.28)", fontStyle:"italic" }}>© 2026 unsaidscript · written, not just built · Abdullah Al Mamun</span>
        </div>
      </footer>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes drift{from{transform:translateX(0)}to{transform:translateX(130vw)}}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes twinkle{0%,100%{opacity:0.15}50%{opacity:0.8}}
        @keyframes firefly{
          0%,100%{transform:translate(0,0);opacity:0.3}
          25%{transform:translate(18px,-12px);opacity:1}
          50%{transform:translate(-10px,-22px);opacity:0.5}
          75%{transform:translate(14px,-6px);opacity:0.9}
        }
        *{box-sizing:border-box;-webkit-font-smoothing:antialiased}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px;background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:#D6CBAF;border-radius:3px}
        button:hover{opacity:.88}
        @media (max-width: 900px){
          .bookGroup{ transform:scale(0.9); transform-origin:center; }
        }
      `}</style>
    </div>
  );
}