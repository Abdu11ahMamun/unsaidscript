// All mock data — replace each with a fetch() when Spring Boot is ready.
// Every constant is annotated with its future API endpoint.

// ⇄ POST /api/v1/auth/login
export const MOCK_PROFILE = { name:"Abdullah Al Mamun", role:"owner", handle:"@unsaidscript", email:"cs.abdullah.mamun@gmail.com" };

// ⇄ GET /api/v1/analytics/visitors?days=14
export const VISITORS_14D = [
  { d:"30 May",v:148 },{ d:"31 May",v:131 },{ d:"01 Jun",v:202 },{ d:"02 Jun",v:236 },
  { d:"03 Jun",v:219 },{ d:"04 Jun",v:251 },{ d:"05 Jun",v:187 },{ d:"06 Jun",v:164 },
  { d:"07 Jun",v:289 },{ d:"08 Jun",v:331 },{ d:"09 Jun",v:302 },{ d:"10 Jun",v:356 },
  { d:"11 Jun",v:312 },{ d:"12 Jun",v:247 },
];

// ⇄ GET /api/v1/analytics/summary
export const SUMMARY = { today:247, yesterday:312, totalMonth:5840, avgRead:"4m 32s", bounce:"38%", subscribers:184, newSubsWeek:11 };

// ⇄ GET /api/v1/analytics/sources
export const SOURCES = [
  { name:"Google", pct:42, color:"#5E8C61" },{ name:"Direct", pct:24, color:"#D9A441" },
  { name:"LinkedIn", pct:15, color:"#6FA8BC" },{ name:"GitHub", pct:11, color:"#D96C4F" },
  { name:"X / Twitter", pct:8, color:"#9B8AC4" },
];

// ⇄ GET /api/v1/analytics/pages/top
export const TOP_PAGES = [
  { path:"/", views:2140, avg:"3m 10s" },{ path:"/writing", views:1422, avg:"5m 44s" },
  { path:"/review/kafka-on-the-shore", views:986, avg:"8m 02s" },
  { path:"/review/forty-rules-of-love", views:741, avg:"7m 18s" },
  { path:"/#projects", views:633, avg:"2m 51s" },
];

// ⇄ GET /api/v1/analytics/devices
export const DEVICES = [
  { name:"Mobile", pct:58, color:"#5E8C61" },{ name:"Desktop", pct:36, color:"#D9A441" },{ name:"Tablet", pct:6, color:"#6FA8BC" },
];

// ⇄ GET /api/v1/activity/feed?limit=8
export const ACTIVITY = [
  { icon:"📈", text:"Traffic spike from LinkedIn — your IDE projects post", time:"2h ago" },
  { icon:"✉️", text:"3 new newsletter subscribers", time:"5h ago" },
  { icon:"⭐", text:"Kafka on the Shore crossed 950 reads", time:"yesterday" },
  { icon:"🌱", text:"Reading streak reached 21 days", time:"3d ago" },
];

// ⇄ GET /api/v1/reviews
export const INIT_REVIEWS = [
  { slug:"kafka-on-the-shore", title:"Kafka on the Shore", author:"Haruki Murakami", rating:4.5, status:"published", views:986, updated:"08 Jun 2026", genre:"Magical Realism", verdict:"The most honest portrait of loneliness I've ever read.", cover:{ bg:"linear-gradient(160deg,#1F3A53 0%,#2E6E8E 70%,#3F8CA8 100%)", ink:"#F3EEDF", motif:"moon" } },
  { slug:"forty-rules-of-love", title:"The Forty Rules of Love", author:"Elif Shafak", rating:5, status:"published", views:741, updated:"02 Jun 2026", genre:"Sufi Fiction", verdict:"Not my favorite book — my hinge.", cover:{ bg:"linear-gradient(160deg,#7E3340 0%,#B5503F 55%,#D96C4F 100%)", ink:"#FBF0DC", motif:"whirl" } },
  { slug:"the-metamorphosis", title:"The Metamorphosis", author:"Franz Kafka", rating:4.5, status:"published", views:512, updated:"28 May 2026", genre:"Absurdist Classic", verdict:"What am I worth when I can no longer provide?", cover:{ bg:"linear-gradient(160deg,#2E2C24 0%,#4A4434 60%,#6B5B43 100%)", ink:"#E9E2CE", motif:"beetle" } },
  { slug:"old-man-and-the-sea", title:"The Old Man and the Sea", author:"Ernest Hemingway", rating:4, status:"draft", views:0, updated:"10 Jun 2026", genre:"Classic", verdict:"Draft in progress.", cover:{ bg:"linear-gradient(160deg,#1E4A56 0%,#3A7D8C 100%)", ink:"#F3EEDF", motif:"none" } },
];

export const COVER_PRESETS = [
  { label:"Dusk Sea",   bg:"linear-gradient(160deg,#1F3A53 0%,#2E6E8E 70%,#3F8CA8 100%)", ink:"#F3EEDF" },
  { label:"Persimmon",  bg:"linear-gradient(160deg,#7E3340 0%,#B5503F 55%,#D96C4F 100%)", ink:"#FBF0DC" },
  { label:"Old Paper",  bg:"linear-gradient(160deg,#2E2C24 0%,#4A4434 60%,#6B5B43 100%)", ink:"#E9E2CE" },
  { label:"Meadow",     bg:"linear-gradient(160deg,#2F4A33 0%,#5E8C61 100%)",             ink:"#F3EEDF" },
  { label:"Lantern",    bg:"linear-gradient(160deg,#8A6A2F 0%,#D9A441 100%)",             ink:"#FBF3DF" },
  { label:"Ink Night",  bg:"linear-gradient(160deg,#191D24 0%,#3A4254 100%)",             ink:"#E8EAF0" },
];

