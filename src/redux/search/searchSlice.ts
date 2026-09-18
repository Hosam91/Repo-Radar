import { createSlice } from "@reduxjs/toolkit";

import type { SearchState } from "./search.types";
import { searchRepositories } from "./searchThunks";

const initialState: SearchState = {
  results: [],
  status: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchRepositories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        if (action.meta.aborted) {
          state.status = "idle";
          return;
        }
        state.status = "failed";
        state.error = action.error.message ?? "Failed to search repositories";
      });
  },
});

export const searchReducer = searchSlice.reducer;
