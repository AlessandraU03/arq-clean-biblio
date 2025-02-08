const API_URL = 'http://localhost:8080/comic';

export function getComicsFromApi() {
  return fetch(API_URL)
    .then(response => response.json());
}

export function addComicToApi(comic) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comic),
  }).then(response => response.json());
}

export function updateComicInApi(comic) {
  return fetch(`${API_URL}/${comic.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comic),
  }).then(response => response.json());
}

export function deleteComicFromApi(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  }).then(response => response.json());
}
