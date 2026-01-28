
import { BooksSection } from "../app/sections/BooksSection";
import { BlogSection } from "../app/sections/home/BlogSection";
import { ContactSection } from "../app/sections/home/ContactSection";
import { HeroSection } from "../app/sections/home/HeroSection";
import { NotesSection } from "../app/sections/home/NotesSection";
import { ProjectsSection } from "../app/sections/home/ProjectsSection";
import { ServicesSection } from "../app/sections/home/ServicesSection";
import { Header } from "../components/layouts/Header";
import { Footer } from "../components/layouts/Footer";





function Anchor({ id }: { id: string }) {
  // Optional: helps with sticky header offsets (adjust -top-24 based on your header height)
  return <div id={id} className="relative -top-24" aria-hidden="true" />;
}

export function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-black text-white">
      <Header />

      <main className="flex flex-col">
        {/* HERO */}
        <section aria-label="Hero">
          <Anchor id="hero" />
          <HeroSection />
        </section>

        {/* Services */}
        <section aria-label="Services" className="py-24 md:py-32">
          <Anchor id="services" />
          <ServicesSection />
        </section>

        {/* Projects */}
        <section aria-label="Projects" className="py-24 md:py-32">
          <Anchor id="projects" />
          <ProjectsSection />
        </section>

        {/* Books */}
        <section aria-label="Books" className="py-24 md:py-32">
          <Anchor id="books" />
          <BooksSection />
        </section>

        {/* Notes */}
        <section aria-label="Notes" className="py-24 md:py-32">
          <Anchor id="notes" />
          <NotesSection />
        </section>

        {/* Blog */}
        <section aria-label="Blog" className="py-24 md:py-32">
          <Anchor id="blog" />
          <BlogSection />
        </section>

        {/* Contact */}
        <section aria-label="Contact" className="py-24 md:py-32">
          <Anchor id="contact" />
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
