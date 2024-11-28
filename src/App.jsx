import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import { FavoriteProvider } from "./context/favoriteContext.jsx";
import SearchPage from "./pages/SearchPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites/" element={<FavoritesPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/search/" element={<SearchPage />} />
        </Routes>
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;
