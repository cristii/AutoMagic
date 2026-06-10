# Database Architecture

## Purpose

The database stores AutoMagic users, roles, clients, providers, projects, tasks, files, billing records, support tickets, agent runs, notifications, reports, and audit logs.

Recommended database:

```text
PostgreSQL
```

Recommended ORM:

```text
Prisma or Drizzle
```

Suggested location:

```text
services/db
```

---

## Package Layout

```text
services/db/
  prisma/
    schema.prisma
    migrations/
    seed.ts
  src/
    index.ts
    client.ts
    seed/
    fixtures/
  package.json
```

---

## Domain Areas

```text
identity
client work
communication
files
billing
earnings
support
agents
marketing
notifications
audit
settings
```

---

## Entity Overview

```text
User
Role
Session
Account
ClientProfile
ProviderProfile
Project
ProjectMember
Milestone
Task
TaskComment
TaskAttachment
TaskStatusEvent
MessageThread
Message
FileAsset
Deliverable
ApprovalRequest
Invoice
InvoiceLineItem
Payment
PaymentMethod
Refund
Earning
Payout
SupportTicket
SupportMessage
Agent
AgentRun
AgentRunOutput
Lead
Campaign
Notification
NotificationPreference
AuditLog
Setting
```

---

## Identity Tables

### User

```text
id
email
name
avatar_url
status
created_at
updated_at
```

Statuses:

```text
active
invited
suspended
deleted
```

### Role

```text
id
user_id
role
created_at
```

Roles:

```text
client
operator
trainee
admin
super_admin
```

### Session

```text
id
user_id
token_hash
expires_at
created_at
revoked_at
```

---

## Profile Tables

### ClientProfile

```text
id
user_id
business_name
business_type
phone
timezone
notes
created_at
updated_at
```

### ProviderProfile

```text
id
user_id
display_name
bio
skills
hourly_rate_cents
currency
availability_status
verification_status
created_at
updated_at
```

For v1, the main provider is Cristi. Multi-provider support can stay inactive until later.

---

## Project Tables

### Project

```text
id
client_id
owner_provider_id
title
description
status
priority
start_date
due_date
created_at
updated_at
archived_at
```

Statuses:

```text
draft
active
paused
completed
archived
cancelled
```

### ProjectMember

```text
id
project_id
user_id
role
created_at
```

### Milestone

```text
id
project_id
title
description
status
due_date
completed_at
created_at
updated_at
```

---

## Task Tables

### Task

```text
id
project_id
client_id
assigned_provider_id
title
description
status
priority
budget_cents
currency
due_at
created_at
updated_at
completed_at
archived_at
```

Statuses:

```text
draft
posted
assigned
active
blocked
submitted
revision_requested
approved
completed
archived
cancelled
```

### TaskComment

```text
id
task_id
author_id
body
visibility
created_at
updated_at
deleted_at
```

Visibility:

```text
public
internal
client_only
provider_only
```

### TaskStatusEvent

```text
id
task_id
from_status
to_status
actor_id
reason
created_at
```

---

## Messaging Tables

### MessageThread

```text
id
type
client_id
provider_id
project_id
task_id
created_at
updated_at
```

Types:

```text
general
project
task
support
```

### Message

```text
id
thread_id
sender_id
body
created_at
edited_at
deleted_at
```

---

## File Tables

### FileAsset

```text
id
owner_id
client_id
project_id
task_id
storage_key
filename
content_type
size_bytes
checksum
visibility
created_at
deleted_at
```

### Deliverable

```text
id
task_id
submitted_by_id
title
description
status
created_at
updated_at
approved_at
```

Statuses:

```text
submitted
revision_requested
approved
rejected
```

### ApprovalRequest

```text
id
type
target_id
requested_by_id
requested_from_id
status
message
created_at
responded_at
```

---

## Billing Tables

### Invoice

```text
id
client_id
provider_id
status
number
currency
subtotal_cents
tax_cents
discount_cents
total_cents
due_date
issued_at
paid_at
created_at
updated_at
```

