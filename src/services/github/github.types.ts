export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  owner: {
    login: string
  }
  stargazers_count: number
  open_issues_count: number
}

export interface GitHubSearchRepositoriesResponse {
  items: GitHubRepository[]
}

export interface GitHubCommit {
  commit: {
    committer: {
      date: string | null
    }
  }
}