import { useState } from "react";
import { C, FONT_SERIF, FONT_MONO } from "../../tokens.js";
import { Btn } from "../components/shared/Btn.jsx";
import { Tag } from "../components/shared/Tag.jsx";
import { Panel, SerifH, MonoLabel } from "../components/shared/index.js";
export function NotesPage({ notes, setNotes, toast }) {
  const [sel, setSel] = useState(notes[0]?.id);
  const page = notes.find(n=>n.id===sel) || notes[0];
  const toggleTodo = (bi) => {
    setNotes(ns => ns.map(n => n.id!==page.id ? n : { ...n, blocks: n.blocks.map((b,i)=> i===bi ? { ...b, done:!b.done } : b) }));
  };
  const doneTodos = page.blocks.filter(b=>b.t==="todo"&&b.done).length;
  const totalTodos = page.blocks.filter(b=>b.t==="todo").length;

  return (
    <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:20 }}>
      {/* page tree */}
      <div>
        <Btn style={{ width:"100%", justifyContent:"center", marginBottom:14 }} onClick={()=>toast("new page — POST /api/v1/notes")}>+ New page</Btn>
        <MonoLabel>Workspace</MonoLabel>
        {notes.map(n=>(
          <div key={n.id} onClick={()=>setSel(n.id)}
            style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 13px", borderRadius:10, cursor:"pointer", marginBottom:4,
              background: sel===n.id ? "#fff" : "transparent",
              border:`1.5px solid ${sel===n.id ? C.sky+"66" : "transparent"}` }}>
            <span style={{ fontSize:15 }}>{n.icon}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight: sel===n.id?700:500, color:C.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{n.title}</div>
              <div style={{ fontSize:10.5, color:C.muted, fontFamily:FONT_MONO }}>{n.updated}</div>
            </div>
          </div>
        ))}
      </div>

      {/* page body */}
      <Panel pad={34}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
          <SerifH size={26}><span style={{ marginRight:12 }}>{page.icon}</span>{page.title}</SerifH>
          {totalTodos>0 && <Tag color={doneTodos===totalTodos?C.green:C.sky}>{doneTodos}/{totalTodos} done</Tag>}
        </div>
        <div style={{ fontSize:11.5, color:C.muted, fontFamily:FONT_MONO, marginBottom:24 }}>updated {page.updated} · type <span style={{ background:C.bg2, padding:"1px 6px", borderRadius:4 }}>/</span> for blocks (soon)</div>

        {page.blocks.map((b,i)=>{
          if (b.t==="h") return <h3 key={i} style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:19, color:C.ink, margin:"22px 0 10px" }}>{b.text}</h3>;
          if (b.t==="p") return <p key={i} style={{ fontSize:14.5, lineHeight:1.85, color:"#4A4839", margin:"0 0 12px" }}>{b.text}</p>;
          if (b.t==="q") return (
            <blockquote key={i} style={{ margin:"16px 0", padding:"4px 0 4px 18px", borderLeft:`3px solid ${C.gold}`, fontFamily:FONT_SERIF, fontStyle:"italic", fontSize:15.5, color:C.ink }}>{b.text}</blockquote>
          );
          if (b.t==="code") return (
            <pre key={i} style={{ background:C.termBg, color:C.termGreen, fontFamily:FONT_MONO, fontSize:12.5, padding:"13px 17px", borderRadius:10, margin:"12px 0", overflowX:"auto" }}>{b.text}</pre>
          );
          if (b.t==="todo") return (
            <div key={i} onClick={()=>toggleTodo(i)} style={{ display:"flex", alignItems:"flex-start", gap:11, padding:"7px 0", cursor:"pointer" }}>
              <div style={{ width:18, height:18, borderRadius:5, flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center",
                background: b.done ? C.green : "#fff", border:`1.8px solid ${b.done ? C.green : C.border}`, transition:"all .15s" }}>
                {b.done && <span style={{ color:"#fff", fontSize:11, fontWeight:800 }}>✓</span>}
              </div>
              <span style={{ fontSize:14.5, color: b.done ? C.muted : C.ink, textDecoration: b.done ? "line-through" : "none", lineHeight:1.6 }}>{b.text}</span>
            </div>
          );
          return null;
        })}
      </Panel>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SETTINGS — profile + the API contract (for future Spring Boot)
════════════════════════════════════════════════════════════ */
