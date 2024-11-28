import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorite } from "../context/favoriteContext";

const Nav = () => {
  const { favorites } = useFavorite();
  const [show, setShow] = useState(false);

  return (
    <nav className="bg-zinc-800 shadow">
      <div className="container mx-auto w-full max-w-5xl px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-100">
          Top IMDb Movies Explorer
        </Link>
        <div
          className={`${
            !show
              ? "hidden"
              : "absolute flex md:flex-row left-0 right-0 top-16 bg-zinc-900 z-50 flex-col space-y-4 md:space-y-0 md:space-x-6 py-4 text-center"
          } md:flex space-x-6`}
        >
          <Link to="/" className="hover:text-blue-100">
            Home
          </Link>
          <Link to="/search" className="hover:text-blue-100">
            Search
          </Link>
          <Link to="/favorites" className="hover:text-blue-100">
            Favorites ({favorites.length})
          </Link>
        </div>
        <button
          className="md:hidden text-white hover:text-blue-100"
          onClick={() => setShow(!show)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};
export default Nav;
