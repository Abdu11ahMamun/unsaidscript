import { useState } from "react";
import { C, FONT_SERIF, FONT_MONO } from "../../tokens.js";
import { Btn } from "../components/shared/Btn.jsx";
import { Field, TextArea } from "../components/shared/Field.jsx";
import { Panel, SerifH, MonoLabel } from "../components/shared/index.js";

const MOODS = ["🔥","🙂","😌","😔","🌧"];  // ← এই line যোগ করুন

export function DiaryPage({ diary, setDiary, toast }) {
  const [sel, setSel] = useState(diary[0]?.id);
  const entry = diary.find(d=>d.id===sel) || diary[0];
  const upd = (k,v)=>setDiary(ds=>ds.map(d=>d.id===entry.id ? { ...d, [k]:v } : d));
  const words = ["morning","afternoon","evening","gratitude"].map(k=>String(entry[k]||"").trim().split(/\s+/).filter(Boolean).length).reduce((a,b)=>a+b,0);

  return (
    <div style={{ display:"grid", gridTemplateColumns:"250px 1fr", gap:20 }}>
      {/* entry list */}
      <div>
        <Btn style={{ width:"100%", justifyContent:"center", marginBottom:14 }} onClick={()=>toast("new entry — POST /api/v1/diary")}>+ Today's page</Btn>
        {diary.map(d=>(
          <div key={d.id} onClick={()=>setSel(d.id)}
            style={{ padding:"13px 15px", borderRadius:12, cursor:"pointer", marginBottom:8,
              background: sel===d.id ? "#fff" : "transparent",
              border:`1.5px solid ${sel===d.id ? C.coral+"55" : C.border}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:12.5, fontWeight:700, color:C.ink }}>{d.date.split(" · ")[0]}</span>
              <span style={{ fontSize:15 }}>{d.mood}</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, marginTop:3, fontFamily:FONT_MONO }}>{d.date.split(" · ")[1]} · {d.words} words</div>
          </div>
        ))}
      </div>

      {/* the page */}
      <Panel pad={32} style={{ position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-26, right:6, fontFamily:FONT_SERIF, fontStyle:"italic", fontSize:130, color:C.coral, opacity:0.05, userSelect:"none" }}>"</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
          <SerifH size={22} style={{ fontStyle:"italic" }}>{entry.date}</SerifH>
          <span style={{ fontFamily:FONT_MONO, fontSize:11.5, color:C.muted }}>{entry.weather} · {words} words</span>
        </div>

        <div style={{ display:"flex", gap:8, margin:"14px 0 24px", alignItems:"center" }}>
          <MonoLabel>Mood</MonoLabel>
          <div style={{ display:"flex", gap:6, marginBottom:8 }}>
            {MOODS.map(m=>(
              <button key={m} onClick={()=>upd("mood",m)}
                style={{ fontSize:18, padding:"5px 9px", borderRadius:10, cursor:"pointer",
                  background: entry.mood===m ? C.coralS : "transparent",
                  border:`1.5px solid ${entry.mood===m ? C.coral+"66" : "transparent"}`, transition:"all .15s" }}>{m}</button>
            ))}
          </div>
        </div>

        <Field label="🌤 আজ যার জন্য কৃতজ্ঞ — gratitude">
          <TextArea rows={2} value={entry.gratitude} onChange={e=>upd("gratitude",e.target.value)} style={{ fontFamily:FONT_SERIF, fontStyle:"italic", fontSize:15 }}/>
        </Field>
        <Field label="🌅 সকাল — morning">
          <TextArea rows={3} value={entry.morning} onChange={e=>upd("morning",e.target.value)}/>
        </Field>
        <Field label="☀️ দুপুর — afternoon">
          <TextArea rows={3} value={entry.afternoon} onChange={e=>upd("afternoon",e.target.value)}/>
        </Field>
        <Field label="🌙 সন্ধ্যা — evening">
          <TextArea rows={3} value={entry.evening} onChange={e=>upd("evening",e.target.value)} placeholder="The day isn't over yet…"/>
        </Field>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
          <span style={{ fontSize:12, color:C.muted, fontStyle:"italic", fontFamily:FONT_SERIF }}>"যা অব্যক্ত থেকে যায়, ডায়েরি তা ধরে রাখে।"</span>
          <Btn onClick={()=>toast("entry saved ✓ (mock — POST /api/v1/diary)")}>✓ Save page</Btn>
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NOTES — the Notion-ish drawer
   ⇄ GET /api/v1/notes · CRUD /api/v1/notes/{id}/blocks
════════════════════════════════════════════════════════════ */
