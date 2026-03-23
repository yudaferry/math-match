# Phase 2b — Local Development Environment

## Steps: 2b
## Status: Not started

---

## Step 2b — Containerized / Reproducible Local Environment

**Goal:** Run the project locally in an isolated, reproducible environment so setup is consistent across machines.

**Decision needed:** Choose one approach before starting this step.

---

### Option A — Docker

**Concept to explain:**
- Docker runs the app inside a container — isolated from your host system
- `Dockerfile` defines the image (base image, install steps, run command)
- `docker-compose.yml` makes it easy to start/stop with one command and maps ports

**Files to create:**
- `Dockerfile` — multi-stage build (deps → builder → runner) or simple dev image
- `docker-compose.yml` — maps port 3000, mounts `src/` as a volume for hot reload
- `.dockerignore` — exclude `node_modules`, `.next`, `.git`

**Key decisions to discuss:**
- Dev-only container (simple, fast) vs production-ready multi-stage build
- Hot reload inside Docker requires volume mounting `src/` correctly
- Node version to pin (match `.nvmrc` or `package.json` engines field)

**Confirmation:** `docker compose up` starts the app, `localhost:3000` works, file changes hot-reload

---

### Option B — Nix (with `flake.nix`)

**Concept to explain:**
- Nix provides a declarative, reproducible shell environment — no Docker needed
- `flake.nix` pins exact versions of Node.js and any tools (e.g., `npm`, `eslint`)
- `nix develop` drops you into a shell with everything available

**Files to create:**
- `flake.nix` — declares `devShell` with Node.js + npm
- `flake.lock` — auto-generated, pins exact Nix package versions

**Key decisions to discuss:**
- Node version: match what the project needs (Next.js 16 supports Node 18+)
- Whether to add extra tools to the shell (e.g., `git`, `curl`)
- `.envrc` + `direnv` for automatic shell activation (optional but convenient)

**Confirmation:** `nix develop` works, `npm run dev` inside the shell starts the app at `localhost:3000`

---

**Once you decide (Docker or Nix), update this file and mark the chosen option.**
