import { useEffect, useState } from "react";
import { getComicsUseCase, deleteComicUseCase } from "../../application/comic-useCase/comicUseCase";
import ComicForm from "./ComicForm";
import ComicCard from "./ComicCard";

function ComicList() {
  const [comics, setComics] = useState([]);
  const [comicToEdit, setComicToEdit] = useState(null);

  // Definir las imágenes que estarán en la carpeta public/assets/images
  const imageOptions = [
    "/public/comic1.jpg", // Primera imagen
    "/public/comic2.jpg", // Segunda imagen
    "/public/comic3.jpg", // Tercera imagen
  ];

  useEffect(() => {
    getComicsUseCase().then((fetchedComics) => {
      const comicsWithImages = fetchedComics.map((comic) => {
        const randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)];
        return { ...comic, image: randomImage };
      });
      setComics(comicsWithImages);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteComicUseCase(id);
    setComics(comics.filter((comic) => comic.id !== id));
  };

  const handleAddOrUpdate = (updatedComics) => {
    setComics(updatedComics);
  };

  return (
    <div>
      <div className="flex justify-end pr-6">
        <ComicForm setComics={handleAddOrUpdate} comicToEdit={comicToEdit} setComicToEdit={setComicToEdit} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6 pr-6 pl-6">
        {comics.map((comic) => (
          <ComicCard
            key={comic.id}
            comic={comic}
            onEdit={setComicToEdit} // Pasa la función de edición
            onDelete={handleDelete} // Pasa la función de eliminación
          />
        ))}
      </div>
    </div>
  );
}

export default ComicList;
