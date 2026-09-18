import type { SearchRepository } from "../../shared/types/repository";
import type { GitHubCommit, GitHubRepository } from "./github.types";
export function mapGitHubRepository(repo: GitHubRepository): SearchRepository {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    ownerLogin: repo.owner.login,
    stars: repo.stargazers_count,
    openIssues: repo.open_issues_count,
  };
}

export function mapLatestCommitDate(commits: GitHubCommit[]): string | null {
  return commits[0]?.commit.committer.date ?? null;
}
