import { createAsyncThunk } from "@reduxjs/toolkit";

import type { SearchRepository } from "../../shared/types/repository";
import { searchRepositories as searchRepositoriesApi } from "../../services/github/githubApi";

export const searchRepositories = createAsyncThunk<SearchRepository[], string>(
  "search/searchRepositories",
  async (query, { signal }) => {
    return searchRepositoriesApi(query, signal);
  },
);
