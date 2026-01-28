import { useMemo, useState } from "react";
import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Modal } from "../../../components/ui/Modal";
import { safeCopy } from "../../../lib/copy";
import { blogPosts, type BlogPost } from "../../../content/blog";
import { BlogCard } from "./BlogCard";

function buildPostCopy(p: BlogPost) {
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
  const copyText = useMemo(() => (selected ? buildPostCopy(selected) : ""), [selected]);

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

        <Modal
          open={!!selected}
          title={selected?.title ?? ""}
          subtitle={selected ? `${selected.date} • ${selected.readTime}` : ""}
          onClose={() => setSelected(null)}
          actions={
            selected ? (
              <button
                onClick={() => safeCopy(copyText)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10"
              >
                Copy
              </button>
            ) : null
          }
        >
          {selected ? (
            <div className="space-y-4">
              <p className="text-white/80">{selected.excerpt}</p>

              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-white/60">
                Next: we can replace this modal content with real MDX pages or a CMS later.
              </div>
            </div>
          ) : null}
        </Modal>
      </Container>
    </Section>
  );
}
