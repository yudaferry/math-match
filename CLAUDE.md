# CLAUDE.md

## Commands

```bash
pnpm dev         # start dev server (Turbopack, localhost:3000)
pnpm build       # production build
pnpm lint        # run ESLint
```

## Project

Math Match is a PWA for children to practice arithmetic. No backend, no database, no auth. All session state lives in memory only.

**User flow:** Config page → Question screen (one at a time) → Result screen → back to Config

## Stack

- **Next.js 16** with App Router, Turbopack default
- **React 19**, **TypeScript 5** (strict mode)
- **Tailwind CSS v4** — CSS-first, no `tailwind.config.js`. Config via `@theme` in CSS.
- **Zustand v5** — `import { create } from 'zustand'`, typed with `create<StoreType>(...)`
- **PWA** — official Next.js approach (no next-pwa). `app/manifest.ts` for manifest.

## Coding Conventions

- **All code in English** — variable names, type names, function names, comments, file names
- **UI text in Indonesian** — labels, button text, error messages, placeholders visible to the user
- **No React Compiler** — not enabled, do not add it
- **State management is Zustand only** — do not use React Context or useReducer for global state
- `@/*` maps to `src/*`. Use `@/lib/types` not `../../lib/types`.

## Documentation

- Implementation plan: `plan/` directory, start with `plan/README.md`
- Detailed docs: `docs/` directory
