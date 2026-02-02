/**
 * ServiceCard component for displaying services
 * @module components/cards/ServiceCard
 */

import { motion } from "framer-motion";

/**
 * ServiceCard component that displays a service with icon
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {string} props.title - Service title
 * @param {string} props.description - Service description
 * @param {number} [props.index] - Index for staggered animation
 * @returns {JSX.Element} ServiceCard element
 * @example
 * <ServiceCard 
 *   icon={Code} 
 *   title="Web Development" 
 *   description="Building modern web apps" 
 *   index={0} 
 * />
 */
export const ServiceCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
