import { Button } from "@mui/material";

import type { RefreshAllButtonProps } from "./RefreshAllButton.types";

export function RefreshAllButton({
  loading,
  disabled,
  onRefresh,
}: RefreshAllButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={onRefresh}
      disabled={disabled || loading}
    >
      {loading ? "Refreshing..." : "Refresh All"}
    </Button>
  );
}
