// import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import heartRegular from "../assets/heartRegular.svg";
import heartSolid from "../assets/heartSolid.svg";
import { useFavorite } from "../context/favoriteContext";

const MoviePage = () => {
  const { id } = useParams();
  return (
    <>
      <Nav />
      <SingleMovie id={id} />
      <Footer />
    </>
  );
};

const SingleMovie = ({ id }) => {
  const { isFavorite, toggleFavorite } = useFavorite();

  const {
    data: movie,
    error,
    loading,
  } = useFetch(`https://www.omdbapi.com/?i=${id}&apikey=4c23897b`);

  //   console.log(movie);

  if (loading) {
    return <div className="max-w-4xl my-8 mx-auto">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-4xl my-8 mx-auto">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="max-w-4xl my-8 mx-auto">Movie not found!</div>;
  }

  return (
    <div className="max-w-4xl my-8 mx-auto p-8 bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative h-80 bg-zinc-700">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-80 object-cover overflow-hidden"
          />

          <div>
            <img
              src={isFavorite(id) ? heartSolid : heartRegular}
              alt="Heart"
              className="h-10 w-10 absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
              onClick={(e) =>
                toggleFavorite(e, {
                  id: id,
                  name: movie.Title,
                  image_url: movie.Poster,
                  genre: [movie.Genre.split(",")[0]],
                  rating: movie.imdbRating,
                  year: movie.Year,
                  desc: movie.Plot,
                })
              }
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            {movie.Title}
          </h1>

          <p className="text-gray-600 text-lg mt-4">
            ⭐ {movie.imdbRating}{" "}
            <span className="text-sm text-neutral-600">
              ({movie.imdbVotes} votes)
            </span>
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Year:</span> {movie.Year}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Genre:</span> {movie.Genre}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Director:</span> {movie.Director}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Actors:</span> {movie.Actors}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Duration:</span> {movie.Runtime}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Language:</span> {movie.Language}
          </p>
          <p className="text-gray-600 text-lg mt-2">
            <span className="font-semibold">Country:</span> {movie.Country}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
          Plot
        </h2>
        <p className="text-gray-700 mt-4 leading-relaxed">{movie.Plot}</p>
      </div>
      {movie.Awards && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
            Awards
          </h2>
          <p className="text-gray-700 mt-4 leading-relaxed">{movie.Awards}</p>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
