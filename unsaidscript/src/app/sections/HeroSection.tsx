import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { site } from "../../content/site";


export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    },
    [prefersReducedMotion]
  );

  return (
    <Section id="top" className="pt-24 md:pt-28">
      <Container>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            {site.brand.tagline}
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            {site.brand.name}
            <span className="text-white/50"> — by {site.brand.author}</span>
          </h1>

          <p className="mt-4 text-base text-white/70 md:text-lg">
            {site.brand.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-black hover:brightness-110" href="#projects">
              View Projects
            </a>
            <a className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </Container>
    </Section>

  );
}
