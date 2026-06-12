import { useState, useEffect, useRef } from "react";
import { C } from "../../tokens.js";
import { BOOKS, getShelfItem } from "../data/index.js";
import { BookCover, Stars, BarRow, SectionLabel, Card, Pill } from "../components/index.js";
import { TerminalWindow, TLine, TComment, TPrompt } from "../components/TerminalWindow.jsx";
import { ScrollProgress } from "../components/ScrollProgress.jsx";
import { Hills } from "./helpers.jsx";


export function ReviewPage({ slug, openBook, closeBook }) {
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
