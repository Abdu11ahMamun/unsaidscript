import { useState, useEffect, useRef } from "react";
import { C } from "../../tokens.js";
import { TerminalWindow, TLine, TComment, TPrompt } from "../components/TerminalWindow.jsx";

/* ════════════════════════════════════════════════════════════
   tithee.os — quality engineer · tool builder · AI researcher
   Hidden one-page profile. Reached only by URL: /tithee, /kishoar
════════════════════════════════════════════════════════════ */

/* her palette — blush paper, rose ink, lavender research */
const P = {
  bg:"#FDF3F6", card:"#FFFFFF", ink:"#3F2E3A", muted:"#9A8290",
  border:"#F3DDE5", rose:"#C94F77", roseS:"#FAE8EE",
  pink:"#E8A0B8", lav:"#8F7BD1", lavS:"#F1EDF8",
  pass:"#4E8C5F", passS:"#EAF4EC", gold:"#D9A441", goldS:"#FBF3DF",
};

/* ── tiny animation hooks ── */
function useTypewriter(phrases, speed = 46, eraseSpeed = 18, hold = 1800) {
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

function useCountUp(target, dur = 1300) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, dur]);
  return [ref, val];
}

/* coverage bar that fills when scrolled into view */
function CovBar({ label, pct, color, note }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ padding:"11px 0" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:7 }}>
        <span style={{ fontSize:13, fontWeight:700, color:P.ink }}>{label}</span>
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:12, color }}>{on ? pct : 0}%</span>
      </div>
      <div style={{ height:7, borderRadius:5, background:P.bg, border:`1px solid ${P.border}`, overflow:"hidden" }}>
        <div style={{ width: on ? `${pct}%` : "0%", height:"100%", borderRadius:5, background:`linear-gradient(90deg, ${color}AA, ${color})`, transition:"width 1.2s cubic-bezier(.2,.7,.3,1)" }}/>
      </div>
      {note && <div style={{ fontSize:11, color:P.muted, marginTop:5, fontFamily:"'Fira Code',monospace" }}>{note}</div>}
    </div>
  );
}

function StatCounter({ target, suffix, label, icon, color }) {
  const [ref, val] = useCountUp(target);
  return (
    <div ref={ref} style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:18, padding:"20px 22px", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-12, right:-6, fontSize:64, opacity:0.07 }}>{icon}</div>
      <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:34, color, lineHeight:1 }}>{val}{suffix}</div>
      <div style={{ fontSize:11.5, color:P.muted, marginTop:7, fontWeight:600, letterSpacing:0.3 }}>{label}</div>
    </div>
  );
}

/* ── content ── */
const CONTACTS = [
  { icon:"✉️", label:"kishoartithee@gmail.com", href:"mailto:kishoartithee@gmail.com" },
  { icon:"📞", label:"+880 1869 232915", href:"tel:+8801869232915" },
  { icon:"💼", label:"linkedin.com/in/kishoar", href:"https://linkedin.com/in/kishoar" },
  { icon:"🐙", label:"github.com/KishoarJahanTithee", href:"https://github.com/KishoarJahanTithee" },
];

const TERM_CMDS = [
  "cypress run --spec regression/*.spec.js",
  "newman run core-banking.postman.json",
  "python flaky_hunter.py --ci last-30-days",
  "jmeter -n -t load/peak-hour.jmx",
];

const MANIFESTO = [
  { icon:"🤖", color:P.rose, title:"Automation-first, always",
    text:"If a check has to run twice, it becomes a script. She built and maintains a Cypress framework with 100+ automated cases guarding a live core-banking system — where a missed bug costs real money." },
  { icon:"🛠", color:P.lav, title:"Builds her own tools",
    text:"She refuses to wait for tooling. Python utilities that hunt flaky tests, auto-generate SQL validations, and shave hours off regression days — QA that engineers its own speed." },
  { icon:"🧠", color:P.gold, title:"AI × Quality — both directions",
    text:"A published LLM researcher who uses AI to test software and designs methods to test AI. The next frontier of QA is testing systems that are non-deterministic — she's already there." },
];

const LAB = [
  { name:"flaky-hunter", icon:"🔍", status:"prototyping", color:P.rose,
    desc:"Reads CI history and scores every test for flakiness — quarantine suggestions before the suite rots. Python · CI logs · statistics." },
  { name:"sql-sentinel", icon:"🧾", status:"in the lab", color:P.lav,
    desc:"Generates data-validation SQL from schema and business rules — ledger drift and broken money-flows caught before release, not after." },
  { name:"llm-judge", icon:"⚖️", status:"researching", color:P.gold,
    desc:"An LLM-assisted test oracle: judges regression outputs, flags hallucination-style failures in AI features. Where her QA practice meets her research." },
];

