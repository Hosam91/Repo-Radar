# Repo Radar

Repo Radar is a responsive GitHub repository dashboard built with React and TypeScript.

It allows users to search GitHub repositories, track repositories they are interested in, monitor repository statistics, refresh repository data independently, and visualize stars across tracked repositories.

The project was built as a frontend engineering challenge with a strong focus on state design, asynchronous workflows, maintainability, scalability, and clean separation between UI, application state, and external API communication.

## Live Demo

[View Repo Radar](https://repo-radar-chi.vercel.app/)

## Repository

[GitHub Repository](https://github.com/Hosam91/Repo-Radar)

---

## Features

- Debounced GitHub repository search
- Request cancellation for stale search requests
- Track and untrack repositories
- Dedicated tracked repositories view
- Repository statistics:
  - Stars
  - Open issues
  - Latest commit date
- Refresh individual repositories
- Refresh all tracked repositories
- Independent loading and error states per repository
- Persistent tracked repositories using `localStorage`
- Responsive layout for mobile, tablet, and desktop
- Stars comparison bar chart
- Light / dark theme switching
- Persisted theme preference
- Compact number formatting
- User-friendly date formatting
- Proper TypeScript models for API and application data

---

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit
- React Redux
- Material UI
- Recharts
- GitHub REST API
- Vite
- Vercel

---

## Architecture

The application separates responsibilities into distinct layers:

```text
UI Components
      ↓
Redux Actions / Async Thunks
      ↓
GitHub Service Layer
      ↓
HTTP Client
      ↓
GitHub REST API
```

This keeps UI components independent from the external API and gives each layer a clear responsibility.

A simplified project structure looks like:

```text
src/
├── app/
│   ├── providers/
│   └── theme.ts
│
├── config/
│
├── pages/
│   └── DashboardPage/
│
├── redux/
│   ├── search/
│   ├── trackedRepos/
│   ├── hooks.ts
│   └── store.ts
│
├── services/
│   ├── github/
│   └── http/
│
└── shared/
    ├── components/
    ├── contexts/
    ├── hooks/
    ├── types/
    └── utils/
```

---

## State Management

Redux Toolkit is used for application state that is shared across multiple parts of the application.

The Redux store is divided into two main domains:

```text
search
trackedRepos
```

### Search State

Search state contains:

```ts
{
  results,
  status,
  error
}
```

The search query itself remains local component state because it is temporary UI state and does not need to be globally shared.

Only the search results and asynchronous request state are stored in Redux.

### Tracked Repositories

Tracked repositories use a normalized state structure:

```ts
{
  byId: {
    [repositoryId]: repository
  },
  ids: [],
  refreshAllStatus
}
```

Repositories are stored by their GitHub ID instead of being managed only as an array.

This provides:

- Fast repository lookup by ID
- Simple duplicate prevention
- Straightforward repository updates
- Cleaner refresh logic
- Better scalability as the tracked list grows

The `ids` array preserves repository display order.

---

## Independent Loading and Error States

Each tracked repository owns its own asynchronous state:

```ts
{
  status,
  error
}
```

This means repositories can refresh independently.

For example:

```text
Repository A → loading
Repository B → succeeded
Repository C → failed
Repository D → idle
```

A failed request for one repository does not force the entire tracked repositories view into an error state.

This is especially useful when refreshing multiple repositories at the same time.

---

## Search and Debouncing

Repository search uses a reusable debounce hook to avoid sending an API request for every keystroke.

The flow is:

```text
User types
    ↓
Local query state
    ↓
Debounce delay
    ↓
Redux async thunk
    ↓
GitHub service
    ↓
GitHub API
```

Search requests also support `AbortSignal`.

When the search query changes before a previous request completes, the previous request is aborted.

This prevents stale requests from unnecessarily updating the application.

---

## Data Layer

GitHub API communication is isolated inside the service layer.

```text
services/
├── github/
│   ├── githubApi.ts
│   ├── github.endpoints.ts
│   ├── githubMappers.ts
│   └── github.types.ts
│
└── http/
    ├── apiClient.ts
    └── apiError.ts
```

### HTTP Client

The generic HTTP client is responsible for common networking concerns such as:

- HTTP requests
- Common request headers
- Response parsing
- `AbortSignal` support
- Error normalization

### GitHub Service

The GitHub service contains GitHub-specific operations such as:

```text
searchRepositories()
getRepository()
getLatestCommit()
```

UI components never call the GitHub API directly.

Instead, components dispatch Redux actions or async thunks, and the data layer handles communication with GitHub.

---

## API Data Mapping

Raw GitHub API responses use fields such as:

```text
full_name
stargazers_count
open_issues_count
```

These raw API types remain inside the GitHub service layer.

They are mapped into application-friendly models:

```text
GitHub API             Application

full_name           →  fullName
stargazers_count    →  stars
open_issues_count   →  openIssues
```

This prevents the rest of the application from depending directly on GitHub-specific field names.

If the external API representation changes, the impact can remain isolated inside the service and mapper layer.

---

## Tracking Repositories

When a repository is tracked:

1. Existing repository data from the search result is immediately added to Redux.
2. The application fetches the missing latest commit information.
3. The tracked repository is updated when the request completes.

This avoids making the user wait for another complete repository request before seeing the tracked item.

Duplicate repositories are prevented through the normalized `byId` state.

---

## Refreshing Repositories

### Individual Refresh

Refreshing a repository fetches:

- Updated repository information
- Latest commit information

These requests are executed concurrently:

```ts
Promise.all([
  getRepository(...),
  getLatestCommit(...)
])
```

The existing cached repository data remains visible while the refresh is running.

If the refresh fails, the previous repository data is preserved and only the repository's loading/error state is updated.

This avoids replacing useful cached information with an empty state.

### Refresh All

Refresh All reuses the same individual refresh logic for every tracked repository.

The requests are coordinated using:

```ts
Promise.allSettled(...)
```

`Promise.allSettled` is used intentionally instead of `Promise.all`.

One repository failing should not prevent other repositories from refreshing successfully.

Each repository continues to maintain its own independent loading and error state.

---

## Persistence

Tracked repositories are persisted using `localStorage`.

Only durable repository data is stored.

Temporary runtime state such as:

```text
loading state
error state
refresh state
```

is not persisted.

On application startup:

```text
localStorage
     ↓
Load persisted repositories
     ↓
Initialize Redux state
```

During runtime:

```text
Redux state
     ↓
Store subscription
     ↓
localStorage
```

Redux remains the runtime source of truth.

---

## Theme Switching

Repo Radar supports both light and dark themes using Material UI's theme system.

Theme mode is intentionally kept outside Redux because it is UI configuration rather than application domain state.

The selected theme is persisted separately in `localStorage`, allowing the user's preference to survive page refreshes.

The theme flow is:

```text
Light / Dark Toggle
        ↓
Theme Context
        ↓
MUI ThemeProvider
        ↓
Application UI
```

---

## Data Visualization

Tracked repository stars are visualized using a Recharts bar chart.

Chart data is derived directly from the tracked repositories stored in Redux.

```text
Tracked repositories
        ↓
Redux selector
        ↓
Chart data
        ↓
StarsChart
```

Chart data is not stored separately because it can always be derived from the existing repository state.

This avoids duplicated state.

---

## Shared Components

Repository information is presented through a shared `RepoCard` component.

Feature-specific components such as:

```text
SearchResultCard
TrackedRepoCard
```

provide their own actions and additional information while `RepoCard` owns the shared visual structure.

This reduces duplicated UI code and keeps repository presentation consistent throughout the application.

---

## Responsive Design

The application was tested at multiple viewport sizes, including:

```text
320px
375px
768px
1280px
```

Responsive behavior includes:

- Scrollable navigation tabs on smaller screens
- Mobile-friendly repository cards
- Responsive header layout
- Responsive chart sizing
- Safe wrapping for long repository names
- Safe wrapping for long descriptions
- No horizontal page overflow
- Compact repository action buttons

Repository actions also adapt based on available screen space.

On larger screens, actions are positioned at the top-right of the repository card.

On smaller screens, actions move below the repository information to preserve readability.

---

## Formatting

Reusable formatting utilities are used to keep values consistent throughout the application.

### Numbers

Large values are formatted using `Intl.NumberFormat`.

Examples:

```text
950      → 950
1200     → 1.2K
250564   → 250.6K
1350000  → 1.4M
```

### Dates

GitHub timestamps are formatted using `Intl.DateTimeFormat`.

Dates are presented in a readable format and use the browser's local timezone.

---

## Error Handling

API errors are normalized by the HTTP layer before reaching Redux or UI components.

Asynchronous state is represented using:

```ts
type AsyncStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";
```

Tracked repositories maintain their own independent error states so one failed request does not affect the rest of the dashboard.

Aborted search requests are also handled separately from genuine request failures.

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/Hosam91/Repo-Radar.git
```

Enter the project directory:

```bash
cd Repo-Radar
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

---

## GitHub API

Repo Radar uses the public GitHub REST API:

```text
https://api.github.com
```

No GitHub access token is required for normal usage.

GitHub applies rate limits to unauthenticated API requests.

---

## Deployment

The application is deployed using Vercel.

Production version:

[https://repo-radar-chi.vercel.app/](https://repo-radar-chi.vercel.app/)

---

## Key Technical Decisions

The main architectural decisions in Repo Radar include:

- Redux Toolkit for shared application state and asynchronous workflows
- Local component state for the search input value
- Normalized tracked repository state
- Independent loading and error states per repository
- Separate HTTP and GitHub service layers
- Mapping external API responses into application models
- Debounced repository search
- Abortable stale search requests
- `Promise.all` for related individual repository refresh requests
- `Promise.allSettled` for partial-success Refresh All behavior
- Preserving cached repository data when refresh operations fail
- Persisting only durable repository state to `localStorage`
- Deriving chart data instead of storing duplicated state
- Keeping theme state outside Redux
- Persisting theme preference independently
- Shared repository card presentation to reduce duplicated UI code

These decisions keep the application relatively simple while maintaining clear responsibilities between UI, application state, persistence, and external API communication.


