import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLatestCommit,
  getRepository,
} from "../../services/github/githubApi";
import type { RootState } from "../store";
import type {
  FetchMissingCommitResult,
  RefreshRepositoryResult,
} from "./trackedRepos.types";

export const fetchMissingCommit = createAsyncThunk<
  FetchMissingCommitResult,
  number,
  { state: RootState }
>("trackedRepos/fetchMissingCommit", async (repoId, { getState, signal }) => {
  const repo = getState().trackedRepos.byId[repoId];

  if (!repo) {
    throw new Error("Tracked repository not found");
  }

  const lastCommitDate = await getLatestCommit(repo.fullName, signal);

  return {
    repoId,
    lastCommitDate,
    lastUpdatedAt: new Date().toISOString(),
  };
});

export const refreshRepository = createAsyncThunk<
  RefreshRepositoryResult,
  number,
  { state: RootState }
>("trackedRepos/refreshRepository", async (repoId, { getState, signal }) => {
  const repo = getState().trackedRepos.byId[repoId];

  if (!repo) {
    throw new Error("Tracked repository not found");
  }

  const [repository, lastCommitDate] = await Promise.all([
    getRepository(repo.fullName, signal),
    getLatestCommit(repo.fullName, signal),
  ]);

  return {
    repoId,
    repository,
    lastCommitDate,
    lastUpdatedAt: new Date().toISOString(),
  };
});

export const refreshAllRepositories = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("trackedRepos/refreshAllRepositories", async (_, { getState, dispatch }) => {
  const repoIds = getState().trackedRepos.ids;

  await Promise.allSettled(
    repoIds.map((repoId) => dispatch(refreshRepository(repoId)).unwrap()),
  );
});
