import { C } from "../../tokens.js";
export function H2({ children = null, style = {} }) {
  return (
    <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:600, letterSpacing:"-0.02em", margin:"0 0 52px", color:C.ink, fontFamily:"'Fraunces',serif", ...style }}>
      {children}
    </h2>
  );
}
