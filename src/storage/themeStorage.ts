import type { PaletteMode } from "@mui/material";
import { STORAGE_KEYS } from "./storage.constants";

const VALID_MODES: PaletteMode[] = ["light", "dark"];
const DEFAULT_MODE: PaletteMode = "light";

export function saveThemeMode(mode: PaletteMode): void {
  localStorage.setItem(STORAGE_KEYS.themeMode, mode);
}

export function loadThemeMode(): PaletteMode {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEYS.themeMode);

    if (VALID_MODES.includes(storedValue as PaletteMode)) {
      return storedValue as PaletteMode;
    }
  } catch {
    return DEFAULT_MODE;
  }

  return DEFAULT_MODE;
}
