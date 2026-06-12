import { C, FONT_SERIF, FONT_MONO } from "../../tokens.js";
import { MOCK_PROFILE, API_CONTRACT } from "../data/index.js";
import { Btn } from "../components/shared/Btn.jsx";
import { Field, Input } from "../components/shared/Field.jsx";
import { Panel, SerifH, MonoLabel } from "../components/shared/index.js";

export function SettingsPage({ toast }) {
  return (
    <div style={{ maxWidth:860 }}>
      <SerifH size={26}>Settings & the contract</SerifH>
      <p style={{ color:C.muted, fontSize:13.5, margin:"6px 0 26px" }}>Profile, preferences — and the exact API surface this UI expects from the Spring Boot service.</p>

      <Panel pad={28} style={{ marginBottom:16 }}>
        <MonoLabel color={C.green}>Profile</MonoLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <Field label="Display name"><Input defaultValue={MOCK_PROFILE.name}/></Field>
          <Field label="Email"><Input defaultValue={MOCK_PROFILE.email}/></Field>
        </div>
        <Btn small onClick={()=>toast("profile saved ✓ (mock)")}>✓ Save profile</Btn>
      </Panel>

      <Panel pad={0} style={{ overflow:"hidden" }}>
        <div style={{ padding:"22px 28px 16px" }}>
          <MonoLabel color={C.coral}>API contract — hand this to the Spring Boot service</MonoLabel>
          <SerifH size={18}>What this UI is waiting for</SerifH>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}` }}>
          {API_CONTRACT.map(([m, path, used, st],i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"70px 1.6fr 1fr auto", gap:14, alignItems:"center", padding:"11px 28px", borderBottom: i<API_CONTRACT.length-1?`1px solid ${C.border}`:"none", background: i%2 ? C.bg : "#fff" }}>
              <span style={{ fontFamily:FONT_MONO, fontSize:11, fontWeight:700, color: m==="GET"?C.sky:m==="POST"?C.green:C.gold }}>{m}</span>
              <span style={{ fontFamily:FONT_MONO, fontSize:12, color:C.ink }}>{path}</span>
              <span style={{ fontSize:12, color:C.muted }}>{used}</span>
              <span style={{ fontSize:11, fontFamily:FONT_MONO, color:C.muted }}>{st}</span>
            </div>
          ))}
        </div>
        <div style={{ padding:"14px 28px", fontFamily:FONT_MONO, fontSize:11.5, color:C.muted, background:C.bg }}>
          <span style={{ color:C.termGreen }}>❯</span> base URL configurable · JWT in Authorization header · all responses {"{ data, error }"}
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   COMMAND PALETTE — ⌘K inside the OS
════════════════════════════════════════════════════════════ */
