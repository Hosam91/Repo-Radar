import type { TrackedRepository } from "../shared/types/repository";
import { STORAGE_KEYS } from "./storage.constants";

export type PersistedRepository = Omit<TrackedRepository, "status" | "error">;

export function saveTrackedRepositories(
  repositories: TrackedRepository[],
): void {
const persistedRepositories: PersistedRepository[] = repositories.map(
  ({ status: _status, error: _error, ...repository }) => repository,
);

  localStorage.setItem(
    STORAGE_KEYS.trackedRepositories,
    JSON.stringify(persistedRepositories),
  );
}

export function loadTrackedRepositories(): PersistedRepository[] {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEYS.trackedRepositories);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue as PersistedRepository[];
  } catch {
    return [];
  }
}
