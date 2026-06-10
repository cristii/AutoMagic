# AutoMagic Page and Screen Design Checklist

Use this checklist to track page designs across mobile, tablet, and desktop breakpoints.

Breakpoint columns:

- Mobile: phone layout
- Tablet: medium layout
- Desktop: wide layout

Status columns:

- [ ] Design not started
- [x] Design finished

---

## www.automagic.dev

| Section | Route | Screen | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|---|---|
| Public | `/` | Landing page | [ ] | [ ] | [ ] | Hero, services snapshot, trust proof, CTA, AI chat entry |
| Public | `/services` | Services | [ ] | [ ] | [ ] | Service categories, examples, process, CTA |
| Public | `/pricing` | Pricing | [ ] | [ ] | [ ] | Packages, retainers, hourly/project options, FAQ |
| Public | `/portfolio` | Portfolio | [ ] | [ ] | [ ] | Case studies, sample work, demos, open-source progress |
| Public | `/availability` | Availability | [ ] | [ ] | [ ] | Booking status, next available slots, calendar CTA |
| Public | `/book` | Book | [ ] | [ ] | [ ] | Booking form, service need, preferred time, contact details |
| Public | `/contact` | Contact | [ ] | [ ] | [ ] | Contact form, AI assistant, social links |
| Auth | `/login` | Login entry | [ ] | [ ] | [ ] | Shared entry for clients, operators, trainees, admins |
| Auth | `/signup` | Signup / access request | [ ] | [ ] | [ ] | Client access request, waitlist, role selection |
| Legal | `/terms` | Terms of service | [ ] | [ ] | [ ] | Legal content layout |
| Legal | `/privacy` | Privacy policy | [ ] | [ ] | [ ] | Legal content layout |
| Legal | `/cookies` | Cookie policy | [ ] | [ ] | [ ] | Legal content layout |

## client.automagic.dev

| Section | Route | Screen | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|---|---|
| Auth | `/login` | Login | [ ] | [ ] | [ ] | Email/password, magic link later, error states |
| Auth | `/signup` | Signup | [ ] | [ ] | [ ] | Request access, client account creation |
| Auth | `/forgot-password` | Forgot password | [ ] | [ ] | [ ] | Email input, sent state |
| Auth | `/reset-password` | Reset password | [ ] | [ ] | [ ] | Token validation, new password |
| Onboarding | `/onboarding` | Client onboarding | [ ] | [ ] | [ ] | Business details, billing setup, preferences, first request |
| Main | `/dashboard` | Client dashboard | [ ] | [ ] | [ ] | Projects, tasks, approvals, messages, invoices, updates |
| Projects | `/projects` | Projects list | [ ] | [ ] | [ ] | Active, paused, completed, archived projects |
| Projects | `/projects/new` | New project | [ ] | [ ] | [ ] | Brief, goals, budget, files, timing |
| Projects | `/projects/[projectId]` | Project detail | [ ] | [ ] | [ ] | Overview, tasks, files, messages, invoices, milestones |
| Tasks | `/tasks` | Tasks list | [ ] | [ ] | [ ] | All tasks with filters, status, deadline, priority |
| Tasks | `/tasks/new` | New task | [ ] | [ ] | [ ] | Description, deadline, budget, files, requirements |
| Tasks | `/tasks/[taskId]` | Task detail | [ ] | [ ] | [ ] | Status, comments, files, delivery, revisions, approval |
| Communication | `/messages` | Messages | [ ] | [ ] | [ ] | All client-assistant conversations |
| Scheduling | `/calendar` | Calendar | [ ] | [ ] | [ ] | Calls, task deadlines, milestones, delivery dates |
| Files | `/files` | Files | [ ] | [ ] | [ ] | Shared files, briefs, screenshots, exports, assets |
| Approvals | `/approvals` | Approvals | [ ] | [ ] | [ ] | Items waiting for client approval |
| Deliverables | `/deliverables` | Deliverables | [ ] | [ ] | [ ] | Submitted work, downloads, revisions, final files |
| Billing | `/billing` | Billing overview | [ ] | [ ] | [ ] | Open balance, recent invoices, payment status |
| Billing | `/billing/invoices` | Invoices list | [ ] | [ ] | [ ] | Invoices by status, due date, amount |
| Billing | `/billing/invoices/[invoiceId]` | Invoice detail | [ ] | [ ] | [ ] | Pay, download, dispute, payment state |
| Billing | `/billing/payments` | Payments | [ ] | [ ] | [ ] | Payment history and pending payments |
| Billing | `/billing/payment-methods` | Payment methods | [ ] | [ ] | [ ] | Saved methods, add/remove method |
| Support | `/support` | Support home | [ ] | [ ] | [ ] | Support entry, common topics, active tickets |
| Support | `/support/tickets` | Support tickets | [ ] | [ ] | [ ] | Ticket list by status |
| Support | `/support/tickets/new` | New ticket | [ ] | [ ] | [ ] | Subject, category, message, attachments |
| Support | `/support/tickets/[ticketId]` | Ticket detail | [ ] | [ ] | [ ] | Messages, attachments, status, resolution |
| Assistant | `/assistant` | Assistant profile | [ ] | [ ] | [ ] | Cristi profile, services, availability, agreement |
| Notifications | `/notifications` | Notification center | [ ] | [ ] | [ ] | All alerts, unread, filters |
| Settings | `/settings` | Settings overview | [ ] | [ ] | [ ] | Account setting hub |
| Settings | `/settings/profile` | Profile settings | [ ] | [ ] | [ ] | Name, contact, avatar, timezone |
| Settings | `/settings/business` | Business settings | [ ] | [ ] | [ ] | Business info, billing identity, preferences |
| Settings | `/settings/billing` | Billing settings | [ ] | [ ] | [ ] | Tax details, invoice preferences |
| Settings | `/settings/notifications` | Notification preferences | [ ] | [ ] | [ ] | Email, in-app, push, desktop toggles |
| Settings | `/settings/security` | Security settings | [ ] | [ ] | [ ] | Password, sessions, 2FA later |