const EXPERIENCE = [
  { role:"SQA Engineer Level-II", company:"Banglalink Digital Communications Ltd.",
    period:"May 2025 – Present", icon:"📡", tag:"Telecom",
    stack:["Postman","Newman","SQL","JMeter","API Testing"],
    note:"Employed by Astha IT · deputed to Banglalink as an augmented QA resource for critical telecom product testing.",
    bullets:[
      "Validated backend APIs and transactional data using Postman, Newman, and SQL queries to ensure consistency across distributed systems.",
      "Conducted performance analysis using JMeter to identify system bottlenecks under high-volume workloads.",
      "Collaborated with product owners, developers, and business stakeholders to validate business requirements and ensure data accuracy across digital products.",
      "Analyzed production issues using logs, API responses, and database records to improve release quality.",
    ]},
  { role:"Assistant Software Engineer (QA)", company:"Millennium Information Solution Ltd.",
    period:"Aug 2023 – May 2025", icon:"🏦", tag:"FinTech",
    stack:["Cypress","SQL","Postman","Newman","CI/CD"],
    bullets:[
      "Developed and maintained a Cypress automation framework covering 100+ automated test cases for microservice-based core banking systems.",
      "Performed SQL-based backend data validation to verify financial transactions, customer information, and ledger consistency.",
      "Validated data flow across Payment System, CIF, General Ledger, Deposit Accounts, and Batch Transaction modules.",
      "Automated API validation workflows using Postman and Newman and integrated automated reports into CI/CD pipelines.",
      "Worked closely with business analysts to verify functional requirements and ensure accurate implementation of banking workflows.",
      "Investigated production defects through log analysis, database verification, and root cause analysis.",
    ]},
];

const COVERAGE = [
  { label:"Test automation — Cypress · Selenium · Appium", pct:96, color:P.rose, note:"100+ cases in production banking" },
  { label:"SQL & data validation", pct:94, color:P.lav, note:"ledgers · CIF · batch transactions" },
  { label:"API & microservices testing", pct:92, color:P.pass, note:"Postman · Newman · REST · CI/CD" },
  { label:"Python & AI tooling", pct:88, color:P.gold, note:"ML · LLMs · NLP · predictive analytics" },
  { label:"Performance engineering", pct:84, color:P.pink, note:"JMeter · LoadRunner" },
];

const SKILLS = [
  ["Data & Analytics", ["SQL","Data Validation","Data Analysis","Relational Databases","Business Process Analysis","KPI Validation","Data Quality Assurance"]],
  ["Data Engineering", ["ETL Concepts","Data Modeling","Apache Airflow"]],
  ["Business Intelligence", ["Power BI","Dashboard Development","Reporting & Data Visualization"]],
  ["Programming", ["Python","Java","JavaScript","SQL","HTML","CSS"]],
  ["Automation & Testing", ["Selenium","Cypress","Appium","REST API","TestNG","Cucumber","Postman","Newman"]],
  ["Performance & Monitoring", ["Apache JMeter","LoadRunner"]],
  ["Tools", ["Git","Jira","CI/CD","Chrome DevTools"]],
  ["Research & AI", ["Machine Learning","Large Language Models (LLMs)","Predictive Analytics","Statistical Analysis","NLP"]],
];

const RESEARCH = [
  { state:"published", title:"Mitigating Hallucinations in Healthcare LLMs via Granular Fact-Checking & Domain Adaptation",
    venue:"Expert Systems with Applications (Elsevier) · 2026" },
  { state:"in progress", title:"Distributed Transaction Handling in Microservices-Based Financial Applications", venue:"" },
  { state:"in progress", title:"Enhancing Credit Scoring with LLM-Extracted Behavioral & Emotional Indicators", venue:"" },
];

const MARQUEE = ["cypress","SQL","selenium","postman","python","LLMs","appium","power bi","jmeter","airflow","newman","NLP","git · ci/cd","cucumber"];

const PETALS = [["5%",0],["15%",5],["27%",10],["40%",2],["54%",8],["66%",12],["77%",4],["89%",9]];
const PIPELINE = [["⌨","commit"],["📦","build"],["🧪","test"],["🚀","deploy"]];

/* ── the Postman console — her second home, rebuilt in her colors ── */
const PM_ORANGE = "#FF6C37";
const PM_JSON = [
  ["engineer", '"Kishoar Jahan Tithee"', "str"],
  ["role", '"QA Automation · SDET"', "str"],
  ["experience", '"3+ years — telecom & fintech"', "str"],
  ["automation", '["cypress", "selenium", "appium", "newman"]', "arr"],
  ["research", '"LLMs · published (Elsevier, 2026)"', "str"],
  ["bugs_escaped", "0", "num"],
  ["quality", '"non-negotiable"', "str"],
  ["contact", '"kishoartithee@gmail.com"', "str"],
];
const PM_TESTS = [
  "pm.response.to.have.status(200)",
  'pm.expect(body.quality).to.eql("non-negotiable")',
  "pm.expect(body.bugs_escaped).to.eql(0)",
];

