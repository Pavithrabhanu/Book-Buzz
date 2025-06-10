import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_get_loved_books_no_category(client):
    """When no category is provided, endpoint should return up to 10 books."""
    rv = client.get('/books/loved')
    assert rv.status_code == 200
    data = rv.get_json()
    assert isinstance(data, list)
    assert len(data) <= 10


def test_get_loved_books_by_category(client):
    """When a valid category is provided, all returned items should match."""
    category = 'Fiction'
    rv = client.get(f'/books/loved?category={category}')
    assert rv.status_code == 200
    data = rv.get_json()
    assert isinstance(data, list)
    for item in data:
        assert item['category'] == category


def test_get_loved_books_invalid_category(client):
    """Invalid category should return empty list without error."""
    rv = client.get('/books/loved?category=Unknown')
    assert rv.status_code == 200
    data = rv.get_json()
    assert isinstance(data, list)
    assert data == [] 