## studio.automagic.dev

| Section | Route | Screen | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|---|---|
| Auth | `/login` | Login | [ ] | [ ] | [ ] | Operator login |
| Auth | `/signup` | Signup | [ ] | [ ] | [ ] | Operator account creation or invite acceptance |
| Auth | `/forgot-password` | Forgot password | [ ] | [ ] | [ ] | Email input, sent state |
| Auth | `/reset-password` | Reset password | [ ] | [ ] | [ ] | Token validation, new password |
| Onboarding | `/onboarding` | Operator onboarding | [ ] | [ ] | [ ] | Profile, services, availability, payouts, tools |
| Main | `/dashboard` | Studio dashboard | [ ] | [ ] | [ ] | Clients, tasks, deadlines, income, approvals, messages |
| Clients | `/clients` | Clients list | [ ] | [ ] | [ ] | Client cards, search, filters |
| Clients | `/clients/[clientId]` | Client detail | [ ] | [ ] | [ ] | Profile, notes, projects, tasks, files, invoices, history |
| Projects | `/projects` | Projects list | [ ] | [ ] | [ ] | All client projects by status |
| Projects | `/projects/[projectId]` | Project detail | [ ] | [ ] | [ ] | Scope, milestones, tasks, files, messages, delivery |
| Tasks | `/tasks` | Tasks list | [ ] | [ ] | [ ] | Tasks by client, project, status, priority, deadline |
| Tasks | `/tasks/[taskId]` | Task detail | [ ] | [ ] | [ ] | Update status, notes, submit work, approval, revisions |
| Communication | `/messages` | Messages | [ ] | [ ] | [ ] | Client conversations |
| Scheduling | `/calendar` | Calendar | [ ] | [ ] | [ ] | Calls, work blocks, deadlines, reminders |
| Files | `/files` | Files | [ ] | [ ] | [ ] | Client files, deliverables, uploads, templates |
| Approvals | `/approvals` | Approvals | [ ] | [ ] | [ ] | Pending, approved, rejected, stale approvals |
| Deliverables | `/deliverables` | Deliverables | [ ] | [ ] | [ ] | Submitted outputs and revision states |
| Agents | `/agents` | Agents list | [ ] | [ ] | [ ] | AI helpers, status, run history snapshot |
| Agents | `/agents/new` | New agent | [ ] | [ ] | [ ] | Agent type, prompt, permissions, linked tools |
| Agents | `/agents/[agentId]` | Agent detail | [ ] | [ ] | [ ] | Purpose, config summary, recent runs, outputs |
| Agents | `/agents/[agentId]/runs` | Agent runs | [ ] | [ ] | [ ] | Run history, status, input, output |
| Agents | `/agents/[agentId]/settings` | Agent settings | [ ] | [ ] | [ ] | Prompt setup, tool access, safety rules |
| Earnings | `/earnings` | Earnings home | [ ] | [ ] | [ ] | Income, pending, available, paid out |
| Earnings | `/earnings/overview` | Earnings overview | [ ] | [ ] | [ ] | Charts, summaries, recent activity |
| Earnings | `/earnings/invoices` | Earnings invoices | [ ] | [ ] | [ ] | Invoices tied to operator work |
| Earnings | `/earnings/payments` | Earnings payments | [ ] | [ ] | [ ] | Received payments and failed payments |
| Earnings | `/earnings/payouts` | Payouts | [ ] | [ ] | [ ] | Payout schedule, history, payout status |
| Earnings | `/earnings/taxes` | Tax info | [ ] | [ ] | [ ] | Tax summaries, export, settings link |
| Support | `/support` | Support home | [ ] | [ ] | [ ] | Operator support entry |
| Support | `/support/tickets` | Support tickets | [ ] | [ ] | [ ] | Ticket list by status |
| Support | `/support/tickets/new` | New ticket | [ ] | [ ] | [ ] | Create support request |
| Support | `/support/tickets/[ticketId]` | Ticket detail | [ ] | [ ] | [ ] | Messages, internal notes when allowed |
| Notifications | `/notifications` | Notification center | [ ] | [ ] | [ ] | Task, client, payment, agent alerts |
| Settings | `/settings` | Settings overview | [ ] | [ ] | [ ] | Operator setting hub |
| Settings | `/settings/profile` | Profile settings | [ ] | [ ] | [ ] | Display name, bio, contact, avatar |
| Settings | `/settings/services` | Service settings | [ ] | [ ] | [ ] | Skills, categories, packages, rates |
| Settings | `/settings/availability` | Availability settings | [ ] | [ ] | [ ] | Working hours, blocked dates, capacity |
| Settings | `/settings/billing` | Billing settings | [ ] | [ ] | [ ] | Invoice identity, tax data |
| Settings | `/settings/payouts` | Payout settings | [ ] | [ ] | [ ] | Bank/provider setup, payout preferences |
| Settings | `/settings/notifications` | Notification preferences | [ ] | [ ] | [ ] | Email, in-app, push, desktop toggles |
| Settings | `/settings/integrations` | Integrations | [ ] | [ ] | [ ] | Email, calendar, storage, CRM, AI providers |
| Settings | `/settings/security` | Security settings | [ ] | [ ] | [ ] | Password, sessions, 2FA later |

