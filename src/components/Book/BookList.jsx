import { useEffect, useState } from "react";
import { getBooksUseCase, deleteBookUseCase } from "../../application/book-useCase/bookUseCase";
import BookForm from "./BookForm";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    getBooksUseCase().then(setBooks);
  }, []);

  const handleDelete = async (id) => {
    await deleteBookUseCase(id);
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div>
      <BookForm setBooks={setBooks} bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} />
      <ul className="mt-4">
        {books.map(book => (
          <li key={book.id} className="border p-2 flex justify-between">
            {book.name} - {book.autor} - {book.categoria}
            <div>
              <button onClick={() => setBookToEdit(book)} className="bg-yellow-500 text-white p-1 rounded mr-2">Editar</button>
              <button onClick={() => handleDelete(book.id)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
