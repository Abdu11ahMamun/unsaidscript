import type { Note } from "../../../content/notes";

export function NoteCard({
  note,
  onRead,
  onCopy,
}: {
  note: Note;
  onRead: () => void;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition hover:border-white/20">
      <h3 className="text-xl font-black text-white">{note.title}</h3>
      <p className="mt-2 text-sm text-white/60">{note.subtitle}</p>

      <ul className="mt-5 space-y-2 text-sm text-white/75">
        {note.bullets.slice(0, 3).map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-white/25" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onRead}
          className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
        >
          Read
        </button>
        <button
          onClick={onCopy}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
