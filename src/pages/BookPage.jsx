import BookList from "../components/Book/BookList";

function BookPage(){
  return (
    <div>
      <h1 className="text-4xl font-bold flex justify-center text-align-center mb-8">Libros</h1>
      <BookList />
    </div>
  );
};

export default BookPage;
