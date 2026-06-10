# Mobile Architecture

## Purpose

Mobile apps give clients, operators, and trainees access to AutoMagic from iOS and Android.

Mobile runtime:

```text
Expo
React Native
```

---

## Mobile App Layout

```text
apps/native/
  client/
  studio/
  sandbox/
  admin/
```

Recommended rollout:

```text
client
    Build after client web portal is stable.

studio
    Build after core task and client workflows are stable.

sandbox
    Build after simulator web version works.

admin
    Keep web-only for v1.
```

---

## Shared Screen Source

```text
apps/native/client     -> packages/app/client
apps/native/studio     -> packages/app/studio
apps/native/sandbox    -> packages/app/sandbox
```

Example:

```tsx
import { ClientDashboardScreen } from "@automagic/app-client";

export default ClientDashboardScreen;
```

---

## Expo Router Layout

Example client app:

```text
apps/native/client/
  app/
    login.tsx
    signup.tsx
    forgot-password.tsx
    reset-password.tsx
    onboarding.tsx
    (tabs)/
      dashboard.tsx
      projects.tsx
      tasks.tsx
      messages.tsx
      settings.tsx
    projects/
      [projectId].tsx
    tasks/
      [taskId].tsx
    billing/
      index.tsx
      invoices/
        [invoiceId].tsx
    support/
      index.tsx
      tickets/
        new.tsx
        [ticketId].tsx
```

---

## Mobile Navigation

Client tabs:

```text
Dashboard
Projects
Tasks
Messages
Settings
```

Studio tabs:

```text
Dashboard
Clients
Tasks
Messages
More
```

Sandbox tabs:

```text
Dashboard
Missions
Simulator
Progress
Settings
```

---

## Mobile Design Rules

```text
stacked content
large touch targets
bottom sheets for secondary actions
short forms split into steps
compact cards
offline-friendly loading states
clear empty states
```

Avoid:

```text
wide tables
hover-only controls
tiny icons
deep modal chains
desktop-only sidebars
large multi-column forms
```

---

## Platform-Specific Files

Use `.native.tsx` for mobile-only behavior.

```text
FilePicker.native.tsx
CameraCapture.native.tsx
PushNotifications.native.ts
SecureStorage.native.ts
ShareSheet.native.ts
```

Native needs:

```text
push notifications
camera
file picker
image picker
secure token storage
biometric unlock
native share sheet
deep links
```

---

## Auth

Mobile auth should support:

```text
email and password
magic link later
OAuth later
secure token storage
biometric unlock later
session refresh
logout from all devices
```

---

## API Config

Mobile apps need environment-specific API URLs.

```text
development
    local network API URL

preview
    staging API URL

production
    production API URL
```

Example:

```text
EXPO_PUBLIC_API_URL=http://192.168.1.10:4000/api
```

A physical device cannot use laptop `localhost`.

---

## Push Notifications

Event types:

```text
message.received
task.updated
task.approval_requested
invoice.sent
invoice.paid
support.reply
agent.run.completed
```

Rules:

```text
respect user preferences
support quiet hours later
open deep link on tap
hide sensitive text by default
deduplicate repeated events
```

---

## Offline Behavior

Start small:

```text
cache recent dashboard data
cache active tasks
cache recent messages
save task comment drafts
retry file upload
show sync state
```

---

## Deep Links

```text
automagic-client://tasks/{taskId}
automagic-client://projects/{projectId}
automagic-client://billing/invoices/{invoiceId}
automagic-client://support/tickets/{ticketId}

automagic-studio://clients/{clientId}
automagic-studio://tasks/{taskId}
automagic-studio://agents/{agentId}
```

---

## Test Targets

```text
login
tab navigation
task detail
message thread
invoice detail
support ticket creation
settings update
push notification tap
deep link opening
```
