import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  selectSearchError,
  selectSearchResults,
  selectSearchStatus,
} from "../../../../redux/search/searchSelectors";
import { selectTrackedReposById } from "../../../../redux/trackedRepos/trackedReposSelectors";
import {
  trackRepository,
  untrackRepository,
} from "../../../../redux/trackedRepos/trackedReposSlice";
import {
  fetchMissingCommit,
  refreshRepository,
} from "../../../../redux/trackedRepos/trackedReposThunks";
import type { SearchRepository } from "../../../../shared/types/repository";

import { SearchResultCard } from "../SearchResultCard";

export function SearchResults() {
  const dispatch = useAppDispatch();

  const results = useAppSelector(selectSearchResults);
  const status = useAppSelector(selectSearchStatus);
  const error = useAppSelector(selectSearchError);
  const trackedReposById = useAppSelector(selectTrackedReposById);

  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          py: 2,
        }}
      >
        <CircularProgress size={18} />

        <Typography variant="body2" color="text.secondary">
          Searching repositories...
        </Typography>
      </Stack>
    );
  }

  if (status === "failed") {
    return (
      <Alert severity="error">
        {error ?? "Failed to search repositories."}
      </Alert>
    );
  }

  if (results.length === 0) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          No repositories found
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Try searching with a different repository name.
        </Typography>
      </Box>
    );
  }

  const handleTrack = (repo: SearchRepository) => {
    if (trackedReposById[repo.id]) {
      return;
    }

    dispatch(trackRepository(repo));
    dispatch(fetchMissingCommit(repo.id));
  };

  const handleUntrack = (repoId: number) => {
    dispatch(untrackRepository(repoId));
  };

  const handleRefresh = (repoId: number) => {
    dispatch(refreshRepository(repoId));
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Search results
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {results.length}{" "}
          {results.length === 1 ? "repository" : "repositories"} found
        </Typography>
      </Box>

      {results.map((repo) => (
        <SearchResultCard
          key={repo.id}
          repo={repo}
          trackedRepo={trackedReposById[repo.id]}
          onTrack={handleTrack}
          onUntrack={handleUntrack}
          onRefresh={handleRefresh}
        />
      ))}
    </Stack>
  );
}