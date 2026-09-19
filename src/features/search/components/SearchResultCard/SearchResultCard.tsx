import { Button, Typography } from "@mui/material";

import { RepoCard } from "../../../../shared/components/RepoCard";
import type { SearchResultCardProps } from "./SearchResultCard.types";
import { formatDate } from "../../../../shared/utils/formatDate";

export function SearchResultCard({
  repo,
  trackedRepo,
  onTrack,
  onUntrack,
  onRefresh,
}: SearchResultCardProps) {
  const isTracked = Boolean(trackedRepo);
  const isLoading = trackedRepo?.status === "loading";
  const displayRepo = trackedRepo ?? repo;

  const getLastCommitMessage = () => {
    if (!isTracked) {
      return "Track to see last commit";
    }

    if (isLoading && !trackedRepo?.lastCommitDate) {
      return "Fetching latest commit...";
    }

    return formatDate(trackedRepo?.lastCommitDate);
  };

  const handleRefresh = () => onRefresh(repo.id);
  const handleUntrack = () => onUntrack(repo.id);
  const handleTrack = () => onTrack(repo);

  const actions = isTracked ? (
    <>
      <Button
        variant="contained"
        size="small"
        disabled={isLoading}
        onClick={handleRefresh}
      >
        {isLoading ? "Refreshing..." : "Refresh"}
      </Button>

      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleUntrack}
      >
        Untrack
      </Button>
    </>
  ) : (
    <Button variant="contained" size="small" onClick={handleTrack}>
      Track
    </Button>
  );

  return (
    <RepoCard repo={displayRepo} actions={actions}>
      <Typography variant="body2" color="text.secondary">
        Last commit: {getLastCommitMessage()}
      </Typography>
    </RepoCard>
  );
}