## sandbox.automagic.dev

| Section | Route | Screen | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|---|---|
| Auth | `/login` | Login | [ ] | [ ] | [ ] | Trainee login |
| Auth | `/signup` | Signup | [ ] | [ ] | [ ] | Trainee account creation |
| Auth | `/forgot-password` | Forgot password | [ ] | [ ] | [ ] | Email input, sent state |
| Auth | `/reset-password` | Reset password | [ ] | [ ] | [ ] | Token validation, new password |
| Onboarding | `/onboarding` | Sandbox onboarding | [ ] | [ ] | [ ] | Skill goals, experience, preferred missions |
| Main | `/dashboard` | Sandbox dashboard | [ ] | [ ] | [ ] | Progress, missions, feedback, recommendations |
| Missions | `/missions` | Missions list | [ ] | [ ] | [ ] | Skill area, difficulty, tool type, status |
| Missions | `/missions/[missionId]` | Mission detail | [ ] | [ ] | [ ] | Brief, client context, files, grading criteria |
| Missions | `/missions/[missionId]/start` | Mission start | [ ] | [ ] | [ ] | Start confirmation, setup, timer |
| Missions | `/missions/[missionId]/results` | Mission results | [ ] | [ ] | [ ] | Score, feedback, mistakes, next steps |
| Simulator | `/simulator` | Simulator workspace | [ ] | [ ] | [ ] | Fake business tool shell |
| Simulator | `/simulator/inbox` | Simulator inbox | [ ] | [ ] | [ ] | Fake email inbox and tasks |
| Simulator | `/simulator/calendar` | Simulator calendar | [ ] | [ ] | [ ] | Fake calls and deadlines |
| Simulator | `/simulator/tasks` | Simulator tasks | [ ] | [ ] | [ ] | Mission task board |
| Simulator | `/simulator/files` | Simulator files | [ ] | [ ] | [ ] | Briefs, docs, spreadsheets, assets |
| Simulator | `/simulator/crm` | Simulator CRM | [ ] | [ ] | [ ] | Fake client/customer records |
| Simulator | `/simulator/chat` | Simulator chat | [ ] | [ ] | [ ] | Simulated client messages |
| Feedback | `/feedback` | Feedback | [ ] | [ ] | [ ] | AI feedback, score history, improvement areas |
| Progress | `/progress` | Progress | [ ] | [ ] | [ ] | Skill progress, missions, badges, streaks |
| Portfolio | `/portfolio` | Training portfolio | [ ] | [ ] | [ ] | Exported case studies from completed missions |
| Resources | `/resources` | Resources | [ ] | [ ] | [ ] | Guides, templates, checklists, examples |
| Support | `/support` | Support | [ ] | [ ] | [ ] | Help, docs, tickets link |
| Settings | `/settings` | Settings overview | [ ] | [ ] | [ ] | Trainee settings hub |
| Settings | `/settings/profile` | Profile settings | [ ] | [ ] | [ ] | Name, avatar, goals |
| Settings | `/settings/notifications` | Notification preferences | [ ] | [ ] | [ ] | Mission reminders, feedback alerts |
| Settings | `/settings/security` | Security settings | [ ] | [ ] | [ ] | Password, sessions |

