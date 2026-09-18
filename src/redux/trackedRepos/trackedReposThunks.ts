import { createAsyncThunk } from "@reduxjs/toolkit";

import { getLatestCommit } from "../../services/github/githubApi";
import type { RootState } from "../store";

interface FetchMissingCommitResult {
  repoId: number;
  lastCommitDate: string | null;
  lastUpdatedAt: string;
}

export const fetchMissingCommit = createAsyncThunk<
  FetchMissingCommitResult,
  number,
  { state: RootState }
>(
  "trackedRepos/fetchMissingCommit",
  async (repoId, { getState, signal }) => {
    const repo = getState().trackedRepos.byId[repoId];

    if (!repo) {
      throw new Error("Tracked repository not found");
    }

    const lastCommitDate = await getLatestCommit(
      repo.fullName,
      signal,
    );

    return {
      repoId,
      lastCommitDate,
      lastUpdatedAt: new Date().toISOString(),
    };
  },
);