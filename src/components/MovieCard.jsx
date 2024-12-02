import { useState } from "react";
import heartRegular from "../assets/heartRegular.svg";
import heartSolid from "../assets/heartSolid.svg";
import moviePoster from "../assets/movie.jpg";
import { Link } from "react-router-dom";
import { useFavorite } from "../context/favoriteContext";
import { genres } from "../data/genres.json";

const MovieCard = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useFavorite();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="shadow-lg rounded-lg overflow-hidden bg-white"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div className="relative h-80 bg-zinc-700">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={
              !movie.poster_path
                ? moviePoster
                : `https://image.tmdb.org/t/p/original${movie.poster_path}`
            }
            alt={movie.title}
            className="w-full h-80 object-cover overflow-hidden transform transition-transform hover:scale-[1.02]"
          />
        </Link>

        <div>
          <img
            src={isFavorite(movie.id) ? heartSolid : heartRegular}
            alt="Heart"
            className="h-10 w-10 absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
            onClick={(e) =>
              toggleFavorite(e, {
                id: Number(movie.id),
                poster_path: movie.poster_path,
                title: movie.title,
                genre_ids: movie.genre_ids,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                overview: movie.overview,
              })
            }
          />
        </div>
      </div>

      <div className="p-4 ">
        <h3 className="text-2xl font-semibold text-gray-800">
          <Link
            to={`/movie/${movie.id}`}
            className={`${hovered && "text-yellow-500"}`}
          >
            {movie.title}
          </Link>
        </h3>
        <div className="mt-2 flex items-center text-gray-600 space-x-4">
          {genres[movie.genre_ids[0]] && (
            <span className="px-2 py-1 bg-gray-200 rounded-full text-sm font-medium">
              {genres[movie.genre_ids[0]]}
            </span>
          )}
          <span className="text-lg font-bold text-yellow-500">
            ⭐ {movie.vote_average}
          </span>
          <span className="text-sm text-gray-500">
            {movie.release_date.split("-")[0]}
          </span>
        </div>
        <p className="mt-4 text-gray-600">
          {movie.overview.length > 160
            ? movie.overview.substring(0, 160) + "..."
            : movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
