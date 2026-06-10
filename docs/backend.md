# Backend Architecture

## Purpose

The backend is the main API layer for AutoMagic. It serves web portals, mobile apps, desktop shells, worker jobs, billing flows, AI agent runs, support tools, and admin operations.

Main location:

```text
services/api
```

Preferred framework:

```text
NestJS
```

---

## Responsibilities

```text
Authentication
Authorization
User and role management
Client management
Provider/operator management
Project management
Task management
Messages and comments
Files and deliverables
Billing and invoices
Earnings and payouts
Support tickets
Notifications
AI agent runs
Admin operations
Audit logs
Reports
```

---

## Service Layout

```text
services/api/
  src/
    main.ts
    app.module.ts
    config/
      env.schema.ts
      configuration.ts
    common/
      decorators/
      filters/
      guards/
      interceptors/
      pipes/
      utils/
    modules/
      auth/
      users/
      clients/
      providers/
      projects/
      tasks/
      messages/
      files/
      billing/
      earnings/
      support/
      notifications/
      agents/
      marketing/
      reports/
      admin/
      audit-logs/
    prisma/
      prisma.module.ts
      prisma.service.ts
    health/
      health.controller.ts
      health.module.ts
```

---

## Module Pattern

```text
modules/tasks/
  tasks.module.ts
  tasks.controller.ts
  tasks.service.ts
  tasks.repository.ts
  dto/
    create-task.dto.ts
    update-task.dto.ts
    task-response.dto.ts
  guards/
  policies/
  mappers/
  tests/
```

Layer roles:

```text
Controller
    Handles HTTP input and response mapping.

Service
    Holds business rules.

Repository
    Handles database access.

DTO
    Defines input and output shapes.

Policy
    Holds role and ownership rules.

Mapper
    Converts database models into API response objects.
```

---

## API Style

Recommended API pattern:

```text
REST for portal operations
WebSocket or server-sent events for live updates
Background jobs for slow tasks
Signed upload URLs for files
Webhook endpoints for billing providers
```

Route groups:

```text
/api/auth
/api/users
/api/clients
/api/providers
/api/projects
/api/tasks
/api/messages
/api/files
/api/billing
/api/earnings
/api/support
/api/notifications
/api/agents
/api/admin
```

---

## Auth Model

Suggested roles:

```text
guest
client
operator
trainee
admin
super_admin
```

Portal access:

```text
client.automagic.dev
    client

studio.automagic.dev
    operator

sandbox.automagic.dev
    trainee, operator, admin

admin.automagic.dev
    admin, super_admin
```

Backend guards should check:

```text
session validity
role access
resource ownership
workspace access
admin permission
```

---

## Authorization Layers

```text
Global auth guard
    Validates signed session or token.

Role guard
    Confirms user role.

Resource policy
    Confirms access to a project, task, invoice, file, ticket, or agent run.

Admin permission guard
    Confirms admin action rights.
```

Permission examples:

```text
tasks.read
tasks.write
tasks.assign
billing.read
billing.write
support.read
support.write
admin.users.manage
admin.payments.manage
```

---

## Shared Packages

Backend imports shared contracts.

```text
@automagic/types
@automagic/validators
@automagic/auth
@automagic/db
```

Example:

```ts
import { CreateTaskSchema } from "@automagic/validators";
import type { TaskDto } from "@automagic/types";
```

---

## Validation

Use shared schemas in `packages/validators`.

Rules:

```text
Reject unknown fields.
Normalize strings.
Validate IDs.
Validate money as integer cents.
Validate dates as ISO strings.
Validate uploaded file metadata before storage.
```

---

## Error Format

```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task not found.",
    "details": {},
    "requestId": "req_123"
  }
}
```

Error code groups:

```text
AUTH_*
USER_*
CLIENT_*
PROJECT_*
TASK_*
BILLING_*
SUPPORT_*
FILE_*
AGENT_*
ADMIN_*
```

---

## Background Jobs

Move slow work to `services/worker`.

```text
email sending
notification delivery
AI agent runs
invoice reminders
report generation
file processing
webhook retry
scheduled cleanup
```

Queue names:

```text
emails
notifications
agents
billing
files
reports
maintenance
```

---

## Webhooks

Webhook endpoints:

```text
/api/webhooks/billing
/api/webhooks/email
/api/webhooks/storage
```

Rules:

```text
Verify signature.
Store raw event metadata.
Deduplicate event IDs.
Process slow work through worker.
Log status and retry state.
```

---

## Health Checks

```text
/api/health
/api/health/db
/api/health/redis
/api/health/storage
```

---

## Local Commands

```bash
pnpm dev:infra
pnpm --filter @automagic/api dev
pnpm db:migrate
pnpm db:studio
```

---

## Test Targets

```text
unit tests for services
integration tests for controllers
policy tests for permissions
repository tests for database access
webhook tests for billing events
e2e tests for key flows
```
