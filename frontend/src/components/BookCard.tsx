import React from 'react';
import type { Book } from '../types';
import { getCoverColors, getInitials, truncateTitle, getStars, getGlowClass } from '../utils/bookHelpers';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { headerColor, spineColor, textColor } = getCoverColors(book.category);

  const initials = getInitials(book.author);

  const shortTitle = truncateTitle(book.title);

  const starSymbols = getStars(book.happiness);

  const glowClass = getGlowClass(book.happiness);

  // Check if book has a love_score property
  const hasLoveScore = 'love_score' in book;

  return (
    <div className="book-card fade-in">
      <div className="book-card-inner">
        <div className="book-cover-container">
          <div className="book-cover-3d">
            <div className="book-spine" style={{ background: spineColor }} />
            <div className="book-front">
              <div className="book-front-top" style={{ background: headerColor }} />
              <div className="book-front-bottom">
                <div className="book-cover-content" style={{ color: textColor }}>
                  <div className="book-cover-title">{shortTitle}</div>
                  <div className="book-cover-author">{initials}</div>
                  <div className="triangle-icon">▲</div>
                </div>
              </div>
            </div>
            <div className="book-side" style={{ background: spineColor }} />
          </div>
          <span className={`category-badge ${book.category.toLowerCase()}`}>{book.category}</span>
          {hasLoveScore && (
            <span className="love-badge">❤️ Most Loved</span>
          )}
        </div>
        <div className="book-details">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <div className="book-rating">
            <div className={`star-rating ${glowClass}`}>
              {starSymbols.map((star, index) => (
                <span 
                  key={index} 
                  className={`star ${index < Math.floor(book.happiness * 5) ? 'full' : 
                             index === Math.floor(book.happiness * 5) && 
                             (book.happiness * 5) % 1 >= 0.25 && 
                             (book.happiness * 5) % 1 < 0.75 ? 'half' : 'empty'}`}
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