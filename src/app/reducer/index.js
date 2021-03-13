import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import {
  filterSearchResults,
  filterResourceDetails
} from "../../helpers/search.helper";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: {
      actors: [],
      movies: [],
      shows: []
    },
    selectedResource: {},
    suggestions: {
      actors: [],
      movies: [],
      shows: []
    }
  },
  reducers: {
    setResults: (state, action) => {
      state.selectedResource = {};
      state.searchResults = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setSelectedResource: (state, action) => {
      state.selectedResource = action.payload;
    }
  }
});

export const {
  setResults,
  setSuggestions,
  setSelectedResource
} = moviesSlice.actions;

export const multiSearch = (
  keyword,
  searchOption,
  suggestionsSearch = false
) => async (dispatch) => {
  const API_URL = `${BASE_URL}/search/${searchOption}?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`;
  const response = await axios({
    method: "get",
    url: API_URL
  });
  const { results } = response.data;
  const filteredData = filterSearchResults(results, searchOption);
  if (suggestionsSearch) {
    dispatch(setSuggestions(filteredData));
  } else {
    dispatch(setResults(filteredData));
  }
};

export const searchRecommendations = () => async (dispatch) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  });
  const { results } = response.data;
  const filteredData = filterSearchResults(results);
  dispatch(setResults(filteredData));
}

export const searchDetail = (resource, id) => async (dispatch) => {
  const relatedData = (resource === "person") ? "movie_credits" : "credits";
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/${resource}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=${relatedData}`
  });
  const details = response.data;
  const filteredData = filterResourceDetails(relatedData, details);
  dispatch(setSelectedResource(filteredData));
}

export const getSearchResults = (state) => state.movies.searchResults;
export const getSuggestions = (state) => state.movies.suggestions;
export const getSelectedResource = (state) => state.movies.selectedResource;

export default moviesSlice.reducer;