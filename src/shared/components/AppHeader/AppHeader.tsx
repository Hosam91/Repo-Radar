import Tooltip from "@mui/material/Tooltip";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useThemeMode } from "../../contexts/ThemeModeContext";
import {
  BrandSection,
  HeaderContent,
  HeaderIcon,
  HeaderRoot,
  HeaderSubtitle,
  HeaderTextGroup,
  HeaderTitle,
  ThemeToggleButton,
} from "./AppHeader.styles";

export function AppHeader() {
  const { mode, toggleMode } = useThemeMode();
  const toggleLabel =
    mode === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <HeaderRoot component="header">
      <HeaderContent maxWidth="lg">
        <BrandSection>
          <HeaderIcon aria-hidden="true" focusable="false" />

          <HeaderTextGroup>
            <HeaderTitle component="h1" variant="h5">
              Repo Radar
            </HeaderTitle>

            <HeaderSubtitle variant="body2" color="text.secondary">
              Search, track, and monitor GitHub repositories.
            </HeaderSubtitle>
          </HeaderTextGroup>
        </BrandSection>

        <Tooltip title={toggleLabel}>
          <ThemeToggleButton onClick={toggleMode} aria-label={toggleLabel} size="small">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ThemeToggleButton>
        </Tooltip>
      </HeaderContent>
    </HeaderRoot>
  );
}
