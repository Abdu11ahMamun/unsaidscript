import { useState, useEffect, useRef } from "react";

// Suppress TypeScript errors for this component
/** @type {any} */
const THREE = typeof window !== 'undefined' ? window.THREE : null;

/* ══════════════════════════════════════════
   TOKENS — warm cream light + red accent
══════════════════════════════════════════ */
const C = {
  bg:     "#FAFAF7",
  bg2:    "#F4F0E8",
  card:   "#FFFFFF",
  ink:    "#111111",
  muted:  "#666666",
  border: "#E5E4DF",
  red:    "#C8102E",
  redS:   "#FFF0F2",
  tag:    "#F2F1ED",
  dark:   "#111111",
  // terminal palette
  termBg: "#0d1117",
  termGreen: "#4ade80",
  termBlue:  "#79c0ff",
  termPurple:"#a78bfa",
  termOrange:"#f97316",
  termYellow:"#fbbf24",
};

const SKILL_GROUPS = [
  { label:"Languages",  color:"#f97316", items:["Java","Python","C","C++","PHP"] },
  { label:"Backend",    color:"#22c55e", items:["Spring Boot","Spring","Hibernate","JPA","REST APIs","Microservices","JWT","OAuth2"] },
  { label:"Frontend",   color:"#61dafb", items:["React","Angular","HTML","CSS","JavaScript"] },
  { label:"Databases",  color:"#a78bfa", items:["Oracle","MySQL","MongoDB","Redis"] },
  { label:"DevOps",     color:"#fbbf24", items:["Docker","Git","GitLab CI/CD","Kubernetes"] },
  { label:"Testing",    color:"#34d399", items:["JMeter","Postman","Selenium","Swagger/OpenAPI"] },
  { label:"ML / AI",    color:"#f472b6", items:["TensorFlow","PyTorch","Scikit-learn","NLP","OpenCV","Pandas","NumPy"] },
  { label:"Mgmt",       color:"#818cf8", items:["JIRA","Trello","Mantis","Agile","SDLC"] },
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

const PROJECTS = [
  { emoji:"🌐", label:"LIVE", title:"AAIINS Lab", sub:"Research & Innovation Lab", desc:"Full website for AAIINS Lab — a cutting-edge research and AI innovation hub.", tags:["React","Tailwind","Web"], accent:"#C8102E", link:"https://aaiins-lab.com/" },
  { emoji:"🤖", label:"LIVE", title:"Codex AI BD", sub:"AI Solutions Platform", desc:"Platform for Codex AI BD — bringing enterprise AI solutions to Bangladesh.", tags:["React","Node.js","AI"], accent:"#1D4ED8", link:"http://codexaitbd.com/" },
  { emoji:"⚡", label:"PROJECT", title:"SPARK", sub:"Agile Management Tool", desc:"Spring Boot microservices + React. Full agile project management with sprints, boards, and team collaboration.", tags:["Spring Boot","Microservices","React"], accent:"#059669", link:null },
  { emoji:"🧠", label:"AI", title:"Shariah Auditor", sub:"LLM Compliance Tool", desc:"LLM-powered automated Shariah compliance auditing system for Islamic finance.", tags:["Python","LLMs","NLP"], accent:"#7C3AED", link:null },
  { emoji:"🍜", label:"MOBILE", title:"Khabo", sub:"Food Ordering App", desc:"Android food-ordering app with secure login, real-time DB, and push notifications.", tags:["Android","Java","Firebase"], accent:"#ea580c", link:null },
];

const PUBLICATIONS = [
  { year:"2024", venue:"Elsevier · Decision Analytics Journal", title:"A systematic review of hyperparameter optimisation in CNNs", tag:"Journal" },
  { year:"2023", venue:"Int. Conf. on Sustainable Development", title:"E-Waste Separation Using YOLOv5 and IoT", tag:"Conference" },
  { year:"2023", venue:"ICCECE 2023", title:"Envy Prediction from Users' Photos using CNNs", tag:"Conference" },
  { year:"2023", venue:"ICCECE 2023", title:"Predicting Gender from Social Media Photos using Transfer Learning", tag:"Conference" },
  { year:"Under Review", venue:"Elsevier", title:"Automated Suicidal Ideation Prediction via Deep Learning", tag:"Journal" },
];

const ARTICLES = [
  { emoji:"📝", title:"How I Built a Shariah-Compliant AI Auditing System with LLMs", desc:"Using large language models to automate Islamic finance compliance checks at scale.", tag:"Article", read:"8 min" },
  { emoji:"📝", title:"Microservices with Spring Boot: What I Learned Building SPARK", desc:"Lessons from designing a multi-service agile project management tool from scratch.", tag:"Article", read:"12 min" },
  { emoji:"📝", title:"From RTGS to REST: Modernising Core Banking APIs", desc:"My experience building and optimising payment gateway APIs at Millennium.", tag:"Article", read:"10 min" },
];

const BOOK_NOTES = [
  { emoji:"📖", title:"Clean Code — Robert C. Martin", desc:"Key takeaways on writing readable, maintainable code that doesn't embarrass you six months later.", tag:"Book Notes", read:"5 min" },
  { emoji:"📖", title:"Designing Data-Intensive Applications", desc:"Notes on distributed systems, database internals, and building reliable software at scale.", tag:"Book Notes", read:"15 min" },
  { emoji:"📖", title:"The Pragmatic Programmer", desc:"Timeless wisdom on software craftsmanship, career growth, and thinking like a developer.", tag:"Book Notes", read:"7 min" },
];

const VIDEOS = [
  { id:"dQw4w9WgXcQ", title:"Getting Started with Spring Boot Microservices", views:"12K", date:"2 weeks ago", dur:"18:42" },
  { id:"jNQXAC9IVRw", title:"Building REST APIs with Java — Full Guide", views:"8.5K", date:"1 month ago", dur:"32:15" },
  { id:"FpHJEnTMXxU", title:"React + Spring Boot: Full Stack App Tutorial", views:"21K", date:"3 months ago", dur:"1:04:32" },
  { id:"ZPn3MBRoqFY", title:"My Journey into Fintech Development", views:"5.2K", date:"4 months ago", dur:"14:08" },
  { id:"XR2GVMkbmFk", title:"Understanding OAuth2 and JWT Security", views:"9.8K", date:"5 months ago", dur:"22:55" },
  { id:"bMknfKXIFA8", title:"Machine Learning in Banking: Real Applications", views:"7.1K", date:"6 months ago", dur:"28:33" },
];

/* ══════════════════════════════════════════
   MANGEKYOU ORB (Three.js)
══════════════════════════════════════════ */
function MangekyouOrb({ size = 260, dark = false }) {
  const ref = useRef(null);
  const st = useRef(/** @type {any} */  ({}));
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const run = () => {
      const T3 = window.THREE, W = el.clientWidth, H = el.clientHeight;
      const renderer = new T3.WebGLRenderer({ antialias:true, alpha:true });
      renderer.setSize(W,H); renderer.setPixelRatio(Math.min(devicePixelRatio,2));
      el.appendChild(renderer.domElement);
      const scene = new T3.Scene();
      const camera = new T3.PerspectiveCamera(45,W/H,0.1,100);
      camera.position.set(0,0,5.2);
      scene.add(new T3.AmbientLight(0xffffff,0.08));
      const r1=new T3.PointLight(0xc8102e,10,15); r1.position.set(-3,3,3); scene.add(r1);
      const r2=new T3.PointLight(0x660000,5,12); r2.position.set(3,-1,3); scene.add(r2);
      const core=new T3.Mesh(new T3.IcosahedronGeometry(1.0,5),new T3.MeshStandardMaterial({color:0x080000,metalness:1,roughness:0,emissive:0x1a0000,emissiveIntensity:1}));
      scene.add(core);
      const wire=new T3.Mesh(new T3.IcosahedronGeometry(1.03,5),new T3.MeshBasicMaterial({color:0x3a0000,wireframe:true,transparent:true,opacity:0.22}));
      scene.add(wire);
      const blades=[];
      for(let i=0;i<3;i++){
        const sh=new T3.Shape();
        sh.moveTo(0,-0.68); sh.quadraticCurveTo(0.17,-0.1,0.1,0.18); sh.quadraticCurveTo(0,0.38,-0.1,0.18); sh.quadraticCurveTo(-0.17,-0.1,0,-0.68);
        const b=new T3.Mesh(new T3.ExtrudeGeometry(sh,{depth:0.04,bevelEnabled:false}),new T3.MeshStandardMaterial({color:0xc8102e,metalness:0.9,roughness:0.08,emissive:0xc8102e,emissiveIntensity:0.6}));
        b.rotation.z=(i/3)*Math.PI*2; b.userData={base:(i/3)*Math.PI*2};
        blades.push(b); scene.add(b);
      }
      const ring1=new T3.Mesh(new T3.TorusGeometry(1.65,0.015,16,120),new T3.MeshBasicMaterial({color:0xc8102e,transparent:true,opacity:0.5}));
      ring1.rotation.x=1.15; scene.add(ring1);
      const ring2=new T3.Mesh(new T3.TorusGeometry(2.1,0.009,16,120),new T3.MeshBasicMaterial({color:0x660000,transparent:true,opacity:0.28}));
      ring2.rotation.x=0.7; ring2.rotation.z=0.6; scene.add(ring2);
      const pN=200,pP=new Float32Array(pN*3),pC=new Float32Array(pN*3);
      for(let i=0;i<pN;i++){pP[i*3]=(Math.random()-.5)*12;pP[i*3+1]=(Math.random()-.5)*10;pP[i*3+2]=(Math.random()-.5)*8-2;pC[i*3]=0.5+Math.random()*0.5;pC[i*3+1]=0;pC[i*3+2]=0;}
      const pg=new T3.BufferGeometry(); pg.setAttribute("position",new T3.BufferAttribute(pP,3)); pg.setAttribute("color",new T3.BufferAttribute(pC,3));
      scene.add(new T3.Points(pg,new T3.PointsMaterial({size:0.018,vertexColors:true,transparent:true,opacity:0.5})));
      st.current={renderer,scene,camera,core,wire,blades,ring1,ring2,mouse:{x:0,y:0}};
      let t=0;
      const tick=()=>{
        st.current._raf=requestAnimationFrame(tick); t+=0.008;
        const{mouse}=st.current;
        core.rotation.y=t*0.2+mouse.x*0.35; core.rotation.x=t*0.08+mouse.y*0.18; wire.rotation.copy(core.rotation);
        blades.forEach(b=>{b.rotation.z=b.userData.base+t*0.4; b.rotation.y=t*0.12;});
        ring1.rotation.z=t*0.22; ring2.rotation.z=-t*0.16;
        camera.position.x+=(mouse.x*0.4-camera.position.x)*0.04; camera.position.y+=(-mouse.y*0.3-camera.position.y)*0.04; camera.lookAt(0,0,0);
        renderer.render(scene,camera);
      };
      tick();
      const onR=()=>{const W2=el.clientWidth,H2=el.clientHeight;renderer.setSize(W2,H2);camera.aspect=W2/H2;camera.updateProjectionMatrix();};
      window.addEventListener("resize",onR);
      st.current._clean=()=>{cancelAnimationFrame(st.current._raf);window.removeEventListener("resize",onR);renderer.dispose();if(el.contains(renderer.domElement))el.removeChild(renderer.domElement);};
    };
    if(window.THREE){run();return;}
    const s=document.createElement("script"); s.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"; s.onload=run; document.head.appendChild(s);
    return()=>st.current._clean?.();
  },[]);
  const onMove=(/** @type {any} */ e)=>{const r=ref.current?.getBoundingClientRect();if(r&&st.current.mouse){st.current.mouse.x=((e.clientX-r.left)/r.width-.5)*2;st.current.mouse.y=((e.clientY-r.top)/r.height-.5)*2;}};
  return <div ref={ref} onMouseMove={onMove} style={{width:size,height:size}}/>;
}

