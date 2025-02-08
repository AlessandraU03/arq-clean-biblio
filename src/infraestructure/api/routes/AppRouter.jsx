import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../../../components/general/Navbar";
import HomePage from "../../../pages/HomePage";
import ComicPage from "../../../pages/ComicPage";
import BookPage from "../../../pages/BookPage";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/comics" element={<ComicPage />} />
          <Route path="/books" element={<BookPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
