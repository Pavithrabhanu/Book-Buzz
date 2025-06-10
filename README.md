# Book Browsing App

A web application to browse and discover the top 10 most loved books by category.

## Features

- 3D-styled book cover cards with category and "Most Loved" badges
- Backend sentiment analysis using TextBlob
- Love score combines star ratings and review sentiment
- Custom React hook (`useLovedBooks`) for data fetching
- Responsive UI with skeleton loading states
- Automated tests for backend routes with pytest

## Tech Stack

- **Backend**: Python, Flask, pandas, TextBlob
- **Frontend**: React, Vite, TypeScript, CSS
- **Testing**: pytest (Python)

## Prerequisites

- Node.js (>=14.x) and npm
- Python (>=3.8)

## Backend Setup

```bash
cd backend
python -m venv venv            # create virtual environment
venv\Scripts\activate         # Windows
env/bin/activate             # macOS/Linux
pip install -r requirements.txt # install dependencies
python -m textblob.download_corpora  # download TextBlob corpora
python app.py                   # start Flask server
```

Backend will run at http://127.0.0.1:5000.

## Running Backend Tests

```bash
cd backend
pytest                          # run all tests
python test_love_scores.py Fiction  # run love score tests for Fiction category
python test_api.py              # run API tests only
```

## Frontend Setup

```bash
cd frontend
npm install                     # installs dependencies and generates package-lock.json
npm run dev                     # start development server
```

Frontend will run at http://localhost:5173 (default Vite port).

## Project Structure

```
/backend           # Flask API, data processing, and tests
/frontend          # React application with Vite
README.md          # Project overview and setup instructions
```

## Code Quality

- ESLint and Prettier for frontend formatting
- flake8 and black recommended for Python
- Use small, focused functions and clear naming for maintainability

Enjoy exploring the books! 🎉 