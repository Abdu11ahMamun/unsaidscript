import { C, FONT_SERIF, FONT_MONO } from "../../tokens.js";
import { SUMMARY, VISITORS_14D, SOURCES, DEVICES, TOP_PAGES, ACTIVITY } from "../data/index.js";
import { Tag } from "../components/shared/Tag.jsx";
import { AreaChart } from "../components/charts/AreaChart.jsx";
import { HBar } from "../components/charts/HBar.jsx";
import { Panel, SerifH, MonoLabel } from "../components/shared/index.js";

function StatCard({ icon, label, value, sub, accent = C.green }) {
  return (
    <Panel pad={20} style={{ position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-14, right:-6, fontSize:64, opacity:0.07 }}>{icon}</div>
      <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color:accent, fontFamily:FONT_MONO, marginBottom:8 }}>{label}</div>
      <div style={{ fontFamily:FONT_SERIF, fontWeight:700, fontSize:32, color:C.ink, lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12, color:C.muted, marginTop:8, fontFamily:FONT_MONO }}>{sub}</div>
    </Panel>
  );
}

export function DashboardPage({ habits, diary }) {
  const hour = new Date().getHours();
  const greet = hour<5?"শুভ রাত্রি":hour<12?"শুভ সকাল":hour<17?"শুভ দুপুর":"শুভ সন্ধ্যা";
  const todayDiary = diary[0];
  const habitsDone = habits.filter(h => h.done >= h.goal).length;
  const delta = SUMMARY.today - SUMMARY.yesterday;
  return (
    <div>
      <div style={{ marginBottom:26 }}>
        <h2 style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:30, color:C.ink, margin:0 }}>{greet}, Abdullah <span style={{ fontStyle:"italic", color:C.coral }}>☕</span></h2>
        <p style={{ color:C.muted, fontSize:14, margin:"8px 0 0" }}>
          <strong style={{ color:C.ink }}>{SUMMARY.today} people</strong> visited today · {habitsDone}/{habits.length} habits complete · diary {todayDiary?.evening ? "written ✓" : "evening waiting…"}
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16, marginBottom:18 }}>
        <StatCard icon="👋" label="Visitors today" value={SUMMARY.today} sub={`${delta>=0?"▲":"▼"} ${Math.abs(delta)} vs yesterday`} accent={C.green}/>
        <StatCard icon="📖" label="Avg time reading" value={SUMMARY.avgRead} sub={`bounce ${SUMMARY.bounce}`} accent={C.coral}/>
        <StatCard icon="✉️" label="Subscribers" value={SUMMARY.subscribers} sub={`+${SUMMARY.newSubsWeek} this week`} accent={C.gold}/>
        <StatCard icon="🗓" label="This month" value={SUMMARY.totalMonth.toLocaleString()} sub="total visits · June" accent={C.sky}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1.7fr 1fr", gap:16, marginBottom:18 }}>
        <Panel>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div>
              <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color:C.green, fontFamily:FONT_MONO, marginBottom:6 }}>Visitors · last 14 days</div>
              <h3 style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:19, color:C.ink, margin:0 }}>The tide of readers</h3>
            </div>
            <Tag color={C.green}>⇄ /analytics/visitors</Tag>
          </div>
          <AreaChart data={VISITORS_14D}/>
        </Panel>
        <Panel>
          <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color:C.gold, fontFamily:FONT_MONO, marginBottom:8 }}>Where they come from</div>
          <h3 style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:19, color:C.ink, margin:"0 0 20px" }}>Traffic sources</h3>
          {SOURCES.map(s => <HBar key={s.name} label={s.name} pct={s.pct} color={s.color}/>)}
          <div style={{ marginTop:18, paddingTop:16, borderTop:`1px solid ${C.border}` }}>
            <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color:C.muted, fontFamily:FONT_MONO, marginBottom:8 }}>Devices</div>
            <div style={{ display:"flex", height:10, borderRadius:6, overflow:"hidden", gap:2 }}>
              {DEVICES.map(d => <div key={d.name} title={`${d.name} ${d.pct}%`} style={{ width:`${d.pct}%`, background:d.color }}/>)}
            </div>
          </div>
        </Panel>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
        <Panel>
          <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color:C.sky, fontFamily:FONT_MONO, marginBottom:8 }}>Most read</div>
          <h3 style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:18, color:C.ink, margin:"0 0 16px" }}>Top pages</h3>
          {TOP_PAGES.map((pg,i) => (
            <div key={pg.path} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:i<TOP_PAGES.length-1?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontFamily:FONT_MONO, fontSize:11, color:C.muted, width:16 }}>{i+1}</span>
              <span style={{ flex:1, fontSize:12.5, fontFamily:FONT_MONO, color:C.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pg.path}</span>
              <span style={{ fontSize:11.5, color:C.muted, fontFamily:FONT_MONO }}>{pg.views.toLocaleString()}</span>
            </div>
          ))}
        </Panel>
        <Panel>
          <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color:C.coral, fontFamily:FONT_MONO, marginBottom:8 }}>The pulse</div>
          <h3 style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:18, color:C.ink, margin:"0 0 16px" }}>Recent activity</h3>
          {ACTIVITY.map((a,i) => (
            <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:i<ACTIVITY.length-1?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:14 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize:12.5, color:C.ink, lineHeight:1.5 }}>{a.text}</div>
                <div style={{ fontSize:10.5, color:C.muted, fontFamily:FONT_MONO, marginTop:2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </Panel>
        <Panel style={{ background:`linear-gradient(180deg,${C.dark},${C.darker})`, border:"none" }}>
          <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", color:"#86B489", fontFamily:FONT_MONO, marginBottom:8 }}>Today at a glance</div>
          <h3 style={{ fontFamily:FONT_SERIF, fontWeight:600, fontSize:18, color:"#F3EEDF", margin:"0 0 18px" }}>The day so far</h3>
          {habits.slice(0,4).map(h => (
            <div key={h.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.75)" }}>{h.icon} {h.label}</span>
              <span style={{ fontFamily:FONT_MONO, fontSize:12, color:h.done>=h.goal?C.termGreen:"rgba(255,255,255,0.45)" }}>{h.done}/{h.goal} {h.unit} {h.done>=h.goal?"✓":""}</span>
            </div>
          ))}
          <div style={{ marginTop:16, paddingTop:14, borderTop:"1px solid rgba(255,255,255,0.1)", fontFamily:FONT_MONO, fontSize:11.5, color:"rgba(255,255,255,0.45)", lineHeight:1.9 }}>
            <div><span style={{ color:C.termGreen }}>❯</span> mood: {todayDiary?.mood} · {todayDiary?.weather}</div>
            <div><span style={{ color:C.termPurple }}>❯</span> next milestone: first translation published 🖋</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
