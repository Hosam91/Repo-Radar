import { useState } from "react";
import { Stack, Tab, Tabs } from "@mui/material";

import { SearchInput } from "../../features/search/components/SearchInput";
import { SearchResults } from "../../features/search/components/SearchResults";
import { TrackedReposList } from "../../features/trackedRepos/components/TrackedReposList";
import { PageContainer } from "./DashboardPage.styles";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageContainer maxWidth="lg">
      <Stack spacing={4}>
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
