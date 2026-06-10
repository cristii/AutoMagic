# AutoMagic Storybook Workflow

## Purpose

Storybook is the design and component workshop for AutoMagic.

It is used to build, review, test, and document shared UI across:

```text
web
mobile
tablet
desktop
```

The main Storybook app lives at:

```text
apps/storybook/web
```

It renders React Native components through React Native Web.

---

## What Belongs in Storybook

Add stories for:

```text
shared UI primitives
layout components
feature components
form states
empty states
loading states
error states
permission states
full product screens
```

Do not connect stories to production services. Use mock data, fake handlers, and static fixtures.

---

## Story Locations

Stories should live next to the component or screen they describe.

```text
packages/ui/src/primitives/Button.tsx
packages/ui/src/primitives/Button.stories.tsx

packages/features/tasks/src/components/TaskCard.tsx
packages/features/tasks/src/components/TaskCard.stories.tsx

packages/app/client/src/screens/ClientDashboardScreen.tsx
packages/app/client/src/screens/ClientDashboardScreen.stories.tsx
```

---

## Story Naming

Use this naming pattern:

```text
Design System/Primitives/Button
Design System/Layout/AppShell
Design System/Feedback/Toast

Features/Tasks/TaskCard
Features/Billing/InvoiceCard
Features/Support/TicketCard
Features/Agents/AgentCard

Screens/Client/Dashboard
Screens/Studio/TaskDetail
Screens/Sandbox/MissionDetail
Screens/Admin/Payments
```

---

## Breakpoint Review

Every major screen should have stories for:

```text
Mobile
Tablet
Desktop
```

Suggested viewport sizes:

```text
Mobile     390 x 844
Tablet     834 x 1194
Desktop    1440 x 900
```

Each design checklist item should map to Storybook states:

```text
Client / Dashboard / Mobile
Client / Dashboard / Tablet
Client / Dashboard / Desktop
```

---

## Story States

For each reusable component, create the states that matter.

Example for buttons:

```text
Default
Hover or Pressed
Disabled
Loading
With Icon
Full Width
```

Example for task cards:

```text
Draft
Active
Blocked
Submitted
Completed
Overdue
Empty Assignee
```

Example for forms:

```text
Empty
Filled
Validation Error
Server Error
Submitting
Success
```

---

## Development Flow

1. Create or update the component in `packages/ui`, `packages/features`, or `packages/app`.
2. Add a story next to the component.
3. Add mobile, tablet, and desktop variants for major screens.
4. Review visual states in Storybook.
5. Connect the component to the real app route.
6. Add tests or interaction checks for important states.

---

## Commands

Run Storybook:

```bash
pnpm storybook
```

Build Storybook:

```bash
pnpm storybook:build
```

Test Storybook:

```bash
pnpm storybook:test
```

Suggested root scripts:

```json
{
  "scripts": {
    "storybook": "pnpm --filter @automagic/storybook-web dev",
    "storybook:build": "pnpm --filter @automagic/storybook-web build",
    "storybook:test": "pnpm --filter @automagic/storybook-web test"
  }
}
```

---

## Review Rules

Before marking a component or screen as design-ready, check:

```text
mobile layout
tablet layout
desktop layout
light mode
dark mode
empty state
loading state
error state
keyboard focus
long text
missing data
```

---

## Recommended Build Order

```text
1. Design tokens and theme
2. UI primitives
3. Layout components
4. Form components
5. Feedback components
6. Feature components
7. Client screens
8. Studio screens
9. Admin screens
10. Sandbox screens
```

---

## CI Usage

Storybook should be built in CI to catch broken stories.

Recommended CI checks:

```text
typecheck
lint
test
storybook build
```

Later, add:

```text
visual regression tests
accessibility checks
interaction tests
```

---

## Practical Rule

Storybook is the source of truth for how AutoMagic components look and behave across sizes.

Apps own routing and real data.

Packages own reusable UI, states, and screen composition.
