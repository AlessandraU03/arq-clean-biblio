import { useEffect, useState } from "react";
import { getBooksUseCase, deleteBookUseCase } from "../../application/book-useCase/bookUseCase";
import BookForm from "./BookForm";
import BookCard from "./BookCard";

function BookList() {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);

  // Definir las imágenes que estarán en la carpeta public/assets/images
  const imageOptions = [
    "/public/book1.jpg", // Primera imagen
    "/public/book2.jpg", // Segunda imagen
    "/public/book3.jpg", // Tercera imagen
  ];

  useEffect(() => {
    getBooksUseCase().then((fetchedBooks) => {
      const booksWithImages = fetchedBooks.map((book) => {
        const randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)];
        return { ...book, image: randomImage };
      });
      setBooks(booksWithImages);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteBookUseCase(id);
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const handleAddOrUpdate = (updatedBooks) => {
    setBooks(updatedBooks);
  };

  return (
    <div>
      <div className="flex justify-end pr-6">
        <BookForm setBooks={handleAddOrUpdate} bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6 pr-6 pl-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={setBookToEdit} // Pasa la función de edición
            onDelete={handleDelete} // Pasa la función de eliminación
          />
        ))}
      </div>
    </div>
  );
}

export default BookList;
