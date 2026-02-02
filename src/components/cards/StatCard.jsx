/**
 * StatCard component for displaying statistics
 * @module components/cards/StatCard
 */

import { motion } from "framer-motion";

/**
 * StatCard component that displays a statistic with label
 * @param {Object} props - Component props
 * @param {string} props.value - The statistic value
 * @param {string} props.label - Description of the statistic
 * @param {number} [props.delay] - Animation delay in seconds
 * @returns {JSX.Element} StatCard element
 * @example
 * <StatCard value="50+" label="Projects Completed" delay={0.1} />
 */
export const StatCard = ({ value, label, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-zinc-500 text-sm">{label}</div>
    </motion.div>
  );
};

export default StatCard;
