import { CardActions, Typography, styled } from "@mui/material";
import Star from "@mui/icons-material/Star";

export const RepoName = styled(Typography)({
  wordBreak: "break-word",
  fontWeight: 600,
});

export const RepoDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  wordBreak: "break-word",
}));

export const RepoCardActions = styled(CardActions)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const StarsValue = styled(Typography)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

export const StarRatingIcon = styled(Star)({
  color: "gold",
  fontSize: "1.1rem",
});
