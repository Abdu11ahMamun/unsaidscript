/**
 * NoteCard component for displaying notes/quotes
 * @module components/cards/NoteCard
 */

import { motion } from "framer-motion";

/**
 * NoteCard component that displays a quote/note with author
 * @param {Object} props - Component props
 * @param {string} props.content - Note/quote content
 * @param {string} props.author - Quote author
 * @param {string} [props.source] - Source of the quote
 * @param {number} [props.index] - Index for staggered animation
 * @param {Function} [props.onClick] - Click handler
 * @returns {JSX.Element} NoteCard element
 * @example
 * <NoteCard 
 *   content="The wound is the place where the Light enters you."
 *   author="Rumi"
 *   source="Poetry"
 *   onClick={() => console.log('clicked')}
 * />
 */
export const NoteCard = ({ content, author, source, index = 0, onClick }) => {
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
      {/* Quote icon */}
      <div className="text-purple-500 text-4xl mb-4">"</div>
      
      {/* Content */}
      <p className="text-zinc-300 text-lg mb-4 italic">{content}</p>
      
      {/* Author */}
      <div className="flex items-center justify-between">
        <span className="text-white font-medium">— {author}</span>
        {source && (
          <span className="text-zinc-500 text-sm">{source}</span>
        )}
      </div>
    </motion.div>
  );
};

export default NoteCard;
