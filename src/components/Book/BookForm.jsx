import { useState, useEffect } from "react";
import { addBookUseCase, updateBookUseCase } from "../../application/book-useCase/bookUseCase";

const BookForm = ({ setBooks, bookToEdit, setBookToEdit }) => {
  const [name, setName] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");

  // Cuando cambia el libro a editar, actualizar los campos del formulario
  useEffect(() => {
    if (bookToEdit) {
      setName(bookToEdit.name || ""); // Si bookToEdit.title es undefined, evita errores
      setAutor(bookToEdit.autor || "");
      setCategoria(bookToEdit.categoria || "");
    } else {
      setName("");
      setAutor("");
      setCategoria("");
    }
  }, [bookToEdit]); // Se ejecuta cada vez que bookToEdit cambie

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (bookToEdit) {
      const updatedBook = { ...bookToEdit, name, autor, categoria }; // Crear un objeto actualizado
      await updateBookUseCase(updatedBook); // Llamar a la API con el libro actualizado
      setBooks((prev) =>
        prev.map((book) => (book.id === bookToEdit.id ? updatedBook : book)) // Actualizar el estado local
      );
      setBookToEdit(null); // Limpiar el estado de edición
    } else {
      const newBook = await addBookUseCase({ name, autor, categoria });
      setBooks((prev) => [...prev, newBook]);
    }
  
    setName("");
    setAutor("");
    setCategoria("");
  };
  

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" placeholder="Título" value={name} onChange={(e) => setName(e.target.value)} className="border p-1 mr-2" required />
      <input type="text" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} className="border p-1 mr-2" required />
      <input type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="border p-1 mr-2" required />
      <button type="submit" className="bg-blue-500 text-white p-1 rounded">
        {bookToEdit ? "Actualizar" : "Agregar"}
      </button>
      {bookToEdit && (
        <button type="button" onClick={() => setBookToEdit(null)} className="bg-gray-500 text-white p-1 rounded ml-2">
          Cancelar
        </button>
      )}
    </form>
  );
};

export default BookForm;
