# Math Match — Coding Mentor Plan

## Project Overview
Math Match is a Next.js 16 + TypeScript + Tailwind CSS v4 + PWA web app for practicing arithmetic.

## Tech Stack (verified March 2026)
- **Framework:** Next.js 16 (App Router, Turbopack default)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first config, no tailwind.config.js)
- **State:** Zustand v5
- **PWA:** Official Next.js PWA approach (no external library) + Serwist as optional upgrade
- **UI Language:** Indonesian
- **Mentoring Language:** English

## Phases

| Phase | File | Steps | Focus |
|-------|------|-------|-------|
| 1 | [phase-1-setup.md](./phase-1-setup.md) | 1–2 | Project initialization & scaffold cleanup |
| 2 | [phase-2-core-logic.md](./phase-2-core-logic.md) | 3–4 | TypeScript types & question generation |
| 3 | [phase-3-state-components.md](./phase-3-state-components.md) | 5–6 | Zustand store & shared UI components |
| 4 | [phase-4-pages.md](./phase-4-pages.md) | 7–11 | All screens (Config, Question, Result) |
| 5 | [phase-5-pwa-deploy.md](./phase-5-pwa-deploy.md) | 12–13 | PWA setup & Vercel deployment |

## Critical Files

| File | Purpose |
|------|---------|
| `src/lib/types.ts` | Core types shared by every file — must be correct first |
| `src/lib/generate.ts` | All PRD business rules for question generation |
| `src/store/session.ts` | Zustand store — in-memory state bridge between all screens |
| `src/app/question/page.tsx` | Most complex screen — timer + numpad + state |
| `src/components/question/Numpad.tsx` | Custom keyboard replacing native mobile keyboard |

## Current Status
- [x] Phase 1 — Project Setup ✅
- [x] Phase 2 — Core Logic ✅
- [ ] Phase 3 — State & Components ← next
- [ ] Phase 4 — Pages
- [ ] Phase 5 — PWA & Deploy

## Key Version Notes
- Next.js 16: Turbopack is now stable and default for both `dev` and `build`
- Tailwind v4: No `tailwind.config.js` — config is done inside CSS using `@theme`
- Zustand v5: `create<State>((set) => ({...}))` pattern — TypeScript-first
- next-pwa: **abandoned** — do NOT use. Use official Next.js PWA guide or Serwist instead.
