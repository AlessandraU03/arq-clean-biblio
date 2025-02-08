import React from 'react';

function ComicCard({ comic, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <img
        src={comic.image}
        alt={comic.name}
        className="w-full h-60 object-contain mb-4 rounded-lg"
      />
      <h3 className="text-xl font-bold">{comic.name}</h3>
      <p className='text-gray-600'>{comic.autor}</p>
      <p className='text-gray-500'>{comic.editorial}</p>

      {/* Botones dentro de la card */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onEdit(comic)} // Llamar a la función de edición
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(comic.id)} // Llamar a la función de eliminación
          className="bg-red-500 text-white p-2 rounded-md"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ComicCard;
