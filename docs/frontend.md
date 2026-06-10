# Frontend Architecture

## Purpose

The frontend layer contains shared product screens, feature modules, design primitives, route contracts, and app shells used by web, mobile, and desktop targets.

React Native Web is the shared UI bridge.

---

## Package Layout

```text
packages/
  app/
    client/
    studio/
    sandbox/
    admin/
  features/
    auth/
    onboarding/
    dashboard/
    projects/
    tasks/
    messages/
    calendar/
    files/
    billing/
    earnings/
    support/
    notifications/
    settings/
    agents/
    marketing/
    reports/
  ui/
  theme/
  navigation/
  api-client/
  validators/
  types/
  utils/
```

---

## Layer Model

```text
packages/ui
    Generic cross-platform components.

packages/features/*
    Domain feature components, hooks, schemas, and API calls.

packages/app/*
    Role-specific screens and layouts.

apps/*
    Runtime shells, routing, deployment config, native config, and desktop config.
```

---

## Shared UI

`packages/ui` should use React Native primitives.

```text
View
Text
Pressable
TextInput
ScrollView
FlatList
Modal
```

Shared components:

```text
Button
Input
Text
Card
Badge
Avatar
Modal
Sheet
Tabs
Sidebar
TopBar
DataTable
FormField
EmptyState
LoadingState
Toast
```

---

## Theme

`packages/theme` contains tokens.

```text
colors
spacing
typography
radii
shadows
breakpoints
zIndex
motion
```

Theme modes:

```text
light mode
dark mode
desktop density
mobile spacing
large-screen layouts
accessibility contrast
```

---

## Feature Packages

Feature packages contain domain UI and logic.

```text
packages/features/tasks/
  src/
    components/
      TaskCard.tsx
      TaskForm.tsx
      TaskStatusBadge.tsx
      TaskComments.tsx
    hooks/
      useTasks.ts
      useTask.ts
    api/
      taskQueries.ts
      taskMutations.ts
    schemas/
      taskSchema.ts
    types.ts
    index.ts
```

Feature package rules:

```text
No Next.js imports.
No Expo Router imports.
No Tauri or Electron imports.
No portal-specific routing.
No hardcoded domain names.
```

---

## App Packages

App packages compose features into role-specific screens.

```text
packages/app/client/
  src/
    screens/
      ClientDashboardScreen.tsx
      ClientProjectsScreen.tsx
      ClientProjectDetailScreen.tsx
      ClientTasksScreen.tsx
      ClientTaskDetailScreen.tsx
      ClientBillingScreen.tsx
      ClientSupportScreen.tsx
      ClientSettingsScreen.tsx
    layouts/
      ClientAppShell.tsx
      ClientSidebar.tsx
      ClientMobileTabs.tsx
    index.ts
```

Rules:

```text
Screens can know the role.
Screens can compose multiple features.
Screens stay runtime-neutral.
Navigation actions use shared route contracts or injected adapters.
```

---

## Data Access

Use `@automagic/api-client`.

```text
packages/api-client/
  src/
    http.ts
    auth.ts
    projects.ts
    tasks.ts
    billing.ts
    support.ts
    agents.ts
```

The API client handles:

```text
base URL
headers
session token
JSON parsing
error mapping
request IDs
safe retry rules
```

---

## Forms

Use shared validation schemas from `@automagic/validators`.

Form behavior:

```text
validate before submit
show field-level errors
keep server errors visible
support keyboard navigation
support mobile layouts
```

---

## State Management

```text
server state
    query library or API hooks

local UI state
    React state

global app state
    session, theme, active workspace, feature flags
```

Avoid large global stores for data already owned by the backend.

---

## Accessibility

UI should support:

```text
keyboard navigation
screen reader labels
focus states
reduced motion
color contrast
large text
touch target size
semantic headings on web
```

---

## Test Targets

```text
component tests for UI
feature tests for forms
screen smoke tests
API client tests
accessibility checks
visual checks for shared components
```
