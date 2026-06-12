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
function Logo({ size = 30 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }}>
      <svg viewBox="0 0 64 64" width={size} height={size}>
        <circle cx="32" cy="32" r="30" fill={C.dark}/>
        <circle cx="32" cy="32" r="30" fill="none" stroke={C.gold} strokeWidth="1.6" opacity="0.55"/>
        <line x1="32" y1="24" x2="32" y2="14" stroke="#EAF3E7" strokeWidth="2.4" strokeLinecap="round"/>
        <path d="M32 16.5 C32 11, 26.5 9.8, 24.4 12 C24.4 16.4, 28.8 18, 32 16.5 Z" fill="#86B489"/>
        <path d="M32 14 C32 8.5, 37.5 7.3, 39.6 9.5 C39.6 13.9, 35.2 15.5, 32 14 Z" fill="#B7D9A8"/>
        <path d="M22.5 27.2 Q22.5 23.8 26 23.8 L38 23.8 Q41.5 23.8 41.5 27.2
                 C41.5 35.6 37.2 42.4 32 49.4
                 C26.8 42.4 22.5 35.6 22.5 27.2 Z" fill="#F3EEDF"/>
        <line x1="32" y1="39.2" x2="32" y2="46.6" stroke={C.dark} strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="32" cy="35.6" r="2.5" fill={C.gold}/>
        <path d="M25.6 26.6 C25.8 33.2 28.4 38.6 30.4 42" fill="none" stroke="#D9CFB4" strokeWidth="1.1" strokeLinecap="round" opacity="0.85"/>
        <path d="M38.4 26.6 C38.2 33.2 35.6 38.6 33.6 42" fill="none" stroke="#D9CFB4" strokeWidth="1.1" strokeLinecap="round" opacity="0.85"/>
        <path d="M32 51.2 C33.7 53.3 34.5 54.6 34.5 55.8 A2.5 2.5 0 1 1 29.5 55.8 C29.5 54.6 30.3 53.3 32 51.2 Z" fill={C.gold}/>
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

