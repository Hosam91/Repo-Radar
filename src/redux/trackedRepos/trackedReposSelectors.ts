import type { RootState } from "../store";

export const selectTrackedRepoIds = (state: RootState) =>
  state.trackedRepos.ids;

export const selectTrackedRepos = (state: RootState) =>
  state.trackedRepos.ids.map((id) => state.trackedRepos.byId[id]);

export const selectRefreshAllStatus = (state: RootState) =>
  state.trackedRepos.refreshAllStatus;
