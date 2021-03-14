const constants = {
  MIN_SEARCH_LENGTH: 4,
  DEFAULT_SEARCH_OPTION: "multi",
  DEFAULT_IMAGE:
    "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg",
  NO_RESULTS_TEXT: "Oops! Try searching for other keywords.",
  IMAGE_BASE_URL: "http://image.tmdb.org/t/p/w500",
  SEARCH_OPTIONS: [
    { label: "All", value: "multi" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
    { label: "Cast", value: "person" },
  ],
  DEFAULT_TEXT: "N/A",
  TITLES: {
    MOVIE: "Movies",
    TV: "TV Shows",
    CAST: "Cast",
    SEARCH_RESULTS: "Search Results",
    RECOMMENDED_MOVIES: "Recommended Movies",
  },
  TYPES: {
    MOVIE: "movie",
    TV: "tv",
    CAST: "person",
  },
  APPEND_DATA: {
    MOVIE_CREDITS: "movie_credits",
    CREDITS: "credits",
  },
};

export default constants;