Statuses:

```text
draft
sent
viewed
paid
overdue
void
cancelled
refunded
```

### InvoiceLineItem

```text
id
invoice_id
description
quantity
unit_amount_cents
total_cents
created_at
```

### Payment

```text
id
invoice_id
client_id
provider_id
provider_payment_id
status
amount_cents
currency
paid_at
created_at
updated_at
```

Statuses:

```text
pending
processing
succeeded
failed
refunded
disputed
```

---

## Earnings and Payout Tables

### Earning

```text
id
provider_id
source_type
source_id
amount_cents
currency
status
available_at
created_at
```

### Payout

```text
id
provider_id
provider_payout_id
status
amount_cents
currency
arrival_date
created_at
updated_at
```

---

## Support Tables

### SupportTicket

```text
id
created_by_id
assigned_to_id
related_task_id
related_invoice_id
status
priority
subject
created_at
updated_at
resolved_at
archived_at
```

Statuses:

```text
open
pending
waiting_on_user
resolved
archived
```

### SupportMessage

```text
id
ticket_id
sender_id
body
visibility
created_at
```

---

## Agent Tables

### Agent

```text
id
owner_id
name
description
type
status
config_json
created_at
updated_at
```

Types:

```text
research
email
reporting
planning
crm
automation
```

### AgentRun

```text
id
agent_id
task_id
client_id
status
input_json
started_at
completed_at
created_at
```

Statuses:

```text
queued
running
completed
failed
cancelled
```

### AgentRunOutput

```text
id
agent_run_id
type
content
metadata_json
created_at
```

---

## Marketing Tables

### Lead

```text
id
source
name
email
phone
company
status
summary
tags
created_at
updated_at
converted_at
```

Statuses:

```text
new
qualified
contacted
converted
lost
archived
```

### Campaign

```text
id
name
type
status
starts_at
ends_at
created_at
updated_at
```

---

## Notification Tables

### Notification

```text
id
user_id
type
title
body
target_type
target_id
read_at
created_at
```

### NotificationPreference

```text
id
user_id
channel
event_type
enabled
created_at
updated_at
```

Channels:

```text
in_app
email
push
desktop
```

---

## Audit Table

### AuditLog

```text
id
actor_id
action
target_type
target_id
metadata_json
ip_hash
user_agent
created_at
```

Audit examples:

```text
user.created
user.suspended
task.status_changed
invoice.marked_paid
payment.refunded
admin.permission_changed
support.ticket_resolved
```

---

## Indexing Strategy

```text
users.email unique
roles.user_id
sessions.user_id
projects.client_id
projects.owner_provider_id
tasks.project_id
tasks.client_id
tasks.assigned_provider_id
tasks.status
messages.thread_id
files.project_id
files.task_id
invoices.client_id
invoices.status
payments.invoice_id
support_tickets.created_by_id
support_tickets.status
agent_runs.agent_id
notifications.user_id
notifications.read_at
audit_logs.actor_id
audit_logs.target_type_target_id
```

---

## Money Rules

Store money as integer cents.

```text
amount_cents
subtotal_cents
tax_cents
discount_cents
total_cents
```

Store currency as ISO code.

```text
USD
EUR
RON
GBP
```

Do not store money as floating point numbers.

---

## Soft Delete Rules

Use soft delete for:

```text
users
projects
tasks
comments
files
messages
payment methods
```

Fields:

```text
deleted_at
archived_at
revoked_at
```

---

## Seed Data

Development seed should create:

```text
admin user
Cristi operator profile
sample client
sample project
sample tasks
sample invoice
sample support ticket
sample agent
sample notifications
```

Seed command:

```bash
pnpm --filter @automagic/db db:seed
```

---

## Migration Rules

```text
Use migrations for every schema change.
Review generated SQL.
Back up production before risky migrations.
Avoid destructive changes without data migration.
Keep enum changes planned.
Add nullable column, backfill, then require it.
```
