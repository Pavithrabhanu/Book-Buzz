import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../utils/constants';

interface HeaderProps {
  category: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  category,
  onCategoryChange,
  searchTerm,
  onSearchTermChange,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerEl = document.querySelector('.title-header');
      const headerHeight = headerEl ? headerEl.clientHeight : 0;
      setIsSticky(window.scrollY > headerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="title-header">
        <div className="container">
          <h1 className="logo"><span className="logo-icon">📚</span>Book Buzz</h1>
        </div>
      </div>
      <div id="filtersBar" className={`filters-container${isSticky ? ' sticky' : ''}`}>
        <div className="container">
          <div className="filters-row">
            <div className="dropdown-container">
              <select
                className="filter-control enhanced-select"
                value={category}
                onChange={e => onCategoryChange(e.target.value)}
                aria-label="Select category"
              >
                <option value="">Select Category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by title..."
                className="filter-control search-input"
                value={searchTerm}
                onChange={e => onSearchTermChange(e.target.value)}
                aria-label="Search books"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 