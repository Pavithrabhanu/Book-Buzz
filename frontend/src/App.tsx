import React, { useState } from 'react';
import Header from './components/Header';
import BookCard from './components/BookCard';
import SkeletonCard from './components/SkeletonCard';
import type { Book } from './types';
import { useLovedBooks } from './hooks/useLovedBooks';
import '../styles.css';

const App: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { books: lovedBooks, loading, error } = useLovedBooks(category);

  // Filter by search term
  const filteredBooks = lovedBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate skeleton cards for loading state
  const skeletonCards = Array.from({ length: 10 }, (_, i) => (
    <SkeletonCard key={`skeleton-${i}`} />
  ));

  return (
    <div className="app">
      <Header
        category={category}
        onCategoryChange={setCategory}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <main className="main-content">
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          
          {!category ? (
            <div className="empty-message">Please select a category to view top loved books</div>
          ) : loading ? (
            <div className="top-loved-container">
              <h2 className="section-title">Loading Top Books</h2>
              <p className="section-description">
                Finding the most loved books in this category...
              </p>
              <div className="top-books-grid">
                {skeletonCards}
              </div>
            </div>
          ) : lovedBooks.length === 0 ? (
            <div className="empty-message">No loved books found for this category</div>
          ) : filteredBooks.length > 0 ? (
            <div className="top-loved-container">
              <h2 className="section-title">Top 10 Most Loved Books</h2>
              <div className="top-books-grid">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-message">No results found for "{searchTerm}"</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
