import { useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import MovieList from "../components/MovieList";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { data, error, loading, fetchData } = useFetch();
  const [dataMovies, setDataMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const { page } = useParams();
  const currentPage = page || 1;

  const moviesOnPage = 12;

  const {
    linksArray: links,
    startIndex,
    endIndex,
  } = useMemo(() => getMoviesLinks(currentPage), [currentPage]);

  useEffect(() => {
    if (links && links.length > 0) {
      fetchData(links);
    }
  }, [links, fetchData]);

  useEffect(() => {
    const result = getMovies(data, startIndex, endIndex);
    if (data[0]) {
      setTotalPages(Math.floor(data[0].total_results / moviesOnPage));
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
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${index}&sort_by=vote_average.desc&vote_count.gte=5000`
      );
    }
    return {
      linksArray,
      startIndex: startIndexInChunk,
      endIndex: endIndexInChunk,
    };
  }

  return (
    <>
      <section className="container mx-auto px-4 py-10 w-full max-w-5xl">
        <div className="flex justify-between items-center w-full text-xl font-bold my-4">
          <div className="text-left">Movies</div>
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
    </>
  );
};

export default HomePage;
