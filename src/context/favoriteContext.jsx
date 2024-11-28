import { createContext, useState, useContext } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (e, movie) => {
    e.preventDefault();

    if (favorites.some((element) => element.id === movie.id)) {
      setFavorites(favorites.filter((favorite) => favorite.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (id) => {
    return favorites.some((movie) => movie.id === id);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
