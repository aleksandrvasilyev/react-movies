import { useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import MovieList from "../components/MovieList";
import { useParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { genres } from "../data/genres.json";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { sorting } from "../data/sorting.json";

const HomePage = () => {
  const { data, error, loading, fetchData } = useFetch();
  const [dataMovies, setDataMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [totalMovies, setTotalMovies] = useState(0);
  const [chosenGenre, setChosenGenre] = useState([]);
  const releaseDateInitials = [1950, 2024];
  const [ratingCountRange, setRatingCountRange] = useState([5000, 36600]);
  const [releaseDateRange, setReleaseDateRange] = useState([
    releaseDateInitials[0],
    releaseDateInitials[1],
  ]);
  const [sort, setSort] = useState(0);
  const { page } = useParams();
  const currentPage = page || 1;
  const showMoviesOnPage = 12;
  const debouncedRatingCountRange = useDebounce(ratingCountRange, 300);
  const debouncedReleaseDateRange = useDebounce(releaseDateRange, 300);
  const sortValues = sorting[0];

  const {
    linksArray: links,
    startIndex,
    endIndex,
  } = useMemo(
    () => generateApiUrls(currentPage),
    [
      currentPage,
      sort,
      chosenGenre,
      debouncedRatingCountRange,
      debouncedReleaseDateRange,
    ]
  );

  useEffect(() => {
    if (links && links.length > 0) {
      fetchData(links);
    }
  }, [links, fetchData]);

  useEffect(() => {
    const result = getMovies(data, startIndex, endIndex);
    if (data[0]) {
      setTotalPages(Math.floor(data[0].total_results / showMoviesOnPage));
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

  function generateApiUrls(page) {
    const moviesFromApi = 20;

    const startIndex = (page - 1) * showMoviesOnPage;
    const endIndex = startIndex + showMoviesOnPage;
    const startIndexInChunk = startIndex % moviesFromApi;
    const endIndexInChunk = endIndex % moviesFromApi;
    const countQueries = endIndexInChunk > startIndexInChunk ? 1 : 2;

    const linksArray = [];

    const startPage = Math.floor(startIndex / moviesFromApi) + 1;

    for (let index = startPage; index < startPage + countQueries; index++) {
      linksArray.push(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${index}&sort_by=${
          sortValues.find((val) => val.id === Number(sort)).value
        }&vote_count.gte=${ratingCountRange[0]}&vote_count.lte=${
          ratingCountRange[1]
        }&with_genres=${chosenGenre.join(",")}&primary_release_date.gte=${
          releaseDateRange[0]
        }-01-01&primary_release_date.lte=${releaseDateRange[1]}-01-01`
      );
    }
    return {
      linksArray,
      startIndex: startIndexInChunk,
      endIndex: endIndexInChunk,
    };
  }

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
      <main className="flex container gap-10 mx-auto px-4 py-10 w-full max-w-6xl md:flex-row flex-col-reverse">
        {/* sidebar */}
        <section className="w-full max-w-52 text-xl font-bold">
          <div className="my-4 text-center">Sort</div>
          <div>
            <select
              id="default"
              className="bg-gray-100 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => setSort(e.target.value)}
            >
              {sortValues.map((value, i) => (
                <option key={i} value={value.id} defaultValue={value.id === 0}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mt-4 text-center">Filter</div>
            <div className="text-base">
              <div className="mb-2 mt-6">By Genre:</div>
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
                    <span
                      className={
                        chosenGenre.includes(id) ? "text-yellow-400" : ""
                      }
                    >
                      {name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="text-base">
              <div className="mb-2 mt-6">
                <span>By Release Date:</span>
              </div>
              <div className="my-6">
                <RangeSlider
                  min={releaseDateInitials[0]}
                  max={releaseDateInitials[1]}
                  defaultValue={releaseDateRange}
                  onInput={(e) => setReleaseDateRange(e)}
                />
                <div className="flex justify-between mt-4">
                  <span className="text-left text-sm">
                    {releaseDateRange[0]}
                  </span>
                  <span className="text-right text-sm">
                    {releaseDateRange[1]}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-base">
              <div className="mb-2 mt-6">
                <span>By Votes Count:</span>
              </div>
              <div className="my-6">
                <RangeSlider
                  min={0}
                  max={36600}
                  defaultValue={ratingCountRange}
                  onInput={(e) => setRatingCountRange(e)}
                />
                <div className="flex justify-between mt-4">
                  <span className="text-left text-sm">
                    {ratingCountRange[0]}
                  </span>
                  <span className="text-right text-sm">
                    {ratingCountRange[1]}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-base">
              <div className="mb-2 mt-12">
                <span>Applied:</span>
              </div>
              <div className="my-6">
                <span className="block text-sm text-gray-400 my-4">
                  {chosenGenre.length > 0 &&
                    `genre: ${chosenGenre
                      .map((id) => genres[id])
                      .join(", ")}`}{" "}
                </span>

                <span className="block text-sm text-gray-400 my-4">
                  release date from {releaseDateRange[0]} to{" "}
                  {releaseDateRange[1]}
                </span>

                <span className="block text-sm text-gray-400 my-4">
                  votes count from {ratingCountRange[0]} to{" "}
                  {ratingCountRange[1]}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full">
          <div className="flex justify-between items-center w-full text-xl font-bold my-4">
            <div className="text-left">
              Movies
              <span className="block text-sm text-gray-400">
                sorted by{" "}
                {sortValues.find((val) => val.id === Number(sort)).name}{" "}
              </span>
              <span className="block text-sm text-gray-400">
                Total Movies: {totalMovies}
              </span>
            </div>
            <div className="text-right">
              {totalMovies > 0 && (
                <>
                  <div>
                    Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
                  </div>
                  <div className="text-sm text-gray-400">
                    {showMoviesOnPage} movies on page
                  </div>
                </>
              )}
            </div>
          </div>
          <MovieList
            data={dataMovies}
            showPagination={true}
            currentPage={Number(currentPage)}
            totalPages={Number(totalPages)}
            showMoviesOnPage={Number(showMoviesOnPage)}
            totalMovies={Number(totalMovies)}
            error={error}
            loading={loading}
          />
        </section>
      </main>
    </>
  );
};

export default HomePage;
