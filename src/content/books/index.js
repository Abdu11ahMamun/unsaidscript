// Book Content Index
// Add new books by importing them here and adding to the allBooks array

import { atomicHabits } from './atomic-habits';
import { deepWork } from './deep-work';
import { kafkaOnTheShore } from './kafka-on-the-shore';
import { thePowerOfNow } from './the-power-of-now';
import { theDesignOfEverydayThings } from './the-design-of-everyday-things';
import { theMidnightLibrary } from './the-midnight-library';

// Export all books as an array
export const allBooks = [
  atomicHabits,
  deepWork,
  kafkaOnTheShore,
  thePowerOfNow,
  theDesignOfEverydayThings,
  theMidnightLibrary,
];

// Helper function to get a book by its slug/id
export const getBookBySlug = (slug) => {
  return allBooks.find(book => book.id === slug);
};

// Helper function to get related books
export const getRelatedBooks = (bookId, limit = 3) => {
  const book = getBookBySlug(bookId);
  if (!book || !book.relatedBooks) return [];
  
  return book.relatedBooks
    .map(id => getBookBySlug(id))
    .filter(Boolean)
    .slice(0, limit);
};

// Helper function to get books by category
export const getBooksByCategory = (category) => {
  return allBooks.filter(book => book.category === category);
};

// Helper function to get all categories
export const getAllCategories = () => {
  const categories = new Set(allBooks.map(book => book.category));
  return Array.from(categories);
};

// Helper function to get books by tag
export const getBooksByTag = (tag) => {
  return allBooks.filter(book => book.tags?.includes(tag));
};

// Helper function to get all tags
export const getAllTags = () => {
  const tags = new Set(allBooks.flatMap(book => book.tags || []));
  return Array.from(tags);
};

// Export individual books for direct import
export {
  atomicHabits,
  deepWork,
  kafkaOnTheShore,
  thePowerOfNow,
  theDesignOfEverydayThings,
  theMidnightLibrary,
};
