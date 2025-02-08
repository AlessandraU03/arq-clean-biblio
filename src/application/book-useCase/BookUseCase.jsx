import { getBooksFromApi, addBookToApi, updateBookInApi, deleteBookFromApi } from '../../infraestructure/api/book-api/bookApi';


export function getBooksUseCase() {
  return getBooksFromApi();
}

export function addBookUseCase(book) {
  return addBookToApi(book);
}

export function updateBookUseCase(book) {
  return updateBookInApi(book);
}

export function deleteBookUseCase(id) {
  return deleteBookFromApi(id);
}
