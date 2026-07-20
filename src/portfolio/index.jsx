import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { C } from "../tokens.js";
import { BOOKS } from "./data/index.js";
import { Logo } from "./components/index.js";
import { CommandPalette } from "./components/CommandPalette.jsx";
import { useLeafCursor } from "./hooks/useLeafCursor.js";
import { LandingPage } from "./pages/LandingPage.jsx";
import { WriterPage } from "./pages/WriterPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ReviewPage } from "./pages/ReviewPage.jsx";
import { TitheePage } from "./pages/TitheePage.jsx";

const NAV = [["/", "Home"], ["/writer", "The Writer"], ["/engineer", "The Engineer"]];

/* per-route SEO — real titles & descriptions for every URL */
function useSeo(pathname) {
  useEffect(() => {
    let title = "Abdullah Al Mamun — Writer & Software Engineer | unsaidscript";
    let desc = "One person, two scripts. Book reviews, translations and writing on one side; fintech engineering in Java, Spring Boot and React on the other.";
    if (pathname.startsWith("/tithee") || pathname.startsWith("/kishoar")) {
      title = "Kishoar Jahan Tithee — Software QA Engineer | Data Analytics & AI Researcher";
      desc = "Software QA Engineer with 3+ years in Telecom and FinTech — test automation, SQL data validation, API testing, microservices. Published AI researcher in LLMs.";
    } else if (pathname.startsWith("/writer")) {
      title = "The Writer — Book Reviews, Translations & Notes | unsaidscript";
      desc = "Honest book reviews from Rumi to Rabindranath to Murakami, a translation desk (English ⇄ বাংলা), and notes on research, tutorials and opinions.";
    } else if (pathname.startsWith("/engineer")) {
      title = "The Engineer — Java · Spring Boot · React | Abdullah Al Mamun";
      desc = "Software engineer @ Koalafi. Fintech systems, banking APIs, AI tools — work history, selected projects and research publications.";
    } else if (pathname.startsWith("/reviews/")) {
      const book = BOOKS.find(b => b.slug === pathname.split("/reviews/")[1]);
      if (book) {
        title = `${book.title} by ${book.author} — Book Review | unsaidscript`;
        desc = book.verdict;
      }
    }
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", desc);
  }, [pathname]);
}

function ReviewRoute({ goTo }) {
  const { slug } = useParams();
  if (!BOOKS.some(b => b.slug === slug)) return <Navigate to="/writer" replace/>;
  return <ReviewPage slug={slug} openBook={(s)=>goTo(`/reviews/${s}`)} closeBook={()=>goTo("/writer")}/>;
}

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fading, setFading] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState("");
  useLeafCursor();
  useSeo(location.pathname);

  const goTo = (path) => {
    if (path === location.pathname) return;
    setFading(true);
    setTimeout(() => { navigate(path); setFading(false); window.scrollTo(0, 0); }, 220);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };
  const openBook = (slug) => goTo(`/reviews/${slug}`);

  /* ⌘K / Ctrl+K opens the palette */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen(o => !o); }
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
  }, [location.pathname]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Karla:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const isActive = (path) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path) || (path === "/writer" && location.pathname.startsWith("/reviews"));

  /* her page stands alone — no site nav, no footer, her own world */
  const standalone = location.pathname.startsWith("/tithee") || location.pathname.startsWith("/kishoar");
  if (standalone) {
    return (
      <div style={{ opacity:fading?0:1, transition:"opacity .22s" }}>
        <Routes>
          <Route path="/tithee" element={<TitheePage/>}/>
          <Route path="/kishoar" element={<TitheePage/>}/>
        </Routes>
      </div>
    );
  }

  return (
    <div style={{ background:C.bg, color:C.ink, fontFamily:"'Karla','SF Pro Display',system-ui,sans-serif", minHeight:"100vh", overflowX:"hidden" }}>
      {/* warm paper grain */}
      <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize:"26px 26px", opacity:0.35, pointerEvents:"none", zIndex:0 }}/>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", inset:"0 0 auto 0", zIndex:1000, background:"rgba(251,246,236,0.92)", backdropFilter:"blur(24px)", borderBottom:`1px solid ${C.border}`, height:60, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 44px" }}>
        <div onClick={()=>goTo("/")} style={{ cursor:"pointer" }}><Logo/></div>
        <div style={{ display:"flex", gap:2 }}>
          {NAV.map(([path,label])=>(
            <button key={path} onClick={()=>goTo(path)} style={{ background:"none", border:"none", color:isActive(path)?C.ink:C.muted, padding:"7px 18px", cursor:"pointer", fontSize:14, fontWeight:isActive(path)?700:400, borderRadius:20, transition:"all .2s", borderBottom:isActive(path)?`2px solid ${C.coral}`:"2px solid transparent" }}>{label}</button>
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
        <Routes>
          <Route path="/" element={<LandingPage goTo={goTo}/>}/>
          <Route path="/writer" element={<WriterPage openBook={openBook} showToast={showToast}/>}/>
          <Route path="/engineer" element={<HomePage goTo={goTo}/>}/>
          <Route path="/reviews/:slug" element={<ReviewRoute goTo={goTo}/>}/>
          <Route path="/tithee" element={<TitheePage/>}/>
          <Route path="/kishoar" element={<TitheePage/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
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
              <line x1="32" y1="13.5" x2="32" y2="9.5" stroke="#86B489" strokeWidth="2.6" strokeLinecap="round"/>
              <path d="M32 13 C44 20.5, 45.5 35, 32 53 C18.5 35, 20 20.5, 32 13 Z" fill="#86B489"/>
              <line x1="32" y1="38.5" x2="32" y2="49" stroke="#2C3A30" strokeWidth="2.4" strokeLinecap="round"/>
              <circle cx="32" cy="36.5" r="2.8" fill={C.gold}/>
            </svg>
            <span style={{ fontWeight:700, fontSize:14, color:"rgba(255,255,255,0.9)", fontFamily:"'Fraunces',serif" }}>unsaidscript</span>
          </div>
          <div style={{ display:"flex", gap:16 }}>
            {NAV.map(([path,label])=>(
              <button key={path} onClick={()=>goTo(path)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.4)", cursor:"pointer", fontSize:13 }}>{label}</button>
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

export default function PortfolioApp() {
  return (
    <BrowserRouter>
      <Shell/>
    </BrowserRouter>
  );
}
