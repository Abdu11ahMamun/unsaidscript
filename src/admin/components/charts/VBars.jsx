import { C } from "../../../tokens.js";
export function VBars({ data, accent = C.coral, height = 120 }) {
  const max = Math.max(...data.map(d => d.v)) * 1.1;
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:10, height }}>
      {data.map((d,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6, height:"100%", justifyContent:"flex-end" }}>
          <div title={`${d.v} min`} style={{ width:"100%", maxWidth:30, height:`${(d.v/max)*100}%`, background:`linear-gradient(180deg,${accent},${accent}88)`, borderRadius:"6px 6px 3px 3px", transition:"height .8s cubic-bezier(.3,.7,.3,1)" }}/>
          <span style={{ fontSize:10, fontFamily:"'Fira Code',monospace", color:C.muted }}>{d.d}</span>
        </div>
      ))}
    </div>
  );
}
