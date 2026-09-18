import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { SearchRepository } from "../../shared/types/repository";
import type { TrackedReposState } from "./trackedRepos.types";
import {
  fetchMissingCommit,
  refreshRepository,
  refreshAllRepositories,
} from "./trackedReposThunks";
import { loadTrackedRepositories } from "../../storage/trackedReposStorage";

const persistedRepos = loadTrackedRepositories();

const initialState: TrackedReposState = {
  byId: Object.fromEntries(
    persistedRepos.map((repo) => [
      repo.id,
      {
        ...repo,
        status: "idle",
        error: null,
      },
    ]),
  ),
  ids: persistedRepos.map((repo) => repo.id),
  refreshAllStatus: "idle",
};

const trackedReposSlice = createSlice({
  name: "trackedRepos",
  initialState,
  reducers: {
    trackRepository: (state, action: PayloadAction<SearchRepository>) => {
      const repo = action.payload;

      if (state.byId[repo.id]) {
        return;
      }

      state.byId[repo.id] = {
        ...repo,
        lastCommitDate: null,
        lastUpdatedAt: null,
        status: "idle",
        error: null,
      };

      state.ids.push(repo.id);
    },
    untrackRepository: (state, action: PayloadAction<number>) => {
      const repoId = action.payload;

      delete state.byId[repoId];

      state.ids = state.ids.filter((id) => id !== repoId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissingCommit.pending, (state, action) => {
        const repo = state.byId[action.meta.arg];

        if (!repo) {
          return;
        }

        repo.status = "loading";
        repo.error = null;
      })
      .addCase(fetchMissingCommit.fulfilled, (state, action) => {
        const repo = state.byId[action.payload.repoId];

        if (!repo) {
          return;
        }

        repo.lastCommitDate = action.payload.lastCommitDate;
        repo.lastUpdatedAt = action.payload.lastUpdatedAt;
        repo.status = "succeeded";
        repo.error = null;
      })
      .addCase(fetchMissingCommit.rejected, (state, action) => {
        const repo = state.byId[action.meta.arg];

        if (!repo) {
          return;
        }

        if (action.meta.aborted) {
          repo.status = "idle";
          return;
        }

        repo.status = "failed";
        repo.error = action.error.message ?? "Failed to fetch latest commit";
      })
      .addCase(refreshRepository.pending, (state, action) => {
        const repo = state.byId[action.meta.arg];

        if (!repo) {
          return;
        }

        repo.status = "loading";
        repo.error = null;
      })
      .addCase(refreshRepository.fulfilled, (state, action) => {
        const repo = state.byId[action.payload.repoId];

        if (!repo) {
          return;
        }

        const refreshedRepo = action.payload.repository;

        repo.name = refreshedRepo.name;
        repo.fullName = refreshedRepo.fullName;
        repo.description = refreshedRepo.description;
        repo.ownerLogin = refreshedRepo.ownerLogin;
        repo.stars = refreshedRepo.stars;
        repo.openIssues = refreshedRepo.openIssues;

        repo.lastCommitDate = action.payload.lastCommitDate;
        repo.lastUpdatedAt = action.payload.lastUpdatedAt;

        repo.status = "succeeded";
        repo.error = null;
      })
      .addCase(refreshRepository.rejected, (state, action) => {
        const repo = state.byId[action.meta.arg];

        if (!repo) {
          return;
        }

        if (action.meta.aborted) {
          repo.status = "idle";
          return;
        }

        repo.status = "failed";
        repo.error = action.error.message ?? "Failed to refresh repository";
      })
      .addCase(refreshAllRepositories.pending, (state) => {
        state.refreshAllStatus = "loading";
      })
      .addCase(refreshAllRepositories.fulfilled, (state) => {
        state.refreshAllStatus = "succeeded";
      })
      .addCase(refreshAllRepositories.rejected, (state) => {
        state.refreshAllStatus = "failed";
      });
  },
});

export const { trackRepository, untrackRepository } = trackedReposSlice.actions;
export const trackedReposReducer = trackedReposSlice.reducer;
