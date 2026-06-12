import { useState, useEffect } from "react";
import { C, FONT_SERIF, FONT_MONO, FONT_BODY } from "../../tokens.js";
import { COVER_PRESETS } from "../data/index.js";
import { Btn } from "../components/shared/Btn.jsx";
import { Field, Input, TextArea } from "../components/shared/Field.jsx";
import { Tag } from "../components/shared/Tag.jsx";
import { Modal } from "../components/shared/Modal.jsx";
import { MiniCover } from "../components/shared/MiniCover.jsx";
import { Panel, SerifH, MonoLabel } from "../components/shared/index.js";


function Pill({ children, color }) {
  return <span style={{ background:color+"1C", color, fontSize:10.5, fontWeight:700, letterSpacing:1.2, padding:"3px 11px", borderRadius:30, textTransform:"uppercase" }}>{children}</span>;
}

const EMPTY_REVIEW = {
  slug:"", title:"", author:"", rating:4, status:"draft", views:0,
  updated:"today", genre:"", verdict:"",
  cover:{ ...COVER_PRESETS[0], motif:"none" },
};

function ReviewEditor({ open, onClose, initial, onSave }) {
  const [form, setForm] = useState(initial || EMPTY_REVIEW);
  useEffect(()=>{ setForm(initial || EMPTY_REVIEW); }, [initial, open]);
  const set = (k,v)=>setForm(f=>({ ...f, [k]:v }));

  return (
    <Modal open={open} onClose={onClose} title={initial ? `Edit — ${initial.title}` : "New book review"} width={860}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 220px", gap:30 }}>
        {/* form */}
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Field label="Book title"><Input value={form.title} onChange={e=>set("title",e.target.value)} placeholder="The Old Man and the Sea"/></Field>
            <Field label="Author"><Input value={form.author} onChange={e=>set("author",e.target.value)} placeholder="Ernest Hemingway"/></Field>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Field label="Genre"><Input value={form.genre} onChange={e=>set("genre",e.target.value)} placeholder="Classic"/></Field>
            <Field label={`My rating — ${Number(form.rating).toFixed(1)} / 5`}>
              <input type="range" min="0.5" max="5" step="0.5" value={form.rating}
                onChange={e=>set("rating",Number(e.target.value))}
                style={{ width:"100%", accentColor:C.gold, marginTop:10 }}/>
            </Field>
          </div>
          <Field label="One-line verdict">
            <TextArea rows={2} value={form.verdict} onChange={e=>set("verdict",e.target.value)} placeholder="The sentence the whole review stands on…"/>
          </Field>
          <Field label="Review body (markdown — wired to POST /api/v1/reviews)">
            <TextArea rows={5} placeholder={"## How this book found me\\n\\nWrite freely. Headings, pull-quotes and the scorecard render on the public page…"}/>
          </Field>
          <Field label="Cover palette">
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {COVER_PRESETS.map(cp=>(
                <div key={cp.label} onClick={()=>set("cover",{ ...form.cover, bg:cp.bg, ink:cp.ink })} title={cp.label}
                  style={{ width:42, height:42, borderRadius:10, background:cp.bg, cursor:"pointer",
                    border: form.cover.bg===cp.bg ? `2.5px solid ${C.ink}` : `2px solid ${C.border}`,
                    transform: form.cover.bg===cp.bg ? "scale(1.08)" : "none", transition:"all .15s" }}/>
              ))}
            </div>
          </Field>
          <Field label="Cover motif">
            <div style={{ display:"flex", gap:8 }}>
              {["none","moon","whirl","beetle"].map(m=>(
                <button key={m} onClick={()=>set("cover",{ ...form.cover, motif:m })}
                  style={{ padding:"7px 16px", borderRadius:20, fontSize:12, cursor:"pointer", fontFamily:FONT_MONO,
                    background: form.cover.motif===m ? C.ink : "#fff", color: form.cover.motif===m ? "#fff" : C.muted,
                    border:`1.5px solid ${form.cover.motif===m ? C.ink : C.border}` }}>{m}</button>
              ))}
            </div>
          </Field>
        </div>

        {/* live preview */}
        <div>
          <MonoLabel color={C.coral}>Live cover preview</MonoLabel>
          <div style={{ background:C.bg2, borderRadius:14, padding:"26px 0", display:"flex", justifyContent:"center", border:`1px dashed ${C.border}` }}>
            <MiniCover cover={form.cover} title={form.title || "Untitled"} author={form.author || "Author"} w={130}/>
          </div>
          <div style={{ marginTop:16 }}>
            <MonoLabel>Status</MonoLabel>
            <div style={{ display:"flex", gap:8 }}>
              {["draft","published"].map(st=>(
                <button key={st} onClick={()=>set("status",st)}
                  style={{ flex:1, padding:"9px 0", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:FONT_MONO,
                    background: form.status===st ? (st==="published"?C.greenS:C.goldS) : "#fff",
                    color: form.status===st ? (st==="published"?C.green:C.gold) : C.muted,
                    border:`1.5px solid ${form.status===st ? (st==="published"?C.green:C.gold) : C.border}` }}>{st}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop:22, display:"flex", flexDirection:"column", gap:10 }}>
            <Btn onClick={()=>onSave(form)} style={{ justifyContent:"center" }}>✓ Save review</Btn>
            <Btn kind="ghost" onClick={onClose} style={{ justifyContent:"center" }}>Cancel</Btn>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ReviewsPage({ reviews, setReviews, toast }) {
  const [editor, setEditor] = useState({ open:false, initial:null });
  const published = reviews.filter(r=>r.status==="published").length;

  const save = (form) => {
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "untitled";
    const entry = { ...form, slug, updated:"just now" };
    setReviews(rs => {
      const i = rs.findIndex(r=>r.slug===slug);
      if (i>=0) { const next=[...rs]; next[i]=entry; return next; }
      return [entry, ...rs];
    });
    setEditor({ open:false, initial:null });
    toast(form.status==="published" ? "review published ✓ (mock — will PUT /api/v1/reviews)" : "draft saved ✓");
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
        <div>
          <SerifH size={26}>The shelf, <span style={{ fontStyle:"italic", color:C.coral }}>managed</span></SerifH>
          <p style={{ color:C.muted, fontSize:13.5, margin:"6px 0 0" }}>{published} published · {reviews.length - published} draft · changes here will flow to the public site through the API</p>
        </div>
        <Btn onClick={()=>setEditor({ open:true, initial:null })}>+ New review</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:16 }}>
        {reviews.map(r=>(
          <Panel key={r.slug} pad={20} style={{ display:"flex", gap:18 }}>
            <MiniCover cover={r.cover} title={r.title} author={r.author} w={86}/>
            <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                <div>
                  <div style={{ fontFamily:FONT_SERIF, fontWeight:700, fontSize:16.5, color:C.ink }}>{r.title}</div>
                  <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>{r.author} · {r.genre}</div>
                </div>
                <Tag color={r.status==="published" ? C.green : C.gold}>{r.status}</Tag>
              </div>
              <p style={{ fontSize:12.5, color:C.muted, lineHeight:1.65, margin:"10px 0", flex:1, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{r.verdict}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:FONT_MONO, fontSize:11, color:C.muted }}>★ {Number(r.rating).toFixed(1)} · {r.views} reads · {r.updated}</span>
                <div style={{ display:"flex", gap:8 }}>
                  <Btn small kind="ghost" onClick={()=>setEditor({ open:true, initial:r })}>✎ Edit</Btn>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <ReviewEditor open={editor.open} initial={editor.initial} onClose={()=>setEditor({ open:false, initial:null })} onSave={save}/>
    </div>
  );
}
