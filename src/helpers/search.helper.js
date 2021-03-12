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

export { filterSearchResults };