import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import {
  filterSearchResults
} from "../../helpers/search.helper";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: {
      actors: [],
      movies: [],
      shows: [],
    }
  },
  reducers: {
    setResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    }
  }
});

export const {
  setResults,
  setSuggestions
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
}

export const getSuggestions = (state) => state.movies.suggestions;

export default moviesSlice.reducer;