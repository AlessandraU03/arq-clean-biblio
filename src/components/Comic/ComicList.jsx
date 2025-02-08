import { useEffect, useState } from "react";
import { getComicsUseCase, deleteComicUseCase } from "../../application/comic-useCase/comicUseCase";
import ComicForm from "./ComicForm";

const ComicList = () => {
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
      <ComicForm setComics={handleAddOrUpdate} comicToEdit={comicToEdit} setComicToEdit={setComicToEdit} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6 pr-6 pl-6">
        {comics.map((comic) => (
          <div key={comic.id} className="bg-white border rounded-lg shadow-lg p-4">
            <img
              src={comic.image}
              alt={comic.name}
              className="w-full h-60 object-contain mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold">{comic.name}</h3>
            <p className="text-sm text-gray-600">{comic.autor}</p>
            <p className="text-sm text-gray-500">{comic.editorial}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setComicToEdit(comic)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(comic.id)}
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

export default ComicList;
