import { useState, useEffect } from "react";
import { addComicUseCase, updateComicUseCase } from "../../application/comic-useCase/comicUseCase";

function ComicForm({ setComics, comicToEdit, setComicToEdit }){
  const [name, setName] = useState("");
  const [autor, setAutor] = useState("");
  const [editorial, setEditorial] = useState("");

  useEffect(() => {
    if (comicToEdit) {
      setName(comicToEdit.name || "");
      setAutor(comicToEdit.autor || "");
      setEditorial(comicToEdit.editorial || "");
    } else {
      setName("");
      setAutor("");
      setEditorial("");
    }
  }, [comicToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comicToEdit) {
      const updatedComic = { ...comicToEdit, name, autor, editorial }; // Crear objeto actualizado
      await updateComicUseCase(updatedComic); // Llamar a la API con el cómic actualizado
      setComics((prev) =>
        prev.map((comic) => (comic.id === comicToEdit.id ? updatedComic : comic)) // Actualizar el estado local
      );
      setComicToEdit(null); // Limpiar estado de edición
    } else {
      const newComic = await addComicUseCase({ name, autor, editorial });
      setComics((prev) => [...prev, newComic]);
    }

    setName("");
    setAutor("");
    setEditorial("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" placeholder="Título" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 mr-2" required />
      <input type="text" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} className="border p-2 mr-2" required />
      <input type="text" placeholder="Editorial" value={editorial} onChange={(e) => setEditorial(e.target.value)} className="border p-2 mr-2" required />
      <button type="submit" className="bg-black text-white p-2 rounded">
        {comicToEdit ? "Actualizar" : "Agregar"}
      </button>
      {comicToEdit && (
        <button type="button" onClick={() => setComicToEdit(null)} className="bg-gray-500 text-white p-1 rounded ml-2">
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ComicForm;