/* ══════════════════════════════════════════
   WRITING PAGE — the library desk
══════════════════════════════════════════ */
function WritingPage({ openBook, showToast }) {
  const [filter,setFilter]=useState("All");
  const featured = BOOKS[0];
  const rest = BOOKS.slice(1);
  const avg = (BOOKS.reduce((a,b)=>a+b.rating,0)/BOOKS.length).toFixed(1);

  const showBooks = filter==="All" || filter==="Book Reviews";
  const showArticles = filter==="All" || filter==="Articles";

  return (
    <div className="rvgroup" style={{ padding:"80px 60px", position:"relative", overflow:"hidden" }}>
      <Cloud top="4%" left="-15%" scale={0.8} dur={80} opacity={0.6}/>
      <SootSprite style={{ top:90, right:"6%" }} size={17} dur={4}/>

      {/* header */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", marginBottom:54 }}>
        <div>
          <SectionLabel color={C.coral}>Writing</SectionLabel>
          <h1 style={{ fontSize:"clamp(36px,5vw,62px)", fontWeight:600, letterSpacing:"-0.03em", margin:"0 0 16px", color:C.ink, lineHeight:1.05, fontFamily:"'Fraunces',serif" }}>
            Articles &<br/><span style={{ color:C.coral, fontStyle:"italic" }}>Book Reviews</span>
          </h1>
          <p style={{ color:C.muted, fontSize:15, lineHeight:1.8 }}>
            Engineering notes from the fintech trenches — and honest reviews of the books that built me, from Rumi to Rabindranath to Murakami. When I think about my life now, mostly I remember the books I've read.
          </p>
          <div style={{ marginTop:18, display:"flex", gap:16, fontSize:12, color:C.muted, fontFamily:"'Fira Code',monospace", flexWrap:"wrap" }}>
            <span>📚 {BOOKS.length} reviews on the shelf</span>
            <span>★ avg {avg}/5</span>
            <span>✍️ {ARTICLES.length} articles</span>
          </div>
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

      {/* ── FEATURED REVIEW ── */}
      {showBooks && (
        <div onClick={()=>openBook(featured.slug)}
          style={{ background:"#fff", border:`1.5px solid ${C.border}`, borderRadius:24, padding:"36px 42px", marginBottom:44, cursor:"pointer", display:"grid", gridTemplateColumns:"auto 1fr", gap:44, alignItems:"center", position:"relative", overflow:"hidden", transition:"all .25s", boxShadow:"0 2px 12px rgba(59,58,47,0.05)" }}
          onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 16px 50px ${featured.accent}1F`; e.currentTarget.style.transform="translateY(-3px)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 2px 12px rgba(59,58,47,0.05)"; e.currentTarget.style.transform="none"; }}>
          <div style={{ position:"absolute", top:-20, right:10, fontFamily:"'Fraunces',serif", fontStyle:"italic", fontWeight:700, fontSize:170, lineHeight:1, color:featured.accent, opacity:0.05, pointerEvents:"none" }}>{featured.title[0]}</div>
          <BookCover book={featured} w={168}/>
          <div style={{ position:"relative" }}>
            <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
              <Pill color={featured.accent}>✦ Featured Review</Pill>
              {featured.genre.slice(0,1).map(g=><span key={g} style={{ fontSize:11, color:C.muted, border:`1px solid ${C.border}`, borderRadius:30, padding:"3px 11px" }}>{g}</span>)}
            </div>
            <h2 style={{ fontSize:"clamp(24px,2.8vw,36px)", fontWeight:600, margin:"0 0 4px", color:C.ink, fontFamily:"'Fraunces',serif", letterSpacing:"-0.02em" }}>{featured.title}</h2>
            <div style={{ fontSize:14, color:C.muted, fontStyle:"italic", fontFamily:"'Fraunces',serif", marginBottom:12 }}>by {featured.author}</div>
            <div style={{ marginBottom:14 }}><Stars value={featured.rating}/></div>
            <p style={{ color:"#4A4839", fontSize:14.5, lineHeight:1.8, margin:"0 0 18px", maxWidth:560, fontStyle:"italic" }}>"{featured.verdict}"</p>
            <span style={{ color:featured.accent, fontSize:13.5, fontWeight:700 }}>Read the full review →</span>
          </div>
        </div>
      )}

      {/* filter */}
      <div style={{ display:"flex", gap:8, marginBottom:36 }}>
        {["All","Articles","Book Reviews"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ background:filter===f?C.green:"#fff", border:`1.5px solid ${filter===f?C.green:C.border}`, color:filter===f?"#fff":C.muted, padding:"8px 20px", borderRadius:30, cursor:"pointer", fontSize:13, fontWeight:600, transition:"all .2s" }}>{f}</button>
        ))}
      </div>

      {/* ── BOOK REVIEW CARDS ── */}
      {showBooks && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom: showArticles ? 44 : 0 }}>
          {(filter==="Book Reviews" ? BOOKS : rest).map((b)=>(
            <Card key={b.slug} accent={b.accent} style={{ cursor:"pointer", padding:24 }}>
              <div onClick={()=>openBook(b.slug)}>
                <div style={{ display:"flex", gap:20, marginBottom:18 }}>
                  <BookCover book={b} w={96}/>
                  <div style={{ paddingTop:6 }}>
                    <Pill color={b.accent}>Book Review</Pill>
                    <div style={{ marginTop:12 }}><Stars value={b.rating} size={13}/></div>
                    <div style={{ fontSize:11.5, color:C.muted, fontFamily:"'Fira Code',monospace", marginTop:10 }}>
                      {b.year} · {b.pages}p<br/>read in {b.readYear}
                    </div>
                  </div>
                </div>
                <h3 style={{ fontSize:16.5, fontWeight:700, margin:"0 0 4px", lineHeight:1.4, color:C.ink, fontFamily:"'Fraunces',serif" }}>{b.title}</h3>
                <div style={{ fontSize:12.5, color:C.muted, fontStyle:"italic", marginBottom:10 }}>{b.author}</div>
                <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:"0 0 14px" }}>{b.verdict}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11.5, color:C.muted, fontFamily:"monospace" }}>{b.readTime} read</span>
                  <span style={{ color:b.accent, fontSize:12.5, fontWeight:700 }}>Read →</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── ARTICLE CARDS ── */}
      {showArticles && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {ARTICLES.map((item,i)=>(
            <Card key={i} accent={C.sky} style={{ cursor:"pointer" }}>
              <div onClick={()=>showToast("article publishing soon ✍️")}>
                <div style={{ height:100, borderRadius:12, marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", background:C.skyS, border:`1px solid ${C.sky}30`, fontSize:38 }}>
                  {item.emoji}
                </div>
                <Pill color={C.sky}>{item.tag}</Pill>
                <h3 style={{ fontSize:15, fontWeight:700, margin:"12px 0 8px", lineHeight:1.45, color:C.ink, fontFamily:"'Fraunces',serif" }}>{item.title}</h3>
                <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:"0 0 16px" }}>{item.desc}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11.5, color:C.muted, fontFamily:"monospace" }}>{item.read} read</span>
                  <span style={{ color:C.sky, fontSize:12.5, fontWeight:700 }}>Read →</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* newsletter */}
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
   COMMAND PALETTE — ⌘K, like a real IDE.
══════════════════════════════════════════ */
function CommandPalette({ open, onClose, goTo, showToast, openBook }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  const jump = (id) => {
    onClose();
    goTo("home");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }), 320);
  };

  const ITEMS = [
    { icon:"⌨️", label:"Jump to projects — the IDE", hint:"home", run:()=>jump("projects") },
    { icon:"📖", label:"Read my story", hint:"home", run:()=>jump("story") },
    { icon:"🎓", label:"See publications & research", hint:"home", run:()=>jump("research") },
    { icon:"✍️", label:"Open writing & book reviews", hint:"page", run:()=>{ onClose(); goTo("writing"); } },
    { icon:"🏠", label:"Go home", hint:"page", run:()=>{ onClose(); goTo("home"); } },
    { icon:"✉️", label:"Copy email — cs.abdullah.mamun@gmail.com", hint:"copy", run:()=>{ navigator.clipboard?.writeText("cs.abdullah.mamun@gmail.com"); showToast("email copied ✓"); onClose(); } },
    { icon:"🌐", label:"Visit AAIINS Lab", hint:"↗", run:()=>{ window.open("https://aaiins-lab.com/","_blank"); onClose(); } },
    { icon:"🤖", label:"Visit Codex AI BD", hint:"↗", run:()=>{ window.open("http://codexaitbd.com/","_blank"); onClose(); } },
    ...BOOKS.map(b=>({ icon:"📕", label:`Read review: ${b.title}`, hint:"book", run:()=>{ onClose(); openBook(b.slug); } })),
  ];
  const shown = ITEMS.filter(it => it.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(()=>inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => { setSel(0); }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setSel(i => Math.min(i+1, shown.length-1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSel(i => Math.max(i-1, 0)); }
      if (e.key === "Enter" && shown[sel]) shown[sel].run();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shown, sel, onClose]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:3000, background:"rgba(35,32,24,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"16vh" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:"min(580px, 92vw)", background:C.termBg, borderRadius:16, border:"1px solid rgba(255,255,255,0.10)", boxShadow:"0 30px 90px rgba(0,0,0,0.5)", overflow:"hidden", animation:"palettePop .18s ease-out" }}>
        {/* input */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"15px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ color:C.termGreen, fontFamily:"'Fira Code',monospace", fontSize:15 }}>❯</span>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="type a command — projects, story, email…"
            style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#e5e7eb", fontSize:14.5, fontFamily:"'Fira Code',monospace" }}/>
          <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.3)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:5, padding:"2px 7px", fontFamily:"monospace" }}>esc</span>
        </div>
        {/* results */}
        <div style={{ maxHeight:316, overflowY:"auto", padding:"8px 0" }}>
          {shown.length===0 && <div style={{ padding:"18px", color:"rgba(255,255,255,0.35)", fontFamily:"'Fira Code',monospace", fontSize:13 }}>{"// nothing found — try \"projects\""}</div>}
          {shown.map((it,i)=>(
            <div key={it.label} onClick={it.run} onMouseEnter={()=>setSel(i)}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 18px", cursor:"pointer", background: sel===i ? "rgba(94,140,97,0.20)" : "transparent", borderLeft: sel===i ? `2px solid ${C.termGreen}` : "2px solid transparent", transition:"background .12s" }}>
              <span style={{ fontSize:16 }}>{it.icon}</span>
              <span style={{ flex:1, color: sel===i ? "#fff" : "rgba(255,255,255,0.72)", fontSize:13.5, fontFamily:"'Fira Code',monospace" }}>{it.label}</span>
              <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.28)", fontFamily:"monospace" }}>{it.hint}</span>
            </div>
          ))}
        </div>
        {/* footer */}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 18px", borderTop:"1px solid rgba(255,255,255,0.07)", fontSize:10.5, fontFamily:"'Fira Code',monospace", color:"rgba(255,255,255,0.3)" }}>
          <span>↑↓ navigate · ↵ run</span>
          <span style={{ fontStyle:"italic" }}>unsaid.palette</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   IDENTITY MARQUEE — the two languages of one
   person, drifting past each other.
══════════════════════════════════════════ */
function Marquee() {
  const ITEMS = [
    ["অব্যক্ত","bn"],["spring boot","tech"],["হিমু","bn"],["murakami","lit"],
    ["java","tech"],["রবীন্দ্রনাথ","bn"],["react","tech"],["rumi","lit"],
    ["llm × fintech","tech"],["চা","bn"],["kafka","lit"],["clean code","tech"],
    ["মিসির আলি","bn"],["microservices","tech"],["dr. abdullah — loading…","lit"],
  ];
  const Row = () => (
    <>
      {ITEMS.map(([w,k],i)=>(
        <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:26, paddingRight:26 }}>
          <span style={
            k==="tech"
              ? { fontFamily:"'Fira Code',monospace", fontSize:13, color:C.muted, letterSpacing:0.5 }
              : { fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:16, color: k==="bn" ? C.coral : C.ink, opacity: k==="bn" ? 0.85 : 0.7 }
          }>{w}</span>
          <span style={{ color:C.gold, fontSize:10, opacity:0.7 }}>✦</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="marqueeWrap" style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, background:"rgba(255,255,255,0.5)", padding:"13px 0", overflow:"hidden", position:"relative" }}>
      <div className="marqueeTrack" style={{ display:"flex", width:"max-content" }}>
        <Row/><Row/>
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
  const [paletteOpen,setPaletteOpen]=useState(false);
  const [toast,setToast]=useState("");
  const [book,setBook]=useState(null);
  useLeafCursor();

  const openBook = (slug) => {
    setFading(true);
    setTimeout(()=>{ setBook(slug); setPage("writing"); setFading(false); window.scrollTo(0,0); }, 220);
  };
  const closeBook = () => {
    setFading(true);
    setTimeout(()=>{ setBook(null); setPage("writing"); setFading(false); window.scrollTo(0,0); }, 220);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""), 2200); };

  /* ⌘K / Ctrl+K opens the palette */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen(o=>!o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* scroll choreography — every section child rises into view */
  useEffect(() => {
    const t = setTimeout(() => {
      const els = document.querySelectorAll("section > *, .rvgroup > *");
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("rvin"); io.unobserve(en.target); } });
      }, { threshold: 0.07 });
      els.forEach(el => {
        el.classList.add("rv");
        const sibs = Array.from(el.parentElement?.children || []);
        el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 4) * 70}ms`;
        io.observe(el);
      });
      return () => io.disconnect();
    }, 80);
    return () => clearTimeout(t);
  }, [page, book]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Karla:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const goTo=(p)=>{
    if(p===page && !book)return;
    setFading(true);
    setTimeout(()=>{setPage(p);setBook(null);setFading(false);window.scrollTo(0,0);},220);
  };

  const PAGES={home:<HomePage/>,writing:<WritingPage openBook={openBook} showToast={showToast}/>};
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
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={()=>setPaletteOpen(true)} title="Command palette"
            style={{ background:"#fff", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"6px 11px", fontFamily:"monospace", fontSize:11.5, color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:12 }}>⌘</span>K
          </button>
          <div style={{ background:C.termBg, borderRadius:8, padding:"6px 12px", fontFamily:"monospace", fontSize:11, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ color:"#22c55e" }}>●</span>
            <span style={{ color:"rgba(255,255,255,0.5)" }}>available</span>
          </div>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ paddingTop:60, position:"relative", zIndex:1, opacity:fading?0:1, transform:fading?"translateY(8px)":"none", transition:"opacity .22s, transform .22s" }}>
        {book ? <ReviewPage slug={book} openBook={openBook} closeBook={closeBook}/> : PAGES[page]}
      </div>

      {/* ── COMMAND PALETTE + TOAST ── */}
      <CommandPalette open={paletteOpen} onClose={()=>setPaletteOpen(false)} goTo={goTo} showToast={showToast} openBook={openBook}/>
      {toast && (
        <div style={{ position:"fixed", bottom:30, left:"50%", transform:"translateX(-50%)", zIndex:3500, background:C.termBg, color:C.termGreen, fontFamily:"'Fira Code',monospace", fontSize:13, padding:"10px 22px", borderRadius:30, border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 10px 30px rgba(0,0,0,0.3)", animation:"palettePop .2s ease-out" }}>
          {toast}
        </div>
      )}

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
            <svg viewBox="0 0 64 64" width="24" height="24">
              <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.08)"/>
              <line x1="32" y1="24" x2="32" y2="14" stroke="#EAF3E7" strokeWidth="2.4" strokeLinecap="round"/>
              <path d="M32 16.5 C32 11, 26.5 9.8, 24.4 12 C24.4 16.4, 28.8 18, 32 16.5 Z" fill="#86B489"/>
              <path d="M32 14 C32 8.5, 37.5 7.3, 39.6 9.5 C39.6 13.9, 35.2 15.5, 32 14 Z" fill="#B7D9A8"/>
              <path d="M22.5 27.2 Q22.5 23.8 26 23.8 L38 23.8 Q41.5 23.8 41.5 27.2
                       C41.5 35.6 37.2 42.4 32 49.4
                       C26.8 42.4 22.5 35.6 22.5 27.2 Z" fill="#F3EEDF"/>
              <line x1="32" y1="39.2" x2="32" y2="46.6" stroke="#2C3A30" strokeWidth="1.7" strokeLinecap="round"/>
              <circle cx="32" cy="35.6" r="2.5" fill={C.gold}/>
              <path d="M32 51.2 C33.7 53.3 34.5 54.6 34.5 55.8 A2.5 2.5 0 1 1 29.5 55.8 C29.5 54.6 30.3 53.3 32 51.2 Z" fill={C.gold}/>
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
        /* review reading room */
        .dropcap::first-letter{
          font-family:'Fraunces',serif; font-weight:600; font-size:64px; line-height:0.8;
          float:left; padding:8px 12px 0 0; color:inherit;
        }
        /* scroll choreography */
        .rv{ opacity:0; transform:translateY(26px); transition:opacity .75s ease, transform .75s ease; }
        .rv.rvin{ opacity:1; transform:none; }
        /* identity marquee */
        @keyframes marquee{ to{ transform:translateX(-50%); } }
        .marqueeTrack{ animation:marquee 38s linear infinite; }
        .marqueeWrap:hover .marqueeTrack{ animation-play-state:paused; }
        /* palette entrance */
        @keyframes palettePop{ from{ opacity:0; transform:scale(0.97) translateY(-6px);} to{ opacity:1; transform:scale(1) translateY(0);} }
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