import type { AsyncStatus } from "../../shared/types/asyncStatus";
import type { TrackedRepository } from "../../shared/types/repository";
import type { SearchRepository } from "../../shared/types/repository";

export interface TrackedReposState {
  byId: Record<number, TrackedRepository>;
  ids: number[];
  refreshAllStatus: AsyncStatus;
}

export interface FetchMissingCommitResult {
  repoId: number;
  lastCommitDate: string | null;
  lastUpdatedAt: string;
}
export interface RefreshRepositoryResult {
  repoId: number;
  repository: SearchRepository;
  lastCommitDate: string | null;
  lastUpdatedAt: string;
}