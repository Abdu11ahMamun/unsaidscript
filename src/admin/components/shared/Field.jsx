import { C } from "../../../tokens.js";
import { FONT_MONO } from "../../../tokens.js";
export const inputStyle = { width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"11px 14px", fontSize:14, color:C.ink, outline:"none", boxSizing:"border-box", fontFamily:"inherit", transition:"border-color .2s" };
export function Input(props) {
  return <input {...props} style={{ ...inputStyle, ...(props.style||{}) }}
    onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border}/>;
}
export function TextArea(props) {
  return <textarea {...props} style={{ ...inputStyle, resize:"vertical", ...(props.style||{}) }}
    onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border}/>;
}
export function Field({ label, children }) {
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color:C.muted, fontFamily:FONT_MONO, marginBottom:8 }}>{label}</div>
      {children}
    </div>
  );
}
