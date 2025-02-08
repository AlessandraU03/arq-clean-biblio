import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" p-8 text-black flex justify-between items-center">
      <div className="flex-1 flex justify-center">
        <div className="space-x-10 ">
          <Link to="/comics" className="hover:underline font-bold text-4xl">Cómics</Link>
          <Link to="/books" className="hover:underline text-4xl font-bold">Libros</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
