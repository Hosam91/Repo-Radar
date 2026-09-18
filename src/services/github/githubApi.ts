import type { SearchRepository } from "../../shared/types/repository";
import { apiClient } from "../http/apiClient";
import { githubEndpoints } from "./github.endpoints";
import { mapGitHubRepository, mapLatestCommitDate } from "./githubMappers";
import type {
  GitHubCommit,
  GitHubRepository,
  GitHubSearchRepositoriesResponse,
} from "./github.types";

export const searchRepositories = async (
  query: string,
  signal?: AbortSignal,
): Promise<SearchRepository[]> => {
  const response = await apiClient.get<GitHubSearchRepositoriesResponse>(
    githubEndpoints.searchRepositories(query),
    signal,
  );

  return response.items.map(mapGitHubRepository);
};

export const getRepository = async (
  fullName: string,
  signal?: AbortSignal,
): Promise<SearchRepository> => {
  const response = await apiClient.get<GitHubRepository>(
    githubEndpoints.repository(fullName),
    signal,
  );

  return mapGitHubRepository(response);
};

export const getLatestCommit = async (
  fullName: string,
  signal?: AbortSignal,
): Promise<string | null> => {
  const response = await apiClient.get<GitHubCommit[]>(
    githubEndpoints.latestCommit(fullName),
    signal,
  );

  return mapLatestCommitDate(response);
};
