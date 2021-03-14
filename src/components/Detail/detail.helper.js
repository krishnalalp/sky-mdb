import constants from "../../helpers/constants";

const { TITLES, TYPES } = constants;

const mapPerson = (actorDetail) => ({
  title: actorDetail.name,
  poster: actorDetail.profile_path,
  description: [
    {
      label: "Birthday",
      value: actorDetail.birthday,
    },
    {
      label: "Place Of Birth",
      value: actorDetail.place_of_birth,
    },
    {
      label: "Popularity",
      value: actorDetail.popularity,
    },
    {
      label: "Biography",
      value: actorDetail.biography,
    },
  ],
  extraDetails: {
    title: TITLES.MOVIE,
    type: TYPES.MOVIE,
    data: actorDetail.movie_credits.cast,
  },
});

const mapMovie = (movieDetail) => ({
  title: movieDetail.title,
  poster: movieDetail.poster_path,
  description: [
    {
      label: "Vote Average",
      value: movieDetail.vote_average,
    },
    {
      label: "Runtime",
      value: movieDetail.runtime,
    },
    {
      label: "Budget",
      value: movieDetail.budget ? `$ ${movieDetail.budget}` : null,
    },
    {
      label: "Genres",
      value: movieDetail.genres.map((genre) => genre.name).toString(),
    },
    {
      label: "Popularity",
      value: movieDetail.popularity,
    },
    {
      label: "Production Companies",
      value: movieDetail.production_companies.map((p) => p.name).toString(),
    },
    {
      label: "Production Countries",
      value: movieDetail.production_countries.map((p) => p.name).toString(),
    },
    {
      label: "Spoken Languages",
      value: movieDetail.spoken_languages.map((p) => p.name).toString(),
    },
    {
      label: "Release date",
      value: movieDetail.release_date,
    },
    {
      label: "Overview",
      value: movieDetail.overview,
    },
  ],
  extraDetails: {
    title: TITLES.CAST,
    type: TYPES.CAST,
    data: movieDetail.credits.cast,
  },
});

const mapTv = (showDetail) => ({
  title: showDetail.title,
  poster: showDetail.poster_path,
  description: [
    {
      label: "Vote Average",
      value: showDetail.vote_average,
    },
    {
      label: "First Air Date",
      value: showDetail.first_air_date,
    },
    {
      label: "Origin Country",
      value: showDetail.origin_country[0],
    },
    {
      label: "Genres",
      value: showDetail.genres.map((genre) => genre.name).toString(),
    },
    {
      label: "Popularity",
      value: showDetail.popularity,
    },
    {
      label: "Production Companies",
      value: showDetail.production_companies.map((p) => p.name).toString(),
    },
    {
      label: "Seasons",
      value: showDetail.seasons.map((season) => season.name).toString(),
    },
    {
      label: "Spoken Languages",
      value: showDetail.spoken_languages.map((p) => p.name).toString(),
    },
    {
      label: "Overview",
      value: showDetail.overview,
    },
  ],
  extraDetails: {
    title: TITLES.CAST,
    type: TYPES.CAST,
    data: showDetail.credits.cast,
  },
});

export const mapDetails = (resourceDetails, resource) => {
  if (resource === TYPES.MOVIE) {
    return mapMovie(resourceDetails);
  }
  if (resource === TYPES.CAST) {
    return mapPerson(resourceDetails);
  }
  if (resource === TYPES.TV) {
    return mapTv(resourceDetails);
  }
  return {};
};
