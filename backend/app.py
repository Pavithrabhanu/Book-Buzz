from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import re
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# Load data once at startup
books = pd.read_csv('./data/books.csv')
prices = pd.read_csv('./data/prices.csv')
reviews = pd.read_csv('./data/reviews.csv')

# Analyze sentiment of review text
def analyze_sentiment(text):
    # Clean text
    text = str(text)
    text = re.sub(r'[^\w\s]', '', text)
    
    # Get sentiment polarity (-1 to 1)
    blob = TextBlob(text)
    return blob.sentiment.polarity

# Calculate and add sentiment score to reviews
reviews['sentiment'] = reviews['text'].apply(analyze_sentiment)

# Compute combined love score (50% rating, 50% sentiment)
reviews['happiness'] = reviews['rating'].apply(lambda r: (r - 1) / 4)  # 0 to 1
reviews['love_score'] = (reviews['happiness'] * 0.5) + ((reviews['sentiment'] + 1) / 2 * 0.5)  # Both on 0-1 scale

# Group by book_id and calculate average scores
happiness = reviews.groupby('book_id')['happiness'].mean().reset_index()
love_scores = reviews.groupby('book_id')['love_score'].mean().reset_index()

# Merge all data
full = books.merge(prices, on='book_id').merge(happiness, on='book_id').merge(love_scores, on='book_id')

@app.route('/books')
def get_books():
    category = request.args.get('category')
    if category:
        subset = full[full['category'] == category]
    else:
        subset = full
    top = subset.sort_values('happiness', ascending=False).head(10)
    return jsonify(top.to_dict(orient='records'))

@app.route('/books/loved')
def get_loved_books():
    category = request.args.get('category')
    if category:
        subset = full[full['category'] == category]
    else:
        subset = full
    most_loved = subset.sort_values('love_score', ascending=False).head(10)
    return jsonify(most_loved.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)

