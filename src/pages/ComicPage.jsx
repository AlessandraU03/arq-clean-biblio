import ComicList from "../components/Comic/ComicList";

function ComicPage () {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 flex justify-center text-align-center">Cómics</h1>
      <ComicList />
    </div>
  );
};

export default ComicPage;
