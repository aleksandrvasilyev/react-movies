import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import heartRegular from "../assets/heartRegular.svg";
import heartSolid from "../assets/heartSolid.svg";
import { useFavorite } from "../context/favoriteContext";
import { useHistory } from "../context/historyContext";
import moviePoster from "../assets/movie.jpg";

const MoviePage = () => {
  const [movieData, setMovieData] = useState([]);
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorite();
  const { addHistory } = useHistory();
  const { error, loading, fetchData } = useFetch();

  const movie = movieData[0];

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await fetchData([
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US`,
      ]);

      setMovieData(movieData);
    };

    fetchMovie();
  }, [fetchData, id]);

  useEffect(() => {
    if (movieData && movieData.length > 0) {
      const movie = movieData[0];
      const movieObject = {
        id: Number(id),
        poster_path: movie.poster_path,
        title: movie.title,
        genre_ids: movie.genres.map((genre) => genre.id),
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
      };

      addHistory(movieObject);
    }
  }, [movieData, id, addHistory]);

  if (loading) {
    return <div className="max-w-4xl my-8 mx-auto">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-4xl my-8 mx-auto">Error: {error}</div>;
  }

  if (!movieData || movieData.length === 0) {
    return <div className="max-w-4xl my-8 mx-auto">Movie not found!</div>;
  }

  return (
    <section className="container mx-auto max-w-5xl px-4 py-10 my-8 w-full bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-8 ">
        <div className="relative h-80 bg-zinc-700">
          <img
            src={
              !movie.poster_path
                ? moviePoster
                : `https://image.tmdb.org/t/p/original${movie.poster_path}`
            }
            alt={movie.title}
            className="w-full h-80 object-cover overflow-hidden"
          />

          <div>
            <img
              src={isFavorite(id) ? heartSolid : heartRegular}
              alt="Heart"
              className="h-10 w-10 absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
              onClick={(e) =>
                toggleFavorite(e, {
                  id: Number(id),
                  poster_path: movie.poster_path,
                  title: movie.title,
                  genre_ids: movie.genres.map((genre) => genre.id),
                  vote_average: movie.vote_average,
                  release_date: movie.release_date,
                  overview: movie.overview,
                })
              }
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            {movie.title}
          </h1>

          <p className="text-gray-600 text-lg mt-4">
            ⭐ {movie.vote_average}{" "}
            <span className="text-sm text-neutral-600">
              ({movie.vote_count} votes)
            </span>
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Year: </span>
            {movie.release_date.split("-")[0]}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Genre: </span>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Director: </span>
            {
              movie.credits.crew.find(
                (crew) => crew.known_for_department === "Directing"
              )?.name
            }
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Actors:</span>{" "}
            {movie.credits.cast
              .slice(0, 10)
              .map((actor) => actor.name)
              .join(", ")}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Duration: </span>
            {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Language: </span>{" "}
            {movie.original_language}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Country: </span>{" "}
            {movie.origin_country}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
          Plot
        </h2>
        <p className="text-gray-700 mt-4 leading-relaxed">{movie.overview}</p>
      </div>
    </section>
  );
};

export default MoviePage;
