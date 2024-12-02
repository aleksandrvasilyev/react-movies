import { useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import MovieList from "../components/MovieList";
import { useParams } from "react-router-dom";
import { genres } from "../data/genres.json";

const HomePage = () => {
  const { data, error, loading, fetchData } = useFetch();
  const [dataMovies, setDataMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [totalMovies, setTotalMovies] = useState(0);
  const [chosenGenre, setChosenGenre] = useState([]);

  const [sort, setSort] = useState(0);
  const { page } = useParams();
  const currentPage = page || 1;

  const sortValues = [
    {
      id: 0,
      name: "Rating ↓",
      value: "vote_average.desc",
    },
    {
      id: 1,
      name: "Rating ↑",
      value: "vote_average.asc",
    },
    {
      id: 2,
      name: "Votes count ↓",
      value: "vote_count.desc",
    },
    {
      id: 3,
      name: "Votes count ↑",
      value: "vote_count.asc",
    },
    {
      id: 4,
      name: "Popularity ↓",
      value: "popularity.desc",
    },
    {
      id: 5,
      name: "Popularity ↑",
      value: "popularity.asc",
    },
    {
      id: 6,
      name: "Release date ↓",
      value: "primary_release_date.desc",
    },
    {
      id: 7,
      name: "Release date ↑",
      value: "primary_release_date.asc",
    },
  ];

  const moviesOnPage = 12;

  const {
    linksArray: links,
    startIndex,
    endIndex,
  } = useMemo(
    () => getMoviesLinks(currentPage),
    [currentPage, sort, chosenGenre]
  );

  useEffect(() => {
    if (links && links.length > 0) {
      fetchData(links);
    }
  }, [links, fetchData]);

  useEffect(() => {
    const result = getMovies(data, startIndex, endIndex);
    if (data[0]) {
      setTotalPages(Math.floor(data[0].total_results / moviesOnPage));
      setTotalMovies(data[0].total_results);
    }

    setDataMovies(result);
  }, [data, startIndex, endIndex]);

  function getMovies(data, startIndex, endIndex) {
    let result;
    if (data.length === 2) {
      const firstChunk = data[0].results.slice(startIndex);
      const secondChunk = data[1].results.slice(0, endIndex);

      result = firstChunk.concat(secondChunk);
    } else if (data.length === 1) {
      result = data[0].results.slice(startIndex, endIndex);
    }
    return result;
  }

  function getMoviesLinks(page, countOnPage = moviesOnPage) {
    const moviesFromApi = 20;

    const startIndex = (page - 1) * countOnPage;
    const endIndex = startIndex + countOnPage;
    const startIndexInChunk = startIndex % moviesFromApi;
    const endIndexInChunk = endIndex % moviesFromApi;
    const countQueries = endIndexInChunk > startIndexInChunk ? 1 : 2;

    const linksArray = [];

    const startPage = Math.floor(startIndex / moviesFromApi) + 1;

    for (let index = startPage; index < startPage + countQueries; index++) {
      linksArray.push(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${index}&sort_by=${
          sortValues.find((val) => val.id === Number(sort)).value
        }&vote_count.gte=5000&with_genres=${chosenGenre.join(",")}`
      );
    }
    return {
      linksArray,
      startIndex: startIndexInChunk,
      endIndex: endIndexInChunk,
    };
  }

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleSetGenre = (e) => {
    const id = e.target.value;
    if (chosenGenre.includes(e.target.value)) {
      setChosenGenre(chosenGenre.filter((genreId) => genreId !== id));
    } else {
      setChosenGenre([...chosenGenre, id]);
    }
  };

  return (
    <>
      <main className="flex container gap-10 mx-auto px-4 py-10 w-full max-w-6xl md:flex-row flex-col">
        <section className="w-full max-w-52 text-xl font-bold">
          <div className="my-4">Sort</div>
          <div>
            <select
              id="default"
              className="bg-gray-100 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => handleSort(e)}
            >
              {sortValues.map((value, i) => (
                <option key={i} value={value.id} defaultValue={value.id === 0}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="my-4">Filter</div>
            <div className="text-base">
              <div className="my-2">By Genre:</div>
              <div className="max-h-72 overflow-y-scroll border rounded-md px-4 py-2">
                {Object.entries(genres).map(([id, name], i) => (
                  <label
                    key={i}
                    className="block mb-1 hover:text-yellow-400 cursor-pointer"
                    onChange={(e) => handleSetGenre(e)}
                  >
                    <input
                      type="checkbox"
                      value={id}
                      className="cursor-pointer"
                    />{" "}
                    {name}{" "}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full">
          <div className="flex justify-between items-center w-full text-xl font-bold my-4">
            <div className="text-left">
              Movies sorted by{" "}
              {sortValues.find((val) => val.id === Number(sort)).name}{" "}
              <div className="text-sm">results: {totalMovies}</div>
            </div>
            <div className="text-right">
              Page {currentPage} of {totalPages}
            </div>
          </div>
          <MovieList
            data={dataMovies}
            showPagination={true}
            currentPage={Number(currentPage)}
            totalPages={Number(totalPages)}
            moviesOnPage={Number(moviesOnPage)}
            total={totalPages}
            error={error}
            loading={loading}
          />
        </section>
      </main>
    </>
  );
};

export default HomePage;
