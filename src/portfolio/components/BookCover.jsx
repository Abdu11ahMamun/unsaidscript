import { useState } from "react";
export function BookCover({ book, w = 150, tilt = true }) {
  const [h, setH] = useState(false);
  const hgt = Math.round(w * 1.5);
  const cv = book.cover || {};
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width:w, height:hgt, position:"relative", flexShrink:0,
        transform: tilt ? (h ? "perspective(700px) rotateY(-14deg) translateY(-4px)" : "perspective(700px) rotateY(-7deg)") : "none",
        transition:"transform .35s ease", transformStyle:"preserve-3d" }}>
      <div style={{ position:"absolute", right:-Math.max(4,w*0.035), top:Math.max(3,w*0.02), bottom:Math.max(3,w*0.02),
        width:Math.max(5,w*0.045), background:"repeating-linear-gradient(180deg,#FFFDF4 0 2px,#E8E0CC 2px 3px)", borderRadius:"0 3px 3px 0" }}/>
      <div style={{ position:"absolute", inset:0, background:cv.bg, borderRadius:"4px 8px 8px 4px",
        boxShadow: h ? "14px 18px 38px rgba(59,58,47,0.35)" : "8px 12px 26px rgba(59,58,47,0.28)",
        transition:"box-shadow .35s ease", overflow:"hidden", display:"flex", flexDirection:"column",
        padding:`${w*0.10}px ${w*0.09}px` }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:Math.max(5,w*0.06),
          background:"linear-gradient(90deg,rgba(0,0,0,0.30),rgba(0,0,0,0))" }}/>
        {cv.motif==="moon" && <div style={{ position:"absolute", right:w*0.10, top:hgt*0.13, width:w*0.30, height:w*0.30 }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:cv.ink, opacity:0.9 }}/>
        </div>}
        {cv.motif==="whirl" && <div style={{ position:"absolute", right:w*0.08, top:hgt*0.11, width:w*0.34, height:w*0.34,
          border:`2px solid ${cv.ink}`, borderRadius:"50%", opacity:0.65, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:"38%", height:"38%", border:`2px solid ${cv.ink}`, borderRadius:"50%" }}/>
        </div>}
        {cv.motif==="beetle" && <div style={{ position:"absolute", right:w*0.10, top:hgt*0.12, width:w*0.26, height:w*0.34,
          border:`2px solid ${cv.ink}`, borderRadius:"50% 50% 46% 46%", opacity:0.55 }}>
          <div style={{ position:"absolute", left:"50%", top:"12%", bottom:"8%", width:1.6, background:cv.ink }}/>
        </div>}
        <div style={{ marginTop:"auto", position:"relative" }}>
          <div style={{ width:w*0.22, height:2, background:cv.ink, opacity:0.7, marginBottom:w*0.06 }}/>
          <div style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:Math.max(11,w*0.105), lineHeight:1.18, color:cv.ink }}>{book.title}</div>
          <div style={{ fontFamily:"'Karla',sans-serif", fontSize:Math.max(8.5,w*0.062), color:cv.ink, opacity:0.8, marginTop:w*0.045, letterSpacing:0.6, textTransform:"uppercase" }}>{book.author}</div>
        </div>
      </div>
    </div>
  );
}
