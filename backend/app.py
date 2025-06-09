import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def calculate_happiness_score(rating):
    return (rating - 1) * 25

def load_data():
    books_df = pd.read_csv('./data/books.csv')
    reviews_df = pd.read_csv('./data/reviews.csv')
    prices_df = pd.read_csv('./data/prices.csv')
    
    reviews_df['happiness_score'] = reviews_df['rating'].apply(calculate_happiness_score)
    
    book_happiness = reviews_df.groupby('book_id')['happiness_score'].mean().reset_index()
    
    merged_data = books_df.merge(book_happiness, on='book_id')
    merged_data = merged_data.merge(prices_df, on='book_id')
    
    return merged_data

@app.route('/books', methods=['GET'])
def get_books():
    category = request.args.get('category', default=None)
    
    data = load_data()
    
    if category:
        data = data[data['category'] == category]
    
    top_books = data.sort_values(by='happiness_score', ascending=False).head(10)
    
    result = top_books.to_dict(orient='records')
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True) 