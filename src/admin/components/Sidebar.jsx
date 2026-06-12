import { C, FONT_SERIF, FONT_MONO, FONT_BODY } from "../../tokens.js";
import { MOCK_PROFILE } from "../data/index.js";
export const NAV_ITEMS = [
  { id:"dashboard", icon:"◳", label:"Dashboard" },
  { id:"reviews",   icon:"📕", label:"Reviews · CMS" },
  { id:"sitecopy",  icon:"✎", label:"Site Copy" },
  { id:"habits",    icon:"🌱", label:"Habits" },
  { id:"diary",     icon:"📓", label:"Diary" },
  { id:"notes",     icon:"🗂", label:"Notes" },
  { id:"settings",  icon:"⚙", label:"Settings · API" },
];
export function Sidebar({ section, setSection, onLogout, onPalette }) {
  return (
    <aside style={{ width:236, flexShrink:0, background:`linear-gradient(180deg,${C.dark},${C.darker})`, display:"flex", flexDirection:"column", position:"fixed", top:0, bottom:0, left:0, zIndex:100 }}>
      <div style={{ padding:"22px 20px 18px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <svg viewBox="0 0 64 64" width="30" height="30">
          <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.07)"/>
          <line x1="32" y1="13.5" x2="32" y2="9.5" stroke="#86B489" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M32 13 C44 20.5, 45.5 35, 32 53 C18.5 35, 20 20.5, 32 13 Z" fill="#86B489"/>
          <line x1="32" y1="38.5" x2="32" y2="49" stroke={C.dark} strokeWidth="2.4" strokeLinecap="round"/>
          <circle cx="32" cy="36.5" r="2.8" fill={C.gold}/>
        </svg>
        <div>
          <div style={{ fontFamily:FONT_SERIF, fontWeight:700, fontSize:16, color:"#F3EEDF", lineHeight:1 }}>unsaid<span style={{ color:C.coral }}>.os</span></div>
          <div style={{ fontFamily:FONT_MONO, fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:1.5, marginTop:3 }}>v0.1 · UI PREVIEW</div>
        </div>
      </div>
      <nav style={{ padding:"14px 12px", flex:1 }}>
        {NAV_ITEMS.map(it => (
          <div key={it.id} onClick={() => setSection(it.id)}
            style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, cursor:"pointer", marginBottom:3, background:section===it.id?"rgba(134,180,137,0.16)":"transparent", borderLeft:section===it.id?"2.5px solid #86B489":"2.5px solid transparent", transition:"all .15s" }}
            onMouseEnter={e=>{ if(section!==it.id) e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
            onMouseLeave={e=>{ if(section!==it.id) e.currentTarget.style.background="transparent"; }}>
            <span style={{ fontSize:15, width:20, textAlign:"center" }}>{it.icon}</span>
            <span style={{ fontSize:13.5, fontWeight:section===it.id?700:500, color:section===it.id?"#F3EEDF":"rgba(255,255,255,0.55)" }}>{it.label}</span>
          </div>
        ))}
        <div onClick={onPalette} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, cursor:"pointer", marginTop:10, border:"1px dashed rgba(255,255,255,0.18)" }}>
          <span style={{ fontSize:13, width:20, textAlign:"center", fontFamily:FONT_MONO, color:"rgba(255,255,255,0.5)" }}>⌘K</span>
          <span style={{ fontSize:12.5, color:"rgba(255,255,255,0.45)", fontFamily:FONT_MONO }}>command palette</span>
        </div>
      </nav>
      <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONT_SERIF, fontWeight:700, color:C.dark, fontSize:14 }}>A</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:12.5, color:"#F3EEDF", fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{MOCK_PROFILE.name}</div>
            <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.4)", fontFamily:FONT_MONO }}>{MOCK_PROFILE.handle}</div>
          </div>
          <span onClick={onLogout} title="log out" style={{ cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:14 }}>⏻</span>
        </div>
        <div style={{ fontFamily:FONT_MONO, fontSize:10, color:"rgba(255,255,255,0.3)", display:"flex", justifyContent:"space-between" }}>
          <span>⎇ life/main</span><span style={{ color:C.termGreen }}>● all quiet</span>
        </div>
      </div>
    </aside>
  );
}
