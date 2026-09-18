import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectTrackedRepoIds = (state: RootState) =>
  state.trackedRepos.ids;

export const selectTrackedRepos = (state: RootState) =>
  state.trackedRepos.ids.map((id) => state.trackedRepos.byId[id]);

export const selectRefreshAllStatus = (state: RootState) =>
  state.trackedRepos.refreshAllStatus;

export const selectStarsChartData = createSelector(
  [
    (state: RootState) => state.trackedRepos.ids,
    (state: RootState) => state.trackedRepos.byId,
  ],
  (ids, byId) =>
    ids.map((id) => ({
      name: byId[id].fullName,
      stars: byId[id].stars,
    })),
);