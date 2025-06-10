import React, { useEffect, useState } from 'react';
import type { Book } from '../types';
import { getCoverColors, getStars, getGlowClass } from '../utils/bookHelpers';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { headerColor, spineColor, textColor } = getCoverColors(book.category);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  
  // Check for mobile device on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Full title and author for the book cover
  const coverTitle = book.title;

  // Main title for displaying below the cover
  const displayTitle = book.title;

  const starSymbols = getStars(book.happiness);

  const glowClass = getGlowClass(book.happiness);

  // Check if book has a love_score property
  const hasLoveScore = 'love_score' in book;

  return (
    <div className={`book-card fade-in ${isMobile ? 'mobile-view' : ''}`}>
      <div className="book-card-inner">
        {hasLoveScore && (
          <span className="love-badge">Most Loved</span>
        )}
        <div className="book-cover-container">
          <div className="book-cover-3d">
            <div className="book-front">
              <div className="book-front-top" style={{ background: headerColor }} />
              <div className="book-front-bottom">
                <div className="book-cover-content" style={{ color: textColor }}>
                  <div className="book-cover-title">{coverTitle}</div>
                  <div className="book-cover-author">{book.author}</div>
                  <div className="triangle-icon">▲</div>
                </div>
              </div>
            </div>
          </div>
          <span className={`category-badge ${book.category.toLowerCase()}`}>{book.category}</span>
        </div>
        <div className="book-details">
          <h3 className="book-title">{displayTitle}</h3>
          <p className="book-author">by {book.author}</p>
          <div className="book-rating">
            <div className={`star-rating ${glowClass}`}>
              {starSymbols.map((star, index) => (
                <span 
                  key={index} 
                  className={`star ${
                    index < Math.floor(book.happiness * 5) ? 'full' : 
                    index === Math.floor(book.happiness * 5) && 
                    (book.happiness * 5) % 1 >= 0.25 && 
                    (book.happiness * 5) % 1 < 0.75 ? 'half' : 'empty'
                  }`}
                >
                  {star}
                </span>
              ))}
            </div>
          </div>
          <div className="book-price-section">
            <span className="current-price">${book.price_usd.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard; 