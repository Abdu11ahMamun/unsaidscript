import React, { useState } from "react";
import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Modal } from "../../../components/ui/Modal";
import { blogPosts, type BlogPost } from "../../../content/blog";
import { safeCopy } from "../../../lib/copy";
import { BlogCard } from "./BlogCard";


function buildBlogCopy(p: BlogPost) {
  const lines = [
    `# ${p.title}`,
    `${p.date} • ${p.readTime}`,
    "",
    p.excerpt,
    "",
    "Tags:",
    ...p.tags.map((t) => `- ${t}`),
  ];
  return lines.join("\n");
}

export function BlogSection() {
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!selected) return;
    await safeCopy(buildBlogCopy(selected));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Section id="blog" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Blog"
          title="Blog & insights"
          subtitle="Writing about craft, systems, and the web."
        />

      
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p) => (
            <BlogCard key={p.id} post={p} onRead={() => setSelected(p)} />
          ))}
        </div>

      </Container>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        subtitle={selected ? `${selected.date} • ${selected.readTime}` : undefined}
        rightSlot={
          selected ? (
            <button
              onClick={copy}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          ) : null
        }
      >
        {selected ? (
          <div className="space-y-4">
            <p className="text-white/70">{selected.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {selected.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-sm text-white/50">
              (Later you can replace this modal body with MDX/Markdown content or route to a /blog page.)
            </p>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
