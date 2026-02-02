/**
 * BlogCard component for displaying blog posts
 * @module components/cards/BlogCard
 */

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * BlogCard component that displays a blog post preview
 * @param {Object} props - Component props
 * @param {string} props.title - Blog post title
 * @param {string} props.excerpt - Blog post excerpt
 * @param {string} props.date - Publication date
 * @param {string} props.readTime - Estimated read time
 * @param {string} [props.category] - Post category
 * @param {string} [props.link] - Post URL
 * @param {number} [props.index] - Index for staggered animation
 * @returns {JSX.Element} BlogCard element
 * @example
 * <BlogCard 
 *   title="My Post" 
 *   excerpt="This is an excerpt..."
 *   date="2024-01-01"
 *   readTime="5 min read"
 *   category="Technology"
 *   link="/blog/my-post"
 * />
 */
export const BlogCard = ({ title, excerpt, date, readTime, category, link, index = 0 }) => {
  const Component = link ? motion.a : motion.div;
  const linkProps = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      {...linkProps}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 transition-colors block"
    >
      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        {category && (
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
            {category}
          </span>
        )}
        <span className="text-zinc-500 text-sm">{date}</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-500 text-sm">{readTime}</span>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
        {title}
      </h3>
      
      {/* Excerpt */}
      <p className="text-zinc-400 mb-4 line-clamp-2">{excerpt}</p>
      
      {/* Read more */}
      <div className="flex items-center text-purple-400 text-sm">
        <span>Read more</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Component>
  );
};

export default BlogCard;
