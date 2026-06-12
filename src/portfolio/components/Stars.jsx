import { C } from "../../tokens.js";
export function Stars({ value, size = 15 }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:2 }}>
      {[1,2,3,4,5].map(i => {
        const fill = value >= i ? 1 : value >= i - 0.5 ? 0.5 : 0;
        return (
          <span key={i} style={{ position:"relative", fontSize:size, lineHeight:1 }}>
            <span style={{ color:"#E3DAC2" }}>★</span>
            <span style={{ position:"absolute", left:0, top:0, width:`${fill*100}%`, overflow:"hidden", color:C.gold }}>★</span>
          </span>
        );
      })}
      <span style={{ fontSize:size-3, color:C.muted, fontFamily:"'Fira Code',monospace", marginLeft:5 }}>
        {value.toFixed(1)}
      </span>
    </span>
  );
}
