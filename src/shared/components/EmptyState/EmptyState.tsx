import { Box, Typography } from "@mui/material";

import type { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({
  title,
  description,
  icon,
  helperContent,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        py: 4,
        textAlign: "center",
      }}
    >
      {icon && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "text.secondary",
            mb: 1,
          }}
        >
          {icon}
        </Box>
      )}

      <Typography variant="h6">{title}</Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {description}
      </Typography>

      {helperContent && <Box sx={{ mt: 2 }}>{helperContent}</Box>}
    </Box>
  );
}
