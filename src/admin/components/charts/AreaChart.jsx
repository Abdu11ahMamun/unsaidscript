import { useState } from "react";
import { C } from "../../../tokens.js";
export function AreaChart({ data, height = 190, accent = C.green }) {
  const [hov, setHov] = useState(null);
  const W = 640, H = height, padX = 8, padY = 18;
  const max = Math.max(...data.map(d => d.v)) * 1.15;
  const pts = data.map((d,i) => [padX + (i/(data.length-1))*(W-padX*2), H - padY - (d.v/max)*(H-padY*2)]);
  const path = pts.map((p,i) => i===0 ? `M${p[0]},${p[1]}` : `C${(pts[i-1][0]+p[0])/2},${pts[i-1][1]} ${(pts[i-1][0]+p[0])/2},${p[1]} ${p[0]},${p[1]}`).join(" ");
  const area = `${path} L${pts[pts.length-1][0]},${H-6} L${pts[0][0]},${H-6} Z`;
  return (
    <div style={{ position:"relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", display:"block" }}
        onMouseLeave={()=>setHov(null)}
        onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();const x=((e.clientX-r.left)/r.width)*W;let best=0,bd=1e9;pts.forEach((p,i)=>{const d=Math.abs(p[0]-x);if(d<bd){bd=d;best=i;}});setHov(best);}}>
        <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent} stopOpacity="0.28"/><stop offset="100%" stopColor={accent} stopOpacity="0.02"/></linearGradient></defs>
        {[0.25,0.5,0.75].map(g => <line key={g} x1={padX} x2={W-padX} y1={H-padY-(H-padY*2)*g} y2={H-padY-(H-padY*2)*g} stroke={C.border} strokeWidth="1" strokeDasharray="3 5"/>)}
        <path d={area} fill="url(#areaFill)"/>
        <path d={path} fill="none" stroke={accent} strokeWidth="2.6" strokeLinecap="round"/>
        {hov!=null && <><line x1={pts[hov][0]} x2={pts[hov][0]} y1={padY-6} y2={H-padY+8} stroke={accent} strokeWidth="1" strokeDasharray="3 4" opacity="0.6"/><circle cx={pts[hov][0]} cy={pts[hov][1]} r="5.5" fill="#fff" stroke={accent} strokeWidth="2.6"/></>}
      </svg>
      {hov!=null && <div style={{ position:"absolute", left:`${(pts[hov][0]/W)*100}%`, top:0, transform:"translateX(-50%)", background:C.termBg, color:"#e5e7eb", fontFamily:"'Fira Code',monospace", fontSize:11.5, padding:"6px 12px", borderRadius:8, whiteSpace:"nowrap", pointerEvents:"none" }}><span style={{ color:accent, fontWeight:700 }}>{data[hov].v}</span> visitors · {data[hov].d}</div>}
      <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'Fira Code',monospace", fontSize:10, color:C.muted, marginTop:4 }}>
        <span>{data[0].d}</span><span>{data[Math.floor(data.length/2)].d}</span><span>{data[data.length-1].d}</span>
      </div>
    </div>
  );
}
