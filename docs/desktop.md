# Desktop Architecture

## Purpose

Tauri desktop apps give AutoMagic a focused workspace for long work sessions, file handling, notifications, keyboard shortcuts, and operator productivity.

---

## Desktop App Layout

```text
apps/desktop/
  client/
  studio/
  sandbox/
  admin/
```

## Shared Screen Source

```text
apps/desktop/studio  -> packages/app/studio
apps/desktop/client  -> packages/app/client
apps/desktop/sandbox -> packages/app/sandbox
```

Desktop should not duplicate product screens.

---

## Desktop Shell Layout

```text
apps/desktop/studio/
  src-tauri/
    tauri.conf.json
    src/
      main.rs
      commands/
      menu.rs
      tray.rs
      files.rs
  web/
    index.html
    src/
      main.tsx
      App.tsx
  package.json
```

---

## Desktop-Specific Features

```text
native menu
tray icon
keyboard shortcuts
window state restore
file drag and drop
local file open
desktop notifications
background sync
copy-paste helpers
multi-window support later
```

Studio-specific features:

```text
quick task switcher
global search
time block launcher
client command menu
agent run monitor
file drop zone
invoice quick view
```

---

## Platform Files

Use `.desktop.tsx` or `.desktop.ts` for desktop-only logic.

```text
FilePicker.desktop.tsx
Notifications.desktop.ts
WindowControls.desktop.tsx
KeyboardShortcuts.desktop.ts
LocalStorage.desktop.ts
```

---

## Desktop Navigation

Studio desktop navigation:

```text
Dashboard
Clients
Projects
Tasks
Messages
Calendar
Files
Agents
Earnings
Support
Settings
```

Sandbox desktop navigation:

```text
Dashboard
Missions
Simulator
Inbox
Calendar
Tasks
Files
CRM
Chat
Feedback
Progress
Settings
```

---

## Keyboard Shortcuts

```text
Cmd/Ctrl + K
    Open command menu.

Cmd/Ctrl + N
    New task or new item.

Cmd/Ctrl + Shift + M
    Open messages.

Cmd/Ctrl + Shift + A
    Open agents.

Cmd/Ctrl + Shift + F
    Open files.

Esc
    Close modal or drawer.
```

---

## Notifications

Notification types:

```text
new message
task deadline
approval request
agent run completed
invoice paid
support reply
```

Rules:

```text
mirror user notification settings
hide sensitive text when locked
open relevant route on click
deduplicate repeated events
```

---

## Local Data

Desktop can cache:

```text
recent clients
recent tasks
recent messages
draft notes
window state
theme preference
last active route
```

Avoid storing:

```text
payment card data
raw auth tokens in plain text
sensitive client files without user action
```

---

## Security

```text
keep system APIs behind explicit commands
validate command inputs
avoid arbitrary shell execution
use secure storage for tokens
lock admin actions behind re-auth
log sensitive local actions when needed
```

---

## Test Targets

```text
open app
login
restore session
open task
drag file into task
send message
run agent
receive desktop notification
use keyboard shortcut
logout
```
