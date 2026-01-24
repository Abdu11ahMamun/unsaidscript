import { HeroSection } from "../app/sections/home/HeroSection";
import { ProjectsSection } from "../app/sections/home/ProjectsSection";
import { ServicesSection } from "../app/sections/home/ServicesSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
       <ProjectsSection />
      {/* next sections go here */}
    </>
  );
}
