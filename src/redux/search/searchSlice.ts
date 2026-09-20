import { createSlice } from "@reduxjs/toolkit";

import type { SearchState } from "./search.types";
import { searchRepositories } from "./searchThunks";
import { fetchMissingCommit } from "../trackedRepos/trackedReposThunks";

const initialState: SearchState = {
  results: [],
  status: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.status = "idle";
      state.error = null;
    },
  },
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
      })
      .addCase(fetchMissingCommit.fulfilled, (state, action) => {
        const result = state.results.find(
          (repo) => repo.id === action.payload.repoId,
        );

        if (result) {
          result.lastCommitDate = action.payload.lastCommitDate;
        }
      });
  },
});

export const searchReducer = searchSlice.reducer;
export const { clearSearch } = searchSlice.actions;
