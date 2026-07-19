import { useState } from "react";
import { C } from "../../tokens.js";
import { BOOKS, NOTES, NOTE_CATEGORIES, CHAPTERS, TRANSLATION_DESK, TRANSLATION_PIPELINE } from "../data/index.js";
import { SectionLabel, Card, Pill, BookCover, Stars, H2 } from "../components/index.js";
import { TerminalWindow, TLine, TComment, TPrompt } from "../components/TerminalWindow.jsx";
import { Cloud, SootSprite, Hills } from "./helpers.jsx";

export function WriterPage({ openBook, showToast }) {
  const [noteFilter, setNoteFilter] = useState("All");
  const featured = BOOKS[0];
  const rest = BOOKS.slice(1);
  const avg = (BOOKS.reduce((a,b)=>a+b.rating,0)/BOOKS.length).toFixed(1);
  const shownNotes = noteFilter==="All" ? NOTES : NOTES.filter(n=>n.category===noteFilter);

  return (
    <div style={{ position:"relative", overflow:"hidden" }}>

      {/* ═══ HERO — the writer's desk ═══ */}
      <section className="rvgroup" style={{ padding:"84px 60px 60px", position:"relative", overflow:"hidden" }}>
        <Cloud top="6%" left="-15%" scale={0.8} dur={80} opacity={0.6}/>
        <SootSprite style={{ top:90, right:"6%" }} size={17} dur={4}/>
        {/* অব্যক্ত watermark */}
        <div style={{ position:"absolute", top:10, right:-30, fontFamily:"'Fraunces',serif", fontStyle:"italic", fontWeight:600, fontSize:"clamp(110px,13vw,190px)", color:C.coral, opacity:0.05, transform:"rotate(-4deg)", pointerEvents:"none", lineHeight:1, userSelect:"none", whiteSpace:"nowrap" }}>অব্যক্ত</div>

        <div style={{ display:"grid", gridTemplateColumns:"1.05fr 1fr", gap:48, alignItems:"center" }}>
          <div>
            <SectionLabel color={C.coral}>The Writer</SectionLabel>
            <h1 style={{ fontSize:"clamp(38px,5.2vw,66px)", fontWeight:600, letterSpacing:"-0.03em", margin:"0 0 18px", color:C.ink, lineHeight:1.06, fontFamily:"'Fraunces',serif" }}>
              Reader first.<br/><span style={{ color:C.coral, fontStyle:"italic" }}>Writer next.</span>
            </h1>
            <p style={{ color:C.muted, fontSize:15.5, lineHeight:1.85, maxWidth:500, margin:"0 0 26px" }}>
              I grew up inside books — Himu's Dhaka, Murakami's wells, Rumi's fire — and this
              is where I write back. Honest reviews today, translations at the desk,
              and one day, ইনশাআল্লাহ, a book with my own name on the spine.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
              <a href="#reviews" style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.coral, color:"#fff", padding:"13px 24px", borderRadius:12, textDecoration:"none", fontSize:13.5, fontWeight:700, boxShadow:`0 10px 30px ${C.coral}44` }}>📚 read the reviews</a>
              <a href="#story" style={{ display:"inline-flex", alignItems:"center", background:"#fff", color:C.ink, padding:"13px 24px", borderRadius:12, textDecoration:"none", fontSize:13.5, fontWeight:600, border:`1.5px solid ${C.border}` }}>my story in chapters →</a>
            </div>
            <div style={{ display:"flex", gap:16, fontSize:12, color:C.muted, fontFamily:"'Fira Code',monospace", flexWrap:"wrap" }}>
              <span>📚 {BOOKS.length} reviews</span>
              <span>★ avg {avg}/5</span>
              <span>🖋 translations: at the desk</span>
              <span>✍️ {NOTES.length} notes planned</span>
            </div>
          </div>

          <div>
            <TerminalWindow title="writer.sh">
              <TPrompt>cat ./writer/roadmap.md</TPrompt>
              <TLine color={C.termGreen}>{"[now ] book reviews — live on the shelf"}</TLine>
              <TLine color={C.termYellow}>{"[next] translations — English ⇄ বাংলা"}</TLine>
              <TLine color={C.termBlue}>{"[soon] notes: tutorials · research · opinions"}</TLine>
              <TLine color={C.termPurple}>{"[one day] a book of my own"}</TLine>
              <TPrompt>grep -r "favourite" book-reviews/</TPrompt>
              <TLine color={C.termGreen}>{"  shafak, rumi, humayun, rabindranath…"}</TLine>
              <TLine color={C.termGreen}>{"  murakami, kafka — and counting"}</TLine>
            </TerminalWindow>
            <div style={{ textAlign:"center", marginTop:14, fontSize:12.5, color:C.muted, fontStyle:"italic", fontFamily:"'Fraunces',serif" }}>
              the unsaid, slowly becoming script
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE STORY — chapters of a reading life ═══ */}
      <section id="story" className="rvgroup" style={{ background:C.bg, padding:"80px 60px 70px", position:"relative", overflow:"hidden" }}>
        <SootSprite style={{ top:60, right:"5%" }} size={16} dur={4.2}/>
        <SectionLabel color={C.coral}>The Story</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start", marginBottom:56 }}>
          <div>
            <H2 style={{ margin:"0 0 16px" }}>A life, told in<br/><span style={{ color:C.coral, fontStyle:"italic" }}>chapters</span></H2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.85, maxWidth:480 }}>
              Every engineer has a stack. Mine starts with a bookshelf. These are the pages
              that built the person behind the code — and the dream the code is quietly carrying.
            </p>
          </div>
          <TerminalWindow title="soul.log">
            <TPrompt>cat life.log | tail -4</TPrompt>
            <TLine color={C.termYellow}>{"[2014] first book opened — process started"}</TLine>
            <TLine color={C.termBlue}>{"[2016] fell in love: state = irreversible"}</TLine>
            <TLine color={C.termPurple}>{"[teen] himu.walk(barefoot) → rabindranath.read()"}</TLine>
            <TLine color={C.termGreen}>{"[now ] bridge.build(passion, responsibility)"}</TLine>
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

      {/* ═══ BOOK REVIEWS ═══ */}
      <section id="reviews" className="rvgroup" style={{ background:"#fff", padding:"70px 60px 80px" }}>
        <SectionLabel color={C.green}>The Shelf</SectionLabel>
        <H2 style={{ margin:"0 0 14px" }}>Book <span style={{ color:C.green, fontStyle:"italic" }}>Reviews</span></H2>
        <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, maxWidth:560, margin:"0 0 44px" }}>
          Honest reviews of the books that built me — from Rumi to Rabindranath to Murakami.
          When I think about my life now, mostly I remember the books I've read.
        </p>

        {/* featured review */}
        <div onClick={()=>openBook(featured.slug)}
          style={{ background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:24, padding:"36px 42px", marginBottom:24, cursor:"pointer", display:"grid", gridTemplateColumns:"auto 1fr", gap:44, alignItems:"center", position:"relative", overflow:"hidden", transition:"all .25s", boxShadow:"0 2px 12px rgba(59,58,47,0.05)" }}
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

        {/* review grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {rest.map((b)=>(
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
      </section>

      {/* ═══ TRANSLATION DESK ═══ */}
      <section id="translations" className="rvgroup" style={{ background:C.bg, padding:"80px 60px", position:"relative", overflow:"hidden" }}>
        <Cloud top="8%" left="-12%" scale={0.7} dur={90} opacity={0.5}/>
        <SectionLabel color={C.gold}>In Progress</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
          <div>
            <H2 style={{ margin:"0 0 16px" }}>The Translation<br/><span style={{ color:C.gold, fontStyle:"italic" }}>Desk</span></H2>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.85, maxWidth:460, margin:"0 0 22px" }}>
              {TRANSLATION_DESK.focus}. Nothing published yet — and I'd rather show you an honest
              empty desk than a fake shelf. {TRANSLATION_DESK.note}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:14, maxWidth:440 }}>
              {TRANSLATION_PIPELINE.map(([label,val])=>(
                <div key={label}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:6 }}>
                    <span style={{ color:C.ink, fontWeight:600 }}>{label}</span>
                    <span style={{ color:C.muted, fontFamily:"'Fira Code',monospace" }}>{Math.round(val*100)}%</span>
                  </div>
                  <div style={{ height:6, borderRadius:4, background:"#fff", border:`1px solid ${C.border}`, overflow:"hidden" }}>
                    <div style={{ width:`${val*100}%`, height:"100%", borderRadius:4, background:`linear-gradient(90deg,${C.gold},${C.coral})`, transition:"width 1s ease" }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TerminalWindow title="translate.sh">
            <TPrompt>./translate --status</TPrompt>
            <TLine color={C.termYellow}>{"stage: " + TRANSLATION_DESK.stage}</TLine>
            <TLine color={C.termBlue}>{"pair : English ⇄ বাংলা"}</TLine>
            <TComment>{"# a translator is first a slow reader"}</TComment>
            <TPrompt>ls ./published/</TPrompt>
            <TLine color={C.termGreen}>{"(empty — for now. subscribe below ↓)"}</TLine>
          </TerminalWindow>
        </div>
      </section>

      <Hills front="#fff" back="#EDE6D4" bg={C.bg}/>

      {/* ═══ NOTES — tutorials · research · opinions ═══ */}
      <section id="notes" className="rvgroup" style={{ background:"#fff", padding:"70px 60px 80px" }}>
        <SectionLabel color={C.sky}>Notes</SectionLabel>
        <H2 style={{ margin:"0 0 14px" }}>Tutorials, research &<br/><span style={{ color:C.sky, fontStyle:"italic" }}>opinions</span></H2>
        <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, maxWidth:560, margin:"0 0 32px" }}>
          The engineer and the reader share one notebook — teaching notes from the fintech
          trenches, my research topics in the open, and the occasional strong opinion.
        </p>

        {/* category filter */}
        <div style={{ display:"flex", gap:8, marginBottom:36, flexWrap:"wrap" }}>
          {NOTE_CATEGORIES.map(f=>(
            <button key={f} onClick={()=>setNoteFilter(f)} style={{ background:noteFilter===f?C.sky:"#fff", border:`1.5px solid ${noteFilter===f?C.sky:C.border}`, color:noteFilter===f?"#fff":C.muted, padding:"8px 20px", borderRadius:30, cursor:"pointer", fontSize:13, fontWeight:600, transition:"all .2s" }}>{f}</button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {shownNotes.map((item)=>(
            <Card key={item.title} accent={C.sky} style={{ cursor:"pointer" }}>
              <div onClick={()=>showToast("this note is still being written ✍️")}>
                <div style={{ height:100, borderRadius:12, marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", background:C.skyS, border:`1px solid ${C.sky}30`, fontSize:38 }}>
                  {item.emoji}
                </div>
                <Pill color={C.sky}>{item.category}</Pill>
                <h3 style={{ fontSize:15, fontWeight:700, margin:"12px 0 8px", lineHeight:1.45, color:C.ink, fontFamily:"'Fraunces',serif" }}>{item.title}</h3>
                <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:"0 0 16px" }}>{item.desc}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11.5, color:C.muted, fontFamily:"monospace" }}>{item.read} read</span>
                  <span style={{ color:C.sky, fontSize:12.5, fontWeight:700 }}>Coming soon →</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
            <button onClick={()=>showToast("newsletter launching soon 🌱")} style={{ background:C.green, border:"none", color:"#fff", padding:"13px 22px", borderRadius:"0 12px 12px 0", cursor:"pointer", fontSize:13, fontWeight:700 }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
