import { Box, Container, IconButton, Typography, styled } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const HeaderRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
})) as typeof Box;

export const HeaderContent = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export const ThemeToggleButton = styled(IconButton)({
  flexShrink: 0,
});

export const BrandSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  minWidth: 0,
}));

export const HeaderTextGroup = styled(Box)({
  minWidth: 0,
});

export const HeaderIcon = styled(GitHubIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.75rem",
  flexShrink: 0,
}));

export const HeaderTitle = styled(Typography)({
  fontWeight: 700,
  lineHeight: 1.2,
  wordBreak: "break-word",
}) as typeof Typography;

export const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.25),
  wordBreak: "break-word",
}));