## admin.automagic.dev

| Section | Route | Screen | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|---|---|
| Auth | `/login` | Login | [ ] | [ ] | [ ] | Admin login |
| Auth | `/forgot-password` | Forgot password | [ ] | [ ] | [ ] | Email input, sent state |
| Auth | `/reset-password` | Reset password | [ ] | [ ] | [ ] | Token validation, new password |
| Main | `/dashboard` | Admin dashboard | [ ] | [ ] | [ ] | Users, tasks, payments, support, marketing, system events |
| Users | `/users` | Users list | [ ] | [ ] | [ ] | Search, filters, roles, status |
| Users | `/users/[userId]` | User detail | [ ] | [ ] | [ ] | Profile, roles, sessions, activity, actions |
| Clients | `/clients` | Clients list | [ ] | [ ] | [ ] | Client accounts, businesses, status |
| Clients | `/clients/[clientId]` | Client detail | [ ] | [ ] | [ ] | Projects, billing, support, history |
| Providers | `/providers` | Providers list | [ ] | [ ] | [ ] | Operators, status, verification, performance |
| Providers | `/providers/[providerId]` | Provider detail | [ ] | [ ] | [ ] | Profile, tasks, payouts, support, verification |
| Projects | `/projects` | Projects list | [ ] | [ ] | [ ] | Project health, status, assignment |
| Projects | `/projects/[projectId]` | Project detail | [ ] | [ ] | [ ] | Client, provider, tasks, billing, files |
| Tasks | `/tasks` | Tasks list | [ ] | [ ] | [ ] | Volume, statuses, disputes, completions |
| Tasks | `/tasks/[taskId]` | Task detail | [ ] | [ ] | [ ] | Assignment, comments, files, billing, audit |
| Payments | `/payments` | Payments overview | [ ] | [ ] | [ ] | Transactions, invoices, refunds, disputes, payouts |
| Payments | `/payments/transactions` | Transactions | [ ] | [ ] | [ ] | Payment events and status |
| Payments | `/payments/invoices` | Invoices | [ ] | [ ] | [ ] | All invoices across clients |
| Payments | `/payments/refunds` | Refunds | [ ] | [ ] | [ ] | Refund queue and history |
| Payments | `/payments/payouts` | Payouts | [ ] | [ ] | [ ] | Provider payout status |
| Payments | `/payments/disputes` | Payment disputes | [ ] | [ ] | [ ] | Dispute cases and evidence |
| Support | `/support` | Support dashboard | [ ] | [ ] | [ ] | Queues, status filters, priority cases |
| Support | `/support/tickets` | Support tickets | [ ] | [ ] | [ ] | All tickets |
| Support | `/support/tickets/[ticketId]` | Ticket detail | [ ] | [ ] | [ ] | User info, related records, messages, notes |
| Support | `/support/macros` | Support macros | [ ] | [ ] | [ ] | Saved replies and templates |
| Support | `/support/categories` | Support categories | [ ] | [ ] | [ ] | Issue types and routing |
| Marketing | `/marketing` | Marketing dashboard | [ ] | [ ] | [ ] | Lead funnel, campaigns, announcements |
| Marketing | `/marketing/leads` | Leads list | [ ] | [ ] | [ ] | Homepage AI chat leads, contact info, tags, status |
| Marketing | `/marketing/leads/[leadId]` | Lead detail | [ ] | [ ] | [ ] | Conversation, summary, follow-up, conversion |
| Marketing | `/marketing/campaigns` | Campaigns | [ ] | [ ] | [ ] | Campaign list and performance |
| Marketing | `/marketing/promotions` | Promotions | [ ] | [ ] | [ ] | Promo codes and discounts |
| Marketing | `/marketing/announcements` | Announcements | [ ] | [ ] | [ ] | Broadcasts and in-app notices |
| Marketing | `/marketing/emails` | Marketing emails | [ ] | [ ] | [ ] | Email updates, templates, sends |
| Reports | `/reports` | Reports dashboard | [ ] | [ ] | [ ] | Revenue, tasks, users, marketing, support |
| Reports | `/reports/revenue` | Revenue report | [ ] | [ ] | [ ] | Revenue, unpaid balances, monthly trends |
| Reports | `/reports/tasks` | Tasks report | [ ] | [ ] | [ ] | Volume, completion rate, status breakdown |
| Reports | `/reports/users` | Users report | [ ] | [ ] | [ ] | Growth, activation, role mix |
| Reports | `/reports/marketing` | Marketing report | [ ] | [ ] | [ ] | Leads, conversion, campaign results |
| Reports | `/reports/support` | Support report | [ ] | [ ] | [ ] | Ticket volume, resolution time, categories |
| Audit | `/audit-logs` | Audit logs | [ ] | [ ] | [ ] | Admin actions, billing edits, account changes |
| Settings | `/settings` | Settings overview | [ ] | [ ] | [ ] | Admin configuration hub |
| Settings | `/settings/platform` | Platform settings | [ ] | [ ] | [ ] | Global defaults, product flags |
| Settings | `/settings/roles` | Roles | [ ] | [ ] | [ ] | Role definitions |
| Settings | `/settings/permissions` | Permissions | [ ] | [ ] | [ ] | Permission matrix |
| Settings | `/settings/billing` | Billing settings | [ ] | [ ] | [ ] | Fees, provider settings, invoice defaults |
| Settings | `/settings/email-templates` | Email templates | [ ] | [ ] | [ ] | System email templates |
| Settings | `/settings/service-categories` | Service categories | [ ] | [ ] | [ ] | Task/project categories |
| Settings | `/settings/notifications` | Notification settings | [ ] | [ ] | [ ] | System notification defaults |
| Settings | `/settings/security` | Security settings | [ ] | [ ] | [ ] | Admin security policy |

