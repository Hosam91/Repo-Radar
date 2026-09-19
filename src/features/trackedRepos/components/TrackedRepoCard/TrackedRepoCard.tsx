import { Button, Stack, Typography } from "@mui/material";

import { RepoCard } from "../../../../shared/components/RepoCard";
import type { TrackedRepoCardProps } from "./TrackedRepoCard.types";
import { formatDate } from "../../../../shared/utils/formatDate";

export function TrackedRepoCard({
  repo,
  onUntrack,
  onRefresh,
}: TrackedRepoCardProps) {
  const { id, status, lastCommitDate, lastUpdatedAt, error } = repo;
  const isLoading = status === "loading";
  const hasError = status === "failed" && Boolean(error);

  const handleRefresh = () => onRefresh(id);
  const handleUntrack = () => onUntrack(id);

  const actions = () => (
    <>
      <Button
        size="small"
        variant="contained"
        disabled={isLoading}
        onClick={handleRefresh}
      >
        {isLoading ? "Refreshing..." : "Refresh"}
      </Button>

      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={handleUntrack}
      >
        Untrack
      </Button>
    </>
  );

  return (
    <RepoCard repo={repo} actions={actions()}>
      <Stack spacing={0.5}>
        <Typography variant="body2">
          Last commit: {formatDate(lastCommitDate)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {lastUpdatedAt ? formatDate(lastUpdatedAt) : "Not updated yet"}
        </Typography>

        {hasError && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Stack>
    </RepoCard>
  );
}
