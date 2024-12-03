import { useContext } from "react";
import { genres } from "../data/genres.json";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { SortAndFilterContext } from "../context/SortAndFilterContext";

const Sidebar = ({ sortOptions }) => {
  const {
    setSortOption,
    selectedGenres,
    setSelectedGenres,
    releaseDateRange,
    setReleaseDateRange,
    ratingCountRange,
    setRatingCountRange,
  } = useContext(SortAndFilterContext);

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    if (selectedGenres.includes(e.target.value)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  return (
    <section className="w-full max-w-52 text-xl font-bold">
      <div className="my-4 text-center">Sort</div>
      <div>
        <select
          id="default"
          className="bg-gray-100 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg block w-full p-2.5"
          onChange={(e) => setSortOption(e.target.value)}
        >
          {sortOptions.map((value, i) => (
            <option key={i} value={value.id}>
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
                onChange={(e) => handleGenreChange(e)}
              >
                <input type="checkbox" value={id} className="cursor-pointer" />{" "}
                <span
                  className={
                    selectedGenres.includes(id) ? "text-yellow-400" : ""
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
              min={1950}
              max={2024}
              defaultValue={releaseDateRange}
              onInput={(e) => setReleaseDateRange(e)}
            />
            <div className="flex justify-between mt-4">
              <span className="text-left text-sm">{releaseDateRange[0]}</span>
              <span className="text-right text-sm">{releaseDateRange[1]}</span>
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
              <span className="text-left text-sm">{ratingCountRange[0]}</span>
              <span className="text-right text-sm">{ratingCountRange[1]}</span>
            </div>
          </div>
        </div>
        <div className="text-base">
          <div className="mb-2 mt-12">
            <span>Applied:</span>
          </div>
          <div className="my-6">
            {selectedGenres.length > 0 && (
              <span className="block text-sm text-gray-400 my-4">
                Genres: {selectedGenres.map((id) => genres[id]).join(", ")}
              </span>
            )}

            <span className="block text-sm text-gray-400 my-4">
              Release date: from {releaseDateRange[0]} to {releaseDateRange[1]}
            </span>

            <span className="block text-sm text-gray-400 my-4">
              Votes count: from {ratingCountRange[0]} to {ratingCountRange[1]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
