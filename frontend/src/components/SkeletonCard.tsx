import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="book-card skeleton-card">
      <div className="book-card-inner">
        <div className="book-cover-container skeleton">
          <div className="skeleton-cover"></div>
        </div>
        <div className="book-details">
          <div className="skeleton-title"></div>
          <div className="skeleton-author"></div>
          <div className="skeleton-rating"></div>
          <div className="book-price-section">
            <div className="skeleton-price"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard; 