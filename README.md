# Book Buzz Dashboard

A minimalist web application that displays the top-10 "most loved" books by category with happiness scores calculated from reader reviews.

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a Python virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run the Flask application:
   ```
   python app.py
   ```
   The backend server will start at http://localhost:5000

### Frontend Setup

Simply open the `frontend/index.html` file in your web browser.

If you need to serve it locally, you can use a simple HTTP server:
- Using Python:
  ```
  cd frontend
  python -m http.server
  ```
- Or any other local development server of your choice

## Usage

1. Select a book category from the dropdown menu
2. View the top-10 most loved books in that category
3. Each book card displays:
   - Title & author
   - Price (USD)
   - Happiness score (calculated from review ratings)

## Data Structure

- `books.csv`: Contains book details (book_id, title, author, category)
- `reviews.csv`: Contains reader reviews (review_id, book_id, text, rating)
- `prices.csv`: Contains book prices (book_id, price_usd)

## Implementation Details

- Happiness score is calculated by mapping 1-5 star ratings to 0-100% scale
- Books are sorted by their average happiness score
- The top-10 books in each category are displayed 