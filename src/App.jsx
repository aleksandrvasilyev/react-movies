import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import { FavoriteProvider } from "./context/favoriteContext.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/page?/:page?" element={<HomePage />} />
            <Route path="/favorites/" element={<FavoritesPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/search/" element={<SearchPage />} />
          </Route>
        </Routes>
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;
