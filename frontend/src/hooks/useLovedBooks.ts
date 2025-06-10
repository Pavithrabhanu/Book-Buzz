import { useState, useEffect } from 'react';
import type { Book } from '../types';
import { API_URL } from '../utils/constants';

interface UseLovedBooksResult {
  books: Book[];
  loading: boolean;
  error: string;
}

export const useLovedBooks = (category: string): UseLovedBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      if (!category) {
        setBooks([]);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_URL}/loved?category=${category}`);
        if (!res.ok) throw new Error('Failed to fetch loved books');
        const data: any[] = await res.json();
        const mapped: Book[] = data.map(b => ({
          id: b.book_id.toString(),
          title: b.title,
          author: b.author,
          category: b.category,
          happiness: b.happiness,
          price_usd: b.price_usd,
          love_score: b.love_score,
        } as Book));
        setBooks(mapped);
      } catch (err) {
        console.error(err);
        setError('Failed to load books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [category]);

  return { books, loading, error };
}; 