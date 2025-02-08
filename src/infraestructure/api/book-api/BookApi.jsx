const API_URL = 'http://localhost:8080/book';

export function getBooksFromApi() {
  return fetch(API_URL)
    .then(response => response.json());
}

export function addBookToApi(book) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  }).then(response => response.json());
}

export function updateBookInApi(book) {
  return fetch(`${API_URL}/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  }).then(response => response.json());
}

export function deleteBookFromApi(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  }).then(response => response.json());
}
