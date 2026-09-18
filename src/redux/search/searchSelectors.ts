import type { RootState } from "../store";

export const selectSearchResults = (state: RootState) =>
  state.search.results;

export const selectSearchStatus = (state: RootState) =>
  state.search.status;

export const selectSearchError = (state: RootState) =>
  state.search.error;