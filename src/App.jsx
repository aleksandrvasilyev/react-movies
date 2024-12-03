import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import { FavoriteProvider } from "./context/favoriteContext.jsx";
import { HistoryProvider } from "./context/historyContext.jsx";
import { SortAndFilterProvider } from "./context/SortAndFilterContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <HistoryProvider>
          <SortAndFilterProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route path="/page?/:page?" element={<HomePage />} />
                <Route path="/favorites/" element={<FavoritesPage />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/search/" element={<SearchPage />} />
                <Route path="/history/" element={<HistoryPage />} />
              </Route>
            </Routes>
          </SortAndFilterProvider>
        </HistoryProvider>
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;
