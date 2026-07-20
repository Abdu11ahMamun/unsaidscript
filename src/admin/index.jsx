import { useState, useEffect } from "react";
import { C, FONT_BODY } from "../tokens.js";
import { LoginScreen } from "./components/LoginScreen.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { Topbar } from "./components/Topbar.jsx";
import { OsPalette } from "./components/OsPalette.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { ReviewsPage } from "./pages/ReviewsPage.jsx";
import { SiteCopyPage } from "./pages/SiteCopyPage.jsx";
import { HabitsPage } from "./pages/HabitsPage.jsx";
import { DiaryPage } from "./pages/DiaryPage.jsx";
import { NotesPage } from "./pages/NotesPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import {
  INIT_REVIEWS, INIT_SITE_COPY, INIT_HABITS, INIT_DIARY, INIT_NOTES
} from "./data/index.js";

const OS_CSS = `
  @keyframes osPulse{0%,100%{opacity:1}50%{opacity:0.3}}
  @keyframes osBlink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes osPop{from{opacity:0;transform:scale(0.97) translateY(-6px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes osFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  *{box-sizing:border-box;-webkit-font-smoothing:antialiased}
  ::-webkit-scrollbar{width:6px;height:6px;background:transparent}
  ::-webkit-scrollbar-thumb{background:#D6CBAF;border-radius:3px}
  input[type=range]{height:4px}
  button:hover{filter:brightness(1.03)}
`;

const AUTH_KEY = "unsaid.os.auth";

export default function AdminApp() {
  const [authed, setAuthedState] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const setAuthed = (v) => {
    if (v) sessionStorage.setItem(AUTH_KEY, "1");
    else sessionStorage.removeItem(AUTH_KEY);
    setAuthedState(v);
  };
  const [section, setSection] = useState("dashboard");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const [siteCopy, setSiteCopy] = useState(INIT_SITE_COPY);
  const [habits, setHabits] = useState(INIT_HABITS);
  const [diary, setDiary] = useState(INIT_DIARY);
  const [notes, setNotes] = useState(INIT_NOTES);

  const toast = (m) => { setToastMsg(m); setTimeout(() => setToastMsg(""), 2400); };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Karla:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setPaletteOpen(o => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!authed) return (
    <>
      <LoginScreen onLogin={() => setAuthed(true)}/>
      <style>{OS_CSS}</style>
    </>
  );

  const PAGES = {
    dashboard: <DashboardPage habits={habits} diary={diary}/>,
    reviews:   <ReviewsPage reviews={reviews} setReviews={setReviews} toast={toast}/>,
    sitecopy:  <SiteCopyPage copy={siteCopy} setCopy={setSiteCopy} toast={toast}/>,
    habits:    <HabitsPage habits={habits} setHabits={setHabits} toast={toast}/>,
    diary:     <DiaryPage diary={diary} setDiary={setDiary} toast={toast}/>,
    notes:     <NotesPage notes={notes} setNotes={setNotes} toast={toast}/>,
    settings:  <SettingsPage toast={toast}/>,
  };

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:FONT_BODY, color:C.ink }}>
      <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize:"26px 26px", opacity:0.3, pointerEvents:"none", zIndex:0 }}/>
      <Sidebar section={section} setSection={setSection} onLogout={() => setAuthed(false)} onPalette={() => setPaletteOpen(true)}/>
      <div style={{ marginLeft:236, position:"relative", zIndex:1 }}>
        <Topbar section={section}/>
        <main key={section} style={{ padding:"30px 32px 60px", animation:"osFade .3s ease" }}>
          {PAGES[section]}
        </main>
      </div>
      <OsPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} setSection={setSection} toast={toast}/>
      {toastMsg && (
        <div style={{ position:"fixed", bottom:28, left:"calc(50% + 118px)", transform:"translateX(-50%)", zIndex:6000, background:C.termBg, color:C.termGreen, fontFamily:"'Fira Code',monospace", fontSize:12.5, padding:"10px 22px", borderRadius:30, border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 10px 30px rgba(0,0,0,0.3)", animation:"osPop .2s ease-out" }}>
          {toastMsg}
        </div>
      )}
      <style>{OS_CSS}</style>
    </div>
  );
}
