import { Container, Typography, styled } from "@mui/material";

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),

  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));

export const PageTitle = styled(Typography)({
  fontWeight: 700,
}) as typeof Typography;

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
