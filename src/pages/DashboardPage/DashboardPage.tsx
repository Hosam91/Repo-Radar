import { useState } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";

import { SearchInput } from "../../features/search/components/SearchInput";
import { SearchResults } from "../../features/search/components/SearchResults";
import { TrackedReposList } from "../../features/trackedRepos/components/TrackedReposList";
import { PageContainer, PageSubtitle, PageTitle } from "./DashboardPage.styles";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageContainer maxWidth="lg">
      <Stack spacing={4}>
        <Box>
          <PageTitle component="h1" variant="h3">
            Repo Radar
          </PageTitle>

          <PageSubtitle color="text.secondary">
            Search, track, and monitor GitHub repositories.
          </PageSubtitle>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, newValue: number) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Search Repositories" />
          <Tab label="Tracked Repositories" />
        </Tabs>

        {activeTab === 0 && (
          <Stack spacing={3}>
            <SearchInput />
            <SearchResults />
          </Stack>
        )}

        {activeTab === 1 && <TrackedReposList />}
      </Stack>
    </PageContainer>
  );
}
