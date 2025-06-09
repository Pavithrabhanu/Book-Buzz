import React from 'react';
import type { ReactNode } from 'react';
import type { Book } from '../types';

export function getCoverColors(category: Book['category']) {
  switch (category) {
    case 'Fiction':
      return { headerColor: 'var(--star-color)', spineColor: 'var(--fiction-color)', textColor: 'var(--text-dark)' };
    case 'Science':
      return { headerColor: 'var(--secondary-color)', spineColor: 'var(--science-color)', textColor: 'var(--text-dark)' };
    case 'History':
      return { headerColor: 'var(--fiction-color)', spineColor: 'var(--history-color)', textColor: 'var(--text-dark)' };
    default:
      return { headerColor: 'var(--star-color)', spineColor: 'var(--fiction-color)', textColor: 'var(--text-dark)' };
  }
}

export function getInitials(author: string): string {
  return author
    .split(' ')
    .map(w => w.charAt(0).toUpperCase())
    .join('');
}

export function truncateTitle(title: string): string {
  return title.length > 20 ? `${title.substring(0, 20)}...` : title;
}

export function getStars(happiness: number): string[] {
  // Convert happiness from 0-1 to 0-5 scale for star display
  const rating = happiness * 5;
  const fullCount = Math.floor(rating + 0.25);
  const halfCount = rating - Math.floor(rating) >= 0.25 && rating - Math.floor(rating) < 0.75 ? 1 : 0;
  const emptyCount = 5 - fullCount - halfCount;
  const stars: string[] = [];
  
  // Use string literals instead of JSX
  for (let i = 0; i < fullCount; i++) stars.push('★');
  if (halfCount) stars.push('★'); // We'll handle half stars with CSS
  for (let i = 0; i < emptyCount; i++) stars.push('☆');
  
  return stars;
}

export function getGlowClass(happiness: number): string {
  // Convert happiness from 0-1 to 0-5 scale for glow effect
  const rating = happiness * 5;
  if (rating >= 4.5) return 'glow-strong';
  if (rating >= 4) return 'glow';
  return '';
}

// Review-related interfaces and functions below
interface Review {
  review_id: number;
  book_id: number;
  text: string;
  rating: number;
}

/**
 * Calculates the most loved books based on both average rating and number of high ratings
 * @param books Array of all books
 * @param reviews Array of all reviews
 * @returns Top 10 most loved books sorted by love score
 */
export const getTopLovedBooks = (books: Book[], reviews: Review[]): Book[] => {
  // Group reviews by book_id
  const reviewsByBook = reviews.reduce((acc: Record<number, Review[]>, review: Review) => {
    const bookId = review.book_id;
    if (!acc[bookId]) {
      acc[bookId] = [];
    }
    acc[bookId].push(review);
    return acc;
  }, {} as Record<number, Review[]>);

  // Calculate a "love score" for each book
  // The love score considers:
  // 1. Average rating (weighted at 60%)
  // 2. Number of 5-star ratings (weighted at 30%)
  // 3. Number of 4-star ratings (weighted at 10%)
  const bookScores = books.map(book => {
    // Map the book.id (string) to the book_id (number) in reviews
    const bookId = parseInt(book.id);
    const bookReviews = reviewsByBook[bookId] || [];
    
    if (bookReviews.length === 0) {
      return { book, score: 0 };
    }
    
    const totalRatings = bookReviews.length;
    const sumRatings = bookReviews.reduce((sum: number, review: Review) => sum + review.rating, 0);
    const avgRating = sumRatings / totalRatings;
    
    const fiveStarCount = bookReviews.filter((review: Review) => review.rating === 5).length;
    const fiveStarRatio = fiveStarCount / totalRatings;
    
    const fourStarCount = bookReviews.filter((review: Review) => review.rating === 4).length;
    const fourStarRatio = fourStarCount / totalRatings;
    
    // Calculate the love score (weighted combination)
    const loveScore = (avgRating / 5) * 0.6 + fiveStarRatio * 0.3 + fourStarRatio * 0.1;
    
    return { book, score: loveScore };
  });
  
  // Sort books by love score in descending order and take top 10
  return bookScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(item => item.book);
};

/**
 * Helper function to get the count and percentage of high ratings (4-5 stars)
 * @param reviews Array of reviews for a book
 * @returns Object with count and percentage of high ratings
 */
export const getHighRatingsInfo = (reviews: Review[]) => {
  if (!reviews || reviews.length === 0) {
    return { count: 0, percentage: 0 };
  }
  
  const highRatings = reviews.filter((review: Review) => review.rating >= 4).length;
  const percentage = Math.round((highRatings / reviews.length) * 100);
  
  return { count: highRatings, percentage };
}; 