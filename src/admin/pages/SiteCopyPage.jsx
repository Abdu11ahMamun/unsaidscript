import { useState } from "react";
import { C, FONT_SERIF, FONT_MONO } from "../../tokens.js";
import { INIT_SITE_COPY } from "../data/index.js";
import { Btn } from "../components/shared/Btn.jsx";
import { Field, Input, TextArea } from "../components/shared/Field.jsx";
import { Toggle } from "../components/shared/Toggle.jsx";
import { Panel, SerifH, MonoLabel } from "../components/shared/index.js";

export function SiteCopyPage({ copy, setCopy, toast }) {
  const set = (k,v)=>setCopy(c=>({ ...c, [k]:v }));
  return (
    <div style={{ maxWidth:760 }}>
      <SerifH size={26}>The public words</SerifH>
      <p style={{ color:C.muted, fontSize:13.5, margin:"6px 0 26px" }}>Everything a visitor reads on unsaidscript.dev, editable here. Saved through <span style={{ fontFamily:FONT_MONO }}>PUT /api/v1/site/copy</span>.</p>

      <Panel pad={28} style={{ marginBottom:16 }}>
        <MonoLabel color={C.coral}>Hero</MonoLabel>
        <Field label='Rotating words — "I read, therefore I ___"'>
          <Input value={copy.rotatingWords} onChange={e=>set("rotatingWords",e.target.value)}/>
          <div style={{ fontSize:11.5, color:C.muted, marginTop:8, fontFamily:FONT_MONO }}>comma-separated · cycles every 2.6s</div>
        </Field>
        <Field label="Hero lede">
          <TextArea rows={3} value={copy.heroLede} onChange={e=>set("heroLede",e.target.value)}/>
        </Field>
        <Field label="Status line — currently reading">
          <Input value={copy.statusReading} onChange={e=>set("statusReading",e.target.value)}/>
        </Field>
      </Panel>

      <Panel pad={28} style={{ marginBottom:16 }}>
        <MonoLabel color={C.green}>Availability & contact</MonoLabel>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:C.ink }}>Available for work</div>
            <div style={{ fontSize:12, color:C.muted }}>controls the green dot in the navbar</div>
          </div>
          <Toggle on={copy.available} onChange={v=>set("available",v)}/>
        </div>
        <Field label="Contact email"><Input value={copy.contactEmail} onChange={e=>set("contactEmail",e.target.value)}/></Field>
        <Field label="Footer line"><Input value={copy.footerLine} onChange={e=>set("footerLine",e.target.value)}/></Field>
      </Panel>

      <div style={{ display:"flex", gap:12 }}>
        <Btn onClick={()=>toast("site copy saved ✓ (mock)")}>✓ Save changes</Btn>
        <Btn kind="ghost" onClick={()=>toast("preview will open unsaidscript.dev?draft=1")}>👁 Preview site</Btn>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HABITS — the gardener's log
   ⇄ GET /api/v1/habits/today · PUT /api/v1/habits/{id}/log
════════════════════════════════════════════════════════════ */
