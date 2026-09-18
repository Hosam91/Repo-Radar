import type { SearchRepository } from "../../../../shared/types/repository";

export interface SearchResultCardProps {
  repo: SearchRepository;
  onTrack: (repo: SearchRepository) => void;
}
