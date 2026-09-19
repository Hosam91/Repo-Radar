import { AppProviders } from '../providers'
import { AppHeader } from '../../shared/components/AppHeader'
import { DashboardPage } from '../../pages/DashboardPage'

export function App() {
  return (
    <AppProviders>
      <AppHeader />
      <DashboardPage />
    </AppProviders>
  )
}
