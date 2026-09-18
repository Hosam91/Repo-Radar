import type { AsyncStatus } from "../../shared/types/asyncStatus";
import type { TrackedRepository } from "../../shared/types/repository";

export interface TrackedReposState {
  byId: Record<number, TrackedRepository>;
  ids: number[];
  refreshAllStatus: AsyncStatus;
}
