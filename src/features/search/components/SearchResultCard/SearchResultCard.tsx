import { Button, Card, CardContent, Stack, Typography } from "@mui/material";

import type { SearchResultCardProps } from "./SearchResultCard.types";

export function SearchResultCard({
  repo,
  onTrack,
  isTracked,
}: SearchResultCardProps) {
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

          <Button
            variant="contained"
            onClick={() => onTrack(repo)}
            disabled={isTracked}
          >
            Track
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
