import { useMemo, useState } from "react";
import { Section } from "../../../components/ui/Section";
import { Container } from "../../../components/ui/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Modal } from "../../../components/ui/Modal";
import { safeCopy } from "../../../lib/copy";
import { notes, type Note } from "../../../content/notes";
import { NoteCard } from "./NoteCard";

function buildNoteCopy(n: Note) {
  const lines = [`# ${n.title}`, n.subtitle, "", "Key points:", ...n.bullets.map((b) => `- ${b}`)];
  return lines.join("\n");
}

export function NotesSection() {
  const [selected, setSelected] = useState<Note | null>(null);

  const copyText = useMemo(() => (selected ? buildNoteCopy(selected) : ""), [selected]);

  return (
    <Section id="notes" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Notes"
          title="Notes & highlights"
          subtitle="Quick takeaways — written like a clean log."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {notes.map((n) => (
            <NoteCard
              key={n.id}
              note={n}
              onRead={() => setSelected(n)}
              onCopy={() => safeCopy(buildNoteCopy(n))}
            />
          ))}
        </div>

        <Modal
          open={!!selected}
          title={selected?.title ?? ""}
          subtitle={selected?.subtitle ?? ""}
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
            <div>
              <p className="text-white/60">Key points:</p>
              <ul className="mt-4 space-y-3">
                {selected.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-white/25" />
                    <span className="text-white/80">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Modal>
      </Container>
    </Section>
  );
}
