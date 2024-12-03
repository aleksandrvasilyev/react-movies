import { useHistory } from "../context/historyContext";
import MovieList from "../components/MovieList";
const HistoryPage = () => {
  const { history } = useHistory();

  return (
    <section className="container mx-auto px-4 py-10 w-full max-w-6xl">
      {history.length > 0 ? (
        <>
          <div className="flex justify-between font-bold mb-6 text-xl">
            <div>History views page</div>
            <div>{history.length} movie(s)</div>
          </div>
          <MovieList data={history} showPagination={false} />
        </>
      ) : (
        <p>You have not viewed any movies yet!</p>
      )}
    </section>
  );
};

export default HistoryPage;
