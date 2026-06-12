// ⇄ GET /api/v1/projects
import { C } from "../../tokens.js";
export const PROJECTS = [
  { emoji:"🌐", label:"LIVE", title:"AAIINS Lab", sub:"Research & Innovation Lab",
    desc:"Full website for AAIINS Lab — a cutting-edge research and AI innovation hub.",
    tags:["React","Tailwind","Web"], accent:C.green, link:"https://aaiins-lab.com/",
    file:"aaiins-lab.tsx", lang:"TypeScript React", icon:"⚛️" },
  { emoji:"🤖", label:"LIVE", title:"Codex AI BD", sub:"AI Solutions Platform",
    desc:"Platform for Codex AI BD — bringing enterprise AI solutions to Bangladesh.",
    tags:["React","Node.js","AI"], accent:C.sky, link:"http://codexaitbd.com/",
    file:"codex-ai-bd.jsx", lang:"JavaScript", icon:"⚛️" },
  { emoji:"⚡", label:"PROJECT", title:"SPARK", sub:"Agile Management Tool",
    desc:"Spring Boot microservices + React. Full agile project management with sprints, boards, and team collaboration.",
    tags:["Spring Boot","Microservices","React"], accent:C.coral, link:null,
    file:"spark.java", lang:"Java", icon:"☕" },
  { emoji:"🧠", label:"AI", title:"Shariah Auditor", sub:"LLM Compliance Tool",
    desc:"LLM-powered automated Shariah compliance auditing system for Islamic finance.",
    tags:["Python","LLMs","NLP"], accent:C.gold, link:null,
    file:"shariah-auditor.py", lang:"Python", icon:"🐍" },
  { emoji:"🍜", label:"MOBILE", title:"Khabo", sub:"Food Ordering App",
    desc:"Android food-ordering app with secure login, real-time DB, and push notifications.",
    tags:["Android","Java","Firebase"], accent:"#A8674C", link:null,
    file:"khabo.java", lang:"Android", icon:"🤖" },
];

export const SKILL_GROUPS_DATA = [
  { label:"Languages",  color:"#5E8C61", items:["Java","Python","C","C++","PHP"] },
  { label:"Backend",    color:"#D96C4F", items:["Spring Boot","Spring","Hibernate","JPA","REST APIs","Microservices","JWT","OAuth2"] },
  { label:"Frontend",   color:"#6FA8BC", items:["React","Angular","HTML","CSS","JavaScript"] },
  { label:"Databases",  color:"#D9A441", items:["Oracle","MySQL","MongoDB","Redis"] },
  { label:"DevOps",     color:"#5E8C61", items:["Docker","Git","GitLab CI/CD","Kubernetes"] },
  { label:"Testing",    color:"#6FA8BC", items:["JMeter","Postman","Selenium","Swagger/OpenAPI"] },
  { label:"ML / AI",    color:"#D96C4F", items:["TensorFlow","PyTorch","Scikit-learn","NLP","OpenCV","Pandas","NumPy"] },
  { label:"Mgmt",       color:"#D9A441", items:["JIRA","Trello","Mantis","Agile","SDLC"] },
];

// alias — HomePage.jsx uses SKILL_GROUPS, same data
export const SKILL_GROUPS = SKILL_GROUPS_DATA;
