import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { site } from "../content/site";

export function HeroSection() {
  return (
    <Section className="min-h-screen bg-gradient-to-b from-slate-950 via-[#070a12] to-black text-white">
      <Container className="py-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-xl font-black leading-none">{site.name}</div>
            <div className="text-xs text-gray-400">by {site.author}</div>
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-5xl font-black md:text-7xl"
        >
          {site.tagline}
        </motion.h1>

        <p className="mt-4 max-w-2xl text-gray-300">
          Inspired by {site.inspirations.join(", ")}.
        </p>
      </Container>
    </Section>
  );
}
