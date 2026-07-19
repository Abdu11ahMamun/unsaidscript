import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════
   unsaid.os — the personal operating system behind unsaidscript
   ----------------------------------------------------------------
   UI-only build. Every piece of data below is mock, and every
   mock is annotated with the Spring Boot endpoint that will
   eventually feed it:   // ⇄ GET /api/v1/...
   Swap MOCK reads for fetch() calls and the UI stays untouched.
════════════════════════════════════════════════════════════ */

/* ── design tokens — same soul as the public site ── */
const C = {
  bg:"#FBF6EC", bg2:"#F3ECDD", card:"#FFFFFF",
  ink:"#3B3A2F", muted:"#85806E", border:"#E8E0CC",
  green:"#5E8C61", greenS:"#EAF3E7",
  coral:"#D96C4F", coralS:"#FBEDE5",
  sky:"#6FA8BC",  skyS:"#E9F3F6",
  gold:"#D9A441", goldS:"#FBF3DF",
  dark:"#2C3A30", darker:"#223026",
  termBg:"#0d1117",
  termGreen:"#4ade80", termBlue:"#79c0ff", termPurple:"#a78bfa",
  termOrange:"#f97316", termYellow:"#fbbf24",
};
const FONT_SERIF = "'Fraunces',Georgia,serif";
const FONT_MONO  = "'Fira Code','SF Mono',monospace";
const FONT_BODY  = "'Karla','SF Pro Display',system-ui,sans-serif";

/* ════════════════════════════════════════════════════════════
   MOCK DATA LAYER  —  the future API, sketched in constants
════════════════════════════════════════════════════════════ */

/* ⇄ POST /api/v1/auth/login   { email, password } → { token, profile } */
const MOCK_PROFILE = { name:"Abdullah Al Mamun", role:"owner", handle:"@unsaidscript", email:"cs.abdullah.mamun@gmail.com" };

/* ⇄ GET /api/v1/analytics/visitors?days=14 */
const VISITORS_14D = [
  { d:"30 May", v:148 },{ d:"31 May", v:131 },{ d:"01 Jun", v:202 },{ d:"02 Jun", v:236 },
  { d:"03 Jun", v:219 },{ d:"04 Jun", v:251 },{ d:"05 Jun", v:187 },{ d:"06 Jun", v:164 },
  { d:"07 Jun", v:289 },{ d:"08 Jun", v:331 },{ d:"09 Jun", v:302 },{ d:"10 Jun", v:356 },
  { d:"11 Jun", v:312 },{ d:"12 Jun", v:247 },
];

/* ⇄ GET /api/v1/analytics/summary */
const SUMMARY = {
  today:247, yesterday:312, totalMonth:5840,
  avgRead:"4m 32s", bounce:"38%", subscribers:184, newSubsWeek:11,
};

/* ⇄ GET /api/v1/analytics/sources */
const SOURCES = [
  { name:"Google", pct:42, color:C.green },
  { name:"Direct", pct:24, color:C.gold },
  { name:"LinkedIn", pct:15, color:C.sky },
  { name:"GitHub", pct:11, color:C.coral },
  { name:"X / Twitter", pct:8, color:"#9B8AC4" },
];

/* ⇄ GET /api/v1/analytics/pages/top */
const TOP_PAGES = [
  { path:"/", views:2140, avg:"3m 10s" },
  { path:"/writing", views:1422, avg:"5m 44s" },
  { path:"/review/kafka-on-the-shore", views:986, avg:"8m 02s" },
  { path:"/review/forty-rules-of-love", views:741, avg:"7m 18s" },
  { path:"/#projects", views:633, avg:"2m 51s" },
];

/* ⇄ GET /api/v1/analytics/devices */
const DEVICES = [
  { name:"Mobile", pct:58, color:C.green },
  { name:"Desktop", pct:36, color:C.gold },
  { name:"Tablet", pct:6, color:C.sky },
];

/* ⇄ GET /api/v1/activity/feed?limit=8 */
const ACTIVITY = [
  { icon:"📈", text:"Traffic spike from LinkedIn — your IDE projects post", time:"2h ago" },
  { icon:"✉️", text:"3 new newsletter subscribers", time:"5h ago" },
  { icon:"⭐", text:"Kafka on the Shore crossed 950 reads", time:"yesterday" },
  { icon:"🔗", text:"aaiins-lab.com referred 12 visitors", time:"yesterday" },
  { icon:"📕", text:"Draft saved — 'The Old Man and the Sea' review", time:"2d ago" },
  { icon:"🌱", text:"Reading streak reached 21 days", time:"3d ago" },
];

/* ⇄ GET /api/v1/reviews   ·   POST /api/v1/reviews   ·   PUT /api/v1/reviews/{slug} */
const INIT_REVIEWS = [
  { slug:"kafka-on-the-shore", title:"Kafka on the Shore", author:"Haruki Murakami", rating:4.5,
    status:"published", views:986, updated:"08 Jun 2026", genre:"Magical Realism",
    verdict:"The most honest portrait of loneliness I've ever read — disguised as a fever dream.",
    cover:{ bg:"linear-gradient(160deg,#1F3A53 0%,#2E6E8E 70%,#3F8CA8 100%)", ink:"#F3EEDF", motif:"moon" } },
  { slug:"forty-rules-of-love", title:"The Forty Rules of Love", author:"Elif Shafak", rating:5,
    status:"published", views:741, updated:"02 Jun 2026", genre:"Sufi Fiction",
    verdict:"Not my favorite book — my hinge. There is my life before this book and after it.",
    cover:{ bg:"linear-gradient(160deg,#7E3340 0%,#B5503F 55%,#D96C4F 100%)", ink:"#FBF0DC", motif:"whirl" } },
  { slug:"the-metamorphosis", title:"The Metamorphosis", author:"Franz Kafka", rating:4.5,
    status:"published", views:512, updated:"28 May 2026", genre:"Absurdist Classic",
    verdict:"What am I worth to my family when I can no longer provide?",
    cover:{ bg:"linear-gradient(160deg,#2E2C24 0%,#4A4434 60%,#6B5B43 100%)", ink:"#E9E2CE", motif:"beetle" } },
  { slug:"old-man-and-the-sea", title:"The Old Man and the Sea", author:"Ernest Hemingway", rating:4,
    status:"draft", views:0, updated:"10 Jun 2026", genre:"Classic",
    verdict:"A man can be destroyed but not defeated — draft in progress.",
    cover:{ bg:"linear-gradient(160deg,#1E4A56 0%,#3A7D8C 100%)", ink:"#F3EEDF", motif:"none" } },
];

/* cover presets for the editor */
const COVER_PRESETS = [
  { label:"Dusk Sea",   bg:"linear-gradient(160deg,#1F3A53 0%,#2E6E8E 70%,#3F8CA8 100%)", ink:"#F3EEDF" },
  { label:"Persimmon",  bg:"linear-gradient(160deg,#7E3340 0%,#B5503F 55%,#D96C4F 100%)", ink:"#FBF0DC" },
  { label:"Old Paper",  bg:"linear-gradient(160deg,#2E2C24 0%,#4A4434 60%,#6B5B43 100%)", ink:"#E9E2CE" },
  { label:"Meadow",     bg:"linear-gradient(160deg,#2F4A33 0%,#5E8C61 100%)",             ink:"#F3EEDF" },
  { label:"Lantern",    bg:"linear-gradient(160deg,#8A6A2F 0%,#D9A441 100%)",             ink:"#FBF3DF" },
  { label:"Ink Night",  bg:"linear-gradient(160deg,#191D24 0%,#3A4254 100%)",             ink:"#E8EAF0" },
];

/* ⇄ GET /api/v1/site/copy   ·   PUT /api/v1/site/copy */
const INIT_SITE_COPY = {
  rotatingWords:"build, write, dream, wonder",
  heroLede:"A fintech engineer who grew up inside books. By day I build banking systems and AI tools; by night I chase pages — Himu's Dhaka, Murakami's wells, Rumi's fire.",
  available:true,
  statusReading:"kafka on the shore",
  contactEmail:"cs.abdullah.mamun@gmail.com",
  footerLine:"written, not just built",
};

/* ⇄ GET /api/v1/habits/today   ·   PUT /api/v1/habits/{id}/log */
const INIT_HABITS = [
  { id:"reading",  label:"Reading",   icon:"📖", unit:"min",   done:45,  goal:60,  color:C.coral,  streak:21 },
  { id:"salah",    label:"Salah",     icon:"🕌", unit:"waqt",  done:4,   goal:5,   color:C.green,  streak:97 },
  { id:"exercise", label:"Exercise",  icon:"🏃", unit:"min",   done:20,  goal:30,  color:C.sky,    streak:6 },
  { id:"coding",   label:"Deep code", icon:"⌨️", unit:"hrs",   done:5.5, goal:6,   color:C.gold,   streak:14 },
  { id:"writing",  label:"Writing",   icon:"✍️", unit:"words", done:320, goal:500, color:"#9B8AC4",streak:4 },
  { id:"water",    label:"Water",     icon:"💧", unit:"glass", done:6,   goal:8,   color:"#5BA8C9",streak:11 },
];

