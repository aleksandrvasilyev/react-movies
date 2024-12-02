import { useState } from "react";
import useFetch from "../hooks/useFetch";
import MovieList from "../components/MovieList";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const { data, error, loading, fetchData } = useFetch();

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData([
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    ]);
  };

  return (
    <section className="container mx-auto px-4 py-10 w-full max-w-5xl">
      <form>
        <label className="text-xl font-bold" htmlFor="search">
          Search Movies
        </label>
        <div className="flex justify-between items-center max-w-2xl  font-bold my-4">
          <input
            type="text"
            id="search"
            placeholder="Movie name..."
            className="block my-4 py-2 px-4 bg-gray-500 bg-opacity-50 border border-neutral-50 rounded-md text-left w-full focus:outline-none focus:border-yellow-400"
            onChange={(e) => handleInput(e)}
          ></input>
          <button
            className="ml-4 text-right flex items-center bg-gray-500 rounded-md md:px-3 py-2 hover:bg-opacity-50 hover:text-neutral-50"
            onClick={(e) => handleSearch(e)}
          >
            Search
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {data[0] && (
          <>
            <div className="flex justify-between items-center w-full text-xl font-bold my-4">
              <div className="text-left">Movies</div>
              <div className="text-right">
                Results:{" "}
                {data[0].total_results > 20 ? 2033 : data[0].total_results}
              </div>
            </div>
            <MovieList
              data={data[0].results}
              error={error}
              loading={loading}
              showPagination={false}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
