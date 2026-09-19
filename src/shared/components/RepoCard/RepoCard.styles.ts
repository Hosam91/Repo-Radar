import {
  Card,
  CardActions,
  Typography,
  styled,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import BugReportOutlined from "@mui/icons-material/BugReportOutlined";

export const RepoCardRoot = styled(Card)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gridTemplateAreas: `
    "content"
    "actions"
  `,

  "& .MuiCardContent-root": {
    gridArea: "content",
    minWidth: 0,
  },

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gridTemplateAreas: `"content actions"`,
  },
}));

export const RepoName = styled(Typography)({
  wordBreak: "break-word",
  fontWeight: 600,
});

export const RepoDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  wordBreak: "break-word",
}));

export const RepoCardActions = styled(CardActions)(({ theme }) => ({
  gridArea: "actions",
  gap: theme.spacing(1),
  padding: theme.spacing(0, 2, 2),
  flexWrap: "wrap",

  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2, 2, 0, 0),
    alignSelf: "start",
    justifyContent: "flex-end",
  },
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

export const IssuesValue = styled(Typography)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

export const IssueIcon = styled(BugReportOutlined)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.1rem",
}));