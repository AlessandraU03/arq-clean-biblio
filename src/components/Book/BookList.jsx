import { useEffect, useState } from "react";
import { getBooksUseCase, deleteBookUseCase } from "../../application/book-useCase/bookUseCase";
import BookForm from "./BookForm";

const BookList = () => {
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
    await deleteBookUseCase(id); // Eliminar de la base de datos
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const handleAddOrUpdate = (updatedBooks) => {
    setBooks(updatedBooks);
  };

  return (
    <div>
      <BookForm setBooks={handleAddOrUpdate} bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6 pr-6 pl-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white border rounded-lg shadow-lg p-4">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-60 object-contain mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold">{book.name}</h3>
            <p className="text-sm text-gray-600">{book.autor}</p>
            <p className="text-sm text-gray-500">{book.categoria}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setBookToEdit(book)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
