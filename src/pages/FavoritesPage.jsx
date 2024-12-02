import MovieList from "../components/MovieList";
import { useFavorite } from "../context/favoriteContext";

const FavoritesPage = () => {
  const { favorites } = useFavorite();

  return (
    <>
      <section className="container mx-auto px-4 py-10 w-full max-w-5xl">
        {favorites.length > 0 ? (
          <MovieList data={favorites} />
        ) : (
          <p>You have not chosen any favorites yet!</p>
        )}
      </section>
    </>
  );
};

export default FavoritesPage;
