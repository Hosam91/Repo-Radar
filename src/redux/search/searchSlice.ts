import { createSlice } from "@reduxjs/toolkit";

import type { SearchState } from "./search.types";
import { searchRepositories } from "./searchThunks";
import {
  fetchMissingCommit,
  refreshRepository,
} from "../trackedRepos/trackedReposThunks";

const initialState: SearchState = {
  results: [],
  status: "idle",
  error: null,
  currentRequestId: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.status = "idle";
      state.error = null;
      state.currentRequestId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state, action) => {
        state.currentRequestId = action.meta.requestId;
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchRepositories.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.results = action.payload;
        state.status = "succeeded";
        state.error = null;
        state.currentRequestId = null;
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.currentRequestId = null;

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
      })
      .addCase(refreshRepository.fulfilled, (state, action) => {
        const index = state.results.findIndex(
          (repo) => repo.id === action.payload.repoId,
        );

        if (index === -1) {
          return;
        }

        const refreshedRepo = action.payload.repository;

        state.results[index] = {
          ...state.results[index],
          name: refreshedRepo.name,
          fullName: refreshedRepo.fullName,
          description: refreshedRepo.description,
          ownerLogin: refreshedRepo.ownerLogin,
          stars: refreshedRepo.stars,
          openIssues: refreshedRepo.openIssues,
          lastCommitDate: action.payload.lastCommitDate,
        };
      });
  },
});

export const searchReducer = searchSlice.reducer;
export const { clearSearch } = searchSlice.actions;