function PostmanConsole() {
  const [state, setState] = useState("done"); // "sending" | "done"
  const [ms, setMs] = useState(28);
  const send = () => {
    if (state === "sending") return;
    setState("sending");
    setTimeout(() => { setMs(18 + Math.floor(Math.random() * 24)); setState("done"); }, 950);
  };
  return (
    <div style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:20, overflow:"hidden", boxShadow:"0 14px 44px rgba(201,79,119,0.08)" }}>
      {/* window bar */}
      <div style={{ background:P.bg, borderBottom:`1px solid ${P.border}`, padding:"10px 18px", display:"flex", alignItems:"center", gap:8 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c=><span key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, display:"inline-block" }}/>)}
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:P.muted, marginLeft:8 }}>🧑‍🚀 postman — tithee's workspace</span>
      </div>
      {/* request bar */}
      <div style={{ display:"flex", gap:10, alignItems:"center", padding:"16px 20px 12px", flexWrap:"wrap" }}>
        <span style={{ fontFamily:"'Fira Code',monospace", fontWeight:700, fontSize:13, color:P.pass, background:P.passS, border:`1.5px solid ${P.pass}44`, borderRadius:8, padding:"8px 14px" }}>GET</span>
        <div style={{ flex:1, minWidth:200, fontFamily:"'Fira Code',monospace", fontSize:12.5, color:P.ink, background:P.bg, border:`1.5px solid ${P.border}`, borderRadius:8, padding:"9px 14px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
          https://api.unsaidscript.com<span style={{ color:P.rose, fontWeight:700 }}>/v1/quality-engineer</span>
        </div>
        <button onClick={send} style={{ background:PM_ORANGE, border:"none", color:"#fff", fontWeight:700, fontSize:13, padding:"10px 26px", borderRadius:8, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 6px 18px ${PM_ORANGE}55`, transition:"transform .15s" }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
          {state==="sending" ? "Sending…" : "Send"}
        </button>
      </div>
      {/* tabs */}
      <div style={{ display:"flex", gap:22, padding:"0 22px", borderBottom:`1px solid ${P.border}`, fontFamily:"'Fira Code',monospace", fontSize:11.5 }}>
        {["Params","Authorization","Headers","Body","Tests (3)"].map((tab,i)=>(
          <span key={tab} style={{ padding:"8px 0 10px", color: i===4 ? PM_ORANGE : P.muted, fontWeight: i===4 ? 700 : 400, borderBottom: i===4 ? `2px solid ${PM_ORANGE}` : "2px solid transparent" }}>{tab}</span>
        ))}
      </div>
      {/* response */}
      <div style={{ padding:"16px 22px 20px", background:"#FDFBFC" }}>
        {state==="sending" ? (
          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:12.5, color:P.muted, padding:"30px 0", textAlign:"center", animation:"ttPulse 1s infinite" }}>
            ⏳ requesting the quality engineer…
          </div>
        ) : (
          <>
            <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:12, fontFamily:"'Fira Code',monospace", fontSize:11.5, flexWrap:"wrap" }}>
              <span style={{ color:P.pass, fontWeight:700 }}>Status: 200 OK</span>
              <span style={{ color:P.muted }}>Time: <span style={{ color:P.pass }}>{ms} ms</span></span>
              <span style={{ color:P.muted }}>Size: <span style={{ color:P.pass }}>1.2 KB</span></span>
            </div>
            <div style={{ fontFamily:"'Fira Code',monospace", fontSize:12, lineHeight:1.95, background:"#fff", border:`1px solid ${P.border}`, borderRadius:12, padding:"14px 18px", overflowX:"auto" }}>
              <div style={{ color:P.muted }}>{"{"}</div>
              {PM_JSON.map(([k,v,type])=>(
                <div key={k} style={{ paddingLeft:18, whiteSpace:"nowrap" }}>
                  <span style={{ color:P.lav }}>"{k}"</span>
                  <span style={{ color:P.muted }}>: </span>
                  <span style={{ color: type==="num" ? P.rose : type==="arr" ? "#A87A22" : P.pass }}>{v}</span>
                  <span style={{ color:P.muted }}>,</span>
                </div>
              ))}
              <div style={{ color:P.muted }}>{"}"}</div>
            </div>
            {/* test results */}
            <div style={{ marginTop:12, background:P.passS, border:`1.5px solid ${P.pass}33`, borderRadius:12, padding:"12px 18px" }}>
              <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11.5, fontWeight:700, color:P.pass, marginBottom:8 }}>Test Results (3/3) — all tests passed 🌸</div>
              {PM_TESTS.map(t=>(
                <div key={t} style={{ fontFamily:"'Fira Code',monospace", fontSize:11.5, color:"#5C4B54", padding:"2px 0" }}>
                  <span style={{ color:P.pass, fontWeight:700 }}>✓ </span>{t}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const Describe = ({ children }) => (
  <div style={{ fontFamily:"'Fira Code',monospace", fontSize:12.5, color:P.lav, marginBottom:10 }}>
    describe(<span style={{ color:P.rose }}>"{children}"</span>, () =&gt; {"{"}
  </div>
);
const H2T = ({ children, style={} }) => (
  <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:"clamp(26px,3.2vw,40px)", letterSpacing:"-0.02em", color:P.ink, margin:"0 0 14px", ...style }}>{children}</h2>
);
const PassPill = ({ children = "PASS" }) => (
  <span style={{ background:P.passS, color:P.pass, border:`1px solid ${P.pass}33`, borderRadius:20, fontSize:10.5, fontWeight:700, fontFamily:"'Fira Code',monospace", padding:"3px 10px", letterSpacing:1 }}>✓ {children}</span>
);

export function TitheePage() {
  const [mx, setMx] = useState(0), [my, setMy] = useState(0);
  const typedRole = useTypewriter([
    "she automates the boring.",
    "she builds tools QA teams wish existed.",
    "she tests AI — and uses AI to test.",
    "she reads the logs nobody else reads.",
  ], 40, 16, 1700);
  const termTyped = useTypewriter(TERM_CMDS, 38, 14, 1400);

  useEffect(() => {
    const h = (e) => { setMx((e.clientX / window.innerWidth - .5) * 2); setMy((e.clientY / window.innerHeight - .5) * 2); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div style={{ background:P.bg, color:P.ink, fontFamily:"'Karla','SF Pro Display',system-ui,sans-serif", minHeight:"100vh", position:"relative", overflow:"hidden" }}>
      {/* blush paper grain */}
      <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(${P.border} 1px, transparent 1px)`, backgroundSize:"26px 26px", opacity:0.4, pointerEvents:"none" }}/>
      {/* dreamy gradient orbs */}
      <div style={{ position:"fixed", top:"-12%", left:"-8%", width:520, height:520, borderRadius:"50%", background:`radial-gradient(circle, ${P.pink}33, transparent 65%)`, pointerEvents:"none", animation:"ttBob 9s ease-in-out infinite" }}/>
      <div style={{ position:"fixed", bottom:"-15%", right:"-10%", width:560, height:560, borderRadius:"50%", background:`radial-gradient(circle, ${P.lav}26, transparent 65%)`, pointerEvents:"none", animation:"ttBob 11s ease-in-out 2s infinite" }}/>
      {/* তিথি watermark, drifting with the cursor */}
      <div style={{ position:"fixed", top:"6%", right:"-2%", fontFamily:"'Fraunces',serif", fontStyle:"italic", fontWeight:600, fontSize:"clamp(120px,16vw,230px)", color:P.rose, opacity:0.05, transform:`rotate(-6deg) translate(${mx*-8}px,${my*-5}px)`, pointerEvents:"none", lineHeight:1, userSelect:"none" }}>তিথি</div>
      {/* falling petals */}
      {PETALS.map(([l,d],i)=>(
        <div key={i} className="ttPetal" style={{ left:l, animationDelay:`${d}s, ${d}s`, fontSize:i%2?13:17, opacity:0.45 }}>🌸</div>
      ))}

      <div style={{ maxWidth:1080, margin:"0 auto", padding:"52px clamp(20px,4vw,44px) 60px", position:"relative" }}>

        {/* ═══ HERO ═══ */}
        <section className="ttHero" style={{ display:"grid", gridTemplateColumns:"1.08fr 1fr", gap:44, alignItems:"center", marginBottom:34 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:P.passS, border:`1.5px solid ${P.pass}33`, borderRadius:30, padding:"6px 16px", marginBottom:20, fontSize:12, fontWeight:700, color:P.pass, fontFamily:"'Fira Code',monospace" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:P.pass, boxShadow:`0 0 8px ${P.pass}`, animation:"ttPulse 2s infinite" }}/>
              all suites green · zero flaky · quality never sleeps
            </div>
            <h1 style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:"clamp(36px,4.8vw,58px)", lineHeight:1.06, letterSpacing:"-0.03em", margin:"0 0 10px", color:P.ink, position:"relative" }}>
              Kishoar Jahan <span className="ttGrad" style={{ fontStyle:"italic" }}>Tithee</span>
              {[[-14,"-4%",13],[8,"66%",11],[-22,"88%",14]].map(([t,l,s],i)=>(
                <span key={i} style={{ position:"absolute", top:t, left:l, fontSize:s, animation:`ttTwinkle ${2.2+i*0.7}s ease-in-out ${i*0.5}s infinite`, pointerEvents:"none" }}>✨</span>
              ))}
            </h1>
            <div style={{ fontSize:16.5, fontWeight:600, color:P.ink, marginBottom:12, fontFamily:"'Fraunces',serif" }}>
              QA Automation Engineer <span style={{ color:P.muted, fontWeight:400 }}>·</span> <span style={{ color:P.lav }}>Tool Builder</span> <span style={{ color:P.muted, fontWeight:400 }}>·</span> <span style={{ color:P.rose }}>AI Researcher</span>
            </div>
            {/* live typewriter */}
            <div style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:"clamp(14px,1.7vw,17.5px)", minHeight:28, color:"#6B5563", marginBottom:16 }}>
              {typedRole}<span style={{ display:"inline-block", width:8, height:"1em", verticalAlign:"-0.12em", marginLeft:3, background:P.rose, animation:"ttBlink 1s step-end infinite" }}/>
            </div>
            <p style={{ color:P.muted, fontSize:14, lineHeight:1.8, maxWidth:490, margin:"0 0 20px" }}>
              3+ years guarding Telecom and FinTech releases — test automation, SQL-based data
              validation, API testing, microservices. Published LLM researcher (Elsevier).
              Her thesis about the job: <strong style={{ color:P.ink }}>quality is an engineering
              discipline, not a checklist</strong> — so she builds the tools that prove it.
            </p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {CONTACTS.map(c=>(
                <a key={c.label} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:30, padding:"7px 15px", fontSize:12.5, color:P.ink, textDecoration:"none", fontWeight:600, transition:"all .2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=P.rose; e.currentTarget.style.color=P.rose; e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border; e.currentTarget.style.color=P.ink; e.currentTarget.style.transform="none";}}>
                  <span>{c.icon}</span>{c.label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ transform:`perspective(1000px) rotateX(${my*-1.6}deg) rotateY(${mx*2}deg)`, transition:"transform .18s ease-out" }}>
            <TerminalWindow title="tithee.os — quality engine">
              <TPrompt>./run-quality --mode relentless</TPrompt>
              <TLine color={C.termGreen}>{"  ✓ 100+ cypress cases — core banking (green)"}</TLine>
              <TLine color={C.termGreen}>{"  ✓ API & data integrity — telecom scale"}</TLine>
              <TLine color={C.termGreen}>{"  ✓ LLM research — published, Elsevier 2026"}</TLine>
              <TLine color={C.termYellow}>{"  3 suites · 0 failing · 0 flaky"}</TLine>
              <TComment>{"# currently running:"}</TComment>
              <div style={{ minHeight:23 }}>
                <span style={{ color:C.termGreen }}>❯ </span>
                <span style={{ color:"#e5e7eb" }}>{termTyped}</span>
                <span style={{ display:"inline-block", width:8, height:15, verticalAlign:"-2px", marginLeft:2, background:C.termGreen, animation:"ttBlink 1s step-end infinite" }}/>
              </div>
            </TerminalWindow>
            <div style={{ textAlign:"center", marginTop:12, fontSize:12, color:P.muted, fontStyle:"italic", fontFamily:"'Fraunces',serif" }}>
              every claim on this page is verifiable — she insisted 🌸
            </div>
          </div>
        </section>

        {/* ═══ THE PIPELINE — she guards the gate ═══ */}
        <div style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:20, padding:"22px 30px 18px", marginBottom:40, position:"relative", overflow:"hidden" }}>
          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:P.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:16 }}>ci/cd — where she lives</div>
          <div style={{ position:"relative", display:"flex", justifyContent:"space-between", alignItems:"center" }} className="ttPipe">
            {/* track */}
            <div style={{ position:"absolute", left:30, right:30, top:23, height:2, background:P.border }}/>
            {/* traveling pulse */}
            <div className="ttPulseDot" style={{ position:"absolute", top:18, left:30, width:12, height:12, borderRadius:"50%", background:P.rose, boxShadow:`0 0 14px ${P.rose}` }}/>
            {/* a bug tries its luck — and never makes it past her gate */}
            <div className="ttBug" style={{ position:"absolute", top:12, left:30, fontSize:16 }}>🐛</div>
            {PIPELINE.map(([ic,label])=>(
              <div key={label} style={{ position:"relative", textAlign:"center", zIndex:1 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background: label==="test" ? P.roseS : P.bg, border:`2px solid ${label==="test" ? P.rose : P.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, margin:"0 auto", boxShadow: label==="test" ? `0 0 0 6px ${P.rose}18` : "none", animation: label==="test" ? "ttGate 2.4s ease-in-out infinite" : "none" }}>{ic}</div>
                <div style={{ fontSize:11.5, fontFamily:"'Fira Code',monospace", color: label==="test" ? P.rose : P.muted, fontWeight: label==="test" ? 700 : 400, marginTop:8 }}>
                  {label}{label==="test" && " ← her gate"}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", fontSize:11.5, color:P.muted, fontStyle:"italic", marginTop:14, fontFamily:"'Fraunces',serif" }}>
            bugs travel too — watch how far this one gets. nothing ships until the gate says so.
          </div>
        </div>

        {/* ═══ keyword marquee ═══ */}
        <div className="ttMarqWrap" style={{ overflow:"hidden", borderTop:`1px solid ${P.border}`, borderBottom:`1px solid ${P.border}`, background:"rgba(255,255,255,0.55)", padding:"11px 0", marginBottom:44 }}>
          <div className="ttMarq" style={{ display:"flex", width:"max-content" }}>
            {[0,1].map(row=>(
              <div key={row} style={{ display:"flex" }}>
                {MARQUEE.map((w,i)=>(
                  <span key={`${row}-${w}`} style={{ display:"inline-flex", alignItems:"center", gap:22, paddingRight:22 }}>
                    <span style={{ fontFamily: i%2 ? "'Fira Code',monospace" : "'Fraunces',serif", fontStyle: i%2 ? "normal" : "italic", fontSize: i%2 ? 12.5 : 15, color: i%3===0 ? P.rose : i%3===1 ? P.lav : "#6B5563", opacity:0.85 }}>{w}</span>
                    <span style={{ color:P.pink, fontSize:10 }}>✿</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ COUNT-UP STATS ═══ */}
        <div className="ttStats" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:56 }}>
          <StatCounter target={3} suffix="+" label="years — telecom & fintech QA" icon="🧪" color={P.rose}/>
          <StatCounter target={100} suffix="+" label="automated test cases in production" icon="🤖" color={P.lav}/>
          <StatCounter target={3} suffix="" label="research publications — LLMs & fintech" icon="📄" color={P.gold}/>
          <StatCounter target={2} suffix="" label="industries guarded — telecom · fintech" icon="🛡" color={P.pass}/>
        </div>

        {/* ═══ MANIFESTO — what progressive QA means ═══ */}
        <section style={{ marginBottom:56 }}>
          <Describe>what makes her different</Describe>
          <H2T>Not a bug hunter. <span className="ttGrad" style={{ fontStyle:"italic" }}>A quality engineer.</span></H2T>
          <p style={{ color:P.muted, fontSize:14, lineHeight:1.8, maxWidth:560, margin:"0 0 28px" }}>
            Most QA finds problems. She builds the systems that make problems impossible —
            and researches what testing means when the software starts thinking.
          </p>
          <div className="ttThree" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {MANIFESTO.map(m=>(
              <div key={m.title} style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:20, padding:"26px 26px", transition:"all .3s", cursor:"default", position:"relative", overflow:"hidden" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow=`0 18px 44px ${m.color}2A`; e.currentTarget.style.borderColor=`${m.color}66`; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=P.border; }}>
                <div style={{ width:52, height:52, borderRadius:15, background:`${m.color}1A`, border:`1.5px solid ${m.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:16 }}>{m.icon}</div>
                <h3 style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:17.5, margin:"0 0 10px", color:P.ink }}>{m.title}</h3>
                <p style={{ fontSize:13, lineHeight:1.75, color:"#6B5563", margin:0 }}>{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ THE LAB — tools in progress ═══ */}
        <section style={{ marginBottom:56 }}>
          <Describe>the lab</Describe>
          <H2T>Tools she's <span style={{ color:P.lav, fontStyle:"italic" }}>building</span></H2T>
          <p style={{ color:P.muted, fontSize:14, lineHeight:1.8, maxWidth:560, margin:"0 0 28px" }}>
            Side-of-desk experiments with one goal: make every QA engineer's day shorter
            and every AI feature testable. Statuses are honest — this is a lab, not a store.
          </p>
          <div className="ttThree" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {LAB.map(t=>(
              <div key={t.name} style={{ background:C.termBg, borderRadius:18, padding:"22px 24px", border:"1px solid rgba(255,255,255,0.07)", position:"relative", overflow:"hidden", transition:"all .3s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow=`0 18px 44px rgba(13,17,23,0.4)`; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <span style={{ fontFamily:"'Fira Code',monospace", fontSize:14.5, fontWeight:700, color:"#F3EEDF" }}>
                    <span style={{ color:C.termGreen }}>❯</span> {t.name}
                  </span>
                  <span style={{ fontSize:18 }}>{t.icon}</span>
                </div>
                <p style={{ fontSize:12.5, lineHeight:1.75, color:"rgba(243,238,223,0.55)", margin:"0 0 16px" }}>{t.desc}</p>
                <span style={{ fontFamily:"'Fira Code',monospace", fontSize:10.5, fontWeight:700, letterSpacing:1, color:t.color, background:`${t.color}1F`, border:`1px solid ${t.color}44`, borderRadius:20, padding:"4px 12px" }}>
                  ● {t.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section style={{ marginBottom:56 }}>
          <Describe>experience</Describe>
          <H2T>Where she's <span style={{ color:P.rose, fontStyle:"italic" }}>broken things on purpose</span></H2T>
          <div style={{ display:"flex", flexDirection:"column", gap:20, marginTop:26 }}>
            {EXPERIENCE.map((e)=>(
              <div key={e.company} style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:20, padding:"26px 30px", position:"relative", overflow:"hidden", transition:"all .3s" }}
                onMouseEnter={ev=>{ ev.currentTarget.style.boxShadow=`0 14px 40px ${P.rose}1A`; }}
                onMouseLeave={ev=>{ ev.currentTarget.style.boxShadow="none"; }}>
                <div style={{ position:"absolute", top:-14, right:14, fontSize:90, opacity:0.06, pointerEvents:"none" }}>{e.icon}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10, marginBottom:6 }}>
                  <div>
                    <h3 style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:19, margin:"0 0 3px", color:P.ink }}>{e.role}</h3>
                    <div style={{ fontSize:13.5, color:P.muted }}>{e.company}</div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                    <span style={{ background:P.lavS, color:P.lav, borderRadius:20, fontSize:11, fontWeight:700, padding:"4px 12px" }}>{e.tag}</span>
                    <span style={{ background:P.roseS, color:P.rose, borderRadius:20, fontSize:11, fontWeight:700, padding:"4px 12px" }}>{e.period}</span>
                    <PassPill/>
                  </div>
                </div>
                {e.note && <div style={{ fontSize:12.5, color:P.muted, fontStyle:"italic", margin:"6px 0 4px" }}>{e.note}</div>}
                {e.stack && (
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:10 }}>
                    {e.stack.map(s=>(
                      <span key={s} style={{ fontSize:10.5, fontFamily:"'Fira Code',monospace", color:P.lav, background:P.lavS, borderRadius:20, padding:"3px 10px", fontWeight:600 }}>{s}</span>
                    ))}
                  </div>
                )}
                <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:9 }}>
                  {e.bullets.map((b,i)=>(
                    <div key={i} style={{ display:"flex", gap:10, fontSize:13.5, lineHeight:1.7, color:"#5C4B54" }}>
                      <span style={{ color:P.pass, fontWeight:700, flexShrink:0, fontFamily:"'Fira Code',monospace" }}>✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ COVERAGE REPORT — skills, QA style ═══ */}
        <section style={{ marginBottom:56 }}>
          <Describe>skills</Describe>
          <H2T>coverage <span style={{ color:P.lav, fontStyle:"italic" }}>report</span></H2T>
          <div className="ttTwoCol" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:20, marginTop:26, alignItems:"start" }}>
            <div style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:20, padding:"18px 28px" }}>
              <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:P.muted, letterSpacing:1.5, marginBottom:6 }}>self.audit() — core competencies</div>
              {COVERAGE.map(cv=><CovBar key={cv.label} {...cv}/>)}
              <div style={{ fontSize:10.5, color:P.muted, fontStyle:"italic", marginTop:8, fontFamily:"'Fraunces',serif" }}>self-reported — but she tests her own claims.</div>
            </div>
            <div style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:20, padding:"14px 26px" }}>
              <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:P.muted, letterSpacing:1.5, margin:"8px 0 4px" }}>the full toolbelt</div>
              {SKILLS.map(([group, items], gi)=>(
                <div key={group} style={{ padding:"11px 0", borderBottom: gi<SKILLS.length-1 ? `1px solid ${P.border}` : "none" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:P.rose, letterSpacing:1, textTransform:"uppercase", marginBottom:7 }}>{group}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {items.map(s=>(
                      <span key={s} style={{ fontSize:11.5, color:"#5C4B54", background:P.bg, border:`1px solid ${P.border}`, borderRadius:20, padding:"3px 11px", fontFamily:"'Fira Code',monospace" }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE POSTMAN CONSOLE — query her, API-style ═══ */}
        <section style={{ marginBottom:56 }}>
          <Describe>api</Describe>
          <H2T>Speaks fluent <span className="ttGrad" style={{ fontStyle:"italic" }}>API</span></H2T>
          <p style={{ color:P.muted, fontSize:14, lineHeight:1.8, maxWidth:560, margin:"0 0 26px" }}>
            Half her day lives in the request builder — so here she is, as an endpoint.
            Hit <strong style={{ color:PM_ORANGE }}>Send</strong> and check the Tests tab: they pass. They always pass.
          </p>
          <PostmanConsole/>
        </section>

        {/* ═══ RESEARCH — alongside the releases ═══ */}
        <section style={{ marginBottom:56 }}>
          <Describe>research</Describe>
          <H2T>She ships releases <span className="ttGrad" style={{ fontStyle:"italic" }}>and papers</span></H2T>
          <p style={{ color:P.muted, fontSize:14, lineHeight:1.8, maxWidth:560, margin:"0 0 10px" }}>
            Research isn't a side quest — it's how she stays ahead of the systems she tests.
            Published in Elsevier, with more in the pipeline.
          </p>
          <div className="ttTwoCol" style={{ display:"grid", gridTemplateColumns:"1.25fr 1fr", gap:20, marginTop:26, alignItems:"start" }}>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:15, top:14, bottom:14, width:2, background:`linear-gradient(180deg, ${P.pass}, ${P.lav}, ${P.rose}, ${P.gold})`, opacity:0.4, borderRadius:2 }}/>
              {RESEARCH.map((r)=>(
                <div key={r.title} style={{ display:"flex", gap:18, marginBottom:16, position:"relative" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, background:"#fff", zIndex:1, border:`2px solid ${r.state==="published"?P.pass:r.state==="next"?P.gold:P.lav}66`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>
                    {r.state==="published"?"✓":r.state==="next"?"★":"●"}
                  </div>
                  <div style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:16, padding:"16px 20px", flex:1 }}>
                    <span style={{ fontFamily:"'Fira Code',monospace", fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:r.state==="published"?P.pass:r.state==="next"?"#A87A22":P.lav }}>
                      {r.state==="published"?"✓ published":r.state==="next"?"★ next milestone":"● in progress"}
                    </span>
                    <div style={{ fontSize:13.5, fontWeight:700, color:P.ink, lineHeight:1.5, marginTop:5 }}>{r.title}</div>
                    {r.venue && <div style={{ fontSize:12, color:P.muted, marginTop:3, fontStyle:"italic" }}>{r.venue}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background:`linear-gradient(150deg, ${P.goldS}, #fff)`, border:`1.5px solid ${P.gold}55`, borderRadius:20, padding:"26px 28px", marginBottom:16 }}>
                <div style={{ fontSize:26, marginBottom:10 }}>🔭</div>
                <h3 style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:17.5, margin:"0 0 8px", color:P.ink }}>On her research radar</h3>
                <p style={{ fontSize:13, lineHeight:1.75, color:"#6B5563", margin:"0 0 14px" }}>
                  <strong>LLM reliability & hallucination mitigation</strong>,
                  <strong> AI-assisted software testing</strong>, and <strong>NLP for financial systems</strong> —
                  the questions QA will have to answer next, and she'd rather answer them first.
                  Open to research collaborations and co-authorship.
                </p>
                <a href="mailto:kishoartithee@gmail.com?subject=Research%20collaboration" style={{ display:"inline-block", background:P.gold, color:"#fff", padding:"10px 20px", borderRadius:10, textDecoration:"none", fontSize:12.5, fontWeight:700 }}>talk research with her →</a>
              </div>
              <div style={{ background:"#fff", border:`1.5px solid ${P.border}`, borderRadius:20, padding:"22px 26px" }}>
                <div style={{ fontSize:22, marginBottom:8 }}>🎓</div>
                <h3 style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:15.5, margin:"0 0 4px", color:P.ink }}>B.Sc. in Computer Science & Engineering</h3>
                <div style={{ fontSize:12.5, color:P.muted, marginBottom:8 }}>Daffodil International University</div>
                <span style={{ background:P.goldS, color:"#A87A22", borderRadius:20, fontSize:10.5, fontWeight:700, padding:"3px 11px" }}>May 2018 – Jun 2022</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CLOSER ═══ */}
        <section style={{ textAlign:"center", padding:"20px 0 8px" }}>
          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:"clamp(13px,1.8vw,16px)", color:P.muted, marginBottom:8 }}>
            expect(<span style={{ color:P.lav }}>quality</span>).toBe(<span style={{ color:P.rose }}>"non-negotiable"</span>);
          </div>
          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:12, color:P.pass, marginBottom:20 }}>✓ passing — every build, every release, since 2023</div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="mailto:kishoartithee@gmail.com" style={{ background:P.rose, color:"#fff", padding:"13px 26px", borderRadius:12, textDecoration:"none", fontSize:13.5, fontWeight:700, boxShadow:`0 10px 30px ${P.rose}44` }}>✉️ get in touch</a>
            <button onClick={()=>window.print()} style={{ background:"#fff", color:P.ink, border:`1.5px solid ${P.border}`, padding:"13px 26px", borderRadius:12, cursor:"pointer", fontSize:13.5, fontWeight:600, fontFamily:"inherit" }}>🖨 print this résumé</button>
          </div>
          <div style={{ marginTop:28, fontSize:11.5, color:P.muted, fontStyle:"italic", fontFamily:"'Fraunces',serif" }}>
            tested with 🌸 · hosted on unsaidscript
          </div>
        </section>
      </div>

      <style>{`
        .ttGrad{
          background:linear-gradient(105deg, ${P.rose} 25%, ${P.lav} 75%);
          -webkit-background-clip:text; background-clip:text; color:transparent;
        }
        @keyframes ttPulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes ttBlink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes ttBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}
        @keyframes ttGate{0%,100%{box-shadow:0 0 0 6px ${P.rose}18}50%{box-shadow:0 0 0 12px ${P.rose}0D}}
        @keyframes ttFall{ from{ transform:translateY(-8vh) } to{ transform:translateY(108vh) } }
        @keyframes ttSway{ 0%,100%{ margin-left:0 } 50%{ margin-left:26px } }
        @keyframes ttTravel{ 0%{ left:30px } 45%,55%{ left:calc(50% + 8px) } 100%{ left:calc(100% - 42px) } }
        @keyframes ttTwinkle{ 0%,100%{ opacity:0.15; transform:scale(0.8) } 50%{ opacity:0.9; transform:scale(1.1) } }
        /* the bug's short journey: commit → build → caught at her gate */
        @keyframes ttBugRun{
          0%{ left:30px; opacity:0 } 8%{ opacity:1 }
          58%{ left:calc(62% - 20px); opacity:1; transform:scale(1) rotate(0deg) }
          66%{ left:calc(62% - 12px); opacity:0; transform:scale(0.2) rotate(140deg) }
          100%{ left:calc(62% - 12px); opacity:0 }
        }
        @keyframes ttMarqScroll{ to{ transform:translateX(-50%) } }
        .ttMarq{ animation:ttMarqScroll 30s linear infinite; }
        .ttMarqWrap:hover .ttMarq{ animation-play-state:paused; }
        .ttPetal{ position:fixed; top:0; z-index:0; pointer-events:none; animation:ttFall 17s linear infinite, ttSway 5s ease-in-out infinite; }
        .ttPulseDot{ animation:ttTravel 5s ease-in-out infinite; }
        .ttBug{ animation:ttBugRun 7s ease-in-out 1.2s infinite; }
        @media (max-width: 880px){
          .ttHero{ grid-template-columns:1fr !important; }
          .ttStats{ grid-template-columns:repeat(2,1fr) !important; }
          .ttThree{ grid-template-columns:1fr !important; }
          .ttTwoCol{ grid-template-columns:1fr !important; }
        }
        @media print{
          .ttPetal{ display:none; }
          button{ display:none; }
        }
      `}</style>
    </div>
  );
}
