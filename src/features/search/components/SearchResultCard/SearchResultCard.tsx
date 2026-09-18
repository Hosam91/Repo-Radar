import { Button, Card, CardContent, Stack, Typography } from "@mui/material";

import type { SearchResultCardProps } from "./SearchResultCard.types";

export function SearchResultCard({ repository }: SearchResultCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">{repository.fullName}</Typography>

          <Typography color="text.secondary">
            {repository.description ?? "No description available."}
          </Typography>

          <Typography>Stars: {repository.stars}</Typography>

          <Typography>Open issues: {repository.openIssues}</Typography>

          <Button variant="contained">Track</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
