import { configureStore } from "@reduxjs/toolkit";

import { saveTrackedRepositories } from "../storage/trackedReposStorage";
import { searchReducer } from "./search/searchSlice";
import { trackedReposReducer } from "./trackedRepos/trackedReposSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    trackedRepos: trackedReposReducer,
  },
});

let previousTrackedReposState = store.getState().trackedRepos;

store.subscribe(() => {
  const currentTrackedReposState = store.getState().trackedRepos;

  if (currentTrackedReposState === previousTrackedReposState) {
    return;
  }

  previousTrackedReposState = currentTrackedReposState;

  const repositories = currentTrackedReposState.ids.map(
    (id) => currentTrackedReposState.byId[id],
  );

  saveTrackedRepositories(repositories);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;