/* ══════════════════════════════════════════
   TERMINAL WIDGETS
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

/* ── Typewriter terminal ── */
function TypewriterTerminal({ lines=[], title="bash", style={} }) {
  const [shown, setShown] = useState(/** @type {any} */ ([]));
  const idx = useRef(0);
  useEffect(() => {
    if (!lines || lines.length === 0) {
      setShown([]);
      return;
    }
    idx.current = 0; setShown([]);
    const iv = setInterval(() => {
      if (idx.current < lines.length) {
        const line = lines[idx.current++];
        if (line) setShown(p => [...p, line]);
      } else {
        clearInterval(iv);
      }
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
   LOGO
══════════════════════════════════════════ */
function Logo({ size = 26 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }}>
      <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
        <circle cx="16" cy="16" r="15" fill={C.dark}/>
        <circle cx="16" cy="16" r="15" fill="none" stroke="rgba(200,16,46,0.35)" strokeWidth="0.8"/>
        <path d="M16 1 Q19.5 8.5 16 16 Q12.5 8.5 16 1Z" fill={C.red}/>
        <path d="M16 1 Q19.5 8.5 16 16 Q12.5 8.5 16 1Z" fill={C.red} transform="rotate(120 16 16)"/>
        <path d="M16 1 Q19.5 8.5 16 16 Q12.5 8.5 16 1Z" fill={C.red} transform="rotate(240 16 16)"/>
        <circle cx="16" cy="16" r="3.2" fill={C.dark}/>
        <circle cx="16" cy="16" r="1.6" fill={C.red} opacity="0.7"/>
      </svg>
      <span style={{ fontWeight:900, fontSize:15.5, letterSpacing:"-0.5px", color:C.ink }}>unsaidscript</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   UI ATOMS
══════════════════════════════════════════ */
function Pill({ children=null, color = C.red }) {
  return <span style={{ background:color+"18", color, fontSize:10.5, fontWeight:700, letterSpacing:1.2, padding:"3px 11px", borderRadius:30, textTransform:"uppercase" }}>{children}</span>;
}

function SectionLabel({ children=null }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
      <Pill>{children}</Pill>
      <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,rgba(200,16,46,0.3),transparent)` }}/>
    </div>
  );
}

function Card({ children=null, style={}, accent=C.red }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ background:C.card, borderRadius:20, border:`1px solid ${h?accent+"44":C.border}`, padding:28, transition:"all .22s", boxShadow:h?`0 8px 40px ${accent}12, 0 2px 20px rgba(0,0,0,0.06)`:"0 2px 8px rgba(0,0,0,0.04)", transform:h?"translateY(-3px)":"none", overflow:"hidden", position:"relative", ...style }}>
      {h && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${accent},${accent}66)`, pointerEvents:"none" }}/>}
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

  const heroLines = [
    { text:`<span style="color:#a78bfa">const</span> <span style="color:#79c0ff">developer</span> <span style="color:#e5e7eb">=</span> <span style="color:#e5e7eb">{</span>` },
    { text:`&nbsp;&nbsp;<span style="color:#f97316">name</span><span style="color:#e5e7eb">:</span> <span style="color:#a5d6ff">"Abdullah Al Mamun"</span><span style="color:#666">,</span>` },
    { text:`&nbsp;&nbsp;<span style="color:#f97316">role</span><span style="color:#e5e7eb">:</span> <span style="color:#a5d6ff">"Software Engineer"</span><span style="color:#666">,</span>` },
    { text:`&nbsp;&nbsp;<span style="color:#f97316">company</span><span style="color:#e5e7eb">:</span> <span style="color:#a5d6ff">"Koalafi"</span><span style="color:#666">,</span>` },
    { text:`&nbsp;&nbsp;<span style="color:#f97316">location</span><span style="color:#e5e7eb">:</span> <span style="color:#a5d6ff">"Dhaka, Bangladesh"</span><span style="color:#666">,</span>` },
    { text:`&nbsp;&nbsp;<span style="color:#f97316">available</span><span style="color:#e5e7eb">:</span> <span style="color:#f47067">true</span><span style="color:#666">,</span>` },
    { text:`<span style="color:#e5e7eb">}</span>` },
    { text:``, color:"transparent" },
    { text:`<span style="color:#4ade80">// ✓ Compiling genius... done.</span>` },
  ];

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{ background:C.bg, minHeight:"100vh", display:"grid", gridTemplateColumns:"1.1fr 1fr", alignItems:"center", padding:"80px 60px 60px", gap:60, position:"relative", overflow:"hidden" }}>
        {/* blobs */}
        <div style={{ position:"absolute", top:"5%", right:"5%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(200,16,46,0.05),transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"0", left:"0", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(200,16,46,0.03),transparent 65%)", pointerEvents:"none" }}/>

        {/* Left */}
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.redS, border:"1px solid rgba(200,16,46,0.18)", borderRadius:30, padding:"6px 16px", marginBottom:32, fontSize:12, color:C.red, fontWeight:600 }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px #22c55e",display:"inline-block",animation:"pulse 2s infinite" }}/>
            Open to new opportunities
          </div>

          <h1 style={{ fontSize:"clamp(48px,7vw,92px)", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.06em", margin:"0 0 20px", color:C.ink }}>
            Hey 👋<br/><span style={{ color:C.red }}>Abdullah</span>
          </h1>
          <p style={{ fontSize:"clamp(16px,1.8vw,20px)", color:C.muted, letterSpacing:"-0.01em", margin:"0 0 20px", lineHeight:1.4, fontWeight:400 }}>
            Software Engineer · Fintech Developer
          </p>
          <p style={{ color:C.muted, fontSize:15.5, lineHeight:1.8, maxWidth:500, margin:"0 0 36px" }}>
            Building enterprise-grade banking systems, scalable APIs, and AI-powered tools. Based in Dhaka — working globally. Specialised in <strong style={{ color:C.ink }}>Java · Spring Boot · React</strong>.
          </p>
          <div style={{ display:"flex", gap:12, marginBottom:40 }}>
            <button style={{ background:C.ink, border:"none", color:"#fff", padding:"14px 30px", borderRadius:50, cursor:"pointer", fontSize:14, fontWeight:700 }}>View My Work ↓</button>
            <button style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.ink, padding:"14px 28px", borderRadius:50, cursor:"pointer", fontSize:14, fontWeight:600 }}>Download CV</button>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {[["GH","#333"],["LI","#0077b5"],["YT","#ff0000"],["GS","#4285f4"],["✉","#C8102E"]].map(([l,col])=>(
              <div key={l} style={{ width:40,height:40,borderRadius:12,background:col+"15",border:`1px solid ${col}25`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:12,fontWeight:800,color:col,transition:"all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=col+"28";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background=col+"15";e.currentTarget.style.transform="none";}}
              >{l}</div>
            ))}
          </div>
        </div>

        {/* Right — Orb + typewriter */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:24, position:"relative", zIndex:1 }}>
          <MangekyouOrb size={340}/>
          <TypewriterTerminal title="~/about.js" lines={heroLines} style={{ width:"100%" }}/>
        </div>
      </section>

      {/* ═══ EXPERIENCE TIMELINE ═══ */}
      <section style={{ background:"#fff", padding:"90px 60px", borderTop:`1px solid ${C.border}` }}>
        <SectionLabel>Experience</SectionLabel>
        <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:900, letterSpacing:"-0.05em", margin:"0 0 52px", color:C.ink }}>Work History</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {EXPERIENCE.map((e,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:40, padding:"44px 0", borderBottom:i<EXPERIENCE.length-1?`1px solid ${C.border}`:"none", alignItems:"start" }}>
              {/* Left meta */}
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <div style={{ width:44,height:44,borderRadius:13,background:`${C.red}12`,border:`1px solid ${C.red}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{e.icon}</div>
                  <div>
                    <div style={{ fontSize:18, fontWeight:800, color:C.ink, letterSpacing:"-0.03em", display:"flex", gap:6, alignItems:"center" }}>
                      {e.company}
                      {e.url && <a href={e.url} target="_blank" rel="noreferrer" style={{ fontSize:11, color:C.red, textDecoration:"none", fontWeight:700 }}>↗</a>}
                    </div>
                    <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{e.role}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
                  <Pill color={C.red}>{e.type}</Pill>
                  <span style={{ fontSize:12, color:C.muted, paddingTop:4 }}>{e.period}</span>
                </div>
                <div style={{ fontSize:12, color:C.muted }}>📍 {e.location}</div>
              </div>
              {/* Right — terminal card */}
              <div>
                <TerminalWindow title={`${e.company.toLowerCase().replace(/\s+/g,"-")}.sh`}>
                  <TComment>{`// ${e.role}`}</TComment>
                  <TLine color="#e5e7eb" >{e.desc}</TLine>
                  <div style={{ marginTop:10 }}>
                    <TComment>{"// stack"}</TComment>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:6 }}>
                      {e.stack.map(s=><span key={s} style={{ background:"rgba(200,16,46,0.12)", color:C.red, fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:20 }}>{s}</span>)}
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section style={{ background:C.bg, padding:"90px 60px", borderTop:`1px solid ${C.border}` }}>
        <SectionLabel>Tech Stack</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
          <div>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:900, letterSpacing:"-0.05em", margin:"0 0 16px", color:C.ink }}>What I Work With</h2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:"0 0 32px" }}>From core banking APIs to AI/ML systems — a full stack spanning enterprise Java to modern React frontends.</p>
            {/* Mini terminal showing command */}
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
                  {g.items.map(t=><span key={t} style={{ background:g.color+"14", border:`1px solid ${g.color}28`, color:g.color, fontSize:12, fontWeight:600, padding:"4px 12px", borderRadius:20 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section style={{ background:"#fff", padding:"90px 60px", borderTop:`1px solid ${C.border}` }}>
        <SectionLabel>Projects</SectionLabel>
        <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:900, letterSpacing:"-0.05em", margin:"0 0 52px", color:C.ink }}>Selected Work 🔥</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {PROJECTS.map((p,i)=>(
            <Card key={i} accent={p.accent}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
                <div style={{ fontSize:42 }}>{p.emoji}</div>
                <Pill color={p.accent}>{p.label}</Pill>
              </div>
              <h3 style={{ fontSize:20, fontWeight:800, margin:"0 0 4px", color:C.ink, letterSpacing:"-0.04em" }}>{p.title}</h3>
              <p style={{ color:p.accent, fontSize:12, fontWeight:600, margin:"0 0 10px", letterSpacing:0.5 }}>{p.sub}</p>
              <p style={{ color:C.muted, fontSize:14, lineHeight:1.75, margin:"0 0 16px" }}>{p.desc}</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:p.link?14:0 }}>
                {p.tags.map(t=><span key={t} style={{ background:`${p.accent}10`, border:`1px solid ${p.accent}22`, color:p.accent, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20 }}>{t}</span>)}
              </div>
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color:p.accent, fontSize:12.5, fontWeight:700, textDecoration:"none" }}>Visit Live Site ↗</a>}
            </Card>
          ))}
        </div>
      </section>

      {/* ═══ PUBLICATIONS ═══ */}
      <section style={{ background:C.bg, padding:"90px 60px", borderTop:`1px solid ${C.border}` }}>
        <SectionLabel>Research</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start" }}>
          <div>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:900, letterSpacing:"-0.05em", margin:"0 0 16px", color:C.ink }}>Publications</h2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:"0 0 28px" }}>5 peer-reviewed papers in AI, computer vision, and deep learning — published in Elsevier journals and international conferences.</p>
            <TerminalWindow title="scholar.sh">
              <TPrompt>./list-papers --sort year</TPrompt>
              <TLine color={C.termBlue}>{">"} Found 5 papers (4 published, 1 under review)</TLine>
              <TLine color={C.termGreen}>{">"} Elsevier · 2 papers</TLine>
              <TLine color={C.termYellow}>{">"} ICCECE · 2 papers</TLine>
              <TLine color={C.termPurple}>{">"} Int. Conference · 1 paper</TLine>
              <TPrompt>echo $CITATIONS</TPrompt>
              <TLine color={C.termGreen}>{">"} Rising ↑</TLine>
            </TerminalWindow>
          </div>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {PUBLICATIONS.map((p,i)=>(
              <div key={i} style={{ padding:"18px 0", borderBottom:i<PUBLICATIONS.length-1?`1px solid ${C.border}`:"none" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.redS+"88"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:C.muted }}>{p.year}</span>
                  <Pill color={p.tag==="Journal"?C.red:"#1D4ED8"}>{p.tag}</Pill>
                </div>
                <div style={{ fontSize:14, fontWeight:700, color:C.ink, lineHeight:1.45, marginBottom:3 }}>{p.title}</div>
                <div style={{ fontSize:12, color:C.muted }}>{p.venue}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section style={{ background:"#fff", padding:"90px 60px", borderTop:`1px solid ${C.border}` }}>
        <SectionLabel>Education</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
          <div>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:900, letterSpacing:"-0.05em", margin:"0 0 36px", color:C.ink }}>Academic Background</h2>
            {[
              { school:"University of Dhaka", degree:"Professional Master's — Information & Cyber Security", period:"Mar 2025 – Present", icon:"🎓" },
              { school:"United International University", degree:"B.Sc. Computer Science & Engineering", period:"2019 – 2023", icon:"🎓" },
              { school:"CodersTrust Bangladesh", degree:"Responsive Web Design + Advanced Web Dev", period:"2019 – 2020", icon:"📜" },
            ].map((e,i)=>(
              <div key={i} style={{ display:"flex", gap:14, marginBottom:20, paddingBottom:20, borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
                <div style={{ width:40,height:40,borderRadius:12,background:C.redS,border:`1px solid rgba(200,16,46,0.15)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{e.icon}</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:C.ink }}>{e.school}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{e.degree}</div>
                  <div style={{ fontSize:11.5, color:C.red, marginTop:3, fontWeight:600 }}>{e.period}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Right: git log style terminal */}
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
              <TComment>{"# currently on branch: master-of-cybersecurity"}</TComment>
              <TLine color={C.termGreen}>{"HEAD -> master ✓"}</TLine>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section style={{ background:C.bg, padding:"90px 60px", borderTop:`1px solid ${C.border}` }}>
        <SectionLabel>Contact</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60 }}>
          <div>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:900, letterSpacing:"-0.05em", margin:"0 0 20px", color:C.ink }}>
              Let's build<br/><span style={{ color:C.red }}>something great.</span>
            </h2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:"0 0 32px" }}>
              Open to fintech roles, backend engineering, AI projects, and full-stack work. Remote or Dhaka-based.
            </p>
            {[["📧","abdullahalmamun@example.com"],["📍","Dhaka, Bangladesh · Remote OK"],["⚡","Replies within 24 hours"]].map(([ic,v])=>(
              <div key={v} style={{ display:"flex", gap:12, marginBottom:14, fontSize:14, color:C.muted }}>
                <span>{ic}</span><span>{v}</span>
              </div>
            ))}
          </div>
          <ContactForm/>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */
function ContactForm() {
  const [form,setForm]=useState({name:"",email:"",message:""});
  const [fs,setFs]=useState("idle");
  const [tl,setTl]=useState(/** @type {any} */ ([]));
  const send=()=>{
    if(!form.name||!form.email||!form.message)return; setFs("sending");
    const lines=[
      {text:`<span style="color:#4ade80">❯</span> ssh contact@unsaidscript.dev`},
      {text:`<span style="color:#79c0ff">></span> Authenticated ✓`},
      {text:`<span style="color:#4ade80">❯</span> send-message --from "${form.email}"`},
      {text:`<span style="color:#79c0ff">></span> Encrypting payload...`},
      {text:`<span style="color:#79c0ff">></span> POST /api/contact → 200 OK`},
      {text:`<span style="color:#4ade80">></span> ✓ Message delivered!`},
    ];
    let i=0; const iv=setInterval(()=>{setTl(p=>[...p,lines[i++]]); if(i>=lines.length){clearInterval(iv);setFs("success");}},450);
  };
  const inp={width:"100%",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"13px 16px",fontSize:14,color:C.ink,outline:"none",boxSizing:"border-box",fontFamily:"inherit",transition:"border-color .2s"};

  if(fs==="success") return (
    <Card style={{ textAlign:"center", padding:"50px 30px" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
      <h3 style={{ fontSize:22, fontWeight:800, margin:"0 0 10px", color:C.ink }}>Message Sent!</h3>
      <p style={{ color:C.muted, margin:"0 0 24px" }}>I'll reply within 24 hours.</p>
      <TerminalWindow title="sent.log" style={{ textAlign:"left", marginBottom:20 }}>
        {tl.map((l,i)=><div key={i} style={{ marginBottom:3 }} dangerouslySetInnerHTML={{ __html:l.text }}/>)}
      </TerminalWindow>
      <button onClick={()=>{setFs("idle");setTl([]);setForm({name:"",email:"",message:""});}} style={{ background:C.tag, border:`1px solid ${C.border}`, color:C.muted, padding:"10px 22px", borderRadius:20, cursor:"pointer", fontSize:13 }}>Send Another</button>
    </Card>
  );

  return (
    <Card>
      {fs==="sending"&&(
        <TerminalWindow title="sending.sh" style={{ marginBottom:20 }}>
          {tl.map((l,i)=><div key={i} style={{ marginBottom:3 }} dangerouslySetInnerHTML={{ __html:l.text }}/>)}
          {tl.length<6&&<span style={{ color:"#4ade80", animation:"blink 1s infinite" }}>▌</span>}
        </TerminalWindow>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
        {[{l:"Your Name",k:"name",p:"John Doe",t:"text"},{l:"Email Address",k:"email",p:"john@example.com",t:"email"}].map(f=>(
          <div key={f.k}>
            <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.muted, marginBottom:8, letterSpacing:1.5, textTransform:"uppercase" }}>{f.l}</label>
            <input type={f.t} value={form[/** @type {any} */ (f.k)]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} style={inp}
              onFocus={e=>e.target.style.borderColor=C.red} onBlur={e=>e.target.style.borderColor=C.border}/>
          </div>
        ))}
        <div>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.muted, marginBottom:8, letterSpacing:1.5, textTransform:"uppercase" }}>Message</label>
          <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} placeholder="Tell me about your project..." rows={4} style={{...inp,resize:"none"}}
            onFocus={e=>e.target.style.borderColor=C.red} onBlur={e=>e.target.style.borderColor=C.border}/>
        </div>
        <button onClick={send} disabled={fs==="sending"} style={{ background:C.red, border:"none", color:"#fff", padding:"14px", borderRadius:30, cursor:"pointer", fontSize:15, fontWeight:700, opacity:fs==="sending"?.5:1, boxShadow:`0 6px 24px rgba(200,16,46,0.3)` }}>
          {fs==="sending"?"Sending...":"Send Message 🚀"}
        </button>
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════
   WRITING PAGE
══════════════════════════════════════════ */
function WritingPage() {
  const [filter,setFilter]=useState("All");
  const all=[...ARTICLES,...BOOK_NOTES];
  const shown=filter==="All"?all:filter==="Articles"?ARTICLES:BOOK_NOTES;
  return (
    <div style={{ padding:"80px 60px" }}>
      {/* Header terminal */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", marginBottom:64 }}>
        <div>
          <SectionLabel>Writing</SectionLabel>
          <h1 style={{ fontSize:"clamp(36px,5vw,62px)", fontWeight:900, letterSpacing:"-0.06em", margin:"0 0 16px", color:C.ink, lineHeight:1 }}>
            Articles &<br/><span style={{ color:C.red }}>Book Notes</span>
          </h1>
          <p style={{ color:C.muted, fontSize:15, lineHeight:1.8 }}>Thoughts on software engineering, fintech, AI, and the books that shaped how I think.</p>
        </div>
        <TerminalWindow title="writing.sh">
          <TPrompt>ls ./writing --type all</TPrompt>
          <TLine color={C.termBlue}>{"drwxr-xr-x  articles/"}</TLine>
          <TLine color={C.termBlue}>{"drwxr-xr-x  book-notes/"}</TLine>
          <TPrompt>wc -l articles/*.md</TPrompt>
          <TLine color={C.termGreen}>{"  3 articles, ~30 min total read"}</TLine>
          <TPrompt>wc -l book-notes/*.md</TPrompt>
          <TLine color={C.termGreen}>{"  3 notes, ~27 min total read"}</TLine>
          <TComment>{"# more coming soon..."}</TComment>
        </TerminalWindow>
      </div>

      {/* Filter */}
      <div style={{ display:"flex", gap:8, marginBottom:40 }}>
        {["All","Articles","Book Notes"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ background:filter===f?C.ink:"#fff", border:`1.5px solid ${filter===f?C.ink:C.border}`, color:filter===f?"#fff":C.muted, padding:"8px 20px", borderRadius:30, cursor:"pointer", fontSize:13, fontWeight:600, transition:"all .2s" }}>{f}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {shown.map((item,i)=>(
          <Card key={i} accent={item.tag==="Article"?C.red:"#1D4ED8"} style={{ cursor:"pointer" }}>
            <div style={{ height:100, borderRadius:12, marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", background:item.tag==="Article"?C.redS:"#EFF6FF", border:`1px solid ${item.tag==="Article"?"rgba(200,16,46,0.12)":"rgba(29,78,216,0.12)"}`, fontSize:38 }}>
              {item.emoji}
            </div>
            <Pill color={item.tag==="Article"?C.red:"#1D4ED8"}>{item.tag}</Pill>
            <h3 style={{ fontSize:15, fontWeight:700, margin:"12px 0 8px", lineHeight:1.45, color:C.ink }}>{item.title}</h3>
            <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:"0 0 16px" }}>{item.desc}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:11.5, color:C.muted, fontFamily:"monospace" }}>{item.read} read</span>
              <button style={{ background:"none", border:"none", color:C.red, fontSize:12.5, fontWeight:700, cursor:"pointer", padding:0 }}>Read →</button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA terminal */}
      <div style={{ marginTop:64 }}>
        <TerminalWindow title="subscribe.sh" style={{ maxWidth:500, margin:"0 auto" }}>
          <TComment>{"# get notified when I publish"}</TComment>
          <TPrompt>./subscribe --newsletter unsaidscript</TPrompt>
          <TLine color={C.termGreen}>{">"} Drop your email below ↓</TLine>
        </TerminalWindow>
        <div style={{ display:"flex", gap:0, maxWidth:500, margin:"16px auto 0" }}>
          <input placeholder="your@email.com" style={{ flex:1, background:"#fff", border:`1.5px solid ${C.border}`, borderRight:"none", borderRadius:"12px 0 0 12px", padding:"13px 16px", fontSize:14, color:C.ink, outline:"none", fontFamily:"inherit" }}
            onFocus={e=>e.target.style.borderColor=C.red} onBlur={e=>e.target.style.borderColor=C.border}/>
          <button style={{ background:C.ink, border:"none", color:"#fff", padding:"13px 22px", borderRadius:"0 12px 12px 0", cursor:"pointer", fontSize:13, fontWeight:700 }}>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   YOUTUBE PAGE
══════════════════════════════════════════ */
function YoutubePage() {
  const [hov,setHov]=useState(null);
  return (
    <div style={{ padding:"80px 60px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", marginBottom:64 }}>
        <div>
          <SectionLabel>YouTube</SectionLabel>
          <h1 style={{ fontSize:"clamp(36px,5vw,62px)", fontWeight:900, letterSpacing:"-0.06em", margin:"0 0 16px", color:C.ink, lineHeight:1 }}>
            My Thoughts<br/><span style={{ color:C.red }}>on Video</span>
          </h1>
          <p style={{ color:C.muted, fontSize:15, lineHeight:1.8 }}>Tutorials, deep dives, and honest takes on software engineering, fintech, and building things that matter.</p>
          <button style={{ marginTop:24, background:C.red, border:"none", color:"#fff", padding:"13px 28px", borderRadius:30, cursor:"pointer", fontSize:14, fontWeight:700, boxShadow:`0 6px 24px rgba(200,16,46,0.3)` }}>
            Subscribe on YouTube ↗
          </button>
        </div>
        <TerminalWindow title="youtube-stats.sh">
          <TPrompt>curl -s api.youtube.com/channel/unsaidscript</TPrompt>
          <TLine color={C.termBlue}>{`{`}</TLine>
          <TLine color="#e5e7eb">{`  "channel": "unsaidscript",`}</TLine>
          <TLine color="#e5e7eb">{`  "focus": "fintech + software engineering",`}</TLine>
          <TLine color={C.termGreen}>{`  "status": "active",`}</TLine>
          <TLine color={C.termYellow}>{`  "next_video": "coming soon"`}</TLine>
          <TLine color={C.termBlue}>{`}`}</TLine>
        </TerminalWindow>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {VIDEOS.map((v,i)=>(
          <div key={i} style={{ background:C.card, borderRadius:20, overflow:"hidden", border:`1px solid ${C.border}`, transition:"all .25s", boxShadow:hov===i?"0 12px 40px rgba(200,16,46,0.1)":"0 2px 8px rgba(0,0,0,0.04)", transform:hov===i?"translateY(-4px)":"none", cursor:"pointer" }}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            onClick={()=>window.open(`https://www.youtube.com/watch?v=${v.id}`,"_blank")}
          >
            <div style={{ position:"relative", paddingBottom:"56.25%", background:C.termBg, overflow:"hidden" }}>
              <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title}
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:hov===i?0.9:0.7, transition:"opacity .25s" }}/>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:46, height:46, borderRadius:"50%", background:hov===i?C.red:"rgba(200,16,46,0.75)", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .2s", boxShadow:"0 4px 20px rgba(200,16,46,0.5)" }}>
                  <div style={{ width:0, height:0, borderTop:"9px solid transparent", borderBottom:"9px solid transparent", borderLeft:"17px solid #fff", marginLeft:4 }}/>
                </div>
              </div>
              <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(0,0,0,0.85)", color:"#fff", fontSize:11, fontWeight:700, padding:"2px 7px", borderRadius:4, fontFamily:"monospace" }}>{v.dur}</div>
            </div>
            <div style={{ padding:"16px 18px 20px" }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:C.ink, lineHeight:1.45, margin:"0 0 8px" }}>{v.title}</h3>
              <div style={{ display:"flex", gap:6, fontSize:12, color:C.muted, fontFamily:"monospace" }}>
                <span>{v.views} views</span>
                <span>·</span>
                <span>{v.date}</span>
              </div>
            </div>
          </div>
        ))}
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

  const goTo=(p)=>{
    if(p===page)return;
    setFading(true);
    setTimeout(()=>{setPage(p);setFading(false);window.scrollTo(0,0);},220);
  };

  const PAGES={home:<HomePage/>,writing:<WritingPage/>,youtube:<YoutubePage/>};
  const NAV=[["home","Home"],["writing","Writing"],["youtube","YouTube"]];

  return (
    <div style={{ background:C.bg, color:C.ink, fontFamily:"'Inter','SF Pro Display',system-ui,sans-serif", minHeight:"100vh", overflowX:"hidden" }}>
      {/* subtle grid */}
      <div style={{ position:"fixed", inset:0, backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`, backgroundSize:"80px 80px", opacity:0.4, pointerEvents:"none", zIndex:0 }}/>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", inset:"0 0 auto 0", zIndex:1000, background:"rgba(250,250,247,0.93)", backdropFilter:"blur(24px)", borderBottom:`1px solid ${C.border}`, height:60, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 44px" }}>
        <div onClick={()=>goTo("home")}><Logo/></div>
        <div style={{ display:"flex", gap:2 }}>
          {NAV.map(([id,label])=>(
            <button key={id} onClick={()=>goTo(id)} style={{ background:"none", border:"none", color:page===id?C.ink:C.muted, padding:"7px 18px", cursor:"pointer", fontSize:14, fontWeight:page===id?700:400, borderRadius:20, transition:"all .2s", borderBottom:page===id?`2px solid ${C.red}`:"2px solid transparent" }}>{label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          {/* mini terminal badge */}
          <div style={{ background:C.termBg, borderRadius:8, padding:"6px 12px", fontFamily:"monospace", fontSize:11, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ color:"#22c55e" }}>●</span>
            <span style={{ color:"rgba(255,255,255,0.5)" }}>available</span>
          </div>
          <button onClick={()=>goTo("home")} style={{ background:C.red, border:"none", color:"#fff", padding:"9px 20px", borderRadius:30, cursor:"pointer", fontSize:13, fontWeight:700, boxShadow:`0 4px 16px rgba(200,16,46,0.35)` }}>Hire Me</button>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ paddingTop:60, position:"relative", zIndex:1, opacity:fading?0:1, transform:fading?"translateY(8px)":"none", transition:"opacity .22s, transform .22s" }}>
        {PAGES[page]}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background:C.ink, padding:"32px 44px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16, position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <svg viewBox="0 0 22 22" width="20" height="20" fill="none">
            <circle cx="11" cy="11" r="10" fill={C.red}/>
            <path d="M11 1 Q13.5 6.5 11 11 Q8.5 6.5 11 1Z" fill="#fff"/>
            <path d="M11 1 Q13.5 6.5 11 11 Q8.5 6.5 11 1Z" fill="#fff" transform="rotate(120 11 11)"/>
            <path d="M11 1 Q13.5 6.5 11 11 Q8.5 6.5 11 1Z" fill="#fff" transform="rotate(240 11 11)"/>
            <circle cx="11" cy="11" r="2" fill={C.red}/>
          </svg>
          <span style={{ fontWeight:800, fontSize:14, color:"rgba(255,255,255,0.9)" }}>unsaidscript</span>
        </div>
        <div style={{ display:"flex", gap:16 }}>
          {NAV.map(([id,label])=>(
            <button key={id} onClick={()=>goTo(id)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.35)", cursor:"pointer", fontSize:13 }}>{label}</button>
          ))}
        </div>
        <span style={{ fontSize:12, color:"rgba(255,255,255,0.2)" }}>© 2024 unsaidscript · Abdullah Al Mamun</span>
      </footer>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        *{box-sizing:border-box;-webkit-font-smoothing:antialiased}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px;background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
        button:hover{opacity:.88}
      `}</style>
    </div>
  );
}