/* ⇄ GET /api/v1/habits/reading/heatmap?weeks=16 — minutes per day */
const READ_HEAT = Array.from({ length:16*7 }, (_,i)=>{
  const wave = Math.sin(i/5)*0.5+0.5;
  const r = (i*2654435761 % 97)/97;
  return Math.round(Math.max(0, (wave*0.6 + r*0.6 - 0.18)) * 75);
});

/* ⇄ GET /api/v1/habits/week — minutes read per weekday, current week */
const WEEK_READING = [
  { d:"Sat", v:40 },{ d:"Sun", v:65 },{ d:"Mon", v:30 },{ d:"Tue", v:55 },
  { d:"Wed", v:75 },{ d:"Thu", v:20 },{ d:"Fri", v:45 },
];

/* ⇄ GET /api/v1/diary?month=…   ·   POST /api/v1/diary */
const INIT_DIARY = [
  { id:3, date:"12 Jun 2026 · Friday", mood:"🙂", weather:"☁️ 31°C",
    gratitude:"Jumu'ah, ammu's call, and the rain that came at exactly the right time.",
    morning:"Fajr on time, আলহামদুলিল্লাহ। 30 pages of Kafka with cha before standup.",
    afternoon:"Koalafi sprint work — payment retry flow finally green. Reviewed a junior's PR with extra care; remembered how much kind reviews meant to me in 2023.",
    evening:"", words:74,
  },
  { id:2, date:"11 Jun 2026 · Thursday", mood:"😌", weather:"🌧 29°C",
    gratitude:"A quiet desk and no meetings after 4.",
    morning:"Slow start. Skipped exercise — being honest with this diary.",
    afternoon:"Wrote 400 words of the Hemingway review draft. The old man hasn't caught the fish yet; neither have I.",
    evening:"Wife and I walked after ishaa, bought jhalmuri, talked about the PhD timeline. She believes in Dr. Abdullah more than I do some days.",
    words:188,
  },
  { id:1, date:"10 Jun 2026 · Wednesday", mood:"🔥", weather:"☀️ 33°C",
    gratitude:"Shipping things. Energy. Cold lemon sharbat.",
    morning:"Deployed the new unsaidscript hero. The typing editor feels alive.",
    afternoon:"Traffic spiked from LinkedIn — 356 visitors, best day this month.",
    evening:"Read Misir Ali before sleep, like meeting an old teacher.",
    words:142,
  },
];

/* ⇄ GET /api/v1/notes   ·   CRUD /api/v1/notes/{id}/blocks */
const INIT_NOTES = [
  { id:"n1", icon:"🏗", title:"TSE-ERP — Phase 3 ideas", updated:"today",
    blocks:[
      { t:"h", text:"Phase 3 — Sales & Inventory" },
      { t:"p", text:"Backend contracts are the source of truth. Frontend follows exactly — no reshaping." },
      { t:"todo", text:"Invoice line items — purpose-built table component", done:true },
      { t:"todo", text:"Stock ledger view with running balance", done:false },
      { t:"todo", text:"Multi-company switcher (replace hardcoded companyId=1)", done:false },
      { t:"code", text:"GET /api/v1/inventory/items?companyId={id}&page={n}" },
      { t:"q", text:"Build it boring. Boring scales." },
    ]},
  { id:"n2", icon:"📕", title:"A book of my own — outline", updated:"2d ago",
    blocks:[
      { t:"h", text:"Working title: অব্যক্ত" },
      { t:"p", text:"Essays on growing up between two languages — Bangla at heart, Java at work." },
      { t:"todo", text:"Ch 1: The boy who read at the dinner table", done:true },
      { t:"todo", text:"Ch 2: Himu's yellow, my grey office", done:false },
      { t:"todo", text:"Ch 3: Debugging as a spiritual practice", done:false },
      { t:"q", text:"Write the book you needed at nineteen." },
    ]},
  { id:"n3", icon:"🎓", title:"PhD — LLM × fintech plan", updated:"5d ago",
    blocks:[
      { t:"h", text:"Target: Fall 2027 intake" },
      { t:"todo", text:"Shortlist 8 supervisors (LLM + financial NLP)", done:true },
      { t:"todo", text:"Get suicidal-ideation paper through review", done:false },
      { t:"todo", text:"IELTS slot — book before August", done:false },
      { t:"p", text:"The Shariah Auditor work is the strongest story — lead with it in the SOP." },
    ]},
  { id:"n4", icon:"🧴", title:"ÉLIXIR — remaining fixes", updated:"1w ago",
    blocks:[
      { t:"todo", text:"'For Him' collection card rendering bug", done:false },
      { t:"todo", text:"Nav links white-on-white after hero scroll", done:false },
      { t:"p", text:"Then hand over to client for content. Invoice the second milestone." },
    ]},
];

/* ⇄ contract reference — rendered in Settings */
const API_CONTRACT = [
  ["POST","/api/v1/auth/login","Login screen","🟡 awaiting backend"],
  ["GET","/api/v1/analytics/visitors?days=14","Dashboard · area chart","🟡 awaiting backend"],
  ["GET","/api/v1/analytics/summary","Dashboard · stat cards","🟡 awaiting backend"],
  ["GET","/api/v1/analytics/sources","Dashboard · sources","🟡 awaiting backend"],
  ["GET","/api/v1/analytics/pages/top","Dashboard · top pages","🟡 awaiting backend"],
  ["GET","/api/v1/reviews","Reviews · list","🟡 awaiting backend"],
  ["POST","/api/v1/reviews","Reviews · create","🟡 awaiting backend"],
  ["PUT","/api/v1/reviews/{slug}","Reviews · edit","🟡 awaiting backend"],
  ["PUT","/api/v1/site/copy","Site copy editor","🟡 awaiting backend"],
  ["GET","/api/v1/habits/today","Habits · rings","🟡 awaiting backend"],
  ["PUT","/api/v1/habits/{id}/log","Habits · +/- buttons","🟡 awaiting backend"],
  ["GET","/api/v1/diary?month={m}","Diary · entries","🟡 awaiting backend"],
  ["POST","/api/v1/diary","Diary · new entry","🟡 awaiting backend"],
  ["GET","/api/v1/notes","Notes · pages","🟡 awaiting backend"],
];

/* ════════════════════════════════════════════════════════════
   ATOMS
════════════════════════════════════════════════════════════ */
const MonoLabel = ({ children, color=C.muted }) => (
  <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color, fontFamily:FONT_MONO, marginBottom:8 }}>{children}</div>
);

const SerifH = ({ children, size=22, style={} }) => (
  <h2 style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:size, color:C.ink, margin:0, letterSpacing:"-0.02em", ...style }}>{children}</h2>
);

function Panel({ children, style={}, pad=24 }) {
  return (
    <div style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:18, padding:pad, boxShadow:"0 2px 10px rgba(59,58,47,0.04)", ...style }}>
      {children}
    </div>
  );
}

function Btn({ children, kind="primary", onClick, small=false, style={} }) {
  const base = {
    border:"none", cursor:"pointer", fontWeight:700, borderRadius:10,
    padding: small ? "8px 14px" : "11px 20px", fontSize: small ? 12.5 : 13.5,
    fontFamily:FONT_BODY, transition:"all .18s", display:"inline-flex", alignItems:"center", gap:8,
  };
  const kinds = {
    primary:{ background:C.green, color:"#fff", boxShadow:`0 6px 18px ${C.green}44` },
    dark:{ background:C.termBg, color:C.termGreen, fontFamily:FONT_MONO, border:"1px solid rgba(255,255,255,0.08)" },
    ghost:{ background:"#fff", color:C.ink, border:`1.5px solid ${C.border}` },
    danger:{ background:C.coralS, color:C.coral, border:`1.5px solid ${C.coral}40` },
  };
  return <button onClick={onClick} style={{ ...base, ...kinds[kind], ...style }}>{children}</button>;
}

const Field = ({ label, children }) => (
  <div style={{ marginBottom:18 }}>
    <MonoLabel>{label}</MonoLabel>
    {children}
  </div>
);

const inputStyle = {
  width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10,
  padding:"11px 14px", fontSize:14, color:C.ink, outline:"none", fontFamily:FONT_BODY, boxSizing:"border-box",
};
const Input = (props) => <input {...props} style={{ ...inputStyle, ...(props.style||{}) }}
  onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border}/>;
