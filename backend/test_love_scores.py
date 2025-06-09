#!/usr/bin/env python3
import argparse
import pandas as pd
import re
from textblob import TextBlob


def analyze_sentiment(text: str) -> float:
    """
    Clean the input text and return sentiment polarity in range -1 to 1.
    """
    cleaned = re.sub(r"[^\w\s]", "", str(text))
    return TextBlob(cleaned).sentiment.polarity


def main():
    parser = argparse.ArgumentParser(description="Calculate top 10 most loved books from raw data.")
    parser.add_argument('category', help='Category to filter by (e.g. Fiction)')
    args = parser.parse_args()

    # Load raw data
    books_df = pd.read_csv('data/books.csv')
    reviews_df = pd.read_csv('data/reviews.csv')
    prices_df = pd.read_csv('data/prices.csv')

    # Normalize star ratings to 0-1
    reviews_df['rating_norm'] = (reviews_df['rating'] - 1) / 4.0

    # Normalize sentiment to 0-1
    reviews_df['sentiment'] = reviews_df['text'].apply(analyze_sentiment)
    reviews_df['sentiment_norm'] = (reviews_df['sentiment'] + 1) / 2.0

    # Compute per-review love score (50% rating, 50% sentiment)
    reviews_df['love_score'] = (reviews_df['rating_norm'] + reviews_df['sentiment_norm']) / 2.0

    # Average love scores per book
    love_avg = reviews_df.groupby('book_id')['love_score'].mean().reset_index()

    # Merge with book and price info
    full = (
        books_df
        .merge(prices_df, on='book_id')
        .merge(love_avg, on='book_id')
    )

    # Filter by category
    filtered = full[full['category'] == args.category]

    # Select top 10 most loved
    top10 = filtered.sort_values('love_score', ascending=False).head(10)

    # Print results
    print(f"Top 10 Most Loved Books in '{args.category}'")
    print(top10[['book_id', 'title', 'love_score']].to_string(index=False))


if __name__ == '__main__':
    main() 