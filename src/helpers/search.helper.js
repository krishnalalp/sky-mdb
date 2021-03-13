import constants from "./constants";

const { TYPES } = constants;

const filterSearchResults = (results, searchOption) => {
  const movies = [];
  const shows = [];
  const actors = [];
  results.forEach((result) => {
    if (result.id && (result.title || result.name)) {
      if (searchOption === TYPES.CAST || result.media_type === TYPES.CAST) {
        actors.push(result);
      } else if (searchOption === TYPES.TV || result.media_type === TYPES.TV) {
        shows.push(result);
      } else {
        movies.push(result);
      }
    }
  });

  return {
    actors,
    movies,
    shows,
  };
};

const filterResourceDetails = (key, details) => {
  const relatedData = [];
  details[key].cast.forEach((result) => {
    if (result.id && (result.title || result.name)) {
      relatedData.push(result);
    }
  });

  return {
    ...details,
    [key]: {
      cast: relatedData.sort((a, b) => b.popularity - a.popularity),
    },
  };
};

export { filterSearchResults, filterResourceDetails };
