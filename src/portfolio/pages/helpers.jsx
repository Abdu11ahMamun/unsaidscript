import { C } from "../../tokens.js";
export function Cloud({ top, left, scale=1, dur=60, delay=0, opacity=0.9 }) {
  return (
    <div style={{ position:"absolute", top, left, transform:`scale(${scale})`, opacity, animation:`drift ${dur}s linear ${delay}s infinite`, pointerEvents:"none", zIndex:0 }}>
      <div style={{ position:"relative", width:150, height:46 }}>
        <div style={{ position:"absolute", bottom:0, left:0, width:150, height:30, background:"#fff", borderRadius:30 }}/>
        <div style={{ position:"absolute", bottom:14, left:28, width:54, height:54, background:"#fff", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", bottom:10, left:72, width:40, height:40, background:"#fff", borderRadius:"50%" }}/>
      </div>
    </div>
  );
}
export function Hills({ flip=false, front=C.greenS, back="#DCE9DA", bg="transparent" }) {
  return (
    <div style={{ lineHeight:0, transform:flip?"scaleY(-1)":"none", background:bg, position:"relative", zIndex:1 }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width:"100%", height:80, display:"block" }}>
        <path d="M0,80 C240,20 420,95 720,55 C1020,15 1240,90 1440,45 L1440,120 L0,120 Z" fill={back} opacity="0.7"/>
        <path d="M0,95 C300,45 560,110 880,70 C1160,38 1320,100 1440,75 L1440,120 L0,120 Z" fill={front}/>
      </svg>
    </div>
  );
}
export function SootSprite({ size=22, style={}, dur=4, delay=0 }) {
  return (
    <div style={{ position:"absolute", pointerEvents:"none", animation:`bob ${dur}s ease-in-out ${delay}s infinite`, zIndex:2, ...style }}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <g>
          {Array.from({length:14}).map((_,i)=>{
            const a=(i/14)*Math.PI*2;
            return <line key={i} x1="12" y1="12" x2={12+Math.cos(a)*11} y2={12+Math.sin(a)*11} stroke="#3B3A2F" strokeWidth="1.6" strokeLinecap="round"/>;
          })}
          <circle cx="12" cy="12" r="7.5" fill="#3B3A2F"/>
          <circle cx="9.4" cy="11" r="2.1" fill="#fff"/><circle cx="14.6" cy="11" r="2.1" fill="#fff"/>
          <circle cx="9.7" cy="11.3" r="0.9" fill="#222"/><circle cx="14.9" cy="11.3" r="0.9" fill="#222"/>
        </g>
      </svg>
    </div>
  );
}
