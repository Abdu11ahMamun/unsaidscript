/**
 * App Component with Routing
 * Main application wrapper with React Router
 * @module App
 */

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
const BookDetailPage = lazy(() => import('./pages/BookDetailPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-400 text-sm">Loading...</p>
    </motion.div>
  </div>
);

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 
                 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Go Home
      </a>
    </motion.div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:slug" element={<BookDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
