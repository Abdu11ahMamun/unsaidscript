/**
 * BookCard component for displaying books
 * @module components/cards/BookCard
 */

import { motion } from "framer-motion";
import { ratingToStars } from "../../utils";

/**
 * BookCard component that displays a book with cover, title, author, and rating
 * @param {Object} props - Component props
 * @param {string} props.title - Book title
 * @param {string} props.author - Book author
 * @param {string} props.cover - Cover image URL or emoji
 * @param {number} props.rating - Rating out of 5
 * @param {string} [props.genre] - Book genre
 * @param {number} [props.index] - Index for staggered animation
 * @param {Function} [props.onClick] - Click handler
 * @returns {JSX.Element} BookCard element
 * @example
 * <BookCard 
 *   title="1984" 
 *   author="George Orwell"
 *   cover="📖"
 *   rating={5}
 *   genre="Dystopian"
 *   onClick={() => console.log('clicked')}
 * />
 */
export const BookCard = ({ title, author, cover, rating, genre, index = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 transition-colors cursor-pointer"
    >
      {/* Cover */}
      <div className="text-6xl mb-4 text-center">{cover}</div>
      
      {/* Info */}
      <h3 className="text-lg font-bold text-white mb-1 text-center line-clamp-2">
        {title}
      </h3>
      <p className="text-zinc-500 text-sm text-center mb-2">{author}</p>
      
      {/* Genre */}
      {genre && (
        <p className="text-purple-400 text-xs text-center mb-2">{genre}</p>
      )}
      
      {/* Rating */}
      <div className="text-yellow-500 text-center text-sm">
        {ratingToStars(rating)}
      </div>
    </motion.div>
  );
};

export default BookCard;
