// import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const { data, error, loading } = useFetch(
    "https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json"
  );

  const moviesSortedByRating = data.sort((a, b) =>
    b.rating > a.rating ? 1 : a.rating > b.rating ? -1 : 0
  );

  const dataMovies = moviesSortedByRating.slice(0, 12);

  return (
    <>
      <Nav />
      <section className="container mx-auto px-4 py-10 w-full max-w-5xl">
        <div className="flex justify-between items-center w-full text-xl font-bold my-4">
          <div className="text-left">Top 250 movies</div>
          <div className="text-right">Showing 12 of 250</div>
        </div>

        <MovieList data={dataMovies} error={error} loading={loading} />
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
