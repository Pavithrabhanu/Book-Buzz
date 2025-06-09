export const API_URL = 'http://localhost:5000/books';

export const CATEGORIES = ['Fiction', 'Science', 'History'] as const;
export type Category = typeof CATEGORIES[number];

export const PAGE_SIZE = 10;
export const SKELETON_COUNT = 8; 