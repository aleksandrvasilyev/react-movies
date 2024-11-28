import React from "react";
import Nav from "../components/Nav";
import MovieCard from "../components/MovieCard";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { useFavorite } from "../context/favoriteContext";

const FavoritesPage = () => {
  const { favorites } = useFavorite();

  //   console.log(favorites);

  return (
    <>
      <Nav />
      <section className="container mx-auto px-4 py-10 w-full max-w-5xl">
        {favorites.length > 0 ? (
          <MovieList data={favorites} />
        ) : (
          <p>You have not chosen any favorites yet!</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default FavoritesPage;
