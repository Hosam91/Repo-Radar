export const githubEndpoints = {
  searchRepositories: (query: string) =>
    `/search/repositories?q=${encodeURIComponent(query)}&per_page=10`,

  repository: (fullName: string) => `/repos/${fullName}`,

  latestCommit: (fullName: string) => `/repos/${fullName}/commits?per_page=1`,
} as const;
