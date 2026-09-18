import { Button, Card, CardContent, Stack, Typography } from "@mui/material";

import type { TrackedRepoCardProps } from "./TrackedRepoCard.types";

export function TrackedRepoCard({
  repo,
  onUntrack,
  onRefresh,
}: TrackedRepoCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">{repo.fullName}</Typography>

          <Typography color="text.secondary">
            {repo.description ?? "No description available."}
          </Typography>

          <Typography>Stars: {repo.stars}</Typography>

          <Typography>Open issues: {repo.openIssues}</Typography>

          <Typography>
            Last commit: {repo.lastCommitDate ?? "Not available"}
          </Typography>

          <Typography>
            Last Update time: {repo.lastUpdatedAt ?? "Not updated yet"}
          </Typography>

          {repo.status === "loading" && <Typography>Loading...</Typography>}

          {repo.status === "failed" && repo.error && (
            <Typography color="error">{repo.error}</Typography>
          )}
        </Stack>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onUntrack(repo.id)}
          >
            Untrack
          </Button>
          <Button
            variant="contained"
            onClick={() => onRefresh(repo.id)}
            disabled={repo.status === "loading"}
          >
            {repo.status === "loading" ? "Refreshing..." : "Refresh"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
