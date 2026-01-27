import { BooksSection } from "../app/sections/BooksSection";
import { HeroSection } from "../app/sections/home/HeroSection";
import { NotesSection } from "../app/sections/home/NotesSection";
import { ProjectsSection } from "../app/sections/home/ProjectsSection";
import { ServicesSection } from "../app/sections/home/ServicesSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
       <ProjectsSection />
        <BooksSection />
            <NotesSection />
      {/* next sections go here */}
    </>
  );
}
