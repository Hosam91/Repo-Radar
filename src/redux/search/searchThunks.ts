import { createAsyncThunk } from "@reduxjs/toolkit";

import type { SearchRepository } from "../../shared/types/repository";
import { searchRepositories as searchRepositoriesApi } from "../../services/github/githubApi";
import type { RootState } from "../store";

export const searchRepositories = createAsyncThunk<
  SearchRepository[],
  string,
  { state: RootState }
>("search/searchRepositories", async (query, { signal, getState }) => {
  const results = await searchRepositoriesApi(query, signal);
  const trackedReposById = getState().trackedRepos.byId;

  return results.map((repo) => {
    const trackedRepo = trackedReposById[repo.id];

    return trackedRepo?.lastCommitDate
      ? { ...repo, lastCommitDate: trackedRepo.lastCommitDate }
      : repo;
  });
});
