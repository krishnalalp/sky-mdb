import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: {
      actors: [],
      movies: [],
      shows: [],
    }
  },
  reducers: {}
});

export default moviesSlice.reducer;