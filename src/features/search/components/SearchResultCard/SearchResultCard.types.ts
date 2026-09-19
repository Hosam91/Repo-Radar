import type {
  SearchRepository,
  TrackedRepository,
} from "../../../../shared/types/repository";

export interface SearchResultCardProps {
  repo: SearchRepository;
  trackedRepo?: TrackedRepository;
  onTrack: (repo: SearchRepository) => void;
  onUntrack: (repoId: number) => void;
  onRefresh: (repoId: number) => void;
}