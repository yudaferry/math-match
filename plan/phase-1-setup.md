# Phase 1 — Project Setup

## Steps: 1–2
## Status: ✅ DONE

---

## ✅ Step 1 — Project Initialization

**Concept to explain:**
- What `create-next-app` scaffolds
- What each flag means
- App Router vs Pages Router
- Turbopack: now stable and default in Next.js 16

**Command to run:**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

> Using `.` instead of a project name because you're already inside the `math-match` folder.

**Flag breakdown:**
| Flag | Meaning |
|------|---------|
| `@latest` | Uses the latest Next.js (currently v16) |
| `--typescript` | Enables TypeScript (also the default) |
| `--tailwind` | Sets up Tailwind CSS (also the default) |
| `--eslint` | Adds ESLint config |
| `--app` | Uses App Router (recommended over Pages Router) |
| `--src-dir` | Puts code inside `src/` directory |
| `--import-alias "@/*"` | Allows `@/lib/types` instead of `../../lib/types` |

**Notes on Turbopack:**
- Next.js 16 uses Turbopack by default for both `dev` and `build`
- No flag needed to enable it — it's already on
- Do NOT use `--no-turbopack` (that flag no longer exists)
- We'll handle PWA/Webpack compatibility in Phase 5

**Tailwind v4 note:**
- `create-next-app` installs Tailwind v4 automatically
- v4 does NOT use `tailwind.config.js` — configuration is done in CSS using `@theme`
- The `globals.css` will have `@import "tailwindcss"` instead of the old `@tailwind base/components/utilities` directives

**Confirmation:** Run `npm run dev`, see default Next.js page at `localhost:3000`

---

## ✅ Step 2 — Clean the Scaffold

**Concept to explain:**
- The scaffold ships demo content that must be cleared before building

**Files to modify:**
- `src/app/page.tsx` — replace all content with plain text "Halaman Konfigurasi"
- `src/app/globals.css` — remove all demo styles; keep only `@import "tailwindcss"` (Tailwind v4 syntax)
- `public/` — delete any default SVG files if present

**Confirmation:** Page loads showing plain text "Halaman Konfigurasi", no demo styles
