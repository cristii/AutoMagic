# Infrastructure Architecture

## Purpose

Infrastructure covers local development, Docker, deployment units, environment variables, networking, storage, queues, email, monitoring, and operational tasks.

---

## Infrastructure Units

```text
web apps
    Next.js apps for public website and portals.

api
    NestJS backend service.

worker
    Background job service.

db
    PostgreSQL database.

redis
    Queue and cache backend.

object storage
    S3-compatible file storage.

mail service
    Local Mailpit in development, production email provider later.

billing provider
    Stripe or similar provider.

monitoring
    logs, errors, metrics, uptime checks.
```

---

## Local Docker Services

Use Docker Compose for local infrastructure.

```text
postgres
redis
mailpit
minio
```

Run:

```bash
pnpm dev:infra
```

Root scripts:

```json
{
  "scripts": {
    "dev:infra": "docker compose up -d postgres redis mailpit minio",
    "docker:down": "docker compose down",
    "docker:clean": "docker compose down -v"
  }
}
```

---

## Docker Compose

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: automagic-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: automagic
      POSTGRES_PASSWORD: automagic
      POSTGRES_DB: automagic
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U automagic -d automagic"]
      interval: 5s
      timeout: 5s
      retries: 10

  redis:
    image: redis:7-alpine
    container_name: automagic-redis
    restart: unless-stopped
    ports:
      - "6379:6379"

  mailpit:
    image: axllent/mailpit:latest
    container_name: automagic-mailpit
    restart: unless-stopped
    ports:
      - "1025:1025"
      - "8025:8025"

  minio:
    image: minio/minio:latest
    container_name: automagic-minio
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: automagic
      MINIO_ROOT_PASSWORD: automagic123
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  minio_data:
```

---

## Deployment Units

```text
web-www
web-client
web-studio
web-sandbox
web-admin
api
worker
postgres
redis
object-storage
```

Each app should have its own environment variables.

---

## Network Map

```text
browser/mobile/desktop
    -> web app or native shell
    -> API service
    -> database
    -> redis
    -> object storage
    -> email provider
    -> billing provider
```

Public access:

```text
www.automagic.dev
client.automagic.dev
studio.automagic.dev
sandbox.automagic.dev
admin.automagic.dev
api.automagic.dev
```

Private services:

```text
postgres
redis
worker
object storage internal endpoint
```

---

## Environment Files

```text
apps/web/www/.env.local
apps/web/client/.env.local
apps/web/studio/.env.local
apps/web/sandbox/.env.local
apps/web/admin/.env.local
services/api/.env
services/worker/.env
services/db/.env
```

Example API env:

```bash
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://automagic:automagic@localhost:5432/automagic
REDIS_URL=redis://localhost:6379
AUTH_SECRET=dev-secret-change-me
S3_ENDPOINT=http://localhost:9000
S3_REGION=local
S3_BUCKET=automagic-dev
S3_ACCESS_KEY_ID=automagic
S3_SECRET_ACCESS_KEY=automagic123
SMTP_HOST=localhost
SMTP_PORT=1025
```

---

## Secrets

Secret groups:

```text
auth secrets
database URLs
billing provider keys
email provider keys
object storage keys
AI provider keys
webhook signing secrets
admin bootstrap secrets
```

Use local `.env` for development and a secret manager in production.

---

## File Storage

Local:

```text
MinIO
```

Production:

```text
S3-compatible storage
```

Storage model:

```text
private bucket for client files
signed upload URLs
signed download URLs
file metadata in database
virus scan hook later
retention policy later
```

---

## Queues

Redis-backed queues handle:

```text
emails
notifications
AI agent runs
billing events
file processing
reports
cleanup jobs
```

Worker process:

```text
services/worker
```

---

## Monitoring

Track:

```text
API errors
worker failures
queue depth
database latency
webhook failures
billing failures
file upload failures
auth failures
admin actions
```

Log fields:

```text
request_id
user_id
role
service
event
duration_ms
status
error_code
```

---

## Health Checks

```text
/api/health
/api/health/db
/api/health/redis
/api/health/storage
```

Use health checks for:

```text
Docker startup
load balancer checks
uptime monitoring
deployment checks
```

---

## CI Pipeline

```text
install
lint
typecheck
test
build
database schema check
Docker image build
```

Release steps:

```text
run migrations
deploy API
deploy worker
deploy web apps
verify health checks
run smoke tests
```
