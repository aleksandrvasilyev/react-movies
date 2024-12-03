import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import { FavoriteProvider } from "./context/favoriteContext.jsx";
import { HistoryProvider } from "./context/historyContext.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <HistoryProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/page?/:page?" element={<HomePage />} />
              <Route path="/favorites/" element={<FavoritesPage />} />
              <Route path="/movie/:id" element={<MoviePage />} />
              <Route path="/search/" element={<SearchPage />} />
              <Route path="/history/" element={<HistoryPage />} />
            </Route>
          </Routes>
        </HistoryProvider>
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;
