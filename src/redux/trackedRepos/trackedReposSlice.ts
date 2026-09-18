import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { SearchRepository } from "../../shared/types/repository";
import type { TrackedReposState } from "./trackedRepos.types";

const initialState: TrackedReposState = {
  byId: {},
  ids: [],
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
  },
});

export const { trackRepository } = trackedReposSlice.actions;
export const trackedReposReducer = trackedReposSlice.reducer;
