import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookCard from './components/BookCard';
import SkeletonCard from './components/SkeletonCard';
import type { Book } from './types';
import { API_URL } from './utils/constants';

const App: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [lovedBooks, setLovedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch most loved books when category changes
  useEffect(() => {
    if (!category) {
      setLovedBooks([]);
      return;
    }
    setLoading(true);
    setError('');
    fetch(`${API_URL}/loved?category=${category}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch loved books');
        return res.json();
      })
      .then(data => {
        // Map backend data to Book type
        const books: Book[] = data.map((b: any) => ({
          id: b.book_id.toString(),
          title: b.title,
          author: b.author,
          category: b.category,
          happiness: b.happiness,
          price_usd: b.price_usd,
          love_score: b.love_score,
        }));
        setLovedBooks(books);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load books');
      })
      .finally(() => setLoading(false));
  }, [category]);

  // Filter by search term
  const filteredBooks = lovedBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate skeleton cards for loading state
  const skeletonCards = Array.from({ length: 10 }, (_, i) => (
    <SkeletonCard key={`skeleton-${i}`} />
  ));

  return (
    <>
      <Header
        category={category}
        onCategoryChange={setCategory}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
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
          <p className="section-description">
            Based on both rating scores and sentiment analysis of review text
          </p>
          <div className="top-books-grid">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-message">No results found for "{searchTerm}"</div>
      )}
    </>
  );
};

export default App;