const TextArea = (props) => <textarea {...props} style={{ ...inputStyle, resize:"vertical", ...(props.style||{}) }}
  onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border}/>;

function Toggle({ on, onChange }) {
  return (
    <div onClick={()=>onChange(!on)} style={{ width:44, height:24, borderRadius:20, background: on ? C.green : C.border, position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left: on ? 23 : 3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left .2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}/>
    </div>
  );
}

function Tag({ children, color=C.green }) {
  return <span style={{ background:color+"1A", color, fontSize:10.5, fontWeight:700, letterSpacing:0.8, padding:"3px 10px", borderRadius:20, textTransform:"uppercase", fontFamily:FONT_MONO }}>{children}</span>;
}

function Modal({ open, onClose, title, children, width=720 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:4000, background:"rgba(35,32,24,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"7vh 20px", overflowY:"auto" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:`min(${width}px, 94vw)`, background:C.bg, borderRadius:20, border:`1.5px solid ${C.border}`, boxShadow:"0 30px 90px rgba(0,0,0,0.35)", animation:"osPop .18s ease-out", overflow:"hidden" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 26px", borderBottom:`1px solid ${C.border}`, background:"#fff" }}>
          <SerifH size={19}>{title}</SerifH>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:18, color:C.muted, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ padding:26 }}>{children}</div>
      </div>
    </div>
  );
}

/* mini book cover (shared with the public site) */
function MiniCover({ cover, title, author, w=84 }) {
  const hgt = Math.round(w*1.5);
  return (
    <div style={{ width:w, height:hgt, position:"relative", flexShrink:0 }}>
      <div style={{ position:"absolute", right:-3, top:2, bottom:2, width:4, background:"repeating-linear-gradient(180deg,#FFFDF4 0 2px,#E8E0CC 2px 3px)", borderRadius:"0 2px 2px 0" }}/>
      <div style={{ position:"absolute", inset:0, background:cover.bg, borderRadius:"3px 6px 6px 3px", boxShadow:"5px 8px 18px rgba(59,58,47,0.25)", overflow:"hidden", display:"flex", flexDirection:"column", padding:`${w*0.10}px ${w*0.09}px` }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:4, background:"linear-gradient(90deg,rgba(0,0,0,0.3),rgba(0,0,0,0))" }}/>
        {cover.motif==="moon" && <div style={{ position:"absolute", right:w*0.1, top:hgt*0.12, width:w*0.26, height:w*0.26, borderRadius:"50%", background:cover.ink, opacity:0.9 }}/>}
        {cover.motif==="whirl" && <div style={{ position:"absolute", right:w*0.08, top:hgt*0.1, width:w*0.3, height:w*0.3, border:`1.6px solid ${cover.ink}`, borderRadius:"50%", opacity:0.65 }}/>}
        {cover.motif==="beetle" && <div style={{ position:"absolute", right:w*0.1, top:hgt*0.11, width:w*0.22, height:w*0.3, border:`1.6px solid ${cover.ink}`, borderRadius:"50% 50% 46% 46%", opacity:0.55 }}/>}
        <div style={{ marginTop:"auto" }}>
          <div style={{ width:w*0.2, height:1.6, background:cover.ink, opacity:0.7, marginBottom:w*0.06 }}/>
          <div style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:Math.max(9,w*0.105), lineHeight:1.15, color:cover.ink }}>{title}</div>
          <div style={{ fontSize:Math.max(7,w*0.062), color:cover.ink, opacity:0.8, marginTop:w*0.04, letterSpacing:0.5, textTransform:"uppercase" }}>{author}</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CHARTS — hand-rolled SVG, no libraries
════════════════════════════════════════════════════════════ */
function AreaChart({ data, height=190, accent=C.green }) {
  const [hov, setHov] = useState(null);
  const W = 640, H = height, padX = 8, padY = 18;
  const max = Math.max(...data.map(d=>d.v)) * 1.15;
  const pts = data.map((d,i)=>[ padX + (i/(data.length-1))*(W-padX*2), H - padY - (d.v/max)*(H-padY*2) ]);
  const path = pts.map((p,i)=> i===0 ? `M${p[0]},${p[1]}` : `C${(pts[i-1][0]+p[0])/2},${pts[i-1][1]} ${(pts[i-1][0]+p[0])/2},${p[1]} ${p[0]},${p[1]}`).join(" ");
  const area = `${path} L${pts[pts.length-1][0]},${H-6} L${pts[0][0]},${H-6} Z`;
  return (
    <div style={{ position:"relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", display:"block" }}
        onMouseLeave={()=>setHov(null)}
        onMouseMove={e=>{
          const r = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX-r.left)/r.width)*W;
          let best=0, bd=1e9;
          pts.forEach((p,i)=>{ const d=Math.abs(p[0]-x); if(d<bd){bd=d;best=i;} });
          setHov(best);
        }}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.28"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0.02"/>
          </linearGradient>
        </defs>
        {[0.25,0.5,0.75].map(g=>(
          <line key={g} x1={padX} x2={W-padX} y1={H-padY-(H-padY*2)*g} y2={H-padY-(H-padY*2)*g} stroke={C.border} strokeWidth="1" strokeDasharray="3 5"/>
        ))}
        <path d={area} fill="url(#areaFill)"/>
        <path d={path} fill="none" stroke={accent} strokeWidth="2.6" strokeLinecap="round"/>
        {hov!=null && <>
          <line x1={pts[hov][0]} x2={pts[hov][0]} y1={padY-6} y2={H-padY+8} stroke={accent} strokeWidth="1" strokeDasharray="3 4" opacity="0.6"/>
          <circle cx={pts[hov][0]} cy={pts[hov][1]} r="5.5" fill="#fff" stroke={accent} strokeWidth="2.6"/>
        </>}
      </svg>
      {hov!=null && (
        <div style={{ position:"absolute", left:`${(pts[hov][0]/W)*100}%`, top:0, transform:"translateX(-50%)", background:C.termBg, color:"#e5e7eb", fontFamily:FONT_MONO, fontSize:11.5, padding:"6px 12px", borderRadius:8, whiteSpace:"nowrap", pointerEvents:"none", border:"1px solid rgba(255,255,255,0.1)" }}>
          <span style={{ color:accent, fontWeight:700 }}>{data[hov].v}</span> visitors · {data[hov].d}
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", fontFamily:FONT_MONO, fontSize:10, color:C.muted, marginTop:4 }}>
        <span>{data[0].d}</span><span>{data[Math.floor(data.length/2)].d}</span><span>{data[data.length-1].d}</span>
      </div>
    </div>
  );
}

function HBar({ label, pct, color }) {
  const [on,setOn]=useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setOn(true),120); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{ marginBottom:13 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:5 }}>
        <span style={{ color:C.ink, fontWeight:600 }}>{label}</span>
        <span style={{ color:C.muted, fontFamily:FONT_MONO }}>{pct}%</span>
      </div>
      <div style={{ height:7, borderRadius:5, background:C.bg2, overflow:"hidden" }}>
        <div style={{ height:"100%", width:on?`${pct}%`:"0%", background:`linear-gradient(90deg,${color},${color}AA)`, borderRadius:5, transition:"width .9s cubic-bezier(.3,.7,.3,1)" }}/>
      </div>
    </div>
  );
}

function Ring({ pct, color, size=78, stroke=7, children }) {
  const r = (size-stroke)/2, circ = 2*Math.PI*r;
  const [on,setOn]=useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setOn(true),150); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.bg2} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={on ? circ*(1-Math.min(pct,1)) : circ}
          style={{ transition:"stroke-dashoffset 1s cubic-bezier(.3,.7,.3,1)" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>{children}</div>
    </div>
  );
}

function VBars({ data, accent=C.coral, height=120 }) {
  const max = Math.max(...data.map(d=>d.v))*1.1;
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:10, height }}>
      {data.map((d,i)=>(
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6, height:"100%", justifyContent:"flex-end" }}>
          <div title={`${d.v} min`} style={{ width:"100%", maxWidth:30, height:`${(d.v/max)*100}%`, background:`linear-gradient(180deg,${accent},${accent}88)`, borderRadius:"6px 6px 3px 3px", transition:"height .8s cubic-bezier(.3,.7,.3,1)" }}/>
          <span style={{ fontSize:10, fontFamily:FONT_MONO, color:C.muted }}>{d.d}</span>
        </div>
      ))}
    </div>
  );
}

