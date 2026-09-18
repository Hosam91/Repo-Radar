import { useState } from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { SearchInput } from "../../features/search/components/SearchInput";
import { SearchResults } from "../../features/search/components/SearchResults";
import { TrackedReposList } from "../../features/trackedRepos/components/TrackedReposList";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h3">
        Repo Radar
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue: number) => setActiveTab(newValue)}
        >
          <Tab label="Search Repositories" />
          <Tab label="Tracked Repositories" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
          <Box>
            <SearchInput />
            <Box sx={{ mt: 3 }}>
              <SearchResults />
            </Box>
          </Box>
        )}

        {activeTab === 1 && <TrackedReposList />}
      </Box>
    </Container>
  );
}
