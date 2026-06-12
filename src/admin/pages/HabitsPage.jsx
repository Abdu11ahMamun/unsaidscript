import { useState, useEffect, useRef } from "react";
import { C, FONT_SERIF, FONT_MONO } from "../../tokens.js";
import { READ_HEAT, WEEK_READING } from "../data/index.js";
import { Btn } from "../components/shared/Btn.jsx";
import { Tag } from "../components/shared/Tag.jsx";
import { Ring } from "../components/charts/Ring.jsx";
import { Heatmap } from "../components/charts/Heatmap.jsx";
import { VBars } from "../components/charts/VBars.jsx";
import { Panel, SerifH, MonoLabel } from "../components/shared/index.js";

export function HabitsPage({ habits, setHabits, toast }) {
  const bump = (id, delta) => {
    setHabits(hs => hs.map(h => h.id===id ? { ...h, done: Math.max(0, Math.round((h.done + delta*(h.unit==="hrs"?0.5:h.unit==="words"?50:1))*10)/10) } : h));
  };
  const doneCount = habits.filter(h=>h.done>=h.goal).length;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
        <div>
          <SerifH size={26}>Tend the garden <span style={{ fontStyle:"italic", color:C.green }}>🌱</span></SerifH>
          <p style={{ color:C.muted, fontSize:13.5, margin:"6px 0 0" }}>{doneCount} of {habits.length} complete today — small things, watered daily</p>
        </div>
        <Btn kind="ghost" onClick={()=>toast("custom habits arrive with POST /api/v1/habits")}>+ Add habit</Btn>
      </div>

      {/* rings */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginBottom:18 }}>
        {habits.map(h=>{
          const pct = Math.min(h.done/h.goal, 1);
          return (
            <Panel key={h.id} pad={20} style={{ display:"flex", gap:18, alignItems:"center" }}>
              <Ring pct={pct} color={h.color}>
                <span style={{ fontSize:20 }}>{h.icon}</span>
              </Ring>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:700, fontSize:14.5, color:C.ink }}>{h.label}</span>
                  {h.done>=h.goal && <Tag color={C.green}>done ✓</Tag>}
                </div>
                <div style={{ fontFamily:FONT_MONO, fontSize:12.5, color:C.muted, margin:"5px 0 10px" }}>
                  <span style={{ color:h.color, fontWeight:700 }}>{h.done}</span> / {h.goal} {h.unit} · 🔥 {h.streak}d streak
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>bump(h.id,-1)} style={{ width:30, height:30, borderRadius:8, border:`1.5px solid ${C.border}`, background:"#fff", cursor:"pointer", color:C.muted, fontWeight:700 }}>−</button>
                  <button onClick={()=>bump(h.id,1)} style={{ width:30, height:30, borderRadius:8, border:"none", background:h.color, cursor:"pointer", color:"#fff", fontWeight:700 }}>+</button>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      {/* reading depth */}
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:16 }}>
        <Panel>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div>
              <MonoLabel color={C.green}>Reading · last 16 weeks</MonoLabel>
              <SerifH size={18}>The long garden</SerifH>
            </div>
            <Tag color={C.green}>112 days watered</Tag>
          </div>
          <Heatmap data={READ_HEAT}/>
        </Panel>
        <Panel>
          <MonoLabel color={C.coral}>This week</MonoLabel>
          <SerifH size={18} style={{ marginBottom:18 }}>Minutes with books</SerifH>
          <VBars data={WEEK_READING}/>
          <div style={{ marginTop:14, fontFamily:FONT_MONO, fontSize:11.5, color:C.muted, textAlign:"center" }}>
            330 min total · best: Wednesday
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DIARY — সকাল থেকে সন্ধ্যা
   ⇄ GET /api/v1/diary · POST /api/v1/diary
════════════════════════════════════════════════════════════ */
const MOODS = ["🔥","🙂","😌","😔","🌧"];