function Heatmap({ data, weeks=16 }) {
  const cell = (v) => v===0 ? C.bg2 : v<20 ? "#D7E6CF" : v<40 ? "#A9CBA0" : v<60 ? "#7CAF74" : C.green;
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${weeks}, 1fr)`, gap:4 }}>
        {Array.from({ length: weeks }).map((_,w)=>(
          <div key={w} style={{ display:"grid", gridTemplateRows:"repeat(7,1fr)", gap:4 }}>
            {Array.from({ length:7 }).map((_,d)=>{
              const v = data[w*7+d] ?? 0;
              return <div key={d} title={`${v} min`} style={{ aspectRatio:"1", borderRadius:3.5, background:cell(v) }}/>;
            })}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center", gap:5, marginTop:10, fontSize:10.5, fontFamily:FONT_MONO, color:C.muted }}>
        less {[C.bg2,"#D7E6CF","#A9CBA0","#7CAF74",C.green].map(c=><span key={c} style={{ width:10, height:10, borderRadius:3, background:c, display:"inline-block" }}/>)} more
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LOGIN — the door to the studio
   ⇄ POST /api/v1/auth/login
════════════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }) {
  const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const [busy,setBusy]=useState(false); const [lines,setLines]=useState([]);
  const submit = () => {
    if (busy) return;
    setBusy(true);
    const seq = [
      { html:`<span style="color:#4ade80">❯</span> auth --user ${email||"abdullah"}`, t:0 },
      { html:`<span style="color:#79c0ff">›</span> verifying credentials…`, t:380 },
      { html:`<span style="color:#79c0ff">›</span> session granted · welcome home`, t:820 },
      { html:`<span style="color:#4ade80">✓</span> opening unsaid.os`, t:1200 },
    ];
    seq.forEach(l=>setTimeout(()=>setLines(p=>[...p,l.html]), l.t));
    setTimeout(onLogin, 1650);
  };
  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONT_BODY, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize:"26px 26px", opacity:0.35, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"8%", right:"6%", fontFamily:FONT_SERIF, fontStyle:"italic", fontWeight:600, fontSize:"clamp(100px,14vw,200px)", color:C.ink, opacity:0.045, transform:"rotate(-5deg)", userSelect:"none" }}>অব্যক্ত</div>

      <div style={{ width:"min(420px, 92vw)", position:"relative" }}>
        {/* the mark */}
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
              {lines.map((l,i)=><div key={i} dangerouslySetInnerHTML={{ __html:l }}/>)}
              <span style={{ color:C.termGreen, animation:"osBlink 1s infinite" }}>▌</span>
            </div>
          ) : (
            <>
              <Field label="Email">
                <Input type="email" placeholder="abdullah@unsaidscript.dev" value={email} onChange={e=>setEmail(e.target.value)}/>
              </Field>
              <Field label="Password">
                <Input type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
              </Field>
              <Btn onClick={submit} style={{ width:"100%", justifyContent:"center", marginTop:4 }}>❯ enter the studio</Btn>
              <div style={{ textAlign:"center", marginTop:16, fontSize:11.5, color:C.muted, fontFamily:FONT_MONO }}>
                demo build — any credentials open the door
              </div>
            </>
          )}
        </Panel>

        <div style={{ textAlign:"center", marginTop:22, fontSize:12, color:C.muted, fontStyle:"italic", fontFamily:FONT_SERIF }}>
          "Every morning the desk is waiting."
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SHELL — sidebar + topbar
════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id:"dashboard", icon:"◳", label:"Dashboard" },
  { id:"reviews",   icon:"📕", label:"Reviews · CMS" },
  { id:"sitecopy",  icon:"✎", label:"Site Copy" },
  { id:"habits",    icon:"🌱", label:"Habits" },
  { id:"diary",     icon:"📓", label:"Diary" },
  { id:"notes",     icon:"🗂", label:"Notes" },
  { id:"settings",  icon:"⚙", label:"Settings · API" },
];

function Sidebar({ section, setSection, onLogout, onPalette }) {
  return (
    <aside style={{ width:236, flexShrink:0, background:`linear-gradient(180deg,${C.dark},${C.darker})`, display:"flex", flexDirection:"column", position:"fixed", top:0, bottom:0, left:0, zIndex:100 }}>
      {/* brand */}
      <div style={{ padding:"22px 20px 18px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <svg viewBox="0 0 64 64" width="30" height="30">
          <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.07)"/>
          <line x1="32" y1="13.5" x2="32" y2="9.5" stroke="#86B489" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M32 13 C44 20.5, 45.5 35, 32 53 C18.5 35, 20 20.5, 32 13 Z" fill="#86B489"/>
          <line x1="32" y1="38.5" x2="32" y2="49" stroke={C.dark} strokeWidth="2.4" strokeLinecap="round"/>
          <circle cx="32" cy="36.5" r="2.8" fill={C.gold}/>
        </svg>
        <div>
          <div style={{ fontFamily:FONT_SERIF, fontWeight:700, fontSize:16, color:"#F3EEDF", lineHeight:1 }}>unsaid<span style={{ color:C.coral }}>.os</span></div>
          <div style={{ fontFamily:FONT_MONO, fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:1.5, marginTop:3 }}>v0.1 · UI PREVIEW</div>
        </div>
      </div>

      {/* nav */}
      <nav style={{ padding:"14px 12px", flex:1 }}>
        {NAV_ITEMS.map(it=>(
          <div key={it.id} onClick={()=>setSection(it.id)}
            style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, cursor:"pointer", marginBottom:3,
              background: section===it.id ? "rgba(134,180,137,0.16)" : "transparent",
              borderLeft: section===it.id ? `2.5px solid #86B489` : "2.5px solid transparent",
              transition:"all .15s" }}
            onMouseEnter={e=>{ if(section!==it.id) e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
            onMouseLeave={e=>{ if(section!==it.id) e.currentTarget.style.background="transparent"; }}>
            <span style={{ fontSize:15, width:20, textAlign:"center" }}>{it.icon}</span>
            <span style={{ fontSize:13.5, fontWeight: section===it.id ? 700 : 500, color: section===it.id ? "#F3EEDF" : "rgba(255,255,255,0.55)" }}>{it.label}</span>
          </div>
        ))}
        <div onClick={onPalette}
          style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, cursor:"pointer", marginTop:10, border:"1px dashed rgba(255,255,255,0.18)" }}>
          <span style={{ fontSize:13, width:20, textAlign:"center", fontFamily:FONT_MONO, color:"rgba(255,255,255,0.5)" }}>⌘K</span>
          <span style={{ fontSize:12.5, color:"rgba(255,255,255,0.45)", fontFamily:FONT_MONO }}>command palette</span>
        </div>
      </nav>

      {/* user / status bar */}
      <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONT_SERIF, fontWeight:700, color:C.dark, fontSize:14 }}>A</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:12.5, color:"#F3EEDF", fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{MOCK_PROFILE.name}</div>
            <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.4)", fontFamily:FONT_MONO }}>{MOCK_PROFILE.handle}</div>
          </div>
          <span onClick={onLogout} title="log out" style={{ cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:14 }}>⏻</span>
        </div>
        <div style={{ fontFamily:FONT_MONO, fontSize:10, color:"rgba(255,255,255,0.3)", display:"flex", justifyContent:"space-between" }}>
          <span>⎇ life/main</span><span style={{ color:C.termGreen }}>● all quiet</span>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ section }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
  const item = NAV_ITEMS.find(n=>n.id===section);
  return (
    <div style={{ height:62, borderBottom:`1px solid ${C.border}`, background:"rgba(251,246,236,0.9)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 32px", position:"sticky", top:0, zIndex:50 }}>
      <div style={{ fontFamily:FONT_MONO, fontSize:12, color:C.muted }}>
        unsaid.os <span style={{ color:C.border }}>/</span> <span style={{ color:C.ink, fontWeight:700 }}>{item?.label.toLowerCase()}</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <span style={{ fontSize:12, color:C.muted, fontFamily:FONT_MONO }}>{dateStr}</span>
        <span style={{ width:4, height:4, borderRadius:"50%", background:C.border }}/>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, color:"#16a34a", fontWeight:600 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 8px #22c55e", animation:"osPulse 2s infinite" }}/>
          site live
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DASHBOARD — the morning glance
════════════════════════════════════════════════════════════ */
function StatCard({ icon, label, value, sub, accent=C.green }) {
  return (
    <Panel pad={20} style={{ position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-14, right:-6, fontSize:64, opacity:0.07 }}>{icon}</div>
      <MonoLabel color={accent}>{label}</MonoLabel>
      <div style={{ fontFamily:FONT_SERIF, fontWeight:700, fontSize:32, color:C.ink, lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12, color:C.muted, marginTop:8, fontFamily:FONT_MONO }}>{sub}</div>
    </Panel>
  );
}

function DashboardPage({ habits, diary }) {
  const hour = new Date().getHours();
  const greet = hour<5 ? "শুভ রাত্রি" : hour<12 ? "শুভ সকাল" : hour<17 ? "শুভ দুপুর" : "শুভ সন্ধ্যা";
  const todayDiary = diary[0];
  const habitsDone = habits.filter(h=>h.done>=h.goal).length;
  const delta = SUMMARY.today - SUMMARY.yesterday;
  return (
    <div>
      {/* greeting */}
      <div style={{ marginBottom:26 }}>
        <SerifH size={30}>{greet}, Abdullah <span style={{ fontStyle:"italic", color:C.coral }}>☕</span></SerifH>
        <p style={{ color:C.muted, fontSize:14, margin:"8px 0 0", fontFamily:FONT_BODY }}>
          <strong style={{ color:C.ink }}>{SUMMARY.today} people</strong> visited your corner of the internet today
          {" "}· {habitsDone}/{habits.length} habits complete · diary {todayDiary?.evening ? "written ✓" : "waiting for the evening…"}
        </p>
      </div>

      {/* stat row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16, marginBottom:18 }}>
        <StatCard icon="👋" label="Visitors today" value={SUMMARY.today} sub={`${delta>=0?"▲":"▼"} ${Math.abs(delta)} vs yesterday`} accent={C.green}/>
        <StatCard icon="📖" label="Avg time reading" value={SUMMARY.avgRead} sub={`bounce ${SUMMARY.bounce} — they stay`} accent={C.coral}/>
        <StatCard icon="✉️" label="Subscribers" value={SUMMARY.subscribers} sub={`+${SUMMARY.newSubsWeek} this week`} accent={C.gold}/>
        <StatCard icon="🗓" label="This month" value={SUMMARY.totalMonth.toLocaleString()} sub="total visits · June" accent={C.sky}/>
      </div>

      {/* chart + sources */}
      <div style={{ display:"grid", gridTemplateColumns:"1.7fr 1fr", gap:16, marginBottom:18 }}>
        <Panel>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div>
              <MonoLabel color={C.green}>Visitors · last 14 days</MonoLabel>
              <SerifH size={19}>The tide of readers</SerifH>
            </div>
            <Tag color={C.green}>⇄ /analytics/visitors</Tag>
          </div>
          <AreaChart data={VISITORS_14D}/>
        </Panel>
        <Panel>
          <MonoLabel color={C.gold}>Where they come from</MonoLabel>
          <SerifH size={19} style={{ marginBottom:20 }}>Traffic sources</SerifH>
          {SOURCES.map(s=><HBar key={s.name} label={s.name} pct={s.pct} color={s.color}/>)}
          <div style={{ marginTop:18, paddingTop:16, borderTop:`1px solid ${C.border}` }}>
            <MonoLabel>Devices</MonoLabel>
            <div style={{ display:"flex", height:10, borderRadius:6, overflow:"hidden", gap:2 }}>
              {DEVICES.map(d=><div key={d.name} title={`${d.name} ${d.pct}%`} style={{ width:`${d.pct}%`, background:d.color }}/>)}
            </div>
            <div style={{ display:"flex", gap:14, marginTop:10, flexWrap:"wrap" }}>
              {DEVICES.map(d=>(
                <span key={d.name} style={{ fontSize:11, color:C.muted, fontFamily:FONT_MONO, display:"inline-flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:8, height:8, borderRadius:2, background:d.color, display:"inline-block" }}/>{d.name} {d.pct}%
                </span>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* pages + activity + today */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
        <Panel>
          <MonoLabel color={C.sky}>Most read</MonoLabel>
          <SerifH size={18} style={{ marginBottom:16 }}>Top pages</SerifH>
          {TOP_PAGES.map((pg,i)=>(
            <div key={pg.path} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom: i<TOP_PAGES.length-1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontFamily:FONT_MONO, fontSize:11, color:C.muted, width:16 }}>{i+1}</span>
              <span style={{ flex:1, fontSize:12.5, fontFamily:FONT_MONO, color:C.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pg.path}</span>
              <span style={{ fontSize:11.5, color:C.muted, fontFamily:FONT_MONO }}>{pg.views.toLocaleString()}</span>
            </div>
          ))}
        </Panel>
        <Panel>
          <MonoLabel color={C.coral}>The pulse</MonoLabel>
          <SerifH size={18} style={{ marginBottom:16 }}>Recent activity</SerifH>
          {ACTIVITY.map((a,i)=>(
            <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom: i<ACTIVITY.length-1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize:14 }}>{a.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12.5, color:C.ink, lineHeight:1.5 }}>{a.text}</div>
                <div style={{ fontSize:10.5, color:C.muted, fontFamily:FONT_MONO, marginTop:2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </Panel>
        <Panel style={{ background:`linear-gradient(180deg,${C.dark},${C.darker})`, border:"none" }}>
          <MonoLabel color="#86B489">Today at a glance</MonoLabel>
          <SerifH size={18} style={{ color:"#F3EEDF", marginBottom:18 }}>The day so far</SerifH>
          {habits.slice(0,4).map(h=>(
            <div key={h.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.75)" }}>{h.icon} {h.label}</span>
              <span style={{ fontFamily:FONT_MONO, fontSize:12, color: h.done>=h.goal ? C.termGreen : "rgba(255,255,255,0.45)" }}>
                {h.done}/{h.goal} {h.unit} {h.done>=h.goal ? "✓" : ""}
              </span>
            </div>
          ))}
          <div style={{ marginTop:16, paddingTop:14, borderTop:"1px solid rgba(255,255,255,0.1)", fontFamily:FONT_MONO, fontSize:11.5, color:"rgba(255,255,255,0.45)", lineHeight:1.9 }}>
            <div><span style={{ color:C.termGreen }}>❯</span> mood: {todayDiary?.mood} · {todayDiary?.weather}</div>
            <div><span style={{ color:C.termGreen }}>❯</span> diary: {todayDiary?.evening ? "complete ✓" : "evening pending…"}</div>
            <div><span style={{ color:C.termPurple }}>❯</span> next milestone: dr. abdullah 🎓</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   REVIEWS · CMS — manage the shelf without touching code
   ⇄ GET/POST /api/v1/reviews · PUT /api/v1/reviews/{slug}
════════════════════════════════════════════════════════════ */
const EMPTY_REVIEW = {
  slug:"", title:"", author:"", rating:4, status:"draft", views:0,
  updated:"today", genre:"", verdict:"",
  cover:{ ...COVER_PRESETS[0], motif:"none" },
};

function ReviewEditor({ open, onClose, initial, onSave }) {
  const [form, setForm] = useState(initial || EMPTY_REVIEW);
  useEffect(()=>{ setForm(initial || EMPTY_REVIEW); }, [initial, open]);
  const set = (k,v)=>setForm(f=>({ ...f, [k]:v }));

  return (
    <Modal open={open} onClose={onClose} title={initial ? `Edit — ${initial.title}` : "New book review"} width={860}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 220px", gap:30 }}>
        {/* form */}
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Field label="Book title"><Input value={form.title} onChange={e=>set("title",e.target.value)} placeholder="The Old Man and the Sea"/></Field>
            <Field label="Author"><Input value={form.author} onChange={e=>set("author",e.target.value)} placeholder="Ernest Hemingway"/></Field>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Field label="Genre"><Input value={form.genre} onChange={e=>set("genre",e.target.value)} placeholder="Classic"/></Field>
            <Field label={`My rating — ${Number(form.rating).toFixed(1)} / 5`}>
              <input type="range" min="0.5" max="5" step="0.5" value={form.rating}
                onChange={e=>set("rating",Number(e.target.value))}
                style={{ width:"100%", accentColor:C.gold, marginTop:10 }}/>
            </Field>
          </div>
          <Field label="One-line verdict">
            <TextArea rows={2} value={form.verdict} onChange={e=>set("verdict",e.target.value)} placeholder="The sentence the whole review stands on…"/>
          </Field>
          <Field label="Review body (markdown — wired to POST /api/v1/reviews)">
            <TextArea rows={5} placeholder={"## How this book found me\\n\\nWrite freely. Headings, pull-quotes and the scorecard render on the public page…"}/>
          </Field>
          <Field label="Cover palette">
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {COVER_PRESETS.map(cp=>(
                <div key={cp.label} onClick={()=>set("cover",{ ...form.cover, bg:cp.bg, ink:cp.ink })} title={cp.label}
                  style={{ width:42, height:42, borderRadius:10, background:cp.bg, cursor:"pointer",
                    border: form.cover.bg===cp.bg ? `2.5px solid ${C.ink}` : `2px solid ${C.border}`,
                    transform: form.cover.bg===cp.bg ? "scale(1.08)" : "none", transition:"all .15s" }}/>
              ))}
            </div>
          </Field>
          <Field label="Cover motif">
            <div style={{ display:"flex", gap:8 }}>
              {["none","moon","whirl","beetle"].map(m=>(
                <button key={m} onClick={()=>set("cover",{ ...form.cover, motif:m })}
                  style={{ padding:"7px 16px", borderRadius:20, fontSize:12, cursor:"pointer", fontFamily:FONT_MONO,
                    background: form.cover.motif===m ? C.ink : "#fff", color: form.cover.motif===m ? "#fff" : C.muted,
                    border:`1.5px solid ${form.cover.motif===m ? C.ink : C.border}` }}>{m}</button>
              ))}
            </div>
          </Field>
        </div>

        {/* live preview */}
        <div>
          <MonoLabel color={C.coral}>Live cover preview</MonoLabel>
          <div style={{ background:C.bg2, borderRadius:14, padding:"26px 0", display:"flex", justifyContent:"center", border:`1px dashed ${C.border}` }}>
            <MiniCover cover={form.cover} title={form.title || "Untitled"} author={form.author || "Author"} w={130}/>
          </div>
          <div style={{ marginTop:16 }}>
            <MonoLabel>Status</MonoLabel>
            <div style={{ display:"flex", gap:8 }}>
              {["draft","published"].map(st=>(
                <button key={st} onClick={()=>set("status",st)}
                  style={{ flex:1, padding:"9px 0", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:FONT_MONO,
                    background: form.status===st ? (st==="published"?C.greenS:C.goldS) : "#fff",
                    color: form.status===st ? (st==="published"?C.green:C.gold) : C.muted,
                    border:`1.5px solid ${form.status===st ? (st==="published"?C.green:C.gold) : C.border}` }}>{st}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop:22, display:"flex", flexDirection:"column", gap:10 }}>
            <Btn onClick={()=>onSave(form)} style={{ justifyContent:"center" }}>✓ Save review</Btn>
            <Btn kind="ghost" onClick={onClose} style={{ justifyContent:"center" }}>Cancel</Btn>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function ReviewsPage({ reviews, setReviews, toast }) {
  const [editor, setEditor] = useState({ open:false, initial:null });
  const published = reviews.filter(r=>r.status==="published").length;

  const save = (form) => {
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "untitled";
    const entry = { ...form, slug, updated:"just now" };
    setReviews(rs => {
      const i = rs.findIndex(r=>r.slug===slug);
      if (i>=0) { const next=[...rs]; next[i]=entry; return next; }
      return [entry, ...rs];
    });
    setEditor({ open:false, initial:null });
    toast(form.status==="published" ? "review published ✓ (mock — will PUT /api/v1/reviews)" : "draft saved ✓");
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
        <div>
          <SerifH size={26}>The shelf, <span style={{ fontStyle:"italic", color:C.coral }}>managed</span></SerifH>
          <p style={{ color:C.muted, fontSize:13.5, margin:"6px 0 0" }}>{published} published · {reviews.length - published} draft · changes here will flow to the public site through the API</p>
        </div>
        <Btn onClick={()=>setEditor({ open:true, initial:null })}>+ New review</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:16 }}>
        {reviews.map(r=>(
          <Panel key={r.slug} pad={20} style={{ display:"flex", gap:18 }}>
            <MiniCover cover={r.cover} title={r.title} author={r.author} w={86}/>
            <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                <div>
                  <div style={{ fontFamily:FONT_SERIF, fontWeight:700, fontSize:16.5, color:C.ink }}>{r.title}</div>
                  <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>{r.author} · {r.genre}</div>
                </div>
                <Tag color={r.status==="published" ? C.green : C.gold}>{r.status}</Tag>
              </div>
              <p style={{ fontSize:12.5, color:C.muted, lineHeight:1.65, margin:"10px 0", flex:1, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{r.verdict}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:FONT_MONO, fontSize:11, color:C.muted }}>★ {Number(r.rating).toFixed(1)} · {r.views} reads · {r.updated}</span>
                <div style={{ display:"flex", gap:8 }}>
                  <Btn small kind="ghost" onClick={()=>setEditor({ open:true, initial:r })}>✎ Edit</Btn>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <ReviewEditor open={editor.open} initial={editor.initial} onClose={()=>setEditor({ open:false, initial:null })} onSave={save}/>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SITE COPY — edit the public words without opening the code
   ⇄ PUT /api/v1/site/copy
════════════════════════════════════════════════════════════ */
function SiteCopyPage({ copy, setCopy, toast }) {
  const set = (k,v)=>setCopy(c=>({ ...c, [k]:v }));
  return (
    <div style={{ maxWidth:760 }}>
      <SerifH size={26}>The public words</SerifH>
      <p style={{ color:C.muted, fontSize:13.5, margin:"6px 0 26px" }}>Everything a visitor reads on unsaidscript.dev, editable here. Saved through <span style={{ fontFamily:FONT_MONO }}>PUT /api/v1/site/copy</span>.</p>

      <Panel pad={28} style={{ marginBottom:16 }}>
        <MonoLabel color={C.coral}>Hero</MonoLabel>
        <Field label='Rotating words — "I read, therefore I ___"'>
          <Input value={copy.rotatingWords} onChange={e=>set("rotatingWords",e.target.value)}/>
          <div style={{ fontSize:11.5, color:C.muted, marginTop:8, fontFamily:FONT_MONO }}>comma-separated · cycles every 2.6s</div>
        </Field>
        <Field label="Hero lede">
          <TextArea rows={3} value={copy.heroLede} onChange={e=>set("heroLede",e.target.value)}/>
        </Field>
        <Field label="Status line — currently reading">
          <Input value={copy.statusReading} onChange={e=>set("statusReading",e.target.value)}/>
        </Field>
      </Panel>

      <Panel pad={28} style={{ marginBottom:16 }}>
        <MonoLabel color={C.green}>Availability & contact</MonoLabel>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:C.ink }}>Available for work</div>
            <div style={{ fontSize:12, color:C.muted }}>controls the green dot in the navbar</div>
          </div>
          <Toggle on={copy.available} onChange={v=>set("available",v)}/>
        </div>
        <Field label="Contact email"><Input value={copy.contactEmail} onChange={e=>set("contactEmail",e.target.value)}/></Field>
        <Field label="Footer line"><Input value={copy.footerLine} onChange={e=>set("footerLine",e.target.value)}/></Field>
      </Panel>

      <div style={{ display:"flex", gap:12 }}>
        <Btn onClick={()=>toast("site copy saved ✓ (mock)")}>✓ Save changes</Btn>
        <Btn kind="ghost" onClick={()=>toast("preview will open unsaidscript.dev?draft=1")}>👁 Preview site</Btn>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HABITS — the gardener's log
   ⇄ GET /api/v1/habits/today · PUT /api/v1/habits/{id}/log
════════════════════════════════════════════════════════════ */
function HabitsPage({ habits, setHabits, toast }) {
  const bump = (id, delta) => {
    setHabits(hs => hs.map(h => h.id===id ? { ...h, done: Math.max(0, Math.round((h.done + delta*(h.unit==="hrs"?0.5:h.unit==="words"?50:1))*10)/10) } : h));
  };
  const doneCount = habits.filter(h=>h.done>=h.goal).length;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
        <div>
          <SerifH size={26}>Tend the garden <span style={{ fontStyle:"italic", color:C.green }}>🌱</span></SerifH>
          <p style={{ color:C.muted, fontSize:13.5, margin:"6px 0 0" }}>{doneCount} of {habits.length} complete today — small things, watered daily</p>
        </div>
        <Btn kind="ghost" onClick={()=>toast("custom habits arrive with POST /api/v1/habits")}>+ Add habit</Btn>
      </div>

      {/* rings */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginBottom:18 }}>
        {habits.map(h=>{
          const pct = Math.min(h.done/h.goal, 1);
          return (
            <Panel key={h.id} pad={20} style={{ display:"flex", gap:18, alignItems:"center" }}>
              <Ring pct={pct} color={h.color}>
                <span style={{ fontSize:20 }}>{h.icon}</span>
              </Ring>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:700, fontSize:14.5, color:C.ink }}>{h.label}</span>
                  {h.done>=h.goal && <Tag color={C.green}>done ✓</Tag>}
                </div>
                <div style={{ fontFamily:FONT_MONO, fontSize:12.5, color:C.muted, margin:"5px 0 10px" }}>
                  <span style={{ color:h.color, fontWeight:700 }}>{h.done}</span> / {h.goal} {h.unit} · 🔥 {h.streak}d streak
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>bump(h.id,-1)} style={{ width:30, height:30, borderRadius:8, border:`1.5px solid ${C.border}`, background:"#fff", cursor:"pointer", color:C.muted, fontWeight:700 }}>−</button>
                  <button onClick={()=>bump(h.id,1)} style={{ width:30, height:30, borderRadius:8, border:"none", background:h.color, cursor:"pointer", color:"#fff", fontWeight:700 }}>+</button>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      {/* reading depth */}
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:16 }}>
        <Panel>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div>
              <MonoLabel color={C.green}>Reading · last 16 weeks</MonoLabel>
              <SerifH size={18}>The long garden</SerifH>
            </div>
            <Tag color={C.green}>112 days watered</Tag>
          </div>
          <Heatmap data={READ_HEAT}/>
        </Panel>
        <Panel>
          <MonoLabel color={C.coral}>This week</MonoLabel>
          <SerifH size={18} style={{ marginBottom:18 }}>Minutes with books</SerifH>
          <VBars data={WEEK_READING}/>
          <div style={{ marginTop:14, fontFamily:FONT_MONO, fontSize:11.5, color:C.muted, textAlign:"center" }}>
            330 min total · best: Wednesday
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DIARY — সকাল থেকে সন্ধ্যা
   ⇄ GET /api/v1/diary · POST /api/v1/diary
════════════════════════════════════════════════════════════ */
const MOODS = ["🔥","🙂","😌","😔","🌧"];
function DiaryPage({ diary, setDiary, toast }) {
  const [sel, setSel] = useState(diary[0]?.id);
  const entry = diary.find(d=>d.id===sel) || diary[0];
  const upd = (k,v)=>setDiary(ds=>ds.map(d=>d.id===entry.id ? { ...d, [k]:v } : d));
  const words = ["morning","afternoon","evening","gratitude"].map(k=>String(entry[k]||"").trim().split(/\s+/).filter(Boolean).length).reduce((a,b)=>a+b,0);

  return (
    <div style={{ display:"grid", gridTemplateColumns:"250px 1fr", gap:20 }}>
      {/* entry list */}
      <div>
        <Btn style={{ width:"100%", justifyContent:"center", marginBottom:14 }} onClick={()=>toast("new entry — POST /api/v1/diary")}>+ Today's page</Btn>
        {diary.map(d=>(
          <div key={d.id} onClick={()=>setSel(d.id)}
            style={{ padding:"13px 15px", borderRadius:12, cursor:"pointer", marginBottom:8,
              background: sel===d.id ? "#fff" : "transparent",
              border:`1.5px solid ${sel===d.id ? C.coral+"55" : C.border}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:12.5, fontWeight:700, color:C.ink }}>{d.date.split(" · ")[0]}</span>
              <span style={{ fontSize:15 }}>{d.mood}</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, marginTop:3, fontFamily:FONT_MONO }}>{d.date.split(" · ")[1]} · {d.words} words</div>
          </div>
        ))}
      </div>

      {/* the page */}
      <Panel pad={32} style={{ position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-26, right:6, fontFamily:FONT_SERIF, fontStyle:"italic", fontSize:130, color:C.coral, opacity:0.05, userSelect:"none" }}>"</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
          <SerifH size={22} style={{ fontStyle:"italic" }}>{entry.date}</SerifH>
          <span style={{ fontFamily:FONT_MONO, fontSize:11.5, color:C.muted }}>{entry.weather} · {words} words</span>
        </div>

        <div style={{ display:"flex", gap:8, margin:"14px 0 24px", alignItems:"center" }}>
          <MonoLabel>Mood</MonoLabel>
          <div style={{ display:"flex", gap:6, marginBottom:8 }}>
            {MOODS.map(m=>(
              <button key={m} onClick={()=>upd("mood",m)}
                style={{ fontSize:18, padding:"5px 9px", borderRadius:10, cursor:"pointer",
                  background: entry.mood===m ? C.coralS : "transparent",
                  border:`1.5px solid ${entry.mood===m ? C.coral+"66" : "transparent"}`, transition:"all .15s" }}>{m}</button>
            ))}
          </div>
        </div>

        <Field label="🌤 আজ যার জন্য কৃতজ্ঞ — gratitude">
          <TextArea rows={2} value={entry.gratitude} onChange={e=>upd("gratitude",e.target.value)} style={{ fontFamily:FONT_SERIF, fontStyle:"italic", fontSize:15 }}/>
        </Field>
        <Field label="🌅 সকাল — morning">
          <TextArea rows={3} value={entry.morning} onChange={e=>upd("morning",e.target.value)}/>
        </Field>
        <Field label="☀️ দুপুর — afternoon">
          <TextArea rows={3} value={entry.afternoon} onChange={e=>upd("afternoon",e.target.value)}/>
        </Field>
        <Field label="🌙 সন্ধ্যা — evening">
          <TextArea rows={3} value={entry.evening} onChange={e=>upd("evening",e.target.value)} placeholder="The day isn't over yet…"/>
        </Field>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
          <span style={{ fontSize:12, color:C.muted, fontStyle:"italic", fontFamily:FONT_SERIF }}>"যা অব্যক্ত থেকে যায়, ডায়েরি তা ধরে রাখে।"</span>
          <Btn onClick={()=>toast("entry saved ✓ (mock — POST /api/v1/diary)")}>✓ Save page</Btn>
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NOTES — the Notion-ish drawer
   ⇄ GET /api/v1/notes · CRUD /api/v1/notes/{id}/blocks
════════════════════════════════════════════════════════════ */
function NotesPage({ notes, setNotes, toast }) {
  const [sel, setSel] = useState(notes[0]?.id);
  const page = notes.find(n=>n.id===sel) || notes[0];
  const toggleTodo = (bi) => {
    setNotes(ns => ns.map(n => n.id!==page.id ? n : { ...n, blocks: n.blocks.map((b,i)=> i===bi ? { ...b, done:!b.done } : b) }));
  };
  const doneTodos = page.blocks.filter(b=>b.t==="todo"&&b.done).length;
  const totalTodos = page.blocks.filter(b=>b.t==="todo").length;

  return (
    <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:20 }}>
      {/* page tree */}
      <div>
        <Btn style={{ width:"100%", justifyContent:"center", marginBottom:14 }} onClick={()=>toast("new page — POST /api/v1/notes")}>+ New page</Btn>
        <MonoLabel>Workspace</MonoLabel>
        {notes.map(n=>(
          <div key={n.id} onClick={()=>setSel(n.id)}
            style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 13px", borderRadius:10, cursor:"pointer", marginBottom:4,
              background: sel===n.id ? "#fff" : "transparent",
              border:`1.5px solid ${sel===n.id ? C.sky+"66" : "transparent"}` }}>
            <span style={{ fontSize:15 }}>{n.icon}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight: sel===n.id?700:500, color:C.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{n.title}</div>
              <div style={{ fontSize:10.5, color:C.muted, fontFamily:FONT_MONO }}>{n.updated}</div>
            </div>
          </div>
        ))}
      </div>

      {/* page body */}
      <Panel pad={34}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
          <SerifH size={26}><span style={{ marginRight:12 }}>{page.icon}</span>{page.title}</SerifH>
          {totalTodos>0 && <Tag color={doneTodos===totalTodos?C.green:C.sky}>{doneTodos}/{totalTodos} done</Tag>}
        </div>
        <div style={{ fontSize:11.5, color:C.muted, fontFamily:FONT_MONO, marginBottom:24 }}>updated {page.updated} · type <span style={{ background:C.bg2, padding:"1px 6px", borderRadius:4 }}>/</span> for blocks (soon)</div>

        {page.blocks.map((b,i)=>{
          if (b.t==="h") return <h3 key={i} style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:19, color:C.ink, margin:"22px 0 10px" }}>{b.text}</h3>;
          if (b.t==="p") return <p key={i} style={{ fontSize:14.5, lineHeight:1.85, color:"#4A4839", margin:"0 0 12px" }}>{b.text}</p>;
          if (b.t==="q") return (
            <blockquote key={i} style={{ margin:"16px 0", padding:"4px 0 4px 18px", borderLeft:`3px solid ${C.gold}`, fontFamily:FONT_SERIF, fontStyle:"italic", fontSize:15.5, color:C.ink }}>{b.text}</blockquote>
          );
          if (b.t==="code") return (
            <pre key={i} style={{ background:C.termBg, color:C.termGreen, fontFamily:FONT_MONO, fontSize:12.5, padding:"13px 17px", borderRadius:10, margin:"12px 0", overflowX:"auto" }}>{b.text}</pre>
          );
          if (b.t==="todo") return (
            <div key={i} onClick={()=>toggleTodo(i)} style={{ display:"flex", alignItems:"flex-start", gap:11, padding:"7px 0", cursor:"pointer" }}>
              <div style={{ width:18, height:18, borderRadius:5, flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center",
                background: b.done ? C.green : "#fff", border:`1.8px solid ${b.done ? C.green : C.border}`, transition:"all .15s" }}>
                {b.done && <span style={{ color:"#fff", fontSize:11, fontWeight:800 }}>✓</span>}
              </div>
              <span style={{ fontSize:14.5, color: b.done ? C.muted : C.ink, textDecoration: b.done ? "line-through" : "none", lineHeight:1.6 }}>{b.text}</span>
            </div>
          );
          return null;
        })}
      </Panel>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SETTINGS — profile + the API contract (for future Spring Boot)
════════════════════════════════════════════════════════════ */
function SettingsPage({ toast }) {
  return (
    <div style={{ maxWidth:860 }}>
      <SerifH size={26}>Settings & the contract</SerifH>
      <p style={{ color:C.muted, fontSize:13.5, margin:"6px 0 26px" }}>Profile, preferences — and the exact API surface this UI expects from the Spring Boot service.</p>

      <Panel pad={28} style={{ marginBottom:16 }}>
        <MonoLabel color={C.green}>Profile</MonoLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <Field label="Display name"><Input defaultValue={MOCK_PROFILE.name}/></Field>
          <Field label="Email"><Input defaultValue={MOCK_PROFILE.email}/></Field>
        </div>
        <Btn small onClick={()=>toast("profile saved ✓ (mock)")}>✓ Save profile</Btn>
      </Panel>

      <Panel pad={0} style={{ overflow:"hidden" }}>
        <div style={{ padding:"22px 28px 16px" }}>
          <MonoLabel color={C.coral}>API contract — hand this to the Spring Boot service</MonoLabel>
          <SerifH size={18}>What this UI is waiting for</SerifH>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}` }}>
          {API_CONTRACT.map(([m, path, used, st],i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"70px 1.6fr 1fr auto", gap:14, alignItems:"center", padding:"11px 28px", borderBottom: i<API_CONTRACT.length-1?`1px solid ${C.border}`:"none", background: i%2 ? C.bg : "#fff" }}>
              <span style={{ fontFamily:FONT_MONO, fontSize:11, fontWeight:700, color: m==="GET"?C.sky:m==="POST"?C.green:C.gold }}>{m}</span>
              <span style={{ fontFamily:FONT_MONO, fontSize:12, color:C.ink }}>{path}</span>
              <span style={{ fontSize:12, color:C.muted }}>{used}</span>
              <span style={{ fontSize:11, fontFamily:FONT_MONO, color:C.muted }}>{st}</span>
            </div>
          ))}
        </div>
        <div style={{ padding:"14px 28px", fontFamily:FONT_MONO, fontSize:11.5, color:C.muted, background:C.bg }}>
          <span style={{ color:C.termGreen }}>❯</span> base URL configurable · JWT in Authorization header · all responses {"{ data, error }"}
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   COMMAND PALETTE — ⌘K inside the OS
════════════════════════════════════════════════════════════ */
function OsPalette({ open, onClose, setSection, toast }) {
  const [q,setQ]=useState(""); const [sel,setSel]=useState(0);
  const inputRef = useRef(null);
  const ITEMS = [
    ...NAV_ITEMS.map(n=>({ icon:n.icon, label:`Go to ${n.label}`, run:()=>{ setSection(n.id); onClose(); } })),
    { icon:"📕", label:"New book review", run:()=>{ setSection("reviews"); onClose(); toast("opening the editor — click + New review"); } },
    { icon:"📓", label:"Write today's diary", run:()=>{ setSection("diary"); onClose(); } },
    { icon:"🌐", label:"Open public site ↗", run:()=>{ window.open("https://unsaidscript.dev","_blank"); onClose(); } },
  ];
  const shown = ITEMS.filter(i=>i.label.toLowerCase().includes(q.toLowerCase()));
  useEffect(()=>{ if(open){ setQ(""); setSel(0); setTimeout(()=>inputRef.current?.focus(),30); } },[open]);
  useEffect(()=>{ setSel(0); },[q]);
  useEffect(()=>{
    if(!open) return;
    const onKey=(e)=>{
      if(e.key==="Escape") onClose();
      if(e.key==="ArrowDown"){ e.preventDefault(); setSel(i=>Math.min(i+1,shown.length-1)); }
      if(e.key==="ArrowUp"){ e.preventDefault(); setSel(i=>Math.max(i-1,0)); }
      if(e.key==="Enter"&&shown[sel]) shown[sel].run();
    };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[open,shown,sel,onClose]);
  if(!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:5000, background:"rgba(35,32,24,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"15vh" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:"min(540px,92vw)", background:C.termBg, borderRadius:16, border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 30px 90px rgba(0,0,0,0.5)", overflow:"hidden", animation:"osPop .18s ease-out" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ color:C.termGreen, fontFamily:FONT_MONO, fontSize:15 }}>❯</span>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="jump anywhere…"
            style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#e5e7eb", fontSize:14, fontFamily:FONT_MONO }}/>
          <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.3)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:5, padding:"2px 7px", fontFamily:FONT_MONO }}>esc</span>
        </div>
        <div style={{ maxHeight:300, overflowY:"auto", padding:"8px 0" }}>
          {shown.map((it,i)=>(
            <div key={it.label} onClick={it.run} onMouseEnter={()=>setSel(i)}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 18px", cursor:"pointer",
                background: sel===i ? "rgba(94,140,97,0.20)" : "transparent",
                borderLeft: sel===i ? `2px solid ${C.termGreen}` : "2px solid transparent" }}>
              <span style={{ fontSize:15 }}>{it.icon}</span>
              <span style={{ color: sel===i?"#fff":"rgba(255,255,255,0.7)", fontSize:13, fontFamily:FONT_MONO }}>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   APP — unsaid.os
════════════════════════════════════════════════════════════ */
export default function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState("dashboard");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  /* state that will move server-side, one slice at a time */
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const [siteCopy, setSiteCopy] = useState(INIT_SITE_COPY);
  const [habits, setHabits] = useState(INIT_HABITS);
  const [diary, setDiary] = useState(INIT_DIARY);
  const [notes, setNotes] = useState(INIT_NOTES);

  const toast = (m) => { setToastMsg(m); setTimeout(()=>setToastMsg(""), 2400); };

  /* studio fonts */
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Karla:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  /* ⌘K */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen(o=>!o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!authed) return (
    <>
      <LoginScreen onLogin={()=>setAuthed(true)}/>
      <style>{OS_CSS}</style>
    </>
  );

  const PAGES = {
    dashboard: <DashboardPage habits={habits} diary={diary}/>,
    reviews:   <ReviewsPage reviews={reviews} setReviews={setReviews} toast={toast}/>,
    sitecopy:  <SiteCopyPage copy={siteCopy} setCopy={setSiteCopy} toast={toast}/>,
    habits:    <HabitsPage habits={habits} setHabits={setHabits} toast={toast}/>,
    diary:     <DiaryPage diary={diary} setDiary={setDiary} toast={toast}/>,
    notes:     <NotesPage notes={notes} setNotes={setNotes} toast={toast}/>,
    settings:  <SettingsPage toast={toast}/>,
  };

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:FONT_BODY, color:C.ink }}>
      <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize:"26px 26px", opacity:0.3, pointerEvents:"none", zIndex:0 }}/>
      <Sidebar section={section} setSection={setSection} onLogout={()=>setAuthed(false)} onPalette={()=>setPaletteOpen(true)}/>
      <div style={{ marginLeft:236, position:"relative", zIndex:1 }}>
        <Topbar section={section}/>
        <main key={section} style={{ padding:"30px 32px 60px", animation:"osFade .3s ease" }}>
          {PAGES[section]}
        </main>
      </div>

      <OsPalette open={paletteOpen} onClose={()=>setPaletteOpen(false)} setSection={setSection} toast={toast}/>
      {toastMsg && (
        <div style={{ position:"fixed", bottom:28, left:"calc(50% + 118px)", transform:"translateX(-50%)", zIndex:6000, background:C.termBg, color:C.termGreen, fontFamily:FONT_MONO, fontSize:12.5, padding:"10px 22px", borderRadius:30, border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 10px 30px rgba(0,0,0,0.3)", animation:"osPop .2s ease-out" }}>
          {toastMsg}
        </div>
      )}
      <style>{OS_CSS}</style>
    </div>
  );
}

const OS_CSS = `
  @keyframes osPulse{0%,100%{opacity:1}50%{opacity:0.3}}
  @keyframes osBlink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes osPop{from{opacity:0;transform:scale(0.97) translateY(-6px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes osFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  *{box-sizing:border-box;-webkit-font-smoothing:antialiased}
  ::-webkit-scrollbar{width:6px;height:6px;background:transparent}
  ::-webkit-scrollbar-thumb{background:#D6CBAF;border-radius:3px}
  input[type=range]{height:4px}
  button:hover{filter:brightness(1.03)}
`;
