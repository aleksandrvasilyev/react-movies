import React from "react";
import MovieCard from "../components/MovieCard";

const MovieList = ({ data, error, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Movies not found!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((movie, i) => (
        <MovieCard movie={movie} key={i} />
      ))}
    </div>
  );
};

export default MovieList;
