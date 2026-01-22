import React from "react";
import { Container } from "../../../components/ui/Container";
import { Section } from "../../../components/ui/Section";
import { site } from "../../../content/site";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#070a12] to-black" />
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(60%_40%_at_50%_20%,rgba(34,211,238,0.20),transparent_70%)]" />
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(40%_30%_at_70%_30%,rgba(168,85,247,0.18),transparent_70%)]" />

      <Container className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-200">
            ✨ Available for freelance projects
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
            Crafting digital experiences
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg">
            {site.brand.author} • {site.brand.tagline}
            <span className="mt-2 block text-white/50">
              Inspired by {site.brand.inspirations.join(", ")}.
            </span>
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            >
              View projects →
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
