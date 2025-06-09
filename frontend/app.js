document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('categorySelect');
    const booksContainer = document.getElementById('booksContainer');
    
    const apiUrl = 'http://localhost:5000/books';
    
    // Show initial message
    booksContainer.innerHTML = '<div class="initial-message">Please select a category to view books</div>';
    
    categorySelect.addEventListener('change', () => {
        fetchBooks(categorySelect.value);
    });
    
    function fetchBooks(category) {
        // Show loading state
        booksContainer.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading books...</p>
            </div>
        `;
        
        fetch(`${apiUrl}?category=${category}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Add a small delay for smoother transition
                setTimeout(() => {
                    displayBooks(data);
                }, 300);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                booksContainer.innerHTML = `
                    <div class="error-message">
                        <p>Failed to load books. Please try again.</p>
                        <button class="retry-button" onclick="location.reload()">Retry</button>
                    </div>
                `;
            });
    }
    
    function displayBooks(books) {
        if (books.length === 0) {
            booksContainer.innerHTML = '<div class="empty-message">No books found in this category.</div>';
            return;
        }
        
        booksContainer.innerHTML = '';
        
        // Create and append book cards with a staggered animation
        books.forEach((book, index) => {
            const bookCard = createBookCard(book);
            bookCard.style.animationDelay = `${index * 0.1}s`;
            booksContainer.appendChild(bookCard);
        });
    }
    
    function createBookCard(book) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card fade-in';
        
        const happinessScore = Math.round(book.happiness_score);
        
        bookCard.innerHTML = `
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-price">$${book.price_usd.toFixed(2)}</p>
                <div class="happiness-container">
                    <div class="happiness-label">
                        <span>Reader Happiness</span>
                        <span>${happinessScore}%</span>
                    </div>
                    <div class="happiness-bar">
                        <div class="happiness-fill" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Animate happiness bar after a short delay
        setTimeout(() => {
            const happinessFill = bookCard.querySelector('.happiness-fill');
            happinessFill.style.width = `${happinessScore}%`;
        }, 100);
        
        return bookCard;
    }
}); 