---

## Global Design Tasks

| Area | Item | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| Navigation | Public website header and menu | [ ] | [ ] | [ ] |
| Navigation | Client portal app shell | [ ] | [ ] | [ ] |
| Navigation | Studio app shell | [ ] | [ ] | [ ] |
| Navigation | Sandbox app shell | [ ] | [ ] | [ ] |
| Navigation | Admin app shell | [ ] | [ ] | [ ] |
| Auth | Shared login pattern | [ ] | [ ] | [ ] |
| Auth | Shared signup pattern | [ ] | [ ] | [ ] |
| Auth | Password recovery pattern | [ ] | [ ] | [ ] |
| Forms | Text input, select, textarea, file upload | [ ] | [ ] | [ ] |
| Feedback | Empty states, loading states, error states | [ ] | [ ] | [ ] |
| Tables | Responsive table/list pattern | [ ] | [ ] | [ ] |
| Cards | Project, task, invoice, ticket, agent cards | [ ] | [ ] | [ ] |
| Modals | Confirm, edit, create, upload, payment | [ ] | [ ] | [ ] |
| Notifications | Toasts, center, badges | [ ] | [ ] | [ ] |
| Accessibility | Focus states and keyboard paths | [ ] | [ ] | [ ] |
| Theme | Light mode | [ ] | [ ] | [ ] |
| Theme | Dark mode | [ ] | [ ] | [ ] |

## Suggested Design Order

1. Public website core pages
2. Shared auth screens
3. Client dashboard, projects, tasks, billing, support
4. Studio dashboard, clients, tasks, agents, earnings
5. Admin dashboard, users, payments, support, settings
6. Sandbox dashboard, missions, simulator, feedback
7. Settings and notification preference screens
8. Empty, loading, error, and permission states