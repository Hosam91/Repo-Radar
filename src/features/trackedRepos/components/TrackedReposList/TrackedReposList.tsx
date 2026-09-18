import { Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  selectRefreshAllStatus,
  selectTrackedRepos,
} from "../../../../redux/trackedRepos/trackedReposSelectors";
import { TrackedRepoCard } from "../TrackedRepoCard";
import { untrackRepository } from "../../../../redux/trackedRepos/trackedReposSlice";
import {
  refreshAllRepositories,
  refreshRepository,
} from "../../../../redux/trackedRepos/trackedReposThunks";
import { RefreshAllButton } from "../RefreshAllButton/RefreshAllButton";
import { StarsChart } from "../StarsChart";

export function TrackedReposList() {
  const dispatch = useAppDispatch();
  const repositories = useAppSelector(selectTrackedRepos);
  const refreshAllStatus = useAppSelector(selectRefreshAllStatus);

  if (repositories.length === 0) {
    return <Typography>No tracked repositories yet.</Typography>;
  }

  return (
    <Stack spacing={2}>
      <RefreshAllButton
        loading={refreshAllStatus === "loading"}
        disabled={repositories.length === 0}
        onRefresh={() => dispatch(refreshAllRepositories())}
      />
      {repositories.map((repo) => (
        <TrackedRepoCard
          key={repo.id}
          repo={repo}
          onUntrack={(repoId) => dispatch(untrackRepository(repoId))}
          onRefresh={(repoId) => dispatch(refreshRepository(repoId))}
        />
      ))}
      <StarsChart />
    </Stack>
  );
}
