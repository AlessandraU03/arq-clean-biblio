import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h3 className="text-xl font-bold">{book.name}</h3>
      <p>{book.autor}</p>
      <p>{book.categoria}</p>
    </div>
  );
};

export default BookCard;
