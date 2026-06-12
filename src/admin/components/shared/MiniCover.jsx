export function MiniCover({ cover, title, author, w = 84 }) {
  const hgt = Math.round(w * 1.5);
  return (
    <div style={{ width:w, height:hgt, position:"relative", flexShrink:0 }}>
      <div style={{ position:"absolute", right:-3, top:2, bottom:2, width:4, background:"repeating-linear-gradient(180deg,#FFFDF4 0 2px,#E8E0CC 2px 3px)", borderRadius:"0 2px 2px 0" }}/>
      <div style={{ position:"absolute", inset:0, background:cover.bg, borderRadius:"3px 6px 6px 3px", boxShadow:"5px 8px 18px rgba(59,58,47,0.25)", overflow:"hidden", display:"flex", flexDirection:"column", padding:`${w*0.10}px ${w*0.09}px` }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:4, background:"linear-gradient(90deg,rgba(0,0,0,0.3),rgba(0,0,0,0))" }}/>
        {cover.motif==="moon" && <div style={{ position:"absolute", right:w*0.1, top:"12%", width:w*0.26, height:w*0.26, borderRadius:"50%", background:cover.ink, opacity:0.9 }}/>}
        {cover.motif==="whirl" && <div style={{ position:"absolute", right:w*0.08, top:"10%", width:w*0.3, height:w*0.3, border:`1.6px solid ${cover.ink}`, borderRadius:"50%", opacity:0.65 }}/>}
        {cover.motif==="beetle" && <div style={{ position:"absolute", right:w*0.1, top:"11%", width:w*0.22, height:w*0.3, border:`1.6px solid ${cover.ink}`, borderRadius:"50% 50% 46% 46%", opacity:0.55 }}/>}
        <div style={{ marginTop:"auto" }}>
          <div style={{ width:w*0.2, height:1.6, background:cover.ink, opacity:0.7, marginBottom:w*0.06 }}/>
          <div style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:Math.max(9,w*0.105), lineHeight:1.15, color:cover.ink }}>{title}</div>
          <div style={{ fontSize:Math.max(7,w*0.062), color:cover.ink, opacity:0.8, marginTop:w*0.04, letterSpacing:0.5, textTransform:"uppercase" }}>{author}</div>
        </div>
      </div>
    </div>
  );
}
