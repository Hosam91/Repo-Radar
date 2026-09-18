import { Stack, Typography } from "@mui/material";
import {
  selectSearchError,
  selectSearchResults,
  selectSearchStatus,
} from "../../../../redux/search/searchSelectors";
import { SearchResultCard } from "../SearchResultCard";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { trackRepository } from "../../../../redux/trackedRepos/trackedReposSlice";
import { fetchMissingCommit } from "../../../../redux/trackedRepos/trackedReposThunks";
import type { SearchRepository } from "../../../../shared/types/repository";
import { selectTrackedRepoIds } from "../../../../redux/trackedRepos/trackedReposSelectors";

export function SearchResults() {
  const results = useAppSelector(selectSearchResults);
  const status = useAppSelector(selectSearchStatus);
  const error = useAppSelector(selectSearchError);
  const dispatch = useAppDispatch();
  const trackedRepoIds = useAppSelector(selectTrackedRepoIds);

  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return <Typography>Searching...</Typography>;
  }

  if (status === "failed") {
    return <Typography color="error">{error}</Typography>;
  }

  if (results.length === 0) {
    return <Typography>No repositories found.</Typography>;
  }

  const handleTrack = (repository: SearchRepository) => {
    if (trackedRepoIds.includes(repository.id)) {
      return;
    }

    dispatch(trackRepository(repository));
    dispatch(fetchMissingCommit(repository.id));
  };

  return (
    <Stack spacing={2}>
      {results.map((repo) => (
        <SearchResultCard
          key={repo.id}
          repo={repo}
          onTrack={handleTrack}
          isTracked={trackedRepoIds.includes(repo.id)}
        />
      ))}
    </Stack>
  );
}
