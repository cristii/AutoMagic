# Web Architecture

## Purpose

The web layer serves AutoMagic through role-based Next.js apps, one app per subdomain.

Web apps use shared React Native Web components and shared product screens.

---

## Web App Layout

```text
apps/web/
  www/
  client/
  studio/
  sandbox/
  admin/
```

Subdomain mapping:

```text
www.automagic.dev       -> apps/web/www
client.automagic.dev    -> apps/web/client
studio.automagic.dev    -> apps/web/studio
sandbox.automagic.dev   -> apps/web/sandbox
admin.automagic.dev     -> apps/web/admin
```

---

## Why Separate Web Apps

Each subdomain has its own:

```text
auth rules
layout
navigation
permissions
bundle needs
deployment config
environment variables
rate limits
security rules
```

Shared code lives in packages.

---

## Next.js App Router Structure

Example client app:

```text
apps/web/client/
  app/
    (auth)/
      login/page.tsx
      signup/page.tsx
      forgot-password/page.tsx
      reset-password/page.tsx
    (onboarding)/
      onboarding/page.tsx
    (app)/
      layout.tsx
      dashboard/page.tsx
      projects/page.tsx
      projects/new/page.tsx
      projects/[projectId]/page.tsx
      tasks/page.tsx
      tasks/new/page.tsx
      tasks/[taskId]/page.tsx
      billing/page.tsx
      billing/invoices/[invoiceId]/page.tsx
      support/page.tsx
      support/tickets/new/page.tsx
      support/tickets/[ticketId]/page.tsx
      settings/page.tsx
  middleware.ts
  next.config.mjs
```

---

## Public Website Routes

```text
/
/services
/pricing
/portfolio
/availability
/book
/contact
/login
/signup
/terms
/privacy
/cookies
```

---

## Client Routes

```text
/login
/signup
/forgot-password
/reset-password
/onboarding
/dashboard
/projects
/projects/new
/projects/[projectId]
/tasks
/tasks/new
/tasks/[taskId]
/messages
/calendar
/files
/approvals
/deliverables
/billing
/billing/invoices
/billing/invoices/[invoiceId]
/billing/payments
/billing/payment-methods
/support
/support/tickets
/support/tickets/new
/support/tickets/[ticketId]
/assistant
/notifications
/settings
/settings/profile
/settings/business
/settings/billing
/settings/notifications
/settings/security
```

---

## Studio Routes

```text
/login
/signup
/forgot-password
/reset-password
/onboarding
/dashboard
/clients
/clients/[clientId]
/projects
/projects/[projectId]
/tasks
/tasks/[taskId]
/messages
/calendar
/files
/approvals
/deliverables
/agents
/agents/new
/agents/[agentId]
/agents/[agentId]/runs
/agents/[agentId]/settings
/earnings
/earnings/overview
/earnings/invoices
/earnings/payments
/earnings/payouts
/earnings/taxes
/support
/support/tickets
/support/tickets/new
/support/tickets/[ticketId]
/notifications
/settings
/settings/profile
/settings/services
/settings/availability
/settings/billing
/settings/payouts
/settings/notifications
/settings/integrations
/settings/security
```

---

## Sandbox Routes

```text
/login
/signup
/forgot-password
/reset-password
/onboarding
/dashboard
/missions
/missions/[missionId]
/missions/[missionId]/start
/missions/[missionId]/results
/simulator
/simulator/inbox
/simulator/calendar
/simulator/tasks
/simulator/files
/simulator/crm
/simulator/chat
/feedback
/progress
/portfolio
/resources
/support
/settings
/settings/profile
/settings/notifications
/settings/security
```

---

## Admin Routes

```text
/login
/forgot-password
/reset-password
/dashboard
/users
/users/[userId]
/clients
/clients/[clientId]
/providers
/providers/[providerId]
/projects
/projects/[projectId]
/tasks
/tasks/[taskId]
/payments
/payments/transactions
/payments/invoices
/payments/refunds
/payments/payouts
/payments/disputes
/support
/support/tickets
/support/tickets/[ticketId]
/support/macros
/support/categories
/marketing
/marketing/leads
/marketing/leads/[leadId]
/marketing/campaigns
/marketing/promotions
/marketing/announcements
/marketing/emails
/reports
/reports/revenue
/reports/tasks
/reports/users
/reports/marketing
/reports/support
/audit-logs
/settings
/settings/platform
/settings/roles
/settings/permissions
/settings/billing
/settings/email-templates
/settings/service-categories
/settings/notifications
/settings/security
```

---

## React Native Web Config

```js
const nextConfig = {
  transpilePackages: [
    "react-native",
    "react-native-web",
    "@automagic/ui",
    "@automagic/theme",
    "@automagic/navigation",
    "@automagic/auth",
    "@automagic/api-client",
    "@automagic/validators",
    "@automagic/types",
    "@automagic/app-client",
    "@automagic/features-auth",
    "@automagic/features-tasks",
    "@automagic/features-billing",
    "@automagic/features-support"
  ],
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web"
    };

    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".tsx",
      ".ts",
      ".web.jsx",
      ".web.js",
      ".jsx",
      ".js",
      ...config.resolve.extensions
    ];

    return config;
  }
};

export default nextConfig;
```

---

## Web Security

```text
HTTP-only session cookies
CSRF protection for cookie auth
secure headers
role middleware
rate limiting on auth routes
strict CORS on API
content security policy for public site
admin re-auth for sensitive actions
```

---

## SEO

SEO applies mainly to:

```text
www.automagic.dev
```

Portal pages should be private and no-indexed.

---

## Test Targets

```text
public booking flow
client login
client onboarding
create task
view invoice
open support ticket
studio task update
studio agent run
admin user search
admin payment review
```
