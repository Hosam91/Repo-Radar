import type { AsyncStatus } from './asyncStatus'

export interface SearchRepository {
  id: number
  name: string
  fullName: string
  description: string | null
  ownerLogin: string
  stars: number
  openIssues: number
}

export interface TrackedRepository extends SearchRepository {
  lastCommitDate: string | null
  lastUpdatedAt: string | null
  status: AsyncStatus
  error: string | null
}