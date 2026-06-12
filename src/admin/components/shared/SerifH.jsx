import { C } from "../../../tokens.js";
export function SerifH({ children, size = 22, style = {} }) {
  return (
    <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:600, fontSize:size, color:C.ink, margin:0, letterSpacing:"-0.02em", ...style }}>
      {children}
    </h2>
  );
}
export function MonoLabel({ children, color = C.muted }) {
  return (
    <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color, fontFamily:"'Fira Code','SF Mono',monospace", marginBottom:8 }}>
      {children}
    </div>
  );
}