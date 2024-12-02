import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFavorite } from "../context/favoriteContext";
import { FaBars } from "react-icons/fa";

const Nav = () => {
  const { favorites } = useFavorite();
  const [show, setShow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const NavLinkClass = ({ isActive }) => {
    const baseClasses =
      "md:bg-gray-500 md:rounded-md md:px-3 md:py-2 md:hover:bg-opacity-50 md:w-32 md:text-center hover:text-yellow-400 md:hover:text-neutral-50";
    const activeClasses = "md:bg-opacity-50";

    return `${baseClasses} ${isActive ? activeClasses : ""}`;
  };

  const NavContainerClass = () => {
    const baseClasses = "md:flex md:space-x-4";
    const hideClasses = "hidden";
    const showClasses =
      "absolute flex md:flex-row left-0 right-0 top-16 bg-zinc-900 z-50 flex-col space-y-4 md:space-y-0 py-4 text-center";

    return `${baseClasses} ${
      !show || !(windowWidth < 768) ? hideClasses : showClasses
    }`;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-zinc-800 shadow">
      <div className="container mx-auto w-full max-w-6xl px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold hover:text-yellow-400">
          Movies Explorer
        </NavLink>
        <div className={NavContainerClass()}>
          <NavLink to="/" className={NavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/search" className={NavLinkClass}>
            Search
          </NavLink>
          <NavLink to="/favorites" className={NavLinkClass}>
            Favorites ({favorites.length})
          </NavLink>
        </div>
        <button
          className="md:hidden text-white hover:text-yellow-400"
          onClick={() => setShow((prevShow) => !prevShow)}
        >
          <FaBars size={24} />
        </button>
      </div>
    </nav>
  );
};
export default Nav;
