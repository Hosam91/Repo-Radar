import { Box, Stack, Typography, styled } from "@mui/material";

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  textAlign: "center",
}));

export const EmptyStateDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
}));

export const HeaderStack = styled(Stack)(({ theme }) => ({
  alignItems: "flex-start",
  justifyContent: "space-between",

  [theme.breakpoints.up("sm")]: {
    alignItems: "center",
  },
}));

export const SectionTitle = styled(Typography)({
  fontWeight: 600,
});
