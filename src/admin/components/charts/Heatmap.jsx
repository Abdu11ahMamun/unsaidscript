import { C } from "../../../tokens.js";
export function Heatmap({ data, weeks = 16 }) {
  const cell = (v) => v===0?C.bg2:v<20?"#D7E6CF":v<40?"#A9CBA0":v<60?"#7CAF74":C.green;
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${weeks}, 1fr)`, gap:4 }}>
        {Array.from({ length:weeks }).map((_,w) => (
          <div key={w} style={{ display:"grid", gridTemplateRows:"repeat(7,1fr)", gap:4 }}>
            {Array.from({ length:7 }).map((_,d) => {
              const v = data[w*7+d] ?? 0;
              return <div key={d} title={`${v} min`} style={{ aspectRatio:"1", borderRadius:3.5, background:cell(v) }}/>;
            })}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center", gap:5, marginTop:10, fontSize:10.5, fontFamily:"'Fira Code',monospace", color:C.muted }}>
        less {[C.bg2,"#D7E6CF","#A9CBA0","#7CAF74",C.green].map(c => <span key={c} style={{ width:10, height:10, borderRadius:3, background:c, display:"inline-block" }}/>)} more
      </div>
    </div>
  );
}
