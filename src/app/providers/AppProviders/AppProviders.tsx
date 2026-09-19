import { useMemo, useState, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { PaletteMode } from '@mui/material'
import { store } from '../../../redux/store'
import { createAppTheme } from '../../theme'
import {
  ThemeModeContext,
  type ThemeModeContextValue,
} from '../../../shared/contexts/ThemeModeContext'
import { loadThemeMode, saveThemeMode } from '../../../storage/themeStorage'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [mode, setMode] = useState<PaletteMode>(loadThemeMode)

  const theme = useMemo(() => createAppTheme(mode), [mode])

  const themeModeContextValue = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      toggleMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === 'light' ? 'dark' : 'light'
          saveThemeMode(nextMode)
          return nextMode
        })
      },
    }),
    [mode],
  )

  return (
    <Provider store={store}>
      <ThemeModeContext.Provider value={themeModeContextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </Provider>
  )
}
