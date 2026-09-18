import type { TrackedRepository } from "../../../../shared/types/repository";

export interface TrackedRepoCardProps {
  repo: TrackedRepository;
  onUntrack: (repoId: number) => void;
}
