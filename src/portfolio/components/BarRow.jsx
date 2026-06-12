import { useState, useEffect, useRef } from "react";
import { C } from "../../tokens.js";
export function BarRow({ label, value, accent }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold:0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:13, color:C.ink, fontWeight:600 }}>{label}</span>
        <span style={{ fontSize:12, color:C.muted, fontFamily:"'Fira Code',monospace" }}>{value.toFixed(1)} / 5</span>
      </div>
      <div style={{ height:7, borderRadius:5, background:C.bg2, overflow:"hidden" }}>
        <div style={{ height:"100%", width: on ? `${(value/5)*100}%` : "0%", borderRadius:5,
          background:`linear-gradient(90deg,${accent},${accent}AA)`, transition:"width 1s cubic-bezier(.3,.7,.3,1)" }}/>
      </div>
    </div>
  );
}
