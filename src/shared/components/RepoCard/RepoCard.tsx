import { Box, CardContent, Stack } from "@mui/material";

import type { RepoCardProps } from "./RepoCard.types";
import {
  IssueIcon,
  IssuesValue,
  RepoCardActions,
  RepoCardRoot,
  RepoDescription,
  RepoName,
  StarRatingIcon,
  StarsValue,
} from "./RepoCard.styles";
import { formatNumber } from "../../utils/formatNumber";

export function RepoCard({ repo, children, actions }: RepoCardProps) {
  return (
    <RepoCardRoot variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <RepoName variant="h6">{repo.fullName}</RepoName>

            <RepoDescription color="text.secondary">
              {repo.description ?? "No description available."}
            </RepoDescription>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <StarsValue variant="body2">
              <StarRatingIcon fontSize="inherit" />
              Stars: {formatNumber(repo.stars)}
            </StarsValue>

            <IssuesValue variant="body2">
              <IssueIcon fontSize="inherit" />
              Open issues: {formatNumber(repo.openIssues)}
            </IssuesValue>
          </Stack>

          {children}
        </Stack>
      </CardContent>

      {actions && <RepoCardActions>{actions}</RepoCardActions>}
    </RepoCardRoot>
  );
}