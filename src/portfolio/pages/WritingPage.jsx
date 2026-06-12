import { useState } from "react";
import { C } from "../../tokens.js";
import { BOOKS, ARTICLES } from "../data/index.js";
import { SectionLabel, Card, Pill, BookCover, Stars, H2 } from "../components/index.js";
import { TerminalWindow, TLine, TComment, TPrompt } from "../components/TerminalWindow.jsx";
import { Cloud, SootSprite } from "./helpers.jsx";

export function WritingPage({ openBook, showToast }) {
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
