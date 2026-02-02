import { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  BookOpen, 
  User, 
  Tag,
  Clock,
  Share2,
  ExternalLink
} from 'lucide-react';
import { allBooks, getBookBySlug, getRelatedBooks } from '../content/books';

export default function BookDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const book = getBookBySlug(slug);
  const relatedBooks = useMemo(() => getRelatedBooks(slug, 3), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // 404 handling
  if (!book) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="text-8xl mb-6">📚</div>
          <h1 className="text-4xl font-bold text-white mb-4">Book Not Found</h1>
          <p className="text-gray-400 mb-8 max-w-md">
            The book you're looking for doesn't exist in our library. 
            It might have been moved or the URL is incorrect.
          </p>
          <Link
            to="/#books"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 
                     text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Books
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: `${book.title} - Book Review`,
      text: book.summary,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
      />
    ));
  };

  const readingTime = useMemo(() => {
    const words = book.review?.split(/\s+/).length || 0;
    return Math.ceil(words / 200); // Average reading speed
  }, [book.review]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <div className={`relative pt-24 pb-16 bg-gradient-to-br ${book.gradient} bg-opacity-20`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/#books"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Books
            </Link>
          </motion.div>

          {/* Book Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-8"
          >
            {/* Book Cover / Emoji */}
            <div className={`
              flex-shrink-0 w-40 h-56 rounded-xl bg-gradient-to-br ${book.gradient}
              flex items-center justify-center text-6xl shadow-2xl
              ring-4 ring-white/10
            `}>
              {book.coverImage ? (
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                book.emoji
              )}
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  bg-gradient-to-r ${book.gradient} text-white
                `}>
                  {book.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {book.title}
              </h1>

              <p className="text-xl text-gray-400 mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                {book.author}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(book.rating)}</div>
                <span className="text-gray-400 text-sm">({book.rating}/5)</span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                {book.pages && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {book.pages} pages
                  </span>
                )}
                {book.publishedYear && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Published {book.publishedYear}
                  </span>
                )}
                {readingTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {readingTime} min read
                  </span>
                )}
              </div>

              {/* Summary */}
              <p className="mt-4 text-gray-300 leading-relaxed">
                {book.summary}
              </p>

              {/* Actions */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                           rounded-lg text-white text-sm transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Tags */}
          {book.tags && book.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {book.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full 
                           text-xs text-gray-400 border border-white/10"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Review Content */}
          <article className="prose prose-invert prose-lg max-w-none 
                            prose-headings:text-white prose-headings:font-bold
                            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                            prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-white prose-strong:font-semibold
                            prose-blockquote:border-l-cyan-500 prose-blockquote:bg-white/5 
                            prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                            prose-blockquote:text-gray-300 prose-blockquote:italic
                            prose-code:text-cyan-400 prose-code:bg-white/10 
                            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-[#1a1a2e] prose-pre:border prose-pre:border-white/10
                            prose-ul:text-gray-300 prose-ol:text-gray-300
                            prose-li:marker:text-cyan-500
                            prose-table:border-collapse
                            prose-th:bg-white/10 prose-th:border prose-th:border-white/10 prose-th:px-4 prose-th:py-2
                            prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-2
                            prose-hr:border-white/10">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {book.review}
            </ReactMarkdown>
          </article>
        </motion.div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Related Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map(relatedBook => (
                <Link
                  key={relatedBook.id}
                  to={`/books/${relatedBook.id}`}
                  className="group"
                >
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 
                                hover:border-cyan-500/50 transition-all duration-300
                                hover:bg-white/10">
                    <div className={`
                      w-full h-32 rounded-lg bg-gradient-to-br ${relatedBook.gradient}
                      flex items-center justify-center text-4xl mb-4
                      group-hover:scale-105 transition-transform duration-300
                    `}>
                      {relatedBook.emoji}
                    </div>
                    <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                      {relatedBook.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{relatedBook.author}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {renderStars(relatedBook.rating)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Back to All Books */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            to="/#books"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10
                     border border-white/10 hover:border-cyan-500/50 rounded-lg
                     text-white font-medium transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Books
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
