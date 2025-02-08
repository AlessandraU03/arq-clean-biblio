import React from 'react';

const ComicCard = ({ comic }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h3 className="text-xl font-bold">{comic.name}</h3>
      <p>{comic.autor}</p>
      <p>{comic.editorial}</p>
    </div>
  );
};

export default ComicCard;