// ⇄ GET /api/v1/site/copy
export const INIT_SITE_COPY = {
  rotatingWords:"build, write, dream, wonder",
  heroLede:"A fintech engineer who grew up inside books. By day I build banking systems and AI tools; by night I chase pages.",
  available:true, statusReading:"kafka on the shore",
  contactEmail:"cs.abdullah.mamun@gmail.com", footerLine:"written, not just built",
};

// ⇄ GET /api/v1/habits/today
export const INIT_HABITS = [
  { id:"reading",  label:"Reading",   icon:"📖", unit:"min",   done:45,  goal:60,  color:"#D96C4F", streak:21 },
  { id:"salah",    label:"Salah",     icon:"🕌", unit:"waqt",  done:4,   goal:5,   color:"#5E8C61", streak:97 },
  { id:"exercise", label:"Exercise",  icon:"🏃", unit:"min",   done:20,  goal:30,  color:"#6FA8BC", streak:6 },
  { id:"coding",   label:"Deep code", icon:"⌨️", unit:"hrs",   done:5.5, goal:6,   color:"#D9A441", streak:14 },
  { id:"writing",  label:"Writing",   icon:"✍️", unit:"words", done:320, goal:500, color:"#9B8AC4", streak:4 },
  { id:"water",    label:"Water",     icon:"💧", unit:"glass", done:6,   goal:8,   color:"#5BA8C9", streak:11 },
];

export const READ_HEAT = Array.from({ length:16*7 }, (_,i) => {
  const wave = Math.sin(i/5)*0.5+0.5;
  const r = (i*2654435761 % 97)/97;
  return Math.round(Math.max(0, (wave*0.6 + r*0.6 - 0.18)) * 75);
});

export const WEEK_READING = [
  { d:"Sat",v:40 },{ d:"Sun",v:65 },{ d:"Mon",v:30 },{ d:"Tue",v:55 },
  { d:"Wed",v:75 },{ d:"Thu",v:20 },{ d:"Fri",v:45 },
];

// ⇄ GET /api/v1/diary
export const INIT_DIARY = [
  { id:3, date:"12 Jun 2026 · Friday", mood:"🙂", weather:"☁️ 31°C",
    gratitude:"Jumu'ah, ammu's call, and the rain that came at exactly the right time.",
    morning:"Fajr on time, আলহামদুলিল্লাহ। 30 pages of Kafka with cha before standup.",
    afternoon:"Koalafi sprint work — payment retry flow finally green.", evening:"", words:74 },
  { id:2, date:"11 Jun 2026 · Thursday", mood:"😌", weather:"🌧 29°C",
    gratitude:"A quiet desk and no meetings after 4.",
    morning:"Slow start. Skipped exercise — being honest with this diary.",
    afternoon:"Wrote 400 words of the Hemingway review draft.",
    evening:"Wife and I walked after ishaa, bought jhalmuri, talked about the PhD timeline.", words:188 },
  { id:1, date:"10 Jun 2026 · Wednesday", mood:"🔥", weather:"☀️ 33°C",
    gratitude:"Shipping things. Energy. Cold lemon sharbat.",
    morning:"Deployed the new unsaidscript hero.",
    afternoon:"Traffic spiked from LinkedIn — 356 visitors, best day this month.",
    evening:"Read Misir Ali before sleep, like meeting an old teacher.", words:142 },
];

// ⇄ GET /api/v1/notes
export const INIT_NOTES = [
  { id:"n1", icon:"🏗", title:"TSE-ERP — Phase 3 ideas", updated:"today",
    blocks:[
      { t:"h", text:"Phase 3 — Sales & Inventory" },
      { t:"p", text:"Backend contracts are the source of truth. Frontend follows exactly." },
      { t:"todo", text:"Invoice line items — purpose-built table component", done:true },
      { t:"todo", text:"Stock ledger view with running balance", done:false },
      { t:"code", text:"GET /api/v1/inventory/items?companyId={id}&page={n}" },
      { t:"q", text:"Build it boring. Boring scales." },
    ]},
  { id:"n2", icon:"📕", title:"A book of my own — outline", updated:"2d ago",
    blocks:[
      { t:"h", text:"Working title: অব্যক্ত" },
      { t:"p", text:"Essays on growing up between two languages — Bangla at heart, Java at work." },
      { t:"todo", text:"Ch 1: The boy who read at the dinner table", done:true },
      { t:"todo", text:"Ch 2: Himu's yellow, my grey office", done:false },
      { t:"q", text:"Write the book you needed at nineteen." },
    ]},
  { id:"n3", icon:"🎓", title:"PhD — LLM × fintech plan", updated:"5d ago",
    blocks:[
      { t:"h", text:"Target: Fall 2027 intake" },
      { t:"todo", text:"Shortlist 8 supervisors", done:true },
      { t:"todo", text:"Get suicidal-ideation paper through review", done:false },
      { t:"todo", text:"IELTS slot — book before August", done:false },
    ]},
  { id:"n4", icon:"🧴", title:"ÉLIXIR — remaining fixes", updated:"1w ago",
    blocks:[
      { t:"todo", text:"'For Him' collection card rendering bug", done:false },
      { t:"todo", text:"Nav links white-on-white after hero scroll", done:false },
    ]},
];
