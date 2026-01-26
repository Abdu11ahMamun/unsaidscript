import type { Book } from "../../../content/books";
import { Badge } from "../../components/ui/Badge";
import { Stars } from "../../../components/ui/Stars";

export function BookCard({ book }: { book: Book }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{book.title}</h3>
          </div>
          <p className="mt-1 text-sm text-white/60">{book.author}</p>
        </div>
        <Badge>{book.category}</Badge>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Stars rating={book.rating} />
        <span className="text-xs font-semibold text-white/60">{book.rating}/10</span>
      </div>

      <p className="mt-4 text-sm text-white/70">{book.summary}</p>
    </div>
  );
}
