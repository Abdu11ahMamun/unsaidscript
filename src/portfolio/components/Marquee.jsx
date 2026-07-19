import { C } from "../../tokens.js";
const ITEMS = [
  ["অব্যক্ত","bn"],["spring boot","tech"],["হিমু","bn"],["murakami","lit"],
  ["java","tech"],["রবীন্দ্রনাথ","bn"],["react","tech"],["rumi","lit"],
  ["llm × fintech","tech"],["চা","bn"],["kafka","lit"],["clean code","tech"],
  ["মিসির আলি","bn"],["microservices","tech"],["অনুবাদ — at the desk","bn"],
];
const Row = () => (
  <>
    {ITEMS.map(([w,k],i) => (
      <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:26, paddingRight:26 }}>
        <span style={k==="tech"
          ? { fontFamily:"'Fira Code',monospace", fontSize:13, color:C.muted, letterSpacing:0.5 }
          : { fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:16, color:k==="bn"?C.coral:C.ink, opacity:k==="bn"?0.85:0.7 }}>
          {w}
        </span>
        <span style={{ color:C.gold, fontSize:10, opacity:0.7 }}>✦</span>
      </span>
    ))}
  </>
);
export function Marquee() {
  return (
    <div className="marqueeWrap" style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, background:"rgba(255,255,255,0.5)", padding:"13px 0", overflow:"hidden" }}>
      <div className="marqueeTrack" style={{ display:"flex", width:"max-content" }}>
        <Row/><Row/>
      </div>
    </div>
  );
}
