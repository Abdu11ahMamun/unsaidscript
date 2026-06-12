// The complete API surface this UI expects from Spring Boot.
// Hand this table to the backend team (or yourself).
export const API_CONTRACT = [
  ["POST","/api/v1/auth/login","Login screen","🟡 awaiting backend"],
  ["GET","/api/v1/analytics/visitors?days=14","Dashboard · area chart","🟡 awaiting backend"],
  ["GET","/api/v1/analytics/summary","Dashboard · stat cards","🟡 awaiting backend"],
  ["GET","/api/v1/analytics/sources","Dashboard · sources","🟡 awaiting backend"],
  ["GET","/api/v1/analytics/pages/top","Dashboard · top pages","🟡 awaiting backend"],
  ["GET","/api/v1/reviews","Reviews · list","🟡 awaiting backend"],
  ["POST","/api/v1/reviews","Reviews · create","🟡 awaiting backend"],
  ["PUT","/api/v1/reviews/{slug}","Reviews · edit","🟡 awaiting backend"],
  ["PUT","/api/v1/site/copy","Site copy editor","🟡 awaiting backend"],
  ["GET","/api/v1/habits/today","Habits · rings","🟡 awaiting backend"],
  ["PUT","/api/v1/habits/{id}/log","Habits · +/- buttons","🟡 awaiting backend"],
  ["GET","/api/v1/diary?month={m}","Diary · entries","🟡 awaiting backend"],
  ["POST","/api/v1/diary","Diary · new entry","🟡 awaiting backend"],
  ["GET","/api/v1/notes","Notes · pages","🟡 awaiting backend"],
];
