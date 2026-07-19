// ⇄ GET /api/v1/writing/path
// The road to the first book — a craft roadmap, not a biography.
import { C } from "../../tokens.js";
export const WRITING_PATH = [
  { stage:"lifelong", status:"always on", icon:"📖", color:C.gold, title:"The Reader",
    text:"Every writer begins as a reader. Bangla classics, translated Japanese surrealism, Sufi poetry, the occasional physics book that gets abandoned halfway — the shelf keeps growing, and the margins keep filling with notes." },
  { stage:"now", status:"live", icon:"✍️", color:C.coral, title:"The Reviewer",
    text:"Where the writing starts: honest book reviews — not summaries, but records of what a book does to a reader. Each one written like a letter to the next person who'll pick that book up." },
  { stage:"next", status:"at the desk", icon:"🖋", color:C.sky, title:"The Translator",
    text:"Carrying stories across the bridge between English and বাংলা — slowly, faithfully, starting with short pieces that deserve the care. The desk is set; the first text is being chosen." },
  { stage:"then", status:"drafting", icon:"📝", color:C.green, title:"The Essayist",
    text:"Articles and tutorials from the engineering trenches, research notes in the open, and the occasional strong opinion about why fiction makes better engineers." },
  { stage:"someday", status:"the horizon", icon:"🌱", color:C.gold, title:"The Author",
    text:"A book with my own name on the spine. No deadline, no rush — good pages take time, and this whole site is the long, public warm-up." },
];
