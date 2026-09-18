import { Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectTrackedRepos } from "../../../../redux/trackedRepos/trackedReposSelectors";
import { TrackedRepoCard } from "../TrackedRepoCard";
import { untrackRepository } from "../../../../redux/trackedRepos/trackedReposSlice";

export function TrackedReposList() {
  const dispatch = useAppDispatch();
  const repositories = useAppSelector(selectTrackedRepos);

  if (repositories.length === 0) {
    return <Typography>No tracked repositories yet.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {repositories.map((repo) => (
        <TrackedRepoCard
          key={repo.id}
          repo={repo}
          onUntrack={(repoId) => dispatch(untrackRepository(repoId))}
        />
      ))}
    </Stack>
  );
}
