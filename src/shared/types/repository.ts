import type { AsyncStatus } from './asyncStatus'

export interface SearchRepository {
  id: number
  name: string
  fullName: string
  description: string | null
  ownerLogin: string
  stars: number
  openIssues: number
  lastCommitDate: string | null
}

export interface TrackedRepository extends SearchRepository {
  lastUpdatedAt: string | null
  status: AsyncStatus
  error: string | null
}