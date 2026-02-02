import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5 
}) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const buttonBaseClass = `
    flex items-center justify-center w-10 h-10 rounded-lg 
    transition-all duration-200 text-sm font-medium
    border border-white/10
  `;

  const activeClass = `
    bg-gradient-to-r from-cyan-500 to-purple-500 
    text-white border-transparent shadow-lg shadow-cyan-500/25
  `;

  const inactiveClass = `
    bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white
    hover:border-cyan-500/50
  `;

  const disabledClass = `
    bg-white/5 text-gray-600 cursor-not-allowed border-transparent
  `;

  return (
    <motion.nav 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 mt-8"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBaseClass} ${currentPage === 1 ? disabledClass : inactiveClass}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* First Page */}
      {showFirstLast && visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`${buttonBaseClass} ${inactiveClass}`}
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className="text-gray-500 px-1">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {visiblePages.map(page => (
        <motion.button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${buttonBaseClass} ${page === currentPage ? activeClass : inactiveClass}`}
          whileHover={page !== currentPage ? { scale: 1.05 } : {}}
          whileTap={page !== currentPage ? { scale: 0.95 } : {}}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </motion.button>
      ))}

      {/* Last Page */}
      {showFirstLast && visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-gray-500 px-1">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`${buttonBaseClass} ${inactiveClass}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBaseClass} ${currentPage === totalPages ? disabledClass : inactiveClass}`}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.nav>
  );
}

// Compact pagination for mobile
export function PaginationCompact({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-all
          ${currentPage === 1 
            ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-cyan-500/50'
          }
        `}
      >
        Previous
      </button>
      
      <span className="text-gray-400 text-sm">
        Page <span className="text-cyan-400 font-semibold">{currentPage}</span> of{' '}
        <span className="text-white font-semibold">{totalPages}</span>
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-all
          ${currentPage === totalPages 
            ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-cyan-500/50'
          }
        `}
      >
        Next
      </button>
    </div>
  );
}
