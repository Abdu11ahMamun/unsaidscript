import React, { useMemo, useState } from "react";
import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Modal } from "../../../components/ui/Modal";
import { notes, type Note } from "../../../content/notes";
import { safeCopy } from "../../../lib/copy";
import { Card } from "../../components/ui/Card";

function buildNoteCopy(n: Note) {
  const lines = [
    `# ${n.title}`,
    n.subtitle,
    "",
    "Key points:",
    ...n.bullets.map((b) => `- ${b}`),
  ];
  return lines.join("\n");
}

export function NotesSection() {
  const [selected, setSelected] = useState<Note | null>(null);
  const [copied, setCopied] = useState(false);

  const copyText = useMemo(() => (selected ? buildNoteCopy(selected) : ""), [selected]);

  async function onCopy() {
    if (!copyText) return;
    await safeCopy(copyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Section id="notes" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Notes"
          title="Notes & highlights"
          subtitle="Short takeaways — like a clean terminal log."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {notes.map((n) => (
            <div key={n.id} className="relative">
              <div
                className={[
                  "absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-opacity",
                  "hover:opacity-25",
                  n.gradient ? n.gradient : "from-cyan-500 to-blue-600",
                ].join(" ")}
              />
              <Card className="relative">
                <h3 className="text-xl font-black text-white">{n.title}</h3>
                <p className="mt-2 text-sm text-white/60">{n.subtitle}</p>

                <ul className="mt-5 space-y-2 text-sm text-white/75">
                  {n.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setSelected(n)}
                    className={[
                      "flex-1 rounded-xl px-4 py-2 text-sm font-bold text-white transition hover:brightness-110",
                      "bg-gradient-to-r",
                      n.gradient ? n.gradient : "from-cyan-500 to-blue-600",
                    ].join(" ")}
                  >
                    Read
                  </button>

                  <button
                    onClick={async () => {
                      await safeCopy(buildNoteCopy(n));
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1200);
                    }}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                    aria-label="Copy note"
                    title="Copy"
                  >
                    Copy
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        subtitle={selected?.subtitle}
        rightSlot={
          selected ? (
            <button
              onClick={onCopy}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          ) : null
        }
      >
        {selected ? (
          <div className="space-y-4">
            <p className="text-white/60">Key points:</p>
            <ul className="space-y-2">
              {selected.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
