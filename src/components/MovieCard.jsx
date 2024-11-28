import React from "react";
import heartRegular from "../assets/heartRegular.svg";
import heartSolid from "../assets/heartSolid.svg";
import { Link } from "react-router-dom";
import { useFavorite } from "../context/favoriteContext";

const MovieCard = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useFavorite();

  const movieId = movie.imdb_url?.split("/")[2] || movie.id;

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white">
      <div className="relative h-80 bg-zinc-700">
        <Link to={`/movie/${movieId}`}>
          <img
            src={movie["image_url"]}
            alt={movie.name}
            className="w-full h-80 object-cover overflow-hidden transform transition-transform hover:scale-[1.02]"
          />
        </Link>

        <div>
          <img
            src={isFavorite(movieId) ? heartSolid : heartRegular}
            alt="Heart"
            className="h-10 w-10 absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
            onClick={(e) =>
              toggleFavorite(e, {
                id: movieId,
                name: movie.name,
                image_url: movie["image_url"],
                genre: [movie.genre[0]],
                rating: movie.rating,
                year: movie.year,
                desc: movie.desc,
              })
            }
          />
          {/* <img src={heartSolid} alt="Heart" className="h-6 w-6" /> */}
        </div>
      </div>

      <div className="p-4 ">
        <h3 className="text-2xl font-semibold text-gray-800">
          <Link to={`/movie/${movieId}`} className="hover:text-gray-600">
            {movie.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center text-gray-600 space-x-4">
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm font-medium">
            {movie.genre[0]}
          </span>
          <span className="text-lg font-bold text-yellow-500">
            ⭐ {movie.rating}
          </span>
          <span className="text-sm text-gray-500">{movie.year}</span>
        </div>
        <p className="mt-4 text-gray-600">{movie.desc}</p>
      </div>
    </div>
  );
};

export default MovieCard;
