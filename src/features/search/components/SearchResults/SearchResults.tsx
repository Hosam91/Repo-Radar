import { Stack, Typography } from "@mui/material";

import { useAppSelector } from "../../../../redux/hooks";
import {
  selectSearchError,
  selectSearchResults,
  selectSearchStatus,
} from "../../../../redux/search/searchSelectors";
import { SearchResultCard } from "../SearchResultCard";

export function SearchResults() {
  const results = useAppSelector(selectSearchResults);
  const status = useAppSelector(selectSearchStatus);
  const error = useAppSelector(selectSearchError);

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

  return (
    <Stack spacing={2}>
      {results.map((repo) => (
        <SearchResultCard key={repo.id} repository={repo} />
      ))}
    </Stack>
  );
}
