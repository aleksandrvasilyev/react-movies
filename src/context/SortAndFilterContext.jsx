import { useState, createContext } from "react";
import useDebounce from "../hooks/useDebounce";

export const SortAndFilterContext = createContext();

export const SortAndFilterProvider = ({ children }) => {
  const [sortOption, setSortOption] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [releaseDateRange, setReleaseDateRange] = useState([1950, 2024]);
  const [ratingCountRange, setRatingCountRange] = useState([5000, 36600]);

  const debouncedRatingCountRange = useDebounce(ratingCountRange, 300);
  const debouncedReleaseDateRange = useDebounce(releaseDateRange, 300);

  return (
    <SortAndFilterContext.Provider
      value={{
        sortOption,
        setSortOption,
        selectedGenres,
        setSelectedGenres,
        releaseDateRange,
        setReleaseDateRange,
        ratingCountRange,
        setRatingCountRange,
        debouncedRatingCountRange,
        debouncedReleaseDateRange,
      }}
    >
      {children}
    </SortAndFilterContext.Provider>
  );
};
