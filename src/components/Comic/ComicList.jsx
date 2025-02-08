import { useEffect, useState } from "react";
import { getComicsUseCase, deleteComicUseCase } from "../../application/comic-useCase/comicUseCase";
import ComicForm from "./ComicForm";

const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [comicToEdit, setComicToEdit] = useState(null);

  useEffect(() => {
    getComicsUseCase().then(setComics);
  }, []);

  const handleDelete = async (id) => {
    await deleteComicUseCase(id);
    setComics(comics.filter(comic => comic.id !== id));
  };

  return (
    <div>
      <ComicForm setComics={setComics} comicToEdit={comicToEdit} setComicToEdit={setComicToEdit} />
      <ul className="mt-4">
        {comics.map(comic => (
          <li key={comic.id} className="border p-2 flex justify-between">
            {comic.name} - {comic.autor} - {comic.editorial}
            <div>
              <button onClick={() => setComicToEdit(comic)} className="bg-yellow-500 text-white p-1 rounded mr-2">Editar</button>
              <button onClick={() => handleDelete(comic.id)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicList;
