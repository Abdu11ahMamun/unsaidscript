import { Section } from "../../components/ui/Section";
import { Container } from "../../components/ui/Container";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { books } from "../../content/books";
import { Card } from "../components/ui/Card";

function starsFrom10(rating10: number) {
  const clamped = Math.max(0, Math.min(10, rating10));
  return Math.round((clamped / 10) * 5);
}

export function BooksSection() {
  return (
    <Section id="books" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Books"
          title="Reading library"
          subtitle="Books that shape the way I think and build."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => {
            const stars = starsFrom10(b.rating10);

            return (
              <Card key={b.id} className="h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-4xl">{b.emoji ?? "📚"}</div>
                    <h3 className="mt-4 text-xl font-bold text-white">{b.title}</h3>
                    <p className="mt-1 text-sm text-white/60">
                      {b.author} • {b.category}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/80">
                    {b.rating10}/10
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={[
                        "text-sm",
                        i < stars ? "text-yellow-300" : "text-white/20",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-xs text-white/50">{stars} stars</span>
                </div>

                <p className="mt-4 text-sm text-white/70">{b.summary}</p>

                {b.href ? (
                  <div className="mt-6">
                    <a
                      href={b.href}
                      className="inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                    >
                      Read notes →
                    </a>
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
