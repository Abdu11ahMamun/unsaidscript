import { C } from "../../../tokens.js";
export function Modal({ open, onClose, title, children, width = 720 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:4000, background:"rgba(35,32,24,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"7vh 20px", overflowY:"auto" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:`min(${width}px, 94vw)`, background:C.bg, borderRadius:20, border:`1.5px solid ${C.border}`, boxShadow:"0 30px 90px rgba(0,0,0,0.35)", animation:"osPop .18s ease-out", overflow:"hidden" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 26px", borderBottom:`1px solid ${C.border}`, background:"#fff" }}>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:19, color:C.ink, margin:0 }}>{title}</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:18, color:C.muted, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ padding:26 }}>{children}</div>
      </div>
    </div>
  );
}
