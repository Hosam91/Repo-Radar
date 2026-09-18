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

export function SearchResults() {
  const results = useAppSelector(selectSearchResults);
  const status = useAppSelector(selectSearchStatus);
  const error = useAppSelector(selectSearchError);
  const dispatch = useAppDispatch();
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

  const handleTrack = (repo: SearchRepository) => {
    dispatch(trackRepository(repo));
    dispatch(fetchMissingCommit(repo.id));
  };

  return (
    <Stack spacing={2}>
      {results.map((repo) => (
        <SearchResultCard key={repo.id} repo={repo} onTrack={handleTrack} />
      ))}
    </Stack>
  );
}
