// ⇄ GET /api/v1/notes
// Notes = everything I write that isn't a book review:
// tutorials, research walk-throughs, and personal opinions.
export const NOTE_CATEGORIES = ["All", "Tutorial", "Research", "Opinion"];

export const NOTES = [
  { emoji:"🕌", title:"How I Built a Shariah-Compliant AI Auditing System with LLMs",
    desc:"Using large language models to automate Islamic finance compliance checks at scale.",
    category:"Research", read:"8 min" },
  { emoji:"🧩", title:"Microservices with Spring Boot: What I Learned Building SPARK",
    desc:"Lessons from designing a multi-service agile project management tool from scratch.",
    category:"Tutorial", read:"12 min" },
  { emoji:"🏦", title:"From RTGS to REST: Modernising Core Banking APIs",
    desc:"My experience building and optimising payment gateway APIs at Millennium.",
    category:"Tutorial", read:"10 min" },
  { emoji:"📚", title:"Why an Engineer Should Read Fiction",
    desc:"Murakami taught me more about debugging than most textbooks — an argument for the novel as a thinking tool.",
    category:"Opinion", read:"6 min" },
  { emoji:"🔬", title:"LLMs × Fintech: The Research Questions That Keep Me Up",
    desc:"An honest map of the open problems I want to spend the next decade on.",
    category:"Research", read:"7 min" },
];
