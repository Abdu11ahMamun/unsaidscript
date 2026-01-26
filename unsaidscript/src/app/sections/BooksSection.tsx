
import { Container } from "../components/ui/Container";

import { Section } from "../components/ui/Section";
import { books } from "../../content/books";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { BookCard } from "./home/BookCard";


export function BooksSection() {
  return (
    <Section id="books" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Books"
          title="Reading library"
          subtitle="Books that shape the way I think and build."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
