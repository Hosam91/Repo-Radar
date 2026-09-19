import { Box, Typography, styled } from "@mui/material";

export const ChartContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

export const ChartTitle = styled(Typography)({
  fontWeight: 600,
});

export const ChartDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(3),
}));

export const ChartWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 280,

  [theme.breakpoints.up("sm")]: {
    height: 320,
  },
}));