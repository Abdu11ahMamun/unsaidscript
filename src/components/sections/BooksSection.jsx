import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Filter, BookOpen } from 'lucide-react';
import { allBooks, getAllCategories } from '../../content/books';
import { Pagination, PaginationCompact } from '../ui/Pagination';
import { Section, Container, GradientText } from '../ui';

const BOOKS_PER_PAGE = 6;

export function BooksSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobile] = useState(window.innerWidth < 640);

  const categories = useMemo(() => ['all', ...getAllCategories()], []);

  const filteredBooks = useMemo(() => {
    if (selectedCategory === 'all') return allBooks;
    return allBooks.filter(book => book.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [currentPage, filteredBooks]);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
      />
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Section id="books" className="relative py-24 bg-[#0a0a0f]">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-400 text-sm">Reading List</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book <GradientText>Reviews</GradientText>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Curated collection of books that have shaped my thinking. 
            Click on any book to read my detailed review and key takeaways.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          <Filter className="w-4 h-4 text-gray-500 mr-2" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }
              `}
            >
              {category === 'all' ? 'All Books' : category}
            </button>
          ))}
        </motion.div>

        {/* Books Count */}
        <div className="text-center mb-6">
          <span className="text-gray-500 text-sm">
            Showing {paginatedBooks.length} of {filteredBooks.length} books
          </span>
        </div>

        {/* Books Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginatedBooks.map((book, index) => (
              <motion.div key={book.id} variants={itemVariants}>
                <Link
                  to={`/books/${book.id}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden
                                hover:border-cyan-500/50 hover:bg-white/[0.08] 
                                transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                    {/* Book Cover */}
                    <div className={`
                      relative h-48 bg-gradient-to-br ${book.gradient}
                      flex items-center justify-center overflow-hidden
                    `}>
                      {book.coverImage ? (
                        <img 
                          src={book.coverImage} 
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                          {book.emoji}
                        </span>
                      )}
                      
                      {/* Category Badge */}
                      <span className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm 
                                     rounded-full text-xs text-white font-medium">
                        {book.category}
                      </span>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Read More Arrow */}
                      <div className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full
                                    opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0
                                    transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-1 
                                   group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">{renderStars(book.rating)}</div>
                        <span className="text-gray-500 text-xs">({book.rating}/5)</span>
                      </div>

                      {/* Summary */}
                      <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                        {book.summary}
                      </p>

                      {/* Read Review Link */}
                      <div className="mt-4 flex items-center text-cyan-400 text-sm font-medium
                                    opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0
                                    transition-all duration-300">
                        Read Full Review
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-2">No books found</h3>
            <p className="text-gray-400">
              No books in this category yet. Check back soon!
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          isMobile ? (
            <PaginationCompact
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          ) : (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )
        )}
      </Container>
    </Section>
  );
}

export default BooksSection;
