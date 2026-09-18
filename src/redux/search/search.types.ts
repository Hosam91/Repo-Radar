import type { AsyncStatus } from "../../shared/types/asyncStatus";
import type { SearchRepository } from "../../shared/types/repository";

export interface SearchState {
  results: SearchRepository[];
  status: AsyncStatus;
  error: string | null;
}