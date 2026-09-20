import { Box, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  selectRefreshAllStatus,
  selectTrackedRepos,
} from "../../../../redux/trackedRepos/trackedReposSelectors";
import { untrackRepository } from "../../../../redux/trackedRepos/trackedReposSlice";
import {
  refreshAllRepositories,
  refreshRepository,
} from "../../../../redux/trackedRepos/trackedReposThunks";

import { StarsChart } from "../StarsChart";
import { TrackedRepoCard } from "../TrackedRepoCard";
import {
  EmptyStateContainer,
  EmptyStateDescription,
  HeaderStack,
  SectionTitle,
} from "./TrackedReposList.styles";
import { RefreshAllButton } from "../RefreshAllButton";

export function TrackedReposList() {
  const dispatch = useAppDispatch();

  const repositories = useAppSelector(selectTrackedRepos);
  const refreshAllStatus = useAppSelector(selectRefreshAllStatus);

  if (repositories.length === 0) {
    return (
      <EmptyStateContainer>
        <Typography variant="h6">No tracked repositories yet</Typography>

        <EmptyStateDescription variant="body2" color="text.secondary">
          Search for repositories and track them to monitor their stats.
        </EmptyStateDescription>
      </EmptyStateContainer>
    );
  }

  return (
    <Stack spacing={4}>
      <HeaderStack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box>
          <SectionTitle variant="h5">Tracked repositories</SectionTitle>

          <Typography variant="body2" color="text.secondary">
            {repositories.length}{" "}
            {repositories.length === 1 ? "repository" : "repositories"}
          </Typography>
        </Box>

        <RefreshAllButton
          loading={refreshAllStatus === "loading"}
          disabled={repositories.length === 0}
          onRefresh={() => dispatch(refreshAllRepositories())}
        />
      </HeaderStack>

      <StarsChart />

      <Stack spacing={2}>
        {repositories.map((repo) => (
          <TrackedRepoCard
            key={repo.id}
            repo={repo}
            onUntrack={(repoId) => dispatch(untrackRepository(repoId))}
            onRefresh={(repoId) => dispatch(refreshRepository(repoId))}
          />
        ))}
      </Stack>
    </Stack>
  );
}
