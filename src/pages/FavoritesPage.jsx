import MovieList from "../components/MovieList";
import { useFavorite } from "../context/favoriteContext";

const FavoritesPage = () => {
  const { favorites } = useFavorite();

  return (
    <>
      <section className="container mx-auto px-4 py-10 w-full max-w-6xl">
        {favorites.length > 0 ? (
          <>
            {" "}
            <div className="flex justify-between font-bold mb-6 text-xl">
              <div>Favorites page</div>
              <div>{favorites.length} movie(s)</div>
            </div>
            <MovieList data={favorites} />
          </>
        ) : (
          <p>You have not chosen any favorites yet!</p>
        )}
      </section>
    </>
  );
};

export default FavoritesPage;
