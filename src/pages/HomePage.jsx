import { useEffect, useState, useContext } from "react";
import MovieList from "../components/MovieList";
import { useParams } from "react-router-dom";
import { sorting } from "../data/sorting.json";
import Sidebar from "../components/Sidebar";
import { SortAndFilterContext } from "../context/SortAndFilterContext";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const {
    sortOption,
    selectedGenres,
    debouncedRatingCountRange,
    debouncedReleaseDateRange,
  } = useContext(SortAndFilterContext);

  const { error, loading, fetchData } = useFetch();

  const [moviesData, setMoviesData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  const { page } = useParams();
  const currentPage = page || 1;
  const moviesPerPage = 12;
  const moviesFromApi = 20;
  const sortOptions = sorting[0];

  useEffect(() => {
    const generateApiUrls = () => {
      const startIndex = (currentPage - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      const startPage = Math.floor(startIndex / moviesFromApi) + 1;
      const endPage = Math.floor((endIndex - 1) / moviesFromApi) + 1;
      const totalApiPages = endPage - startPage + 1;

      const apiUrls = [];
      const baseUrl = "https://api.themoviedb.org/3/discover/movie";

      for (let i = 0; i < totalApiPages; i++) {
        const pageNum = startPage + i;
        const params = {
          language: "en-US",
          sort_by: sortOptions.find((opt) => opt.id === Number(sortOption))
            .value,
          page: pageNum,
          "vote_count.gte": debouncedRatingCountRange[0],
          "vote_count.lte": debouncedRatingCountRange[1],
          "primary_release_date.gte": `${debouncedReleaseDateRange[0]}-01-01`,
          "primary_release_date.lte": `${debouncedReleaseDateRange[1]}-12-31`,
          with_genres: selectedGenres.join(","),
          include_adult: false,
          include_video: false,
        };
        const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
        apiUrls.push(url);
      }
      return {
        apiUrls,
        startIndexInChunk: startIndex % moviesFromApi,
      };
    };

    const fetchMovies = async () => {
      const { apiUrls, startIndexInChunk } = generateApiUrls();

      const responses = await fetchData(apiUrls);

      let combinedResults = [];

      responses.forEach((response) => {
        combinedResults = combinedResults.concat(response.results);
        if (responses.indexOf(response) === 0) {
          setTotalPages(response.total_pages);
          setTotalMovies(response.total_results);
        }
      });

      const finalMoviesData = combinedResults.slice(
        startIndexInChunk,
        startIndexInChunk + moviesPerPage
      );

      setMoviesData(finalMoviesData);
    };

    fetchMovies();
  }, [
    currentPage,
    sortOptions,
    debouncedRatingCountRange,
    debouncedReleaseDateRange,
    selectedGenres,
    sortOption,
    fetchData,
  ]);

  return (
    <>
      <main className="flex container gap-10 mx-auto px-4 py-10 w-full max-w-6xl md:flex-row flex-col-reverse">
        <Sidebar sortOptions={sortOptions} />
        <section className="w-full">
          <div className="flex justify-between items-center w-full text-xl font-bold my-4">
            <div className="text-left">
              Movies
              <span className="block text-sm text-gray-400">
                sorted by{" "}
                {sortOptions.find((val) => val.id === Number(sortOption)).name}{" "}
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
                    {moviesPerPage} movies on page
                  </div>
                </>
              )}
            </div>
          </div>
          <MovieList
            data={moviesData}
            showPagination={true}
            currentPage={Number(currentPage)}
            totalPages={Number(totalPages)}
            moviesPerPage={Number(moviesPerPage)}
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
