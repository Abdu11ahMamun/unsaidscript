/**
 * ProjectCard component for displaying projects
 * @module components/cards/ProjectCard
 */

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * ProjectCard component that displays a project with tags and link
 * @param {Object} props - Component props
 * @param {string} props.title - Project title
 * @param {string} props.description - Project description
 * @param {string[]} props.tags - Technology tags
 * @param {string} [props.link] - Project URL
 * @param {string} [props.image] - Project image URL
 * @param {number} [props.index] - Index for staggered animation
 * @returns {JSX.Element} ProjectCard element
 * @example
 * <ProjectCard 
 *   title="My Project" 
 *   description="A cool project"
 *   tags={["React", "Node.js"]}
 *   link="https://example.com"
 *   index={0}
 * />
 */
export const ProjectCard = ({ title, description, tags, link, image, index = 0 }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors block"
    >
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-zinc-600 text-sm">Preview</span>
          </div>
        )}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-zinc-800 text-zinc-400 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
