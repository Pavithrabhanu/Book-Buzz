export interface Book {
    id: string;
    title: string;
    author: string;
    category: 'Fiction' | 'Science' | 'History';
    happiness: number;
    price_usd: number;
    love_score?: number; // Optional love score from sentiment analysis
} 