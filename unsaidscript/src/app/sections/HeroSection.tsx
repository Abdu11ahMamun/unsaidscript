import React, { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { HeroBadge } from "../components/blocks/HeroBadge";
import { HeroActions } from "../components/blocks/HeroActions";
import { site } from "../content/site";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    },
    [prefersReducedMotion]
  );

  return (
    <Section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-[#070a12] to-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-black/55 to-black" />

      <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
          <div className="mb-6">
            <HeroBadge>✨ Available for Freelance Projects</HeroBadge>
          </div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {site.name}
            </span>
            <br />
            <span className="text-white">Crafting Digital Experiences</span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-200/90 md:text-xl">
            {site.tagline}
            <span className="block mt-2 text-gray-400">
              Inspired by {site.inspirations.join(", ")} — calm UI with a little mystery.
            </span>
          </p>

          <HeroActions onPrimary={() => scrollTo("projects")} onSecondary={() => scrollTo("notes")} />
        </motion.div>
      </Container>
    </Section>
  );
}
