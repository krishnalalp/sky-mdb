const filterSearchResults = (results, searchOption) => {
  const movies = [];
  const shows = [];
  const actors = [];
  results.forEach((result) => {
    if(result.id && (result.title || result.name)) {
      if (searchOption === "person" || result.media_type === "person") {
        actors.push(result);
      } else if (searchOption === "tv" || result.media_type === "tv") {
        shows.push(result);
      } else {
        movies.push(result);
      }
    }
  });

  return {
    actors: actors.sort((a,b) => b.popularity - a.popularity),
    movies: movies.sort((a,b) => b.popularity - a.popularity),
    shows: shows.sort((a,b) => b.popularity - a.popularity)
  }
}

const filterResourceDetails = (key, details) => {
  const relatedData = [];
  details[key].cast.forEach((result) => {
    if(result.id && (result.title || result.name)) {
      relatedData.push(result);
    }
  });

  return {
    ...details,
    [key]: {
      cast: relatedData
    }
  }
}

export { filterSearchResults, filterResourceDetails };