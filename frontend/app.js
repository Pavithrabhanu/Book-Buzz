document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('categorySelect');
    const booksContainer = document.getElementById('booksContainer');
    
    const apiUrl = 'http://localhost:5000/books';
    
    categorySelect.addEventListener('change', () => {
        fetchBooks(categorySelect.value);
    });
    
    function fetchBooks(category) {
        booksContainer.innerHTML = '<p>Loading...</p>';
        
        fetch(`${apiUrl}?category=${category}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayBooks(data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                booksContainer.innerHTML = '<p>Failed to load books. Please try again.</p>';
            });
    }
    
    function displayBooks(books) {
        if (books.length === 0) {
            booksContainer.innerHTML = '<p>No books found in this category.</p>';
            return;
        }
        
        booksContainer.innerHTML = '';
        
        books.forEach(book => {
            const bookCard = createBookCard(book);
            booksContainer.appendChild(bookCard);
        });
    }
    
    function createBookCard(book) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        const happinessScore = Math.round(book.happiness_score);
        
        bookCard.innerHTML = `
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-price">$${book.price_usd}</p>
                <div class="happiness-container">
                    <div class="happiness-label">
                        <span>Happiness Score</span>
                        <span>${happinessScore}%</span>
                    </div>
                    <div class="happiness-bar">
                        <div class="happiness-fill" style="width: ${happinessScore}%"></div>
                    </div>
                </div>
            </div>
        `;
        
        return bookCard;
    }
